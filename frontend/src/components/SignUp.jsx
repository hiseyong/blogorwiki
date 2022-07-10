import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
export function SignUp() {
    const navigate = useNavigate();
    const send =()=>{
        const client = axios.create();   // axios 기능생성
        const name = value;   
        if (value.username === '') {
          alert('You can not use empty username')
        } else if (value.password === '') {
          alert('You can not use empty password')
        } else {
          client.post('/api/signup' , {name} )   //axios 기능을 통한 post 사용및 name 값 전달.
        .then(res => {
          if (res.data == 'sign up complete') {
            navigate("/");
          } else {
            alert(res.data)
          }
          
        })
        .catch();
        }
      }
    
      const [value, setValue] = useState({
        "username" : "",
        "password" : ""
      });
    
      const onChange = (e) => {
        setValue({
          ...value,
          [e.target.name]: e.target.value,
        });
      };
    return(
        <div>
            <input onChange={onChange} placeholder="type username" name='username'/>
            <input onChange={onChange} placeholder="type password" name='password'/>
            <button onClick={send}>sign up</button>
        </div>
    )
}