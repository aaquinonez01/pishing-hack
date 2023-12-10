const express = require('express');
const cors = require("cors")
const app = express()
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

app.post("/api/v1/users", async(req, res)=>{
    const {username, password} = req.body;
    console.log(req.body)
    const user = await User.create({
        username, password
    })
    res.json({
        data:user
    })

})

app.listen(PORT, ()=>{
    console.log("Server on port "+PORT)
})