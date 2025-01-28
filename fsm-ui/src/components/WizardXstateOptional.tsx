import { FormEvent, useState } from 'react'
import { Stack, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { documentMachine } from './xstate.wizard.optional';
import { useMachine } from '@xstate/react';

export function WizardXstateOptional() {
  const [title, setTitle] = useState('')
  const [approval, setApproval] = useState(true)
  const [published, setPublished] = useState('')
  const [approvedByFName, setApprovedByFName] = useState('')
  const [approvedByLName, setApprovedByLName] = useState('')
  const [storageRoom, setStorageRoom] = useState('')
  const [state, send] = useMachine(documentMachine)

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(title, approval, approvedByFName)
  }

  function handleSetApproval(event: FormEvent) {
    const checked = (event.target as HTMLInputElement).checked;
    setApproval(checked);
    send({ type: 'APPROVE', approval: checked });
  }

  return (
    <>
      <h2>Document Wizard</h2>
      <form>
        <Stack className="wizard" direction={'column'}>
          <div className={state.value === 'GENERAL' ? '' : 'hidden'}>
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
            <Stack>
              <FormControlLabel
                sx={{ mb: 1 }}
                label="Needs Approval"
                control={
                  <Checkbox
                    checked={approval}
                    onChange={handleSetApproval}
                  />
                }
              />
              <Button onClick={() => send({ type: 'OPTIONAL' })} variant="outlined" color="secondary" disabled={!state.can({ type: 'OPTIONAL' })}>Edit optional data</Button>
            </Stack>

          </div>
          <div className={state.value === 'OPTIONAL' ? '' : 'hidden'}>
            <h3>Optional Data</h3>
            <TextField
              type="text"
              variant='outlined'
              label="Published by"
              onChange={e => setPublished(e.target.value)}
              value={published}
              fullWidth
              sx={{ mb: 4 }}
            />
          </div>
          <div className={state.value === 'APPROVAL' ? '' : 'hidden'}>
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
          <div className={state.value === 'LOCATION' ? '' : 'hidden'}>
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
            <Button onClick={() => send({ type: 'BACK' })} variant="outlined" color="secondary" disabled={!state.can({ type: 'BACK' })}>Back</Button>
            <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={state.can({ type: 'NEXT' })}>Finish</Button>
            <Button onClick={() => send({ type: 'NEXT' })} variant="outlined" color="secondary" disabled={!state.can({ type: 'NEXT' })}>Next</Button>
          </Stack>
        </Stack>
      </form>
    </>
  )
}
