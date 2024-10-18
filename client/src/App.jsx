import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login'
import Home from './views/Home.jsx'
import DisplayOne from './components/DisplayOne.jsx'
import Form from './components/Form.jsx'
import FormUpdate from './components/FormUpdate.jsx'
import Error from './views/Error.jsx'
import Randomizer from './components/Randomizer.jsx'


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/user/logout' element={<Login/>}/>
      <Route path='/user/create_acc' element={<Registration/>}/>
      <Route path='/games' element={<Home/>}/>
      <Route path='/games/create' element={<Form/>}/>
      <Route path='/games/:id' state={'details'} element={<DisplayOne/>}/>
      <Route path='/games/:id/update' element={<FormUpdate/>}/>
      <Route path='/games/randomizer' element={<Randomizer/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App
