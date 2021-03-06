
const fs = require("fs");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortid = require('shortid');
const router = express.Router();
const jsonFileName = "test"

router.use(express.json());
const bodyParser = require('body-parser')
router.use(bodyParser.json());
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
          let path = dataJson[1][id]
          
          

          console.log(dataJson[0][path])
            //  console.log(path)
            //  console.log(dataJson[path])
            //  dataJson[0][path]["redirectCount"]++
              fs.writeFile(`./saveurl/${jsonFileName}.json`, JSON.stringify(dataJson,null,4), err => {
              if (err) {
                  console.log('Error writing file', err)
              } else {
                res.json(dataJson[0][path])

              }
          })
   
  } catch(err) {
          console.log('Error parsing JSON string:', err)
      }
  })
    })
    module.exports = router;