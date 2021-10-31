import Login, { context } from '../components/Login'
import { Fragment } from 'react'
import { getSession } from 'next-auth/client'

export default function Loginpage(props) {

  return    <Fragment>
                <Login />
            </Fragment>
}

export async function getServerSideProps(context){

    const req=context.req
    const session=await getSession({req})
   // console.log(session)
    if(session)
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }

    return {props:{
        session
    }}
}