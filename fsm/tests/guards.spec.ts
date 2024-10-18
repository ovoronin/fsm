import { FSM } from "../src/fsm";
import { FSMConfig } from "../src/fsm.model";

type TestStates = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH';
type TestInputs = 'NEXT' | 'BACK';
interface TestContext {
  flag: boolean;
}

let skip: boolean;
const guard = (context: Partial<TestContext> | undefined): boolean => {
  return !!context?.flag;
}

const config: FSMConfig<TestStates, TestInputs, TestContext> = {
  initialState: 'FIRST',
  transitions: {
    FIRST: {
      NEXT: [
        { state: 'THIRD', guard: () => skip },
        'SECOND'
      ]
    },
    SECOND: {
      NEXT: 'THIRD',
      BACK: 'FIRST',
    },
    THIRD: {
      BACK: [
        { state: 'FIRST', guard: () => skip },
        'SECOND',
      ],
      NEXT: 'FOURTH',
    },
    FOURTH: {
      BACK: [
        { state: 'THIRD', guard },
        'SECOND',
      ],
    }
  }
}

describe('FSM guards', () => {
  let fsm: FSM<TestStates, TestInputs, any>;

  beforeEach(() => {
    skip = false;
    fsm = new FSM(config)
  })

  it('should react to inputs', () => {
    fsm.input('NEXT');
    expect(fsm.state).toBe('SECOND');

    fsm.input('BACK');
    expect(fsm.state).toBe('FIRST');
  });

  it('should respect guards', () => {
    fsm.input('NEXT');
    expect(fsm.state).toBe('SECOND');

    fsm.input('BACK');
    expect(fsm.state).toBe('FIRST');

    // set skip guard
    skip = true;

    fsm.input('NEXT');
    expect(fsm.state).toBe('THIRD');

    fsm.input('BACK');
    expect(fsm.state).toBe('FIRST');
  });

  it('should test available with guards', () => {
    expect(fsm.can('NEXT')).toBe(true);

    fsm.input('NEXT');
    fsm.input('NEXT');

    expect(fsm.can('NEXT')).toBe(true);

    skip = true;
    fsm.input('BACK');

    expect(fsm.can('BACK')).toBe(false);
  });

  it('should run guards in the context', () => {
    const goFourth = () => {
      fsm.input('NEXT');
      fsm.input('NEXT');
      fsm.input('NEXT');
      fsm.input('NEXT');

      expect(fsm.state).toBe('FOURTH');
      expect(fsm.can('NEXT')).toBe(false);
    }

    goFourth();
    fsm.input('BACK');
    expect(fsm.state).toBe('SECOND');

    fsm.reset();
    goFourth();
    fsm.setContext({ flag: false });
    fsm.input('BACK');
    expect(fsm.state).toBe('SECOND');

    fsm.reset();
    goFourth();
    fsm.setContext({ flag: true });
    fsm.input('BACK');
    expect(fsm.state).toBe('THIRD');

  });

})