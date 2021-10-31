// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoConnect from "../../mongo_connection"

export default async function handler(req, res) {
    console.log(req.body)
    let {email,password}=req.body
    
    const client=await mongoConnect()
    const db=client.db('test')

    const user=await db.collection('nextusers').findOne({email,password})
    
    if(!user)res.status(404).json({err:"Incorrect credentials"}) 
    else res.status(200).json({ email, password})  

    console.log(user)

    client.close()

}
