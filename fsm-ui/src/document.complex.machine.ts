import { assign, setup } from 'xstate';

export const documentMachine = setup({
  types: {
    context: {} as { approval: boolean, paper: boolean },
    events: {} as
      | {
        type: 'NEXT';
      }
      | {
        type: 'APPROVE';
        approval: boolean;
      }
      | {
        type: 'PAPER';
        paper: boolean;
      }
      | {
        type: 'OPTIONAL';
      }
      | {
        type: 'CLOSE';
      }
      | {
        type: 'BACK';
      }
  },
  guards: {
    eDocument: ({ context }) => !context.paper,
    needsApproval: ({ context }) => context.approval,
  }
}).createMachine({
  id: 'document',
  initial: 'GENERAL',
  context: {
    approval: true,
    paper: true,
  },
  states: {
    GENERAL: {
      on: {
        NEXT: [
          {
            target: 'APPROVAL',
            guard: 'needsApproval'
          },
          {
            target: 'UPLOAD',
            guard: 'eDocument'
          },
          'LOCATION'
        ],
        OPTIONAL: 'OPTIONAL',
        APPROVE: {
          actions: assign({
            approval: ({ event }) => event.approval
          })
        },
        PAPER: {
          actions: assign({
            paper: ({ event }) => event.paper
          })
        },
      }
    },
    OPTIONAL: {
      on: {
        BACK: 'GENERAL',
        NEXT: 'GENERAL',
      }
    },
    APPROVAL: {
      on: {
        NEXT: [
          {
            target: 'UPLOAD',
            guard: 'eDocument'
          },
          'LOCATION',
        ],
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
    },
    UPLOAD: {
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
