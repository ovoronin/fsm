import { FSM } from "../src/fsm";
import { FSMConfig } from "../src/fsm.model";

enum TestStates {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR
}

enum TestInputs {
  FETCH,
  SUCCESS,
  ERROR
}

const config: FSMConfig<TestStates, TestInputs, any> = {
  initialState: TestStates.INITIAL,
  transitions: {
    [TestStates.INITIAL]: {
      [TestInputs.FETCH]: { state: TestStates.LOADING }
    },
    [TestStates.LOADING]: {
      [TestInputs.SUCCESS]: TestStates.SUCCESS,
      [TestInputs.ERROR]: TestStates.ERROR,
    },
  }
}

describe('FSM', () => {
  let fsm: FSM<TestStates, TestInputs, any>;

  beforeEach(() => {
    fsm = new FSM(config)
  })

  it('should initialize', () => {
    expect(fsm).toBeTruthy();
  });

  it('should be in initial state', () => {
    expect(fsm.state).toBe(TestStates.INITIAL);
  });

  it('should react to inputs', () => {
    fsm.input(TestInputs.FETCH);
    expect(fsm.state).toBe(TestStates.LOADING);

    fsm.input(TestInputs.SUCCESS);
    expect(fsm.state).toBe(TestStates.SUCCESS);
  });

  it('should not move to state if no such input in transitions', () => {
    fsm.input(TestInputs.SUCCESS);
    expect(fsm.state).toBe(TestStates.INITIAL);
  });

  it('should emit event when the state was changed', () => {
    const handler = jest.fn();
    fsm.onStateChange(handler);

    fsm.input(TestInputs.FETCH);
    expect(fsm.state).toBe(TestStates.LOADING);

    expect(handler).toHaveBeenCalledWith(TestStates.LOADING, TestStates.INITIAL);
  });

  it('should not emit event if no such input in transitions', () => {
    const handler = jest.fn();
    fsm.onStateChange(handler);

    fsm.input(TestInputs.SUCCESS);
    expect(fsm.state).toBe(TestStates.INITIAL);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should test available inputs', () => {
    expect(fsm.can(TestInputs.FETCH)).toBe(true);
    expect(fsm.can(TestInputs.SUCCESS)).toBe(false);

    fsm.input(TestInputs.FETCH);
    expect(fsm.state).toBe(TestStates.LOADING);
    expect(fsm.can(TestInputs.FETCH)).toBe(false);
    expect(fsm.can(TestInputs.SUCCESS)).toBe(true);
  });

  it('should reset to initial state', () => {
    fsm.input(TestInputs.FETCH);
    expect(fsm.state).toBe(TestStates.LOADING);

    fsm.reset();
    expect(fsm.state).toBe(TestStates.INITIAL);
  });


})