require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortid = require('shortid');
const fs = require ('fs');
const { url } = require("inspector");
const { json } = require("body-parser");
const { stringify } = require("querystring");
const { ok } = require("assert");

class DataBase {
  constructor(shorturlId
    ,id ){
      this.id = id;
      this.shorturlId = shorturlId;
      this.redirectCount = 0;
      let pad = function(num) { return ('00'+num).slice(-2) };
      let date;
      date = new Date();
      date = date.getUTCFullYear()         + '-' +
              pad(date.getUTCMonth() + 1)  + '-' +
              pad(date.getUTCDate())       + ' ' +
              pad(date.getUTCHours())      + ':' +
              pad(date.getUTCMinutes())    + ':' +
              pad(date.getUTCSeconds());;
    this.creationDate = date
    }
}
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
  app.post("/api/shorturl/new", (req, res) => {
    let data = []
    let idName = (req.body.url)
      // const fileContent = fs.readFileSync(
      //      './saveurl/index2.json',
      //      { encoding: 'utf8', flag: 'r' });
      fs.readFile('./saveurl/index2.json', 'utf8', (err, jsonString) => {
        let newShortid = shortid.generate()
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
            

        try {
          let newFileContent = JSON.parse(jsonString)
          console.log(newFileContent)
        
          if(JSON.stringify(newFileContent[0][idName])){
            return res.send(newFileContent[0][idName].shorturlId);
            }
            
             
          console.log(`first time  ${newShortid}`)
          let urls = new DataBase(`http://localhost:3000/api/shorturl/new/${newShortid}`,Object.keys(newFileContent[0]).length);
          newFileContent[0][idName] = urls;
          newFileContent[1][newShortid] = idName
          fs.writeFile('./saveurl/index2.json', JSON.stringify(newFileContent), err => {
              if (err) {
                  console.log('Error writing file', err)
              } else {
                console.log(JSON.parse(jsonString))
               return JSON.parse(jsonString)
              }
          })
          // fs.writeFileSync(`./saveurl/index2.json`,JSON.stringify(newFileContent))
           
          console.log(`second time  ${newShortid}`)
          res.send(`http://localhost:3000/api/shorturl/new/${newShortid}`);
           
          console.log(`fird time  ${newShortid}`)
            return
          
    } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
          //  let newFileContent = JSON.parse(fileContent)
          //  console.log(`daniel ${newFileContent}`)
          //  console.log(`daniel el${fileContent}`)
          
           
          
          //  if(JSON.stringify(newFileContent[0][idName])){
          //  return res.send(newFileContent[0][idName].shorturlId);
          //  }

          // let newShortid = shortid.generate()

          // let urls = new DataBase(`http://localhost:3000/api/shorturl/new/${newShortid}`,Object.keys(newFileContent[0]).length);
          // console.log(Object.keys(newFileContent[0]).length)

          // let object = {}
          // object = newFileContent[0]
    
          // newFileContent[0][idName] = urls;

          // newFileContent[1][newShortid] = idName
  //   let x = fs.writeFileSync(`./saveurl/index2.json`,JSON.stringify(newFileContent))

  // res.send(`http://localhost:3000/api/shorturl/new/${newShortid}`);

});

app.get("/api/shorturl/new/", (req, res) => {

  const fileContent = fs.readFileSync(
    './saveurl/index2.json',
    { encoding: 'utf8', flag: 'r' });
  console.log(req.body)
  res.send(fileContent);
});
app.get("/api/shorturl/new/:id", (req, res) => {
  let  id  = req.params.id;
  fs.readFile('./saveurl/index2.json', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {

        const dataJson = JSON.parse(data)
        newUrl = `http://localhost:3000/api/shorturl/new/${id} `
        let path = JSON.stringify(dataJson[1][id])
        
        
           path = path.replace('"',"")
           path = path.replace('"',"")
     
           console.log(dataJson[0][path]["redirectCount"])
           dataJson[0][path]["redirectCount"]++
            fs.writeFile('./saveurl/index2.json', JSON.stringify(dataJson), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
              res.redirect(path)
             return JSON.parse(dataJson)
            }
        })
 
} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})
  // const data = fs.readFileSync(
  //   './saveurl/index2.json',
  //   { encoding: 'utf8', flag: 'r' });
  //   let dataJson = JSON.parse(data);
  //   newUrl = `http://localhost:3000/api/shorturl/new/${id} `
  //  let path = JSON.stringify(dataJson[1][id])
   
   
  //     path = path.replace('"',"")
  //     path = path.replace('"',"")

  //     console.log(dataJson[0][path]["redirectCount"])
  //     dataJson[0][path]["redirectCount"]++
      
  //     fs.writeFileSync(`./saveurl/index2.json`,JSON.stringify(dataJson))
  //     res.redirect(path)
  })
module.exports = app;
