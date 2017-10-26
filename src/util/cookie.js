export default {
  getCookie(name,path){
    let m=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))
    return !m?"":unescape(m[2]);
  }
  ,
  delCookie(name,path){
    if (path) {
      document.cookie = name+"=;path="+path+";expires"+(new Date(0)).toGMTString()+";";
    } else {
      document.cookie = name+"=;expires"+(new Date(0)).toGMTString()+";";
    }
  }
  ,
  setCookie(name,value,path){
    let _date=new Date();
    _date.setDate(_date.getDate()+30);
    document.cookie=(name+"="+value+";expires="+_date.toGMTString()+";");
  }

}
