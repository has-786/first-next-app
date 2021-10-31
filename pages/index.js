import Home, { context } from '../components/Home'
import { Fragment, useContext, useEffect } from 'react'

export default function Homepage(props) {
  const {setName}=useContext(context)
  useEffect( ()=>{
    setName(props.name)
  
  },[])
  return    <Fragment>
              <Home />
            </Fragment>
}

export async function getServerSideProps(context){

  let {name}=await fetch('http://localhost:3000/api/hello').then(res=>res.json())

  const requestData={query:
                      `  
                      fragment fields on Event {
                        title
                        description
                        date
                      }
                   
                      query{
                          first:events(id:0){
                            ...fields
                          }
                          second:events(id:1){
                            ...fields
                          }
                        }
                          `
                        }

  
  let events=await fetch('http://localhost:5000/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(requestData)}).then(res=>res.json())
  console.log(events)
  console.log(events.data)
  

  return {
     props:{
       name,
       events:events.data
     }
  }
}
/*
   fragment fields on Event {
                          title
                          description
                          date
                        }
                     
                        query{
                            first:events(id:0){
                              ...fields
                            }
                            second:events(id:1){
                              ...fields
                            }
                          }
                    
                          mutation{
                          createEvent(eventInput:{title:"Ladies Majlis",description:"Tabut Bibi Sakina at my home",date:"${Date().toString()}",price:0})
                          {
                            title
                            description
                            date
                            price
                          }
                        }
*/