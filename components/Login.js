import { useEffect, useState, useContext, createContext,useRef } from 'react'
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Login() {

    const [[email,setEmail],[password,setPassword]]=[useState(null),useState(null)]
    const router=useRouter()
    const inputEmailref=useRef(null)
    const inputPasswordref=useRef(null)
    async function submit(evt){
        evt.preventDefault()
   /*     fetch('/api/login',
                {
                 method:'POST',
                 body:JSON.stringify({email:inputEmailref.current.value,password:inputPasswordref.current.value}),
                 headers:{'content-type':'application/json'}
                }   
        )
        .then(res=>res.json())
        .then(res=>{console.log(res); setEmail(res.email); setPassword(res.password); })
        .catch(err=>console.log(err))
*/
        const [enteredEmail,enteredPassword]=[inputEmailref.current.value,inputPasswordref.current.value]

        const result=await signIn('credentials',{redirect:false,mode:'signin',email:enteredEmail,password:enteredPassword})       
        console.log(result)
        
        if(!result.error)
            router.replace('/')
        
    }

    return  <div className={styles.container}>
                <Header />
                <br /> <br /> 
                <div>
                    <form onSubmit={submit} method='post'>
                        Email <input type='email' ref={inputEmailref}/><br /><br />
                        Password <input type='password' ref={inputPasswordref}/><br /><br />
                        <input type='submit' name='Login'/>
                    </form>
                </div>
                {(email)?<div>Entered email: {email} and password: {password}</div>:null}
         </div>  
  }