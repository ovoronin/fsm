import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Menu } from './components/Menu'
import { WizardOld } from './components/WizardOld'
import { WizardOldSkip } from './components/WizardOldSkip'
import { WizardFsm } from './components/WizardFsm'
import { WizardFsmSkip } from './components/WizardFsmSkip'
import { WizardFsmSkipGuards } from './components/WizardFsmSkipGuards'
import { WizardXstate } from './components/WizardXstate'
import { WizardXstateOptional } from './components/WizardXstateOptional'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Menu></Menu>}></Route>
        <Route path="/old" element={<WizardOld></WizardOld>}></Route>
        <Route path="/old-skip" element={<WizardOldSkip></WizardOldSkip>}></Route>
        <Route path="/fsm" element={<WizardFsm></WizardFsm>}></Route>
        <Route path="/fsm-skip" element={<WizardFsmSkip></WizardFsmSkip>}></Route>
        <Route path="/fsm-skip-guard" element={<WizardFsmSkipGuards></WizardFsmSkipGuards>}></Route>
        <Route path="/xstate" element={<WizardXstate></WizardXstate>}></Route>
        <Route path="/xstate-optional" element={<WizardXstateOptional></WizardXstateOptional>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
