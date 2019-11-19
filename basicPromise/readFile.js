const fs = require('fs');

//* 1st WAY OF MAKING A BASIC PROMISE - One function */

// function readAndWrite(fileToRead, fileToWrite) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileToRead, (err, data) => {
//       if (err) reject(err);
//       else {
//         fs.writeFile(fileToWrite, data, (err, data) => {
//           if (err) reject(err);
//           else resolve();
//         })
//       }
//     })
//   })
// }

// readAndWrite('test_read.txt', 'test_write.txt')
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

//* 2nd WAY OF MAKING A BASIC PROMISE - Two functions */

function readFile(file_name) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file_name, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

function writeFile(file_name, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(file_name, data, (err, data) => {
      if (err) reject(err);
      else resolve();
    })
  })
}

readFile('test_read.txt')
  .then(data => 
    writeFile('test_write.txt', data))
  .catch(err => console.log(err));