"use strict";

const chinese = document.documentElement.lang.startsWith("zh");

async function initializeViewer() {
  const response = await fetch("assets/trajectories.json");
  if (!response.ok) throw new Error("Trajectory data could not be loaded.");
  const data = await response.json();
  const gallery = document.getElementById("motion-gallery");
  const slider = document.getElementById("frame-slider");
  const playButton = document.getElementById("play-button");
  const targetToggle = document.getElementById("show-target");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const chains = [[0, 13, 14, 15, 16], [0, 1, 2, 3, 17], [0, 4, 5, 6, 18], [0, 10, 11, 12, 19], [0, 7, 8, 9, 20]];
  const colors = ["#8bcdff", "#b4e3b5"];
  let frame = 30, playing = !reducedMotion.matches, visible = false, lastTime = 0, animation = 0;

  function createView(canvas, clip) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("This browser does not support the motion canvas.");
    const frames = [...clip.context, ...clip.samples[0]];
    const targetFrames = [...clip.context, ...clip.target];
    const camera = { yaw: .65, pitch: -.25, zoom: 1 };
    let width = 0, height = 0, center = [0, 0, 0], radius = .2, dragging = null;
    function bounds() {
      const low = [Infinity, Infinity, Infinity], high = [-Infinity, -Infinity, -Infinity];
      const poses = targetToggle.checked ? [...frames, ...targetFrames] : frames;
      for (const pose of poses) for (let i = 0; i < pose.length; i++) {
        const axis = i % 3;
        low[axis] = Math.min(low[axis], pose[i]); high[axis] = Math.max(high[axis], pose[i]);
      }
      center = low.map((v, i) => (v + high[i]) / 2);
      radius = Math.max(.07, Math.hypot(...low.map((v, i) => high[i]-v)) / 2);
    }
    function project(p) {
      const x = p[0]-center[0], y = p[1]-center[1], z = p[2]-center[2];
      const cy = Math.cos(camera.yaw), sy = Math.sin(camera.yaw), cp = Math.cos(camera.pitch), sp = Math.sin(camera.pitch);
      const rx = cy*x + sy*z, rz = -sy*x + cy*z, ry = cp*y - sp*rz, depth = sp*y + cp*rz;
      const perspective = 3.5 / (3.5 + depth/radius);
      const scale = Math.min(width*.86, height*.8) / (2*radius) * camera.zoom * perspective;
      return [width*.5 + rx*scale, height*.52 + ry*scale, depth];
    }
    function point(pose, joint) { return pose.slice(joint*3, joint*3+3); }
    function poseAt(poses) {
      const i = Math.min(59, Math.floor(frame)), j = Math.min(59, i+1), t = frame-i;
      return poses[i].map((value, axis) => value*(1-t) + poses[j][axis]*t);
    }
    function skeleton(pose, ghost = false) {
      const order = [0, 1].sort((a, b) => project(point(pose, a*21))[2] - project(point(pose, b*21))[2]);
      for (const hand of order) {
        const color = ghost ? "#edf3ff" : (frame < 4 ? "#d4deed" : colors[hand]);
        ctx.globalAlpha = ghost ? .45 : 1;
        ctx.strokeStyle = color; ctx.lineWidth = ghost ? 1.1 : (width < 300 ? 1.9 : 2.6);
        ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.setLineDash(ghost ? [3,4] : []);
        for (const chain of chains) {
          ctx.beginPath();
          chain.forEach((joint, index) => {
            const p = project(point(pose, hand*21+joint));
            if (index) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
          });
          ctx.stroke();
        }
        ctx.setLineDash([]);
        if (!ghost) for (let joint = 0; joint < 21; joint++) {
          const p = project(point(pose, hand*21+joint));
          ctx.fillStyle = color; ctx.beginPath();
          ctx.arc(p[0], p[1], joint === 0 ? (width < 300 ? 2.7 : 3.7) : (width < 300 ? 1.7 : 2.2), 0, Math.PI*2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }
    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      for (let hand = 0; hand < 2; hand++) {
        ctx.globalAlpha = .2; ctx.strokeStyle = colors[hand]; ctx.lineWidth = .8; ctx.beginPath();
        for (let i = 0; i <= Math.floor(frame); i++) {
          const p = project(point(frames[i], hand*21));
          if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
        }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      if (targetToggle.checked && frame >= 4) skeleton(poseAt(targetFrames), true);
      skeleton(poseAt(frames));
    }
    function resize() {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0); draw();
    }
    canvas.addEventListener("pointerdown", event => {
      dragging = {x:event.clientX,y:event.clientY};
      canvas.setPointerCapture(event.pointerId); canvas.classList.add("dragging");
    });
    canvas.addEventListener("pointermove", event => {
      if (!dragging) return;
      camera.yaw += (event.clientX-dragging.x)*.009;
      camera.pitch = Math.max(-1.4, Math.min(1.4, camera.pitch+(event.clientY-dragging.y)*.009));
      dragging = {x:event.clientX,y:event.clientY}; draw();
    });
    const endDrag = () => {dragging = null; canvas.classList.remove("dragging");};
    canvas.addEventListener("pointerup",endDrag); canvas.addEventListener("pointercancel",endDrag);
    canvas.addEventListener("wheel", event => {
      event.preventDefault(); camera.zoom = Math.max(.5,Math.min(3,camera.zoom*Math.exp(-event.deltaY*.001))); draw();
    }, {passive:false});
    canvas.tabIndex = 0;
    canvas.setAttribute("aria-label", canvas.getAttribute("aria-label") + (chinese
      ? " 方向键旋转视角，加号和减号缩放。" : " Arrow keys rotate the view; plus and minus zoom."));
    canvas.addEventListener("keydown", event => {
      if (!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") camera.yaw -= .1;
      if (event.key === "ArrowRight") camera.yaw += .1;
      if (event.key === "ArrowUp") camera.pitch = Math.max(-1.4,camera.pitch-.1);
      if (event.key === "ArrowDown") camera.pitch = Math.min(1.4,camera.pitch+.1);
      if (["+","="].includes(event.key)) camera.zoom = Math.min(3,camera.zoom*1.1);
      if (event.key === "-") camera.zoom = Math.max(.5,camera.zoom/1.1);
      draw();
    });
    new ResizeObserver(resize).observe(canvas);
    bounds(); resize();
    return {draw, bounds, reset() {Object.assign(camera,{yaw:.65,pitch:-.25,zoom:1}); draw();}};
  }
  const views = [...document.querySelectorAll("[data-motion-index]")].map((canvas,i) => createView(canvas,data.clips[i]));
  function draw() {
    views.forEach(view => view.draw());
    const observed = frame < 4, n = observed ? Math.floor(frame)+1 : Math.floor(frame)-3, count = observed ? 4 : 56;
    document.getElementById("frame-phase").textContent = chinese
      ? (observed ? "观测帧" : "生成的未来帧") : (observed ? "OBSERVED FRAMES" : "GENERATED FUTURE");
    document.getElementById("frame-count").innerHTML = `${String(n).padStart(2,"0")}<span> / ${count}</span>`;
    slider.value = String(Math.floor(frame));
    slider.setAttribute("aria-valuetext", chinese
      ? `${observed ? "观测" : "未来"}第 ${n} 帧，共 ${count} 帧`
      : `${observed ? "Observed" : "Future"} frame ${n} of ${count}`);
  }
  function updatePlayButton() {
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", chinese
      ? (playing ? "暂停动作" : "播放动作") : (playing ? "Pause motion" : "Play motion"));
  }
  function tick(time) {
    animation = 0;
    if (!playing || !visible || document.hidden) {lastTime = 0; return;}
    if (lastTime) frame = (frame + Math.min(time-lastTime,100)*.012) % 60;
    lastTime = time; draw(); animation = requestAnimationFrame(tick);
  }
  function resume() {if (playing && visible && !document.hidden && !animation) animation = requestAnimationFrame(tick);}
  function pause() {playing = false; lastTime = 0; cancelAnimationFrame(animation); animation = 0; updatePlayButton();}
  playButton.addEventListener("click", () => {playing ? pause() : (playing = true,updatePlayButton(),resume());});
  slider.addEventListener("input", () => {pause(); frame = Number(slider.value); draw();});
  targetToggle.addEventListener("change", () => {views.forEach(view => view.bounds()); draw();});
  document.getElementById("reset-view").addEventListener("click", () => views.forEach(view => view.reset()));
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting; if (!visible) lastTime = 0; resume();}, {threshold:.08}).observe(gallery);
  document.addEventListener("visibilitychange", () => {lastTime = 0; resume();});
  reducedMotion.addEventListener("change", event => {if (event.matches) pause();});
  document.getElementById("viewer-controls").hidden = false;
  document.getElementById("viewer-status").hidden = true;
  document.getElementById("motion-poster").hidden = true;
  draw(); updatePlayButton(); document.body.dataset.viewerReady = "true";
}

initializeViewer().catch(error => {
  console.error("DexJiT viewer:",error);
  document.getElementById("viewer-status").textContent = chinese
    ? "当前浏览器无法进行交互播放。" : "Interactive playback is unavailable in this browser.";
});
