var iframe = document.createElement('iframe'); 
var buttontext = document.createElement('div');
var imgs = '<img src="http://kefu.xuandev.com/agent/kefu.png" style="width: 100px;height: 100px;position: fixed;bottom: 50px;right: 30px;border-radius: 50%;z-index: 999;" class="kefubutton">'
// var gb = '<div class="closebtn" style="background-color: #fff;width: 25px;color: #red;height: 25px;position: fixed;bottom: 396px;right: 10px;z-index: 1000;border-radius: 50%;text-align: center;font-size: 20px;line-height: 20px;display:none;box-shadow: 0 0 6px rgba(0,0,0,.1)">x</div>'
// var alldom = imgs + gb
buttontext.innerHTML = imgs


var sUserAgent = navigator.userAgent.toLowerCase();
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
  //跳转移动端页面
  console.log('手机端')
    iframe.width = '100%';
    iframe.height = '100%'; 
    // buttontext.children[1].style.bottom = 'calc(100% - 35px)';
  } else {
  //跳转pc端页面
  console.log('pc端')
    iframe.width = '300px';
    iframe.height = '430px';
    // buttontext.children[1].style.bottom = '396px';
  }
//属性
iframe.setAttribute('frameborder', '0', 0);  
iframe.setAttribute('scrolling', 'no', 0);  
iframe.setAttribute('margin', 'auto', 0);  
iframe.setAttribute('style',' position: fixed !important; right: 0; bottom: 0;display: none;box-shadow: 0 0 10px rgba(0,0,0,.2);z-index: 100;');
iframe.setAttribute('id','jilu');
document.body.appendChild(buttontext);
var imgdom = document.querySelector('.kefubutton')
// var closebtn = document.querySelector('.closebtn')
var show = false
document.body.appendChild(iframe);
var httpUrl = window['_PINXUAN'].a[0][3]
// console.log('url', httpUrl)
// var stringIndex = httpUrl.indexOf('?')
// httpUrl = httpUrl.substring(0, stringIndex)
if (httpUrl.indexOf('web') !== -1) {
  httpUrl = httpUrl.replace('web', 'app')
}
var url = `${httpUrl}?i=1&c=entry&do=mobile&m=pinxuan_kefu&`
imgdom.onclick= function(){
    if (!show) {
        iframe.style.display = 'block';
        // 获取时间戳
        var datstring = new Date().getTime();
        datstring = '&time=' + datstring
        // 判断是否是IE 11及以下或者其他(其他里包括IE edge)
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          console.log('是ie浏览器');
          // 添加时间戳，解决ie缓存不会触发onload问题,独立版本浏览器插件数据路径
          iframe.src="http://kefu.xuandev.com/mobile/index.html?mchid="+window['_PINXUAN'].a[0][1] + datstring +"#/";
          // 微擎版本浏览器插件数据路径
          // iframe.src= url + "mchid="+window['_PINXUAN'].a[0][1] + datstring +"#/";
          // 本地测试
          // iframe.src="http://192.168.4.146:8081/?mchid="+window['_PINXUAN'].a[0][1] + datstring +"#/";
        }else{
          console.log('不是ie浏览器');
          // 独立版本浏览器插件数据路径
          iframe.src="http://kefu.xuandev.com/mobile/index.html?mchid="+window['_PINXUAN'].a[0][1]+"#/";
          // 微擎版本浏览器插件数据路径
          // iframe.src= url + "mchid="+window['_PINXUAN'].a[0][1]+"#/";
          // 本地测试
          // iframe.src="http://192.168.4.146:8081/?mchid="+window['_PINXUAN'].a[0][1]+"#/";
        }
        // if (!/*@cc_on!@*/0) { //if not IE
        //   console.log("判断不是ie");
        //   iframe.onload = function(){
        //     console.log("Local iframe is now loaded.", '1')
        //     console.log("判断不是ie加载完毕")
        //     var data = 'iframe-closebtn'
        //     iframe.contentWindow.postMessage(data,'*')
        //   };
        // } else {
        //   console.log("判断是ie");
        //   iframe.onreadystatechange = function(){
        //     console.log('判断是ie执行', iframe.readyState);
        //     if (iframe.readyState == "complete"){
        //       console.log("判断是ie加载完毕")
        //       var data = 'iframe-closebtn'
        //       iframe.contentWindow.postMessage(data,'*')
        //     }
        //   };
        // }
        //if...else...是一种兼容ie8及更早的兼容的写法
        // 插件加载成功后触发
        if (window.attachEvent){
          console.log('判断是兼容ie8及更早的兼容');
          iframe.attachEvent("onload", function(){
            console.log('判断是兼容ie8及更早的兼容执行函数');
            console.log("Local iframe is now loaded.", '1')
            console.log("加载完毕")
            var data = 'iframe-closebtn'
            iframe.contentWindow.postMessage(data,'*')
          })
        } else if(window.addEventListener){
          // iframe插件加载完毕
          console.log('判断是不是ie8以下或不是ie浏览器');
          iframe.addEventListener("load", function () {
            console.log('判断是不是ie8以下或不是ie浏览器执行函数');
            console.log("Local iframe is now loaded.", '2')
            console.log("加载完毕")
            var data = 'iframe-closebtn'
            iframe.contentWindow.postMessage(data,'*')
          }, false)
          // iframe.onload = function(){
          //   console.log('判断是不是ie8以下或不是ie浏览器执行函数');
          //   console.log("Local iframe is now loaded.", '2')
          //   console.log("加载完毕")
          //   var data = 'iframe-closebtn'
          //   iframe.contentWindow.postMessage(data,'*')
          // }
        }else {
          iframe.onload = function(){
            console.log('都不行');
            console.log("Local iframe is now loaded.", '2')
            console.log("都不行加载完毕")
            var data = 'iframe-closebtn'
            iframe.contentWindow.postMessage(data,'*')
          }
        }
        this.style.display = 'none'
        // closebtn.style.display = 'block'
    }
};
// 接受子页面的传值
if (window.attachEvent) {
  window.attachEvent('onmessage',function(event){
    //此处执行事件
    console.log(event);
    if (Boolean(event.data) === true) {
      iframe.style.display = 'none';
      imgdom.style.display = 'block'
      show = false
    }
  })
}else{
  window.addEventListener('message',function(event){
    //此处执行事件
    console.log(event);
    if (event.data === true) {
      iframe.style.display = 'none';
      imgdom.style.display = 'block'
      show = false
    }
  })
}
// closebtn.onclick= function(){
//     iframe.style.display = 'none';
//     imgdom.style.display = 'block'
//     this.style.display = 'none'
//     show = false
// };
