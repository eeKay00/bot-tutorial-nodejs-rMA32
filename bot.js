var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRe = /^\/cool/;
      botCC = /^\/cc/;
      setcc = /^\/setcc/;
      botSave = /^\/save/;
      botPrint = /^\/print/;
    
var savecc;  
var requesttext;
function pls() {
   requesttext = request.text;
   return requesttext;
}
function save() {
   return savecc.split(1);
}



if(pls.length > 6) {
  requesttext = savecc;
  }
  
if(request.text && botRe.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
    else if(request.text && setcc.test(request.text)) {
    this.res.writeHead(200);
    postMessage("set");
    this.res.end();
    }
 
   else if(request.text && botCC.test(request.text)) {
   this.res.writeHead(200);
   postMessage(save);
   this.res.end();
}
   else if(request.text && botSave.test(request.text)) {
       var sometext = request.text
       othertext = "Test " + sometext.text;
       this.res.writeHead(200);
       postMessage("Text saved.");
       this.res.end();
   }
   else if(request.text && botPrint.test(request.text)) {
       this.res.writeHead(200);
       postMessage(sometext.text);
       this.res.end();
   }
   else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;
