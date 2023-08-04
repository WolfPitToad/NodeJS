 const express = require('express')
// const PORT = process.env.PORT || 1111;
// const app= express()
// app.use(express.json())

// app.listen(PORT,()=>{
// console.log("Servidor en puerto:",PORT)
// })

// app.get("/status",(request,response) => {
//   const status={
//     "Status": "Running, felicidades primer API REST"
//   }
//   response.send(status)
// })

const {Client}=require('pg')

const connectionData={
  user: 'Andrés',
  host:'test.com',
  database:'prueba',
  password: 'test',
  port:'5432',
}

const client= new Client(connectionData)
console.log(client)
client.connect()
client.query('SELECT * FROM table')
  .then(response => {
    console.log(response.rows)
    client.end()
  })
  .catch(err=>{
    client.end()
  })