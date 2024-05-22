// Using Node.js `require()`
const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('yaml');
const file = fs.readFileSync('/etc/config/config.yaml', 'utf8');
const config = yaml.parse(file);
const DB_URL=config.mongodb.uri;

  (async()=>{
   
    try{
        await mongoose.connect(DB_URL)
          console.log('Connected to db!');

    }catch(error){
        console.log(error);
    }


  })()
