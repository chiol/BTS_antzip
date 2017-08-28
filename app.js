var express = require('express');
var app = express();

app.locals.pretty = true;

//xlsx
if(typeof require !== 'undefined') XLSX = require("xlsx");
const wb = XLSX.readFile('test.xlsx');
var ws = wb.Sheets.Sheet1;
function search(name,phone) {
  for(names in ws){
    if(name == ws[names].v){
      if(phone == ws['C'+names.slice(1)].v){
        return {
          name:ws['A'+names.slice(1)].v,
          address:ws['B'+names.slice(1)].v,
          phone:ws['C'+names.slice(1)].v,
          price:ws['D'+names.slice(1)].v,
          count:ws['E'+names.slice(1)].v
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
var port = process.env.PORT || 5000;
app.listen(port,function () {
  console.log('Listening on '+ port);
});
