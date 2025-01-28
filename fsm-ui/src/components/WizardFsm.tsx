import { FormEvent, useState } from 'react'
import { Stack, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useFSM } from '../../../fsm/src/useFSM';
import { FSMConfig } from '../../../fsm/src/fsm.model';

type WizardPage = 'GENERAL' | 'APPROVAL' | 'LOCATION';
type WizardInput = 'NEXT' | 'BACK';

const wizardConfig: FSMConfig<WizardPage, WizardInput, null> = {
  initialState: 'GENERAL',
  transitions: {
    'GENERAL': {
      'NEXT': 'APPROVAL',
    },
    'APPROVAL': {
      'NEXT': 'LOCATION',
      'BACK': 'GENERAL'
    },
    'LOCATION': {
      'BACK': 'APPROVAL',
    }
  }
}

export function WizardFsm() {
  const [title, setTitle] = useState('')
  const [approval, setApproval] = useState(true)
  const [approvedByFName, setApprovedByFName] = useState('')
  const [approvedByLName, setApprovedByLName] = useState('')
  const [storageRoom, setStorageRoom] = useState('')
  const { fsm, state } = useFSM(wizardConfig, [], []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(title, approval, approvedByFName)
  }

  return (
    <>
      <h2>Document Wizard</h2>
      <form>
        <Stack className="wizard" direction={'column'}>
          <div className={state === 'GENERAL' ? '' : 'hidden'}>
            <h3>General Info</h3>
            <TextField
              type="text"
              variant='outlined'
              label="Title"
              onChange={e => setTitle(e.target.value)}
              value={title}
              fullWidth
              sx={{ mb: 4 }}
            />
            <FormControlLabel
              label="Needs Approval"
              control={
                <Checkbox
                  checked={approval}
                  onChange={e => setApproval(e.target.checked)}
                />
              }
            />
          </div>
          <div className={state === 'APPROVAL' ? '' : 'hidden'}>
            <h3>Approved by</h3>
            <TextField
              type="text"
              variant='outlined'
              label="First Name"
              onChange={e => setApprovedByFName(e.target.value)}
              value={approvedByFName}
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant='outlined'
              label="Last Name"
              onChange={e => setApprovedByLName(e.target.value)}
              value={approvedByLName}
              fullWidth
              sx={{ mb: 4 }}
            />
          </div>
          <div className={state === 'LOCATION' ? '' : 'hidden'}>
            <h3>Location</h3>
            <TextField
              type="text"
              variant='outlined'
              label="Storage Room"
              onChange={e => setStorageRoom(e.target.value)}
              value={storageRoom}
              fullWidth
              sx={{ mb: 4 }}
            />
          </div>
          <Stack direction={'row'} alignItems={'center'} justifyContent='space-between' gap={10} sx={{ mt: 'auto' }}>
            <Button onClick={() => fsm?.input('BACK')} variant="outlined" color="secondary" disabled={!fsm?.can('BACK')}>Back</Button>
            <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={fsm?.can('NEXT')}>Finish</Button>
            <Button onClick={() => fsm?.input('NEXT')} variant="outlined" color="secondary" disabled={!fsm?.can('NEXT')}>Next</Button>
          </Stack>
        </Stack>
      </form>
    </>
  )
}
