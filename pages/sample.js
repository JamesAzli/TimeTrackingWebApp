import React, {useEffect, useState} from 'react'
import {auth,provider} from '.././firebase.js';
import {signInWithPopup} from 'firebase/auth'; 
import Home from "./Home";

function Sample() {

    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }

    useEffect(() => {
      setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div>
      {value?<Home />:
      <button onClick={handleClick}>Signin with Google</button>
      }
    </div>
  )
}

export default Sample
