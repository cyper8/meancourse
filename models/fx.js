var superagent = require("superagent");
var status = require('http-status');

var rates={
  USD: 1,
  EUR: 0.9,
  GBP: 0.8
};

var date = 0;

function UpdateRates(){
  var api='http://api.fixer.io/latest?base=USD';
  
  // time in days from Unix epoch that changes at 4 AM CEST
  var t = Math.round(((Date.now()/(1000*60*60))-6)/24);
  
  if (date != t) {
    superagent.get(api, function(req, res){
      if (res.status == status.OK){
        rates = JSON.parse(res.text).rates;
        rates.USD = 1;
        date = t;
      }
    });
  }
  return rates;
}

UpdateRates();

module.exports = function() {
  return UpdateRates();
};
