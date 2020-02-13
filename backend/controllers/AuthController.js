const cryptogenerate = require("./../helper/encrypt");
const { mysqldb } = require("./../connection");
const fs = require("fs");
const { createJWTToken } = require("./../helper/jwt");

module.exports = {
  registerver: (req, res) => {
    var { username, password, email } = req.body;
    console.log("masuk");

    var sql = `select username from users where username='${username}'`;
    mysqldb.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send({ status: "error", err });
      }
      // console.log('results',results);
      // console.log('results[0].username',results[0].username);

      if (results[0]) {
        //pake [0] karena bentuk datanya array
        console.log("username ada");

        return res.status(200).send({ status: "error", message: "username has been taken" });
      } else {
        var hashpassword = cryptogenerate(password);
        var dataUser = {
          username,
          password: hashpassword,
          email,
          usia: 20,
          roleId: 2,
          status: "unverified",
          lastlogin: new Date()
        };
        sql = `insert into users set ?`;
        mysqldb.query(sql, dataUser, (err1, res1) => {
          if (err1) {
            return res.status(500).send({ status: "error", message: "error server", err: err1 });
          }
          // var LinkVerifikasi=`http://localhost:3000/verified?username=${username}&password=${hashpassword}`
          // var mailoptions={
          //     from:'hokage <dzakyinsan20@gmail.com>',
          //     to:email,
          //     subject:`verifikasi Email app iniitu`,
          //     html:`tolong klik link ini untuk verifikasi :
          //             <a href=${LinkVerifikasi}>Join apps ini</a>`
          // }
          // transporter.sendMail(mailoptions,(err2,res2)=>{
          //     if(err2){
          //         console.log(err2)
          //         return res.status(500).send({status:'error',err:err2})
          //     }
          //     console.log(`success`)
          // })
          console.log("registered");
          return res.status(200).send({ status: "success" });
        });
      }
    });
  },
  login: (req, res) => {
    const { username, password } = req.query; //kalo get = .query kalo post =.body
    const {id} =req.params
    // console.log('password', password);
    
    // console.log('hash', hashpassword);
    // let hashpassword = password
    if(id){//ini buat keep login setelah sekali login
      var sql = `select * from users where id=${id}`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send({ status: "error", err });
        if (result.length === 0) {
          return res.status(200).send({ status: "notmatch", error: "username or password incorect!" });
        }
        const token = createJWTToken({ userid: result[0].id, username: result[0].username });
        console.log(token);
        return res.send({ username: result[0].username, id:result[0].id, status: "success", token });
      });
    }else{//ini ketika pertama login
      var hashpassword = cryptogenerate(password);
      var sql = `select * from users where username='${username}' and password='${hashpassword}'`;
      mysqldb.query(sql, (err, result) => {
        if (err) res.status(500).send({ status: "error", err });
      if (result.length === 0) {
        return res.status(200).send({ status: "notmatch", error: "username or password incorect!" });
      }
      const token = createJWTToken({ userid: result[0].id, username: result[0].username });
      console.log(token);
      return res.send({ username: result[0].username, id:result[0].id, status: "success", token });
    });
    }
  }
}
