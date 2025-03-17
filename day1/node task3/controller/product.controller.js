// const productModel = require("../models/product.model")



// const getProduct = async (req , res) => {
//     try {
//         const product = await productModel.find({
//             createdBy: req.user.id
//         })
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: "geting product  error" });
    
//     }
// }


// const createProduct = async (req , res) => {
//     try{
//         const {productname , detail ,price} = req.body
//       const product = new productModel( {productname , detail ,price})
//       await product.save()
//       res.status(200).json(product)

//     }
//     catch (error) {
//         res.status(500).json({ message: "posting product  error" });
    
//     }
// }


// module.exports = {getProduct ,createProduct }