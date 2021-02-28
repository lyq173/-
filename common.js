$.ajaxPrefilter(function(obj) {
    // 
  
    // 目标：
    //    1.根路径不能写死！
    obj.url = "http://ajax.frontend.itheima.net" + obj.url;
  
  
  
    // 包含/my  url地址
    if (obj.url.indexOf("/my") != -1) {
  
      // 2.每个index页面中包含ajax：请求头里面携带了token！
      obj.headers = {
        Authorization: localStorage.getItem("token")
      };
  
      // 3.有可能是过期！complete：不想在每个ajax都写！配置下:不是所有的请求都需要配置的！
      obj.complete = function(xhr) {
        // 后台设置：token失败，返回都是下面数据：1 身份认证失败
        let obj = JSON.parse(xhr.responseText);
  
        if (obj.status == 1 && obj.message == "身份认证失败！") {
          //
          // 1.回到login.html
          location.href = "../login.html";
  
          // 2.同时清除过期token
          localStorage.removeItem("token");
        }
      }
    }
  
  });