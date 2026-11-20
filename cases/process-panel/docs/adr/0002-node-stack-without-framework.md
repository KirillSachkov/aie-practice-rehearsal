# The panel is a Node.js app on the built-in `http` module, with a plain HTML page

The panel runs on Node.js (the owner's dev projects are Node too, so Node is already installed and the owner reads the code). It uses only the built-in `http` module and one HTML page with a little JavaScript: no framework, no build step, no dependencies to install or update. The panel finds running projects with `lsof` (listening ports and working folders) and stops one by sending SIGTERM to its process group. This works on macOS and Linux, not on Windows.

## Considered options

- **Python with FastAPI.** Good for process tools (psutil), but adds a second runtime and dependencies for a page with one list and one button. Rejected.
- **Go, one binary.** Easy to ship, but the owner does not read Go yet, and the panel is not meant to be shipped. Rejected.
- **Electron or Tauri window.** A native window adds nothing: a page in the browser is enough, and a window would add a build step. Rejected.
- **Node.js with Express.** One dependency for two routes. Rejected for now; easy to add if routing grows.

## Consequences

- Windows is not supported in version 1.
- If `lsof` output proves unreliable, detection is the part to revisit, not the stack.
