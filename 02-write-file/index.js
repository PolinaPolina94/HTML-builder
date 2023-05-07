const fs = require('fs');
const readline = require('readline');
const path = require('path');


const writeText = fs.createWriteStream(path.join(__dirname, 'new-text.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write('Привет, напиши что-нибудь: \n');

rl.on('line', data => {
    writeText.write(data + '\n');
   if (data === 'exit') {
    rl.write('Спасибо за участие. Удачи!!')
    rl.close();
   }
});

rl.on('SIGINT', () => {
    console.log('Пока-пока!');
    process.exit(0);
  });