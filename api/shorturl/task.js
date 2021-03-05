
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
const jsonFileName = "test"

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

  router.post("/", (req, res) => {
    if(jsonFileName !== "index2"){
      let contentOfJson = [
        {
            "https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s": {
                "id": 0,
                "shorturlId": "http://localhost:3000/api/shorturl/new/y-CuJ_eZA",
                "redirectCount": 0,
                "creationDate": "2021-03-05 15:07:25"
            }
        },
        {
            "y-CuJ_eZA": "https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s"
        }
    ]
      fs.writeFile(`./saveurl/${jsonFileName}.json`,JSON.stringify(contentOfJson) , err => {
        if (err) {
        } else {
          contentOfJson
        }
    })
    }
      let idName = (req.body.url)
      console.log(`dani${(idName)}`)
      console.log(`el${JSON.stringify(req.body)}`)
        fs.readFile(`./saveurl/${jsonFileName}.json`, 'utf8', (err, jsonString) => {
          let newShortid = shortid.generate()
          if (err) {
              return
          }     
          try {
            let newFileContent = JSON.parse(jsonString)
          
            if(JSON.stringify(newFileContent[0][idName])){
              console.log(jsonString)
              return res.send(newFileContent[0][idName].shorturlId);
              }
            let urls = new DataBase(`http://localhost:3000/api/shorturl/new/${newShortid}`,Object.keys(newFileContent[0]).length);
            newFileContent[0][idName] = urls;
            newFileContent[1][newShortid] = idName
            fs.writeFile(`./saveurl/${jsonFileName}.json`, JSON.stringify(newFileContent,null ,4), err => {
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
  
  router.get("/:id", (req, res) => {
    let  id  = req.params.id;
    fs.readFile(`./saveurl/${jsonFileName}.json`, 'utf8', (err, data) => {
      if (err) {
          console.log("Error reading file from disk:", err)
          return
      }
      try {
          const dataJson = JSON.parse(data)
          if(!JSON.stringify(dataJson[1][id])){
              res.status(404).send("the id is not correct")
              return
          }
          let path = JSON.stringify(dataJson[1][id])
          
          
             path = path.replace('"',"")
             path = path.replace('"',"")
       
             console.log(dataJson[0][path]["redirectCount"])
             dataJson[0][path]["redirectCount"]++
              fs.writeFile(`./saveurl/${jsonFileName}.json`, JSON.stringify(dataJson,null,4), err => {
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