import { FormEvent, useState } from 'react'
import './App.css'
import { Stack, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'

function App() {
  const steps = 3;
  const [step, setStep] = useState(0);

  const [title, setTitle] = useState('')
  const [approval, setApproval] = useState(true)
  const [approvedByFName, setApprovedByFName] = useState('')
  const [approvedByLName, setApprovedByLName] = useState('')
  const [storageRoom, setStorageRoom] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(title, approval, approvedByFName)
  }

  function move(increment: number) {
    let nextStep = step;
    if (step === 0 && !approval && increment === 1) {
      nextStep = 2;
    } else if (step === 2 && !approval && increment === -1) {
      nextStep = 0;
    } else {
      nextStep = Math.max(Math.min(step + increment, steps - 1), 0);
    }
    setStep(nextStep);
  }

  return (
    <>
      <h2>Document Wizard</h2>
      <form>
        <Stack className="wizard" direction={'column'}>
          <div className={step === 0 ? '' : 'hidden'}>
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
          <div className={step === 1 ? '' : 'hidden'}>
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
          <div className={step === 2 ? '' : 'hidden'}>
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
            <Button onClick={() => move(-1)} variant="outlined" color="secondary" disabled={step === 0}>Back</Button>
            <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={step !== steps - 1}>Finish</Button>
            <Button onClick={() => move(1)} variant="outlined" color="secondary" disabled={step === steps - 1}>Next</Button>
          </Stack>
        </Stack>
      </form>
    </>
  )
}

export default App
