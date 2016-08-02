/**
 * Created by zhangpei on 16/8/2.
 */

"use strict";
const express = require("express");
const bodyParser = require('body-parser');
const ChangedPostcode = require("./ChangedPostcode");
const ChangedBarcode = require("./ChangedBarcode");
var app = express();
var changedPostcode = new ChangedPostcode();
var changedBarcode = new ChangedBarcode();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/start",function(req,res){
  res.send('请选择功能:1.邮编转编码 2.编码转邮编 q.退出');
});

app.post("/postcode",function(req,res){
  res.send(changedPostcode.changePostCode(req.body.postcode))

});

app.post("/barcode",function(req,res){
  res.send(changedBarcode.changeBarcode(req.body.barcode))
});

app.listen(5000,function(){
  console.log("listen on 5000")
});