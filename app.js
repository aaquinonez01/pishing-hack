const express = require('express');
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
const sequelize = require('./db.js')
const User = require('./User.js');


const connection = async ()=>{
    await sequelize.sync();
}
const PORT = process.env.PORT || 3000;

app.get("/api/v1/users", async(req, res)=>{
    const users = await User.findAll();
    res.json({
        data:{users}
    })
})

connection().then(()=>{
    console.log("DB Connected")
})

app.post("/api/v1/users", (req, res)=>{
    const {username, password} = req.body;
    console.log(req.body)
    
    res.json({
        data:username
    })

})

app.listen(PORT, ()=>{
    console.log("Server on port "+PORT)
})