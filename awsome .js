const os=require('os');
const fs=require('fs');

const number=[5,1,9,2,4,3];
console.log(Math.max(...number));
console.log(Math.min(...number));

console.log(process.argv);
console.log("Total Memory in CPU:",os.freemem());
console.log("Total Free memory in cpu:",os.totalmem());

