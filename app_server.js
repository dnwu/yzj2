var express = require('express')
var app = express()

app.use(express.static('./dist'))
app.listen('3000', '127.0.0.1',err => {
  if(err) {
    console.log(err)
  }
  console.log('成功。。。。')
})
