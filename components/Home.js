import styles from '../styles/Home.module.css'
import { useEffect, useState, useContext, createContext,useRef,createElement } from 'react'
import Header from '../components/Header'
import {getSession} from 'next-auth/client'


export const context=createContext(null)

export function Providerctx(props){
  const [name,setName]=useState(null)
  const setNamehandler=function(Name){setName(Name)}

  return <context.Provider value={{name,setName:setNamehandler}}>
            {props.children}
      </context.Provider>
}

export default function Home(props) {
    const {name,setName}=useContext(context)
    useEffect(()=>{ setName(props.name) 
      getSession().then(session=>{ if(session){setName(session.user.email.substring(0,session.user.email.indexOf('@')))} }).catch(err=>console.log(err))

    },[])
    
    const HocHoverCounter=HOC(HoverCounter,'Hover')
    const HocClickCounter=HOC(ClickCounter,'Click')
    

    const inputRef=useRef(null)

    return  <>
              <Header />
              <div className={styles.container}>
                <h5 class="text-primary p-md-5">This is home page of {name}</h5>
                <div>
                  <input type='text' ref={inputRef} />
                  <button onClick={ ()=>setName(inputRef.current.value)  } >Change name</button>
                </div>

                <div className={styles.flex}>
                  
                  
                  <div className={styles.flexItems}><Renderer render={(counter,setCounter)=><HoverCounter {...{counter,setCounter}}/>} /></div>
                  <div  className={styles.flexItems}> <Renderer render={(counter,setCounter)=><ClickCounter {...{counter,setCounter}}/>} /></div>
              
                  <div  className={styles.flexItems}> <HocHoverCounter /></div>
                  <div  className={styles.flexItems}><HocClickCounter/></div>

                </div >
              </div>
            </>  
  }
  
 
  function Renderer({render}){
    const [counter,setCounter]=useState(0)
    
    return <div>
            {render(counter,setCounter)}
           </div>
  }

  
  function HoverCounter({counter,setCounter}){
    
    return <div>
             <p>{counter}</p>
             <button onMouseEnter={()=>setCounter(counter=>counter+1)}>Hover</button>
           </div>
  }

  
   function ClickCounter({counter,setCounter}){
    
    return <div>
             <p>{counter}</p>
             <button onClick={()=>setCounter(counter=>counter+1)}>Click</button>
           </div>
  }

  function HOC(Component,name){
    return function() {
      const [counter,setCounter]=useState(0)
     
     return  <div>
                  {(name==='Click')?<p>It's a click counter</p>:<p>It's a hover counter</p>}
                  <Component {...{counter,setCounter}}/>
               </div>
    }
  }
