import { useEffect, useState, useContext, createContext,useRef } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import {signIn} from 'next-auth/client'


export default function Register(props) {

    const [[email,setEmail],[password,setPassword]]=[useState(null),useState(null)]

    const inputEmailref=useRef(null)
    const inputPasswordref=useRef(null)
    const router=useRouter()
    
    const submit=async ()=>{
   /* fetch('/api/register',{method:'POST',body:JSON.stringify({email:inputEmailref.current.value,password:inputPasswordref.current.value}),                 
                                headers:{'content-type':'application/json'}
    })
        .then(res=>res.json()).then(res=>{ setEmail(res.email); setPassword(res.password); }).catch(err=>console.log(err))
    */
        const [enteredEmail,enteredPassword]=[inputEmailref.current.value,inputPasswordref.current.value]

        const result=await signIn('credentials',{redirect:false,mode:'signup',email:enteredEmail,password:enteredPassword})       
        console.log(result)
        if(!result.error)router.replace('/')
    }

    return  <div className={styles.container}>
        <Header />
                <div>
                    Email <input type='email' ref={inputEmailref}/><br /><br />
                    Password <input type='password' ref={inputPasswordref}/><br /><br />
                    <button onClick={submit}>Register</button>
                </div>
        {email?<div> Email: {email} and password: {password}</div>:null}
      </div>  


  }