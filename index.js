

import  express, { query } from 'express';
import  request  from 'express';
import response  from 'express';
import dotenv from 'dotenv';
//import {express } from 'express';
const app=express();
import { MongoClient } from 'mongodb';

process.env.PORT;
app.use(express.json());
dotenv.config();
/*const user=[
    {
      "name": "Martha Abernathy",
      "email": "Vincenzo.Grimes67@yahoo.com",
      "id": "1",
      "age":"45",
      "color":"red"

    },
    {
      "name": "Guillermo Mueller",
      "email": "Hilma_Trantow60@yahoo.com",
      "id": "2",
      "age":"50",
      "color":"yellow"
    },
    {
      "name": "Elisa Leuschke",
      "email": "Saige90@yahoo.com",
      "id": "3",
      "age":"76",
      "color":"yellow"

    },
    {
      "name": "Ginger Buckridge",
      "email": "Reese_Gusikowski6@yahoo.com",
      "id": "4",
      "age":"18",
      "color":"teal"
    },
    {
      "name": "Daniel Von",
      "email": "Nathanial_Douglas@yahoo.com",
      "id": "5",
      "age":"26",
      "color":"blue"
    },
    {
      "name": "Dr. Julia Kemmer",
      "email": "Kassandra15@yahoo.com",
      "id": "6",
      "age":"16",
      "color":"yellow"
    },
    {
      "name": "Kerry Kreiger",
      "email": "Merl50@gmail.com",
      "id": "7",
      "age":"15",
      "color":"teal"
    },
    {
      "name": "Kayla Altenwerth",
      "email": "Natasha39@yahoo.com",
      "id": "8",
      "age":"17",
      "color":"red"
    },
    {
      "name": "Joshua DuBuque",
      "email": "Carlee.Howell94@gmail.com",
      "id": "9",
      "age":"46",
      "color":"blue"
    },
    {
      "name": "Gilberto Graham",
      "email": "Katelyn.Bruen95@yahoo.com",
      "id": "10",
      "age":"14",
      "color":"skyblue"
    },
    {
      "name": "Rocking Yashu",
      "email": "Rocking@yashu",
      "id": "12",
      "age":"12",
      "color":"teal"
    },
    {
      "name": "Jeevitha Gayakwad",
      "email": "Jeevitha@Gayakwad",
      "id": "13",
      "age":"89",
      "color":"skyblue"
    }
  ];*/

  async function createConnection(){
   // const MONGO_URL="mongodb://localhost/wipro_data";
   //const MONGO_URL="mongodb+srv://Malatesh:Malatesh123@cluster0.asaxd.mongodb.net/wipro_data";
    const MONGO_URL=process.env.MONGO_URL; 
    const client=new MongoClient(MONGO_URL);
    //const insert=client.db("wipro_data").collection("emoplee").insertMany([user]);
    await client.connect();
    console.log(" Mongodb is Sucessfully Connected !!! ");
    return client;
   // const user=await client.db("wipro_data").collection("emoplee").findOne({id:"5"});
    //console.log(user);
  }

  createConnection();

app.get("/",(request,response)=>{
    response.send("Hello Yashu Good Moring!!!");
});

app.get("/wipro_data/:id", async (request,response)=>{
  const {id}=request.params;
  console.log(request.params);
  const client=await createConnection();
  const data=await client.db("wipro_data").collection("emoplee").findOne({id:id});
  console.log(data);
  response.send(data);
   // response.send(user.filter((user1)=>user1.id==id));

});

app.get("/wipro_data",async(request,response)=>{
  //const {color,age}=request.query;
  //console.log(request,query);
  const client=await createConnection();
  const data=await client.db("wipro_data").collection("emoplee").find({}).toArray();
  console.log(data);
  response.send(data);
})


app.post("/wipro_data",async (request,response)=>{
  const client= await createConnection();
  console.log(request.body);
  const adduserdata=request.body;
  const data = await client.db("wipro_data").collection("emoplee").insertMany(adduserdata);
  console.log(adduserdata,data);
  response.send(data)
  
});


app.delete("/wipro_data/:id",async (request,response)=>{
  const {id}=request.params;
  console.log(request.params);
  const client=await createConnection();
  const deletedata=await client.db("wipro_data").collection("emoplee").deleteOne({id:id});
  console.log(deletedata);
  response.send(deletedata);
})

app.patch("/wipro_data/:id",async(request,response)=>{
  const{id}=request.params;
  console.log(request.params);
  const client= await createConnection();
  const updatedata=request.body;
  const data=await client.db("wipro_data").collection("emoplee").updateOne({id:id},{$set:updatedata});
  console.log(updatedata,data);
  response.send(data)
})












/*app.get("/user",(request,response)=>{
    const {color,age}=request.query;
    console.log(request.query);

    if(!age && !color){
      response.send(user);
    }else if(age && !color){
      response.send(user.filter((user)=>user.age >= age));
    }else if(!age && color){
      response.send(user.filter((user)=>user.color==color));
    }else{
      response.send(user.filter((user)=>user.age >= age && user.color==color));
    }
    

})*/

app.listen(PORT,()=>console.log("Server is Startd in :",PORT));
