import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Navgar from './components/Navgar'
import  {background} from './img/welcomepage.js'
const App = ()=>{
   return(
        <div style={{ backgroundImage:`url(${background})`,
                     width: '100vw', height: '100vh'}}>
              <Navgar />
           </div>
    )
}
export default App
