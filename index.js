const express = require("express")
const app = express()
const port = process.env.PORT


app.listen(port, () => console.log(`server start at port 5000`))