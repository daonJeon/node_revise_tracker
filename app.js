const http = require('http')
const app = http.createServer();

app.listen(3001,()=> {
  console.log('http server 연결')
})