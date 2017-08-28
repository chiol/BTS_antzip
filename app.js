var express = require('express');
var app = express();
//xlsx
if(typeof require !== 'undefined') XLSX = require("xlsx");
const wb = XLSX.readFile('list.xlsx');
var ws = wb.Sheets.Sheet1;
function search(name,phone) {
  for(names in ws){
    if(name == ws[names].v){
      if(phone == ws['C'+names.slice(1)].v){
        return {
          name1:ws['A'+names.slice(1)].v,
          name2:ws['B'+names.slice(1)].v,
          phone:ws['C'+names.slice(1)].v,
          address:ws['E'+names.slice(1)].v,
          email:ws['G'+names.slice(1)].v,
          price:ws['H'+names.slice(1)].v,
          count:ws['I'+names.slice(1)].v
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
