import { FSM } from "./fsm";
import { FSMConfig } from "./fsm.model";
import { useEffect, useState } from 'react';

export function useFSM<State extends string | number, Input extends string | number, Context>
  (config: FSMConfig<State, Input, Context>, contextKeys: Array<keyof Context>, deps: Array<any>) {

  const [fsm, setFsm] = useState<FSM<State, Input, Context>>();
  const [state, setState] = useState<State>(config.initialState);

  const setContext = (machine?: FSM<State, Input, Context>) => {
    const context: Partial<Context> = {};

    contextKeys.forEach((key, index) => context[key] = deps[index]);
    machine?.setContext(context);
  }

  useEffect(() => {
    const machine = new FSM<State, Input, Context>(config);
    machine.onStateChange((current) => setState(current));
    setContext(machine);
    setFsm(machine);
  }, []);

  useEffect(() => {
    setContext(fsm);
  }, deps)

  return {
    fsm,
    state
  };
}
