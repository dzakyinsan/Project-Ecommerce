const { mysqldb } = require("./../connection");
const {uploader}=require('./../helper/uploader')
const fs = require("fs");

module.exports={
    getProduct:(req,res)=>{
        mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=1`,(err,result)=>{
            if(err) res.status(500).send(err)
           mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=2`,(err,result2)=>{
            if(err) res.status(500).send(err)
           mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=3`,(err,result3)=>{
            if(err) res.status(500).send(err)
            mysqldb.query(`select p.*,g.gambar1,g.gambar2,g.gambar3,g.gambar4 from products p join gambar g on p.id=g.productId`,(err,result4)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({dataTops:result,dataShorts:result2,dataTousers:result3,dataProduct:result4})
            })
           }) 
           })
        })
    }
}