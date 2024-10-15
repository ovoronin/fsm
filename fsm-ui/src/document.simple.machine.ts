import { assign, setup } from 'xstate';

export const documentMachine = setup({
  types: {
    context: {} as { approval: boolean },
    events: {} as
      | {
        type: 'NEXT';
      }
      | {
        type: 'APPROVE';
        approval: boolean;
      }
      | {
        type: 'BACK';
      }
  },
  guards: {
    needsApproval: ({ context }) => context.approval
  }
}).createMachine({
  id: 'document',
  initial: 'GENERAL',
  context: {
    approval: true
  },
  states: {
    GENERAL: {
      on: {
        NEXT: [
          {
            target: 'APPROVAL',
            guard: 'needsApproval'
          },
          'LOCATION'
        ],
        APPROVE: {
          actions: assign({
            approval: ({ event }) => event.approval
          })
        },
      }
    },
    APPROVAL: {
      on: {
        NEXT: 'LOCATION',
        BACK: 'GENERAL',
      }
    },
    LOCATION: {
      on: {
        BACK: [
          {
            target: 'APPROVAL',
            guard: 'needsApproval'
          },
          'GENERAL'
        ]
      }
    }
  },
});
