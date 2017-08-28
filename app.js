var express = require('express');
var app = express();
//xlsx
if(typeof require !== 'undefined') XLSX = require("xlsx");
const wb = XLSX.readFile('list.xlsx');
var ws = wb.Sheets.Sheet1;
console.log(ws);
function search(name,phone) {
  for(names in ws){
    if(name == ws[names].v){
      if(phone == ws['I'+names.slice(1)].v){
        return {
          name1:ws['E'+names.slice(1)].v,
          name2:ws['H'+names.slice(1)].v,
          phone:ws['I'+names.slice(1)].v,
          address:ws['K'+names.slice(1)].v,
          email:ws['M'+names.slice(1)].v,
          price:ws['Q'+names.slice(1)].v,
          count:ws['R'+names.slice(1)].v,
          etc:ws['S'+names.slice(1)].v
        };
      }
    }
  }
  return false;
}

//----
app.use(express.static('public'));
//template
app.set('views','./views');
app.set('view engine','jade');
//--------

//router
app.get('/',function (req,res) {
  res.render('form');
});
app.get('/search',function (req,res) {
  res.render('search',{check : search(req.query.name,req.query.phone)})
});
//------
var port = process.env.PORT || 9000;
app.listen(port,function () {
  console.log('Listening on '+ port);
});
