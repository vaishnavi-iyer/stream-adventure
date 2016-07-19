// beep_boop
// console.log('beep boop');

//MEET_PIPE

// var fs =require('fs');
// var filename = process.argv[2]
// var fileStream = fs.createReadStream(filename,{encoding:'utf-8'})

// FILESTREAM
//   .pipe(process.stdout)
  
// INPUT_OUTPUT
// process.stdin.pipe(process.stdout)

//TRANSFORM

// var through2 = require('through2')
// process.stdin
//   .setEncoding('utf-8')
//   .pipe(through2.obj(Upper))
//   .pipe(process.stdout)

// function Upper(chunk,enc, callback){
//   this.push(chunk.toUpperCase())
//   callback()
// }

//LINES

// var through = require('through2');
// var split = require('split');

// var lineCount = 0;
// function changeCase (chunk, enc, callback) {
//     // var line = chunk.toString(); not require if encoding is set else required
//     this.push(lineCount % 2 === 0
//         ? chunk.toLowerCase() + '\n'
//         : chunk.toUpperCase() + '\n'
//     );
//     lineCount ++;
//     callback();
// }

// process.stdin
//   .setEncoding('utf-8')
//   .pipe(split())
//   .pipe(through.obj(changeCase))
//   .pipe(process.stdout);

//CONCAT

// var concat = require('concat-stream')

// function reverseStr(src){
//   var s = src.toString().split('').reverse().join('');
//   console.log(s);
// }

// process.stdin
//   .pipe(concat(reverseStr));

//HTTP SERVER

// var http = require('http');
// var through2 = require('through2');

// var server = http.createServer(function (req, res) {
//   if (req.method === 'POST') {
//       req.pipe(through2.obj(Upper)).pipe(res);
//   }
//   else res.end('send me a POST\n');
// });

// function Upper(chunk,enc, callback){
//   this.push(chunk.toString().toUpperCase())
//   callback()
// }

// server.listen(parseInt(process.argv[2]));
// 
// HTTP CLIENT

// var http = require('http');
// var through2 = require('through2');
// var request = require('request');
// var r = request.post('http://localhost:8099')

// process.stdin.pipe(r).pipe(process.stdout)
// 
// WEB SOCKETS

// var ws = require('websocket-stream');
// var stream = ws('ws://localhost:8099');

// var str = 'hello\n'

// stream.write(str)
// 
// HTML STREAM

// var trumpet = require('trumpet');
// var through2 = require('through2');
// var tr = trumpet();

// var stream = tr.select('.loud').createStream();

// stream.pipe(through2.obj(Upper)).pipe(stream)

// function Upper(chunk,enc, callback){
//   this.push(chunk.toString().toUpperCase())
//   callback()
// }

// process.stdin.pipe(tr).pipe(process.stdout);

//DUPLEXER

// var spawn = require('child_process').spawn;
// var duplexer2 = require('duplexer2');

// module.exports = function (cmd, args) {
//     var spawned = spawn(cmd, args)
//     return duplexer2(spawned.stdin, spawned.stdout);
// };
// 
// DUPLEXER REDUX

var duplexer2 = require('duplexer2');
var through2 = require('through2')

module.exports = function (counter) {
    var counts = {};
    var input = through2(write, end);
    return duplexer2({objectMode: true}, input, counter);
    
    function write (row, _, next) {
        counts[row.country] = (counts[row.country] || 0) + 1;
        next();
    }
    function end (done) {
        counter.setCounts(counts);
        done();
    }
};