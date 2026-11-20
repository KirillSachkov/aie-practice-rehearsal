# Process Panel

A local web page that shows which of the owner's dev projects are running on this machine and stops forgotten ones, so they do not hold ports.

## Language

**Panel**:
The web page itself: one list of projects with their state and a Stop button.
_Avoid_: Dashboard, monitor, manager

**Project**:
A folder with a `package.json` that the owner lists in the panel's config. The panel tracks only listed projects.
_Avoid_: App, service, site

**Dev process**:
The process a project runs through `npm run dev`, together with its child processes. A project has at most one dev process.
_Avoid_: Server, job, task

**State**:
Whether a project's dev process is `Работает` (running, with a port) or `Остановлен` (not running).
_Avoid_: Status

**Forgotten process**:
A dev process that is running while the owner is no longer working on its project, and holds a port.
_Avoid_: Zombie, orphan

**Stop**:
The owner's action on a project: end its whole dev process and free its port. After a Stop the project's state is `Остановлен`.
_Avoid_: Kill, terminate
