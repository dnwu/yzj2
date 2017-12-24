export default function pay(orderNo,status){
  var a = document.createElement('a')
  a.href = `http://120.79.38.80/pay/${orderNo}/${status}`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
