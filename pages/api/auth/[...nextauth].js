import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import mongoConnect from '../../../mongo_connection'

export default NextAuth({
    session:{
        jwt:true
    },
    providers:[

        Providers.Credentials({
            name:'credentials',
            authorize:async (credentials)=>{
                    const {email,password}=credentials
                //    console.log(credentials)
                           
                    const client=await mongoConnect()
                    const db=client.db('test')

                    if(credentials.mode==='signup')
                    {
                        console.log(credentials.mode)
                     
                        let user=await db.collection('nextusers').findOne({email})
                        console.log(user)
                        if(user)throw new Error("User already exist") 
                        user=await db.collection('nextusers').insertOne({email,password})
                   //     console.log(user)
                    }
                    else 
                    {
                        console.log(credentials.mode)

                        const user=await db.collection('nextusers').findOne({email,password})
                        if(!user)throw new Error("Incorrect credentials") 
                        console.log(user)
                    }
                  
                    client.close()

                    return {email}
                }
        }),


        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            
          })
    ]
})
    