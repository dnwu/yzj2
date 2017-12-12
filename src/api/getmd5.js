import crypto from 'crypto'

export default function getmd5(value) {
  // var a;
  var md5 = crypto.createHash("md5");
  md5.update(value);
  var a = md5.digest('hex');
  // console.log(a);
  return a
  //47bce5c74f589f4867dbd57e9ca9f808
}
