import axios from 'axios';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
export function SignIn(props) {
  const navigate = useNavigate();
    const send =()=>{
        const client = axios.create();   // axios 기능생성
        const name = value;   
        client.post('/api/signin' , {name} )   //axios 기능을 통한 post 사용및 name 값 전달.
        .then(res => {
          if (res.data !== 'password is wrong') {
            if (res.data !== 'there is no user') {
              props.getName(res.data.username);
              props.getClass(res.data.class);
              navigate("/");
            }else {
              alert(res.data)
            }
          } else {
            alert(res.data)
          }
        })
        .catch();
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
            <button onClick={send}>sign in</button>
        </div>
    )
}