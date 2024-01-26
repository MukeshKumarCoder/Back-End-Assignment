const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { error } = require("console");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  // complete the fillowing function.
  case "read":
    fs.readFile(file, "utf-8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
    break;
  case "delete":
    fs.unlink(file, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("deleted");
      }
    });
    break;
  case "create":
    fs.writeFile(file, "", (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("created");
      }
    });
    break;
  case "rename":
    fs.rename(file, content, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("rename success");
      }
    });
    break;
  case "append":
    fs.appendFile(file, "\n" + "new content", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
    break;
  case "list":
    fs.readdir(".", (error, files) => {
      if (error) {
        console.log(error);
      } else {
        files.forEach((file) => {
          console.log(file);
        });
      }
    });
  default:
    console.log(`Invalid operation '${operation}'`);
}
