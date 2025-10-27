import { MongoClient, ServerApiVersion } from 'mongodb';
 let client

export default function dbConnect(collectionName) {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
  if(!client)
  {
    client = new MongoClient(uri, {
   maxPoolSize: 30,
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});
}

      return client.db(process.env.DB_NAME).collection(collectionName)
}