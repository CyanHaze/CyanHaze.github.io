# Doin' it Right

Research progress page for **In-Context Dexterous Manipulation from a Single Numerical Demonstration**.

- `index.html`: English page.
- `zh.html`: Chinese page, with the same section IDs and data.
- `style.css`, `app.js`: responsive layout and browser interactions. No build or external JavaScript dependencies.
- `assets/media/`: 18 H.264 MP4 recordings with JPEG posters. Recordings preserve source frame order and frame counts; playback time is not model latency.
- `assets/results.json`: public protocol, task summaries, selected-video provenance, component ablation, and 190 distinct trial records with result SHA256 values.
- `assets/trials.csv`, `comparison.csv`, `state-ablation.csv`: original aggregate exports retained with the page assets.
- `assets/comparison.svg`, `comparison.pdf`: exported comparison figure.
- `method.css`: the model-input diagram and interactive state/action panels.
- `assets/examples/`: reference text, observation, camera images, function call, feedback, and source hashes from T18 State Only seed 0, request 1 and its execution feedback in request 2.

The main comparison has 120 trials: three tasks, four demonstration settings, and ten trials per setting. The state-component study adds 70 trials. Its PRH baseline reuses the ten T18 State Only trials in the main comparison.

The rollout explorer shows the same seed across four settings within each task: T10 seed 7, T18 seed 0, and T19 seed 8. The hero uses the State Only recordings from those seeds. Raw source paths and credentials are excluded from the public data.

The method example has a frame selector for all 25 reference frames and a shared right/left hand selector. Palm position, rotation, and finger joints are grouped in two panels beside the actual `move_eef` targets. The full-precision reference and function-call values are embedded in `project-data`; visible values are formatted for reading and retain their full precision in value attributes and tooltips. The page provides no download links or data-download section. Camera PNGs match the image hashes in the recorded request. The execution feedback records 13 completed control steps. `t18-call-001.json` links these exports to the source request, response, next request, and result hashes.

Serve this repository as static files to preview the project page:

```sh
python3 -m http.server 8000
```

Then open `/projects/doin-it-right/`. The enclosing personal site still uses Jekyll; this project page is self-contained static HTML.

When updating results, keep the tables, chart, embedded `project-data` JSON on both language pages, and retained result exports in sync. Live input always includes task instruction, three RGB views, measured robot state, and execution feedback. "State Only" describes demonstration fields only. META is distinct from No Demo. T10 contact force is diagnostic under the recorded scoring adapter.
