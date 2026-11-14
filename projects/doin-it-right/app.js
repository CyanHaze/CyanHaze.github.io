(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('project-data').textContent);
  const zh = document.documentElement.lang === 'zh-CN';
  const words = zh ? {
    play: '播放视频', pause: '暂停视频', success: '成功', failure: '失败',
    seed: 'Seed', steps: '控制步', rate: '整组成功率', dims: '维 / 帧',
    score: '成功率', noState: '说明、字段与时间轴', videoError: '视频未能加载，请重新播放。'
  } : {
    play: 'Play videos', pause: 'Pause videos', success: 'Success', failure: 'Failure',
    seed: 'Seed', steps: 'control steps', rate: 'Group success', dims: 'dimensions / frame',
    score: 'success rate', noState: 'Instruction, schema, timestamps', videoError: 'Video could not load. Try playing again.'
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches && !navigator.connection?.saveData;
  const toggle = document.getElementById('motion-toggle');
  const videos = [...document.querySelectorAll('video')];
  const visibleVideos = new Set();
  let activeTask = data.tasks.find(t => t.id === 't18');

  function updateToggle() {
    toggle.querySelector('.motion-label').textContent = playing ? words.pause : words.play;
    toggle.querySelector('.motion-icon').textContent = playing ? 'Ⅱ' : '▷';
    toggle.setAttribute('aria-pressed', String(playing));
  }
  function play(video) {
    if (playing && !document.hidden) video.play().catch(() => {});
  }
  function pauseAll() { videos.forEach(v => v.pause()); }
  updateToggle();
  toggle.addEventListener('click', () => {
    playing = !playing;
    updateToggle();
    if (playing) visibleVideos.forEach(play); else pauseAll();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) { visibleVideos.add(target); play(target); }
        else { visibleVideos.delete(target); target.pause(); }
      });
    }, {threshold: 0.15});
    videos.forEach(v => observer.observe(v));
  } else { videos.forEach(v => { visibleVideos.add(v); play(v); }); }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAll(); else visibleVideos.forEach(play);
  });
  reduced.addEventListener('change', e => {
    if (e.matches) { playing = false; pauseAll(); updateToggle(); }
  });
  videos.forEach(video => {
    video.muted = true;
    video.addEventListener('error', () => {
      if (video.parentElement.querySelector('.media-error')) return;
      const p = document.createElement('p');
      p.className = 'media-error'; p.textContent = words.videoError;
      video.insertAdjacentElement('afterend', p);
    });
  });

  function replaceVideo(video, view) {
    video.pause();
    video.poster = view.poster;
    video.src = view.src;
    video.load();
    if (visibleVideos.has(video)) play(video);
  }
  document.querySelectorAll('[data-camera]').forEach(button => {
    button.addEventListener('click', () => {
      const camera = button.dataset.camera;
      document.querySelectorAll('[data-camera]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('[data-hero-task]').forEach(video => {
        const task = data.tasks.find(t => t.id === video.dataset.heroTask);
        replaceVideo(video, task.clips.find(c => c.id === 'state').views[camera]);
      });
    });
  });

  function selectTask(taskId, focus = false) {
    activeTask = data.tasks.find(t => t.id === taskId);
    document.querySelectorAll('[role="tab"]').forEach(tab => {
      const selected = tab.dataset.task === taskId;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    const title = zh ? activeTask.title_zh : activeTask.title;
    document.getElementById('demo-task-title').textContent = title;
    document.getElementById('demo-seed').textContent = activeTask.featured_seed;
    const panel = document.getElementById('demo-panel');
    panel.setAttribute('aria-labelledby', `tab-${taskId}`);
    document.querySelectorAll('[data-demo-condition]').forEach(figure => {
      const clip = activeTask.clips.find(c => c.id === figure.dataset.demoCondition);
      const result = activeTask.results.find(r => r.id === clip.id);
      const outcome = figure.querySelector('.outcome');
      outcome.textContent = `${clip.success ? '●' : '○'} ${clip.success ? words.success : words.failure}`;
      outcome.className = `outcome ${clip.success ? 'success' : 'failure'}`;
      figure.querySelector('.clip-seed').textContent = `${words.seed} ${clip.seed} · ${clip.steps} ${words.steps}`;
      figure.querySelector('.clip-rate').textContent = `${words.rate} ${result.successes}/${result.trials}`;
      const video = figure.querySelector('video');
      video.setAttribute('aria-label', `${title}, ${clip.condition}, ${words.seed} ${clip.seed}`);
      replaceVideo(video, clip.views.main);
    });
  }
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTask(tab.dataset.task));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); selectTask(tabs[next].dataset.task, true); }
    });
  });

  const checkboxes = [...document.querySelectorAll('[data-component]')];
  function updateAblation() {
    const code = checkboxes.filter(c => c.checked).map(c => c.dataset.component).join('') || 'META';
    const row = data.state_ablation.find(r => r.condition === code);
    document.getElementById('selected-code').textContent = code;
    document.getElementById('selected-dims').textContent = `${row.dimensions} ${words.dims}`;
    document.getElementById('selected-successes').textContent = row.successes;
    document.getElementById('selected-note').textContent = code === 'META' ? words.noState : (zh ? `成功率 ${row.successes * 10}%` : `${row.successes * 10}% success`);
    document.querySelectorAll('[data-ablation-row]').forEach(r => {
      r.dataset.selected = String(r.dataset.ablationRow === code);
    });
  }
  checkboxes.forEach(c => c.addEventListener('change', updateAblation));
  document.querySelectorAll('[data-ablation-row]').forEach(row => {
    const select = () => {
      const parts = data.state_ablation.find(r => r.condition === row.dataset.ablationRow).components;
      checkboxes.forEach(c => { c.checked = parts.includes(c.dataset.component); });
      updateAblation();
    };
    row.addEventListener('click', select);
    row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
  });
  const example = data.model_example;
  const frameSlider = document.getElementById('reference-frame');
  if (example && frameSlider) {
    let exampleSide = 'right';
    const precision = (value, digits) => {
      const clean = Math.abs(value) < 0.5 * 10 ** (-digits) ? 0 : value;
      return clean.toFixed(digits);
    };
    const setValue = (node, value, digits) => {
      node.textContent = precision(value, digits);
      node.dataset.exampleValue = String(value);
      node.title = String(value);
    };
    const drawCoordinates = (element, values, axes, digits, unit) => {
      const grid = document.createElement('div');
      grid.className = 'coordinate-values';
      values.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'coordinate-value';
        const axis = document.createElement('span');
        axis.className = 'axis-label'; axis.textContent = axes[index];
        const number = document.createElement('span');
        setValue(number, value, digits);
        number.setAttribute('aria-label', `${axes[index]}: ${value} ${unit}`);
        cell.append(axis, number); grid.append(cell);
      });
      element.replaceChildren(grid);
    };
    const drawJoints = (panel, values) => {
      const matrix = document.querySelector(`[data-joint-matrix="${panel}"]`);
      matrix.querySelectorAll('tbody td span').forEach((node, index) => {
        setValue(node, values[index], 3);
        node.style.setProperty('--joint-fill', String(0.035 + Math.min(Math.abs(values[index]) / 1.6, 1) * 0.13));
      });
      matrix.setAttribute('aria-label', `${exampleSide === 'right' ? (zh ? '右手' : 'Right hand') : (zh ? '左手' : 'Left hand')} ${zh ? '手指关节角' : 'finger joint angles'}`);
    };
    function updateExample() {
      const frame = Math.max(0, Math.min(example.trajectory.length - 1, Number(frameSlider.value)));
      const [timestamp, state] = example.trajectory[frame];
      const offset = exampleSide === 'right' ? 0 : 26;
      drawCoordinates(document.querySelector('[data-example-position="reference"]'), state.slice(offset, offset + 3), ['x','y','z'], 4, 'm');
      drawCoordinates(document.querySelector('[data-example-rotation="reference"]'), state.slice(offset + 3, offset + 6), ['rₓ','rᵧ','r_z'], 3, 'rad');
      drawJoints('reference', state.slice(offset + 6, offset + 26));
      const target = example.function_call.arguments[exampleSide];
      drawCoordinates(document.querySelector('[data-example-position="prediction"]'), target.xyz, ['x','y','z'], 4, 'm');
      const orientation = document.querySelector('[data-example-rotation="prediction"]');
      if (target.rpy_deg === null) {
        const hold = document.createElement('div');
        hold.className = 'orientation-hold'; hold.dataset.orientationMode = 'hold';
        const mark = document.createElement('span'); mark.className = 'hold-mark'; mark.setAttribute('aria-hidden','true'); mark.textContent = '↔';
        hold.append(mark, zh ? '保持当前姿态' : 'Hold current orientation');
        orientation.replaceChildren(hold);
      } else {
        drawCoordinates(orientation, target.rpy_deg, ['r','p','y'], 3, '°');
      }
      drawJoints('prediction', target.joints_rad);
      document.getElementById('reference-frame-label').textContent = `${String(frame + 1).padStart(2,'0')} / ${example.trajectory.length}`;
      document.getElementById('reference-time').textContent = `${timestamp.toFixed(3)} s`;
      frameSlider.setAttribute('aria-valuetext', `${frame + 1} / ${example.trajectory.length}, ${timestamp.toFixed(3)} s`);
      frameSlider.style.setProperty('--reference-progress', `${100 * frame / (example.trajectory.length - 1)}%`);
      document.querySelector('.reference-panel').dataset.frameIndex = String(frame);
      document.querySelectorAll('[data-example-panel]').forEach(panel => { panel.dataset.side = exampleSide; });
      document.querySelectorAll('[data-example-side]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.exampleSide === exampleSide));
      });
    }
    frameSlider.addEventListener('input', updateExample);
    document.querySelectorAll('[data-example-side]').forEach(button => {
      button.addEventListener('click', () => { exampleSide = button.dataset.exampleSide; updateExample(); });
    });
    updateExample();
  }
  document.querySelectorAll('[data-language-link]').forEach(link => {
    const base = link.getAttribute('href');
    const sync = () => { link.href = base + window.location.hash; };
    sync(); window.addEventListener('hashchange', sync);
  });
})();
