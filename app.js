const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path')

const mimeType = {//확장자에 따라서 content-type header 값을 동적으로 생성
  //html  단일 페이지 뿐만 아니라 모든 정적요소 불러오기 위함
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".txt ": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg"
}


const app = http.createServer((req,res)=> {
  var _url = req.url;
  var ext = path.parse(_url).ext
  var publicPath = path.join(__dirname, "./public")
  
  if(Object.keys(mimeType).includes(ext)) {//mine Type 딕셔너리로 있을 경우
    console.log("s");
  fs.readFile(`${publicPath}${_url}`,(err,data)=> {
      
      res.writeHead(200,"Content-Type", mimeType[ext])//응답을 화면으로 보여줌
      res.end(data)
  })
  
}
//  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})//utf-8로 character set 설정
  if(req.url === '/') {
    console.log(req.url)
    res.end(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>수정 내역 목록</title>
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
      <div class="g-page">
    
        <div class="g-header">
          <div class="g-header-value page-title">Sales</div>
          <div class="g-header-value page-title">$48,206</div>
          <div class="g-header-value sub-title">3,008 total</div>
          <div class="g-header-value sub-title">9 pending</div>
        </div>
        
        <div class="g-table-body">
          
          <ul class="g-table-actions">
            <li class="g-table-actions-col">
              <a href="#" class="g-actions-button g-actions-button-default"><i class="fa fa-fw fa-filter right-4"></i>Filter</a>
              <a href="#" class="g-actions-button g-actions-button-default"><i class="fa fa-fw fa-columns right-4"></i>Display</a>
            </li>
            <li>
              <form class="g-forms-input">
                <input type="text" class="g-forms-input-search-bar" placeholder="Search SKU...">
                <i class="g-forms-input-search-bar-icon fa fa-fw fa-search"></i>
              </form>
            </li>
          </ul>
        
          <table class="g-table-list">
             <thead>
                <tr>
                    <th class="g-table-list-col-edit"></th>
                    <th class="g-table-list-col-title g-table-list-col-sku required ">SKU</th>
                    <th class="g-table-list-col-title g-table-list-col-listing opt g-table-list-rwd">Listing Title</th>
                    <th class="g-table-list-col-title g-table-list-col-desc required">Description</th>
                    <th class="g-table-list-col-title g-table-list-col-money required">Price</th>
                    <th class="g-table-list-col-title g-table-list-col-money opt ">Profit</th>
                    <th class="g-table-list-col-title g-table-list-col-date required">Date</th>
                </tr>
             </thead>
        
             <tbody>
        
                <tr>
                  <td><a href="#"><i class="fa fa-fw fa-pencil"></i></a></td>
                  <td><a href="#">2R-06HY-RI0K</a><br><div class="g-table-list-col-small-copy">Amazon US</div></td>
                  <td class="g-table-list-rwd"><a href="#">Crest 3D White Vivid Fluoride Anticavity Toothpaste Radiant Mint 0.85 oz Travel Size (Pack of 4)</a></td>
                  <td>1 sold</td>
                  <td>$3.99</td>
                  <td>$0.12</td>
                  <td><div class="g-table-list-col-small-copy">12/20/2017, 11:50PM</div></td>
                </tr>               
        
              </tbody>
        
          </table>
          
          <div class="g-table-list-pagination">
            
            <div class="g-table-list-pagination-col">
              <span class="g-body-copy">Page</span>
              <form><input type="text" class="g-table-list-pagination-current" placeholder="3"></form>
              <span class="g-body-copy">of 32</span>
            </div>
            <div class="g-table-list-pagination-col">
              <a href="#" class="g-actions-button g-actions-button-pager"><i class="fa fa-fw fa-caret-left right-4"></i>Prev</a>
              <a href="#" class="g-actions-button g-actions-button-pager g-table-list-pager">Next<i class="fa fa-fw fa-caret-right left-4"></i></a>
            </div>
            
          </div>
          
        </div>
        </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/androidstudio.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>hljs.highlightAll();</script>
      
    </body>
    </html>
    `)
  } else if (req.url === '/detail') {
    res.end('여기는 상세 화면입니다.')
  } else if (req.url === '/create') {
    res.end('여기는 추가 화면입니다.')
  }
});

app.listen(3001,()=> {
  console.log('http server 연결')
})