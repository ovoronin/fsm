type FSMGuard<Context> = (context: Partial<Context> | undefined) => boolean;

export interface FSMEvent<State> {
  state: State;
}

export interface FSMEventConfig<State, Context> extends FSMEvent<State> {
  guard?: FSMGuard<Context>;
}

export interface FSMConfig<State extends number | string, Input extends number | string, Context> {
  initialState: State;
  transitions: Partial<Record<State, Partial<Record <Input, FSMEventConfig<State, Context> |
    State | Array<State | FSMEventConfig<State, Context>>>>>>
}
