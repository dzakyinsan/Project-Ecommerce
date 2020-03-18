const { mysqldb } = require("./../connection");
const { uploader } = require("./../helper/uploader");
const fs = require("fs");

module.exports = {
  // ========================================================= GET ============================================
  getHotItems: (req, res) => {
    mysqldb.query(`select * from products where categoryId=1 limit 6`, (err, result) => {
      if (err) res.status(500).send(err);
      mysqldb.query(`select * from products where categoryId=2 limit 6`, (err, result2) => {
        if (err) res.status(500).send(err);
        mysqldb.query(`select * from products where categoryId=3 limit 6`, (err, result3) => {
          if (err) res.send(500).send(err);
          res.status(200).send({ football: result3, basketball: result2, running: result });
        });
      });
    });
  },
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
              mysqldb.query(`select * from products order by categoryId`, (err, result6) => {
                //select p.* from products p left join category c on p.categoryId=c.id order by c.id
                if (err) res.status(500).send(err);
                res.status(200).send({ dataRunning: result, dataBasketball: result2, dataFootball: result3, dataProduct: result4, dataCategory: result5, ForDataEdit: result6 });
              });
            });
          });
        });
      });
    });
  },
  getDetail: (req, res) => {
    const detailId = req.params.id;
    mysqldb.query(
      `select p.*,c.category,s.size40,s.size41,s.size42,s.size43,s.size44,s.size45 from products p 
    left join category c on p.categoryId=c.id 
    left join size s on s.productId =p.id 
    where categoryId=3 AND p.id=${detailId}`,
      (err, result) => {
        if (err) res.status(500).send(err);
        mysqldb.query(
          `select p.*,c.category,s.size40,s.size41,s.size42,s.size43,s.size44,s.size45 from products p 
      left join category c on p.categoryId=c.id 
      left join size s on s.productId =p.id 
      where categoryId=2 AND p.id=${detailId}`,
          (err, result2) => {
            if (err) res.status(500).send(err);
            mysqldb.query(
              `select p.*,c.category,s.size40,s.size41,s.size42,s.size43,s.size44,s.size45 from products p 
        left join category c on p.categoryId=c.id 
        left join size s on s.productId =p.id 
        where categoryId=1 AND p.id=${detailId}`,
              (err, result3) => {
                if (err) res.status(500).send(err);
                res.status(200).send({ dataDetailFootball: result[0], dataDetailBasketball: result2[0], dataDetailRunning: result3[0] });
              }
            );
          }
        );
      }
    );
  },
  getCart: (req, res) => {
    const IdUserRedux = req.params.id;
    var sql = `select tr.*,p.namaProduk,p.gambar from transaction as tr left join products p on tr.productId=p.id where tr.userId=${IdUserRedux} and tr.status='cart'`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ dataCart: result });
    });
  },
  getCheckout: (req, res) => {
    const IdUserRedux = req.params.id;
    var sql = `select tr.*,p.namaProduk,p.gambar from transaction as tr left join products p on tr.productId=p.id where tr.userId=${IdUserRedux} and tr.status='checkout'`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ dataCheckout: result });
    });
  },
  // =========================================================== POST ================================================
  postProduct: (req, res) => {
    try {
      const path = "/product/image"; //file save path
      const upload = uploader(path, "PRODUCT").fields([{ name: "image" }]);

      upload(req, res, err => {
        if (err) {
          return res.status(500).send(err);
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
          var sql = `select p.*,c.category from products p left join category c on p.categoryId=c.id order by c.id`;
          mysqldb.query(sql, (err, result2) => {
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
  },
  postTransaction: (req, res) => {
    console.log("post transaction", req.body.dataAddtoCart);
    var data = req.body.dataAddtoCart;
    var sql = "INSERT INTO transaction SET ?";
    mysqldb.query(sql, data, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(result);
      var sql = "select * from transaction";
      mysqldb.query(sql, (err, result2) => {
        if (err) res.status(500).send(err);
        res.status(200).send({ dataCart: result2 });
      });
    });
  },
  postCheckout: (req, res) => {
    console.log("masuk backend");
    const { nama, alamat, provinsi, kota, telepon, shipping, payment } = req.body.PostCheckout;
    // console.log("nama.length", nama.length);
    console.log("typeof nama", typeof nama);

    if (nama === undefined || alamat === undefined || provinsi === undefined || kota === undefined || telepon === undefined) {
      console.log("masuk backend if");

      res.status(200).send({ validation: false, message: "Biling Details dengan tanda (*) Wajib diisi" });
    } else if (shipping === undefined || payment === undefined) {
      console.log("masuk backend else if");

      res.status(200).send({ validation: false, message: "Shipping dan payment wajib diisi" });
    } else {
      var data = req.body.PostCheckout;
      data.tanggal = new Date();
      var sql = "INSERT INTO transaction_address SET ?";
      console.log("masuk backend else");

      mysqldb.query(sql, data, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(result);
        var sql = "select * from transaction_address";
        mysqldb.query(sql, (err, result2) => {
          if (err) res.status(500).send(err);
          res.status(200).send({ dataCheckout: result2 });
        });
      });
    }
  },
  // ============================================================== PUT / EDIT ========================================
  editProduct: (req, res) => {
    const productId = req.params.id; // id ini sesuai dengan parameter yg ada di productRouter
    var sql = `SELECT * from products where id=${productId};`;
    mysqldb.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.length) {
        const path = "/product/image";
        const upload = uploader(path, "PRODUCT").fields([{ name: "image" }]);
        upload(req, res, err => {
          if (err) {
            return res.status(500).send(err);
          }
          const { image } = req.files;
          const imagePath = image ? path + "/" + image[0].filename : null;
          const data = JSON.parse(req.body.data);
          // console.log("cek img", image);
          console.log("cek data", data);

          try {
            if (imagePath) {
              data.gambar = imagePath;
            }
            sql = `Update products set ? where id =${productId};`;
            mysqldb.query(sql, data, (err1, result1) => {
              console.log("result1 edit gambar", result1);
              if (err1) {
                console.log("isi data", data);

                if (imagePath) {
                  fs.unlinkSync("./public" + imagePath);
                }
                return res.status(500).send(err);
              }
              if (imagePath) {
                //hapus foto lama
                if (result[0].gambar) {
                  fs.unlinkSync("./public" + result[0].gambar);
                }
              }
              var sql = `select p.*,c.category from products p left join category c on p.categoryId=c.id order by c.id`;
              mysqldb.query(sql, (err, result2) => {
                if (err) res.status(500).send(err);
                mysqldb.query(`select * from category`, (err, result3) => {
                  if (err) res.status(500).send(err);
                  res.status(200).send({ dataProduct: result2, dataCategory: result3 });
                });
              });
            });
          } catch {
            console.log("error try, go to catch");
            return res.status(500).send(err);
          }
        });
      }
    });
  },
  editCheckbox: (req, res) => {
    let productId = req.params.id;

    console.log("productId", productId);
    var sql = `select * from transaction where id=${productId};`;
    mysqldb.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      const data = req.body.data;
      sql = `Update transaction set ? where id=${productId}`;
      mysqldb.query(sql, data, (err, result2) => {
        if (err) res.status(500).send(err);
        console.log("berhasil edit");
        res.status(200).send({ checkout: true });
      });
    });
  },
  editWaitingpayment: (req, res) => {
    let productId = req.params.id;
    var sql = `select * from transaction where userId=${productId} and status='checkout'`;
    mysqldb.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      const data = req.body.data;
      sql = `update transaction set ? where id=${productId} and status='checkout'`;
      mysqldb.query(sql, data, (err, results2) => {
        if (err) res.status(500).send(err);
        res.status(200).send({ waitingpayment: true });
      });
    });
  },
  // ================================================================ DELETE =========================================
  deleteProduct: (req, res) => {
    console.log(req.params);
    let sql = `select * from products where id=${req.params.productid}`; // productid ini sesuai dengan parameter yg ada di productRouter
    mysqldb.query(sql, (err, result) => {
      console.log("result delete", result);
      if (err) res.status(500).send(err);
      if (result.length) {
        sql = `delete from products where id=${req.params.productid}`;
        mysqldb.query(sql, (err, result1) => {
          if (err) res.status(500).send(err);
          if (result[0].gambar) {
            fs.unlinkSync("./public" + result[0].gambar);
          }
          var sql = `select p.*,c.category from products p left join category c on p.categoryId=c.id order by c.id`;
          mysqldb.query(sql, (err, result2) => {
            if (err) res.status(500).send(err);
            mysqldb.query(`select * from category`, (err, result3) => {
              if (err) res.status(500).send(err);
              res.status(200).send({ dataProduct: result2, dataCategory: result3 });
            });
          });
        });
      } else {
        return res.status(500).send({ message: "nggak ada woy idnya" });
      }
    });
  },
  deleteCart: (req, res) => {
    console.log(req.params.id);
    let sql = `select * from transaction where id=${req.params.id}`;
    mysqldb.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      if (result.length) {
        sql = `delete from transaction where id=${req.params.id}`;
        mysqldb.query(sql, (err, result1) => {
          if (err) res.status(500).send(err);
          var sql = `select tr.*,p.namaProduk,p.gambar from transaction as tr left join products p on tr.productId=p.id where tr.userId=${req.params.idUser}`;
          mysqldb.query(sql, (err, result3) => {
            if (err) res.status(500).send(err);
            res.status(200).send({ dataCart: result3 });
          });
        });
      }
    });
  }
};
