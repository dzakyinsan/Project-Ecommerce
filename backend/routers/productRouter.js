const express=require('express')
const {productControllers}= require('../controllers')

const router=express.Router()

router.get('/getproduct',productControllers.getProduct)


module.exports=router