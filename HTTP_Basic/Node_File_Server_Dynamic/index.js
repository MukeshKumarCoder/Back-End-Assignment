//  import required modules from nodejs
const http = require("http");
const fs = require("fs");
const path = require("path");

// create the server
const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  if (req.url === "/") {
    fs.readdir(__dirname, (err, data) => {
      data.forEach((ele) => {
        let element = `<li><a href= "${ele}"> ${ele} </a></li>`;
        res.write(element);
      });
      res.end();
    });
  } else {
    let exactpath = path.join(__dirname, req.url);
    let isExactFilePath = fs.existsSync(exactpath);
    if (isExactFilePath) {
      let isFileLocation = fs.statSync(exactpath).isFile();
      if (isFileLocation) {
        const fileData = fs.readFileSync(exactpath, "utf-8");
        res.write(fileData);
      } else {
        const folderData = fs.readFileSync(exactpath, "utf-8");
          folderData.forEach((ele)=>{
            let element = `<li><a href= "${req.url}/${ele}">${ele}</a></li>`;
            res.write(element)
          });
      }
    }
    res.end();
  }
});

server.listen(8080, () => {
  console.log("server is runnig");
});

// export the server

module.exports = server;
