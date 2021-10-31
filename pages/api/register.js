// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoConnect from "../../mongo_connection"

export default async function handler(req, res) {
    console.log(req.body)
    let {email,password}=req.body
    
    const client=await mongoConnect()
    //console.log(client)
    const db=client.db('test')
    //console.log(db)

    const user=await db.collection('nextusers').insertOne({email,password})
    console.log(user)

    client.close()

    res.status(200).json({ email, password})
  }
  

