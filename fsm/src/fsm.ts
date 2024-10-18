import { FSMConfig, FSMEvent } from "./fsm.model";

type StateChangeHandler<State> = (current: State, prev: State) => void;

export class FSM<State extends number | string, Input extends number | string, Context> {
  // Current state
  private _state!: State;
  // State chagne handler callback function
  private onStateChangeHandler?: StateChangeHandler<State>;
  // Guard context
  private context: Partial<Context> | undefined;

  // We can only get the current state
  public get state() {
    return this._state;
  }
  // We cannot set the current state from outside
  private set state(nextState: State) {
    this._state = nextState;
  }

  constructor(private readonly config: FSMConfig<State, Input, Context>) {
    this.reset();
  }

  // Reset the machine to the initial state
  public reset() {
    this.state = this.config.initialState;
    this.context = undefined;
  }

  public setContext(context: Partial<Context>) {
    this.context = context;
  }

  // Set the onStateChange handler
  public onStateChange(handler: StateChangeHandler<State>) {
    this.onStateChangeHandler = handler;
  }

  // Calculate the next state and output given the input inp
  // returns undefined if it isn't possible
  private nextEvent(inp: Input): FSMEvent<State> | undefined {
    const transitionsFromCurrentState = this.config.transitions[this.state];
    if (!transitionsFromCurrentState) {
      // No transitions from this state
      return;
    }

    let nextState: State | undefined;
    // Transitions that fit the input
    let next = transitionsFromCurrentState[inp];

    if (Array.isArray(next)) {
      // Array of transitions, find the one that fits the guard function if any
      next = next.find(ev => (typeof ev === 'object' && ev.guard) ? ev.guard(this.context) : true);
    }

    // Calculate the next state and output
    if (typeof next === 'object') {
      nextState = next.state;
    } else {
      nextState = next as State;
    }

    if (next && this.state !== nextState) {
      // Return the next state and output if the state changes
      return {
        state: nextState
      }
    }
  }

  // React to the input
  // Returns false if there is no next state available
  public input(inp: Input): boolean {
    const nextEvent = this.nextEvent(inp);

    if (nextEvent) {
      const prevState = this.state;
      this.state = nextEvent.state;

      if (this.onStateChangeHandler) {
        this.onStateChangeHandler(this.state, prevState);
      }
      return true;
    }

    return false;
  }

  // Returns true if it is possible to change current state according to the input
  public can(inp: Input): boolean {
    return !!this.nextEvent(inp);
  }
}