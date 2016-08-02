/**
 * Created by zhangpei on 16/8/2.
 */
"use strict";
var request = require('superagent');
const repl = require('repl');
var RouterSwitcher = require("./RouterSwitcher");
var BarcodeAction = require("./actions/BarcodeAction");
var InitAction = require("./actions/InitAction");
var PostcodeAction = require("./actions/PostcodeAction");

let routers = [
  new InitAction(),
  new PostcodeAction(),
  new BarcodeAction()
];

let routerSwitcher = new RouterSwitcher(routers);


function start(repl) {
  request
    .get('http://127.0.0.1:5000/start')//建立连接
    .end(function (err, res) {
      console.log(res.text);
      repl.start({prompt: '> ', eval: (cmd, context, filename, output) => {
        if(routerSwitcher.currentStatus === "postcode" && cmd.trim() !== "q"){
          changePostcode(cmd,output);
        }
        if(routerSwitcher.currentStatus === "barcode" && cmd.trim() !== "q") {
          changeBarcode(cmd, output);
        }
        let newStatus = routerSwitcher.switchRouter(cmd.trim());
        output(newStatus.help);
      }});
    });
}

function changePostcode(cmd){
  request
    .post("http://127.0.0.1:5000/postcode")
    .type("form")
    .send({postcode:cmd.trim()})
    .end(function(err,res) {
      if(err) throw err;
      console.log(res.text)
    })
}

function changeBarcode(cmd){
  request
    .post("http://127.0.0.1:5000/barcode")
    .type("form")
    .send({barcode:cmd.trim()})
    .end(function(err,res) {
      if(err) throw err;
      console.log(res.text)
    })
}
start(repl);