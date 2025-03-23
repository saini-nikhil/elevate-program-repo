
const express =require("express")
const cors = require("cors")
const connection = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const empRoutes = require("./routes/emp.routes")
const  app = express()


app.get("/" ,(req , res) => {
    res.send("api is working")
    
})

const cloudinary = require('cloudinary').v2;




app.use(cors());


cloudinary.config({
  cloud_name: "dk9ppogxr",
  api_key: "987422685628168",
  api_secret: "dbF13MAdzG46eQiGEaUnyrLmeoo"
});
app.use(express.json())
app.use(authRoutes)
app.use(empRoutes)
app.use(cors());
app.listen(3000, async () => {
    try {
        await connection
      } catch (error) {
        console.log("erorr in connecting to database",error);
      }
      console.log('Server is running on port 3000');
})
