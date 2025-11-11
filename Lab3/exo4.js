var fs = require('fs');
//const fileName = 'f1.txt';   
//const txt = process.argv[2];  
const fileName = process.argv[2];         
const txt = process.argv[3];         
fs.writeFileSync(fileName, txt, 'utf-8');
console.log("The file has been saved !");
const content = fs.readFileSync(fileName, 'utf-8');
console.log(content);