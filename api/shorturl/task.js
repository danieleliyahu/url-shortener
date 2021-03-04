
const fs = require("fs");
require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());
const bodyParser = require('body-parser')
router.use(bodyParser.json());
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
  router.use(cors());
  
  router.use(express.urlencoded({extended:false}))
  router.use("/public", express.static(`./public`));
  // console.log("Hi")
//   router.get("/", (req, res) => {
//     console.log("Hi")
//     res.sendFile(__dirname + "/views/index.html");
//   });
  router.post("/", (req, res) => {
      let idName = (req.body.url)
      console.log(`dani${(idName)}`)
    //   console.log(req)
      console.log(`el${JSON.stringify(req.body)}`)
      // console.log(`el${JSON.stringify(req.body)}`)
        fs.readFile('./saveurl/index2.json', 'utf8', (err, jsonString) => {
          let newShortid = shortid.generate()
          if (err) {
              return
          }     
          try {
            let newFileContent = JSON.parse(jsonString)
          
            if(JSON.stringify(newFileContent[0][idName])){
              return res.send(newFileContent[0][idName].shorturlId);
              }
            console.log(`first time  ${newShortid}`)
            let urls = new DataBase(`http://localhost:3000/api/shorturl/new/${newShortid}`,Object.keys(newFileContent[0]).length);
            newFileContent[0][idName] = urls;
            newFileContent[1][newShortid] = idName
            fs.writeFile('./saveurl/index2.json', JSON.stringify(newFileContent), err => {
                if (err) {
                } else {
                 return JSON.parse(jsonString)
                }
            })
            res.send(`http://localhost:3000/api/shorturl/new/${newShortid}`);
  
              return
            
      } catch(err) {
              console.log('Error parsing JSON string:', err)
          }
      })
  
  });
  
  // router.get("/api/shorturl/new/", (req, res) => {
  
  //   const fileContent = fs.readFileSync(
  //     './saveurl/index2.json',
  //     { encoding: 'utf8', flag: 'r' });
  //   console.log(req.body)
  //   res.send(fileContent);
  // });
  router.get("/:id", (req, res) => {
    let  id  = req.params.id;
    fs.readFile('./saveurl/index2.json', 'utf8', (err, data) => {
      if (err) {
          console.log("Error reading file from disk:", err)
          return
      }
      try {
          const dataJson = JSON.parse(data)
          if(!JSON.stringify(dataJson[1][id])){
              res.send("the id is not correct")
          }
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

              }
          })
   
  } catch(err) {
          console.log('Error parsing JSON string:', err)
      }
  })
    })

module.exports = router;