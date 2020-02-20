const { mysqldb } = require("./../connection");
const { uploader } = require("./../helper/uploader");
const fs = require("fs");

module.exports = {
  getProduct: (req, res) => {
    mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=1`, (err, result) => {
      if (err) res.status(500).send(err);
      mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=2`, (err, result2) => {
        if (err) res.status(500).send(err);
        mysqldb.query(`select p.*,c.category from products p join category c on p.categoryId=c.id where categoryId=3`, (err, result3) => {
          if (err) res.status(500).send(err);
          mysqldb.query(`select p.*,c.category from products p left join category c on p.categoryId=c.id order by c.id`, (err, result4) => {
            if (err) res.status(500).send(err);
            mysqldb.query(`select * from category`, (err, result5) => {
              if (err) res.status(500).send(err);
              res.status(200).send({ dataRunning: result, dataBasketball: result2, dataFootball: result3, dataProduct: result4, dataCategory: result5 });
            });
          });
        });
      });
    });
  },
  postProduct: (req, res) => {
    try {
      const path = "/product/image"; //file save path
      const upload = uploader(path, "PRODUCT").fields([{ name: "image" }]);

      upload(req, res, err => {
        if (err) {
          return res.status(500).json(err);
        }
        // foto telah terupload disini
        console.log("masuk");
        const { image } = req.files; //ini dari formdata yg kita kasih nama "image" karena bentuknya files jadi dipaggilnya req.files.image
        console.log(image);
        const imagePath = image ? path + "/" + image[0].filename : null; //filenamenya dari uploader
        console.log(imagePath);

        console.log(req.body.data);
        const data = JSON.parse(req.body.data);
        console.log(data);
        data.gambar = imagePath; //ngepush image kedalam data
        console.log("data", data);
        var sql = " INSERT INTO products SET ?";
        mysqldb.query(sql, data, (err, results) => {
          if (err) {
            fs.unlinkSync("./public" + imagePath);
            return res.status(500).send(err);
          }
          console.log("results", results);
          mysqldb.query(`select p.*,c.category from products p left join category c on p.categoryId=c.id order by p.id`, (err, result2) => {
            if (err) res.status(500).send(err);
            mysqldb.query(`select * from category`, (err, result3) => {
              if (err) res.status(500).send(err);
              res.status(200).send({ dataProduct: result2, dataCategory: result3 });
            });
          });
        });
      });
    } catch (err) {
      return res.status(500).send({ message: "There's an error on the server. Please contact the administrator." });
    }
  }
};
