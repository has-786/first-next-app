import { MongoClient } from "mongodb"

export default async function mongoConnect(){
    const client=await MongoClient.connect('mongodb://localhost')
    return client
}