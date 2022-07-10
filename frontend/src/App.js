import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Nav } from './components/Nav';
import { Document } from './components/Document';
import './style/App.css'
import { NotFound } from './components/404';
//import {useMediaQuery} from 'react-responsive'

const App=()=>{
  const [loginedName,setLoginedName] = useState('please log in')
  const [loginedClass,setLoginedClass] = useState()
  function getLoginedName(props){
    setLoginedName(props);
    console.log(props)
  }
  function getLoginedClass(props){
    setLoginedClass(props);
    console.log(props)
  }
  

  return (
    <span className='outest'>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Main name={loginedName} class={loginedClass}/>} exact={true}/>
          <Route path='signin' element={<SignIn getName={getLoginedName} getClass={getLoginedClass}/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='/document/*' element={<Document author={loginedName} class={loginedClass}/>}/>
          <Route path='*' element={<NotFound/>}/> 
        </Routes>
      </BrowserRouter>
    </span>
  );
}

export default App;