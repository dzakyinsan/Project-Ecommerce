const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");

const PORT = 2010;

app.use(cors());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Selamat datang di backend</h1>");
});

const { AuthRouter,productRouter } = require("./routers");

app.use("/auth", AuthRouter);
app.use("/product", productRouter)

app.listen(PORT, () => console.log(`aktif di port ${PORT}`));
 