const http = require("http");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const dns = require("dns");
const yodasay = require("yodasay");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (req.url == "/") {
    res.setHeader("content-type", "text/html");
    res.end(`<h1>Welcome to the Home Page</h1>`);
  } else if (req.url === "/gencount") {
    const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    let maleCount = 0;
    let femaleCount = 0;
    data.forEach((element) => {
      if (element.gender === "Male") {
        maleCount++;
      } else if (element.gender === "Female") {
        femaleCount++;
      }
    });
    try {
      writeLog(
        `The initial Male count is ${maleCount} and Female count is ${femaleCount} at ${Date()}`
      );
      res.end("The count has been updated in the logs file");
    } catch (error) {
      res.end(error);
    }
  } else if (req.url === "/addnew") {
    const id = crypto.randomInt(1, 1000);
    const username = os.userInfo().username;
    const first_name = username;
    const last_name = username;
    const email = "mg328790@gmail.com";
    const gender = "Male";
    const newUser = { id, first_name, last_name, email, gender };
    fs.readFile("./data.json", "utf-8", (err, data) => {
      if (err) res.end(err);
      data = JSON.parse(data);
      data.push(newUser);
      fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {
        if (err) res.end(err);
        res.end("The data has been updated, go and check the data file");
      });
    });
  } else if (req.url === "/people") {
    try {
      const data = fs.readFileSync("./data.json", "utf-8");
      const parseData = JSON.parse(data);
      let newData = "";
      parseData.forEach((ele)=>{
        newData += `First Name: ${ele.first_name} Last Name: ${ele.last_name} Gender: ${ele.gender} Email: ${ele.email}\n`;
      });
      const response = fs.writeFileSync("people.txt", newData);
      res.setHeader("content-type", "text/html");
      res.end("The file has been created and data has been entered");
    } catch (error) {
      res.end(error);
    }
  }else if(req.url === "/address"){
    dns.lookup("www.masaischool.com", (err, address, family)=>{
        if(err) res.end(err);
        try {
            console.log(address, family);
            let log = `URL: masaischool.com IP Address: ${address} and Family is IPv4`;
            console.log(address);
            writeLog(log);
            res.end("Logs File has been updated");
        } catch (error) {
            res.end(error);
        }
    });
  }else if(req.url === "/yoda"){
    const publicData = fs.readFileSync("./people.txt", "utf-8");
    writeLog(publicData);
    res.end(yodasay.say({text: `${publicData}` }));
  }
});

server.listen(8080, () => {
  console.log("server is runing successfully");
});

// Do not forget to export the server.
// e.g => module.exports = server;

function writeLog(log) {
  return fs.appendFileSync("./logs.txt", `${log}\n`);
}

module.exports = server;
