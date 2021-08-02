const user = "root"
const password ="password"

const express = require('express')
const app = express()
const port = 3001
const mysql = require('mysql2')
const cors = require('cors')
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const fs = require("fs");


const text_to_speech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "dJt2sNqxcGZ8cfsWzppgOQgyoxBCa0swUnkM9AmWBre3",
  }),
  serviceUrl:
  "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/bc4a8c32-f4c6-46c6-a10b-d0e43b3d16d9",
});

app.use(cors());
app.use(express.json());

let db = mysql.createConnection({
    user: user,
    host: 'localhost',
    password: password,
    
});


  db.connect(function (err) {
    if (err) throw err;

    db.query(
      " CREATE DATABASE IF NOT EXISTS watsondb",
      function (err, result) {
        if (err) throw err;
      }
    );
    db = mysql.createConnection({
        user: user,
        host: "localhost",
        password: password,
        database: "watsondb",
      });
  

      var sql =
      "CREATE TABLE IF NOT EXISTS comments (idcomment int not null AUTO_INCREMENT,commentcontent TEXT,PRIMARY KEY(idcomment))";

      db.query(sql, function (err, result) {
      if (err) throw err;
    });
  });

app.post('/play', (req, res)=>{
    const { comment} = req.body;
    const params = {
      text: comment,
      voice: "pt-BR_IsabelaV3Voice",
      accept: "audio/wav",
    };
  
    
    text_to_speech
      .synthesize(params)
      .then((response) => {
        const audio = response.result;
        return text_to_speech.repairWavHeaderStream(audio);
      })
      .then((repairedFile) => {
  
        fs.writeFileSync(`../client/public/audio/${comment}.wav`, repairedFile, (err) => {
          if (err) return err;
          console.log("Directory and File Saved");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    return res.json(comment);
})

app.post('/create',(req, res)=>{
    const comment  = req.body.comment;

    db.query('INSERT INTO comments(commentcontent) VALUES (?)', [comment],(error,result)=>{
        if (error){
            console.log("Erro no backend :" +error);
        }else{
            res.send("Comentário inserido");
        }
    });
});

app.get('/printcomments', (req,res)=>{
    db.query("SELECT * FROM comments", (err,result)=>{
    if(err){
        console.log(err);
    } else {
        res.send(result);
    }           
    });
});

app.listen(port, ()=>{
    console.log("Conectado na porta: "+port);
});
