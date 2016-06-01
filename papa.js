var request = require('request');

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
let i = 8;

function nextLetter(str, index) {
  let nextLetter = alphabet.indexOf(str[index]);
  nextLetter++;
  return str[index + 1] ? str.substr(0, index) + alphabet[nextLetter] + str.substr[index + 1] : str.substr(0, index) + alphabet[nextLetter];
}

function generateNextCode(lastCode, i) {
  var newCode = lastCode;
  while(i) {
    if(newCode[i] !== '0') {
      return nextLetter(newCode, i);
    } else {
      newCode[i] = 'a';
      generateNextCode(newCode)
    }
  }
}

let code = 'aaaaaaaa';

setInterval(() => {
  code = generateNextCode(code);
  console.log(code);
  ://request('https://www.papajohns.ru/stock/stock/getbycode/' + code, (err, response) => {
    //console.log(response.body);
  //})
}, 1);

