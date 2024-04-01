const Jimp = require('jimp');
var md5 = require('md5-node');
const dir="./static/avatar/"
async function i2j(fileid,path) {
    // 读取图片
    const image = await Jimp.read(path);
    // 缩小成150*150
    await image.resize(100, 100);
    // 写文件到本地
    await image.writeAsync(dir+fileid+".jpg");
}

var uid="20212241001"
var fileid=md5("AVATAR"+uid)
var path=dir+fileid+".jpeg"
i2j("demo","./static/avatar/demo.jpeg")
