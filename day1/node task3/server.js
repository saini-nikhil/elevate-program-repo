const express = require("express")
const connection = require("./db")
const authRoutes = require("./routes/user.routes")
const productroutes = require("./routes/product.model")



const app = express()


app.use(express.json())
app.use(authRoutes)
// app.use(productroutes)
app.get("/healthy" , (resq, res) => {
    res.send("api is working ")
})


app.listen(3000, async () => {
    try {
      await connection
    } catch (error) {
      console.log("erorr in connecting to database",error);
    }
    console.log('Server is running on port 3000');
  })
   