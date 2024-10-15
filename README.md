# Demo repo for the Finite State Machines report

* `fsm/` folder - my own simple implementation of FSM + React hook
* `fsm-ui` folder - React app for testing different approaches of implementing a Wizard. To run, first copy one of the `src/App.*.tsx` files to `src/App.tsx` and run `npm run dev`
  - `App.old.tsx` - a simple wizard without FSMs
  - `App.old.skip.tsx` - a simple wizard without FSMs, skipping the second page is implemented
  - `App.fsm.noskip.tsx` - a simple wizard implemented with my own FSM
  - `App.fsm.skip.tsx` - a simple wizard implemented with my own FSM, skipping the second page without guards
  - `App.fsm.skip.guards.tsx` - a simple wizard implemented with my own FSM, skipping the second page with guards
  - `App.xstate.tsx` - a simple wizard implemented with XState, skipping the second page with guards
  - `App.xstate.complicated.tsx` - more complex wizard implemented with XState

