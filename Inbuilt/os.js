let os = require('os');
console.log(os.platform()) //win32
console.log(os.arch()) //x64
console.log(os.cpus().length+" core") //12 core
console.log(os.freemem()) //9916506112 byte
console.log(os.uptime()) //1563.468