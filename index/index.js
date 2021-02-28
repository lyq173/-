let layer = layui.layer;

// token设计思想：
//   1.比如zs登录；转跳主页index.html
//   2.network请求：发现有很多url;   ls复制下,为ls所用！（ls不用注册账号）
//   3.要求：主页上所有url请求，必须在请求头携带上token值（当前用户凭证、临时身份证）！确保就是当前用户在使用接口！


// 问题1：其他用户没登录，直接地址栏输入index.html页面；直接转跳！不允许！
// 解决：如何判断 当前用户是登录过来？直接在地址栏输入的？判断有无token存在
// 原因：
//      用户登录过来，有token! 
//      直接输入过来，无token!
if (localStorage.getItem("token") == null) {
  location.href = "../login.html";
}


// 临时身份证token:
//    临时：某段时间内有效值！过了这段时间作废！
//    后台：那边会判断，正在请求url接口，刚好到了服务器，验证token过期！直接返回接口过期的数据！（了解）
// 问题2：zs去ls玩，zs登录账号！很长时间后，其他用户继续使用其他接口的时候，判断token过期！
// 解决：前端不管是否过期！看返回数据，有特别标注（文档），token过期！

// 知识：去哪看返回数据？$.ajax complete完成！不是成功！
//       返回有过期标识数据，也是个成功数据！不再success里面判断！
//       success：做返回正常数据业务！
//       complete：处理返回有明显标注token过期的数据业务！

// 代码：index页面内所有请求，都需要通过complete处理过期时间！



// 问题3：代码角度上，每个ajax加complete处理过期时间，浪费时间！
// 参考： 封装函数！非常好的想法！试下！
//        知识点：学习明天第一个 common.js 公共处理！









// **************************************************获取个人信息
function getInfo() {
  $.ajax({
    url: "/my/userinfo",
    // type:"get",
    success: function(res) {

      if (res.status == 0) {
        // 产品经理设计思路：
        //      1.名字：优先显示昵称，后则显示用户名！
        let name = res.data.nickname || res.data.username;
        $(".username").text(name);



        //      2.圆形：优先显示头像，后则显示名字的第一个字！
        if (res.data.user_pic != null) {
          // 图片base64图片流：
          //     好处：直接在HTML页面中，在页面中渲染，减少对服务器请求！
          //     弊端：处理图片流字符串，把图片大小增加为原来30%；前端HTML加载费劲！
          //     场景：处理小图；雪碧图；
          $(".userinfo img")
            .show().css("display", "inline-block").attr("src", res.data.user_pic);

          $(".avatar").hide();

        }
        //      名字第一个字！
        else {
          // 1.截取
          let str = name.substr(0, 1);

          // 2.大写：防止第一个字是英文！
          str = str.toUpperCase();

          // 3.设置
          $(".avatar")
            .show().css("display", "inline-block").text(str);

          $(".userinfo img").hide();
          //      show方法：给DOM添加行内样式 display: inline;
          //      需要：单独设置css样式
        }
      }









    },
    // token携带：去公共common.js
    // token过去验证：去公共common.js
    // 为什么要去公共common.js？
    //     因为除了登录和注册外，需要需要请求做这两事件
    //     这是重复性代码
    //     单独配置到JS文件内进行维护!

  });
}
getInfo();




// ***************************************************退出
// 设置：开发过程检查html结构
//      1.index首页----->所谓回到login.html
//      2.清空token;

$('#logout').on("click", function() {

  layer.confirm('您确认退出么?', { icon: 3, title: '提示' }, function(index) {
    layer.close(index);

    // 1.回到login.html
    location.href = "../login.html";

    // 2.清空token本次存储（？为什么 token管理）
    localStorage.removeItem("token");

  });


});