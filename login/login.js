let layer = layui.layer;
let form = layui.form;


// ------------------------------------------切换
// 去注册
$("#goto-register").on("click", function() {
  $("#login").hide();
  $("#register").show();
});
// 去登录
$("#goto-login").on("click", function() {
  $("#login").show();
  $("#register").hide();
});





// -----------------------------------------验证
// 需求：
//    1. 用户名、密码、重复密码不能为空  
//    2. 密码、重复密码   长度 6~12 位，且不能出现空格：   非空格类字符；\S
//    3. 密码 和 重复密码 必须一致 

form.verify({
  // 长度 6~12 位，且不能出现空格
  changdu: function(value, dom) {
    let reg = /^\S{6,12}$/;
    if (reg.test(value) == false) {
      return "密码必须6到12位，且不能出现空格";
    }
  },

  // 密码 和 重复密码 必须一致   same设置给谁？设置重复密码
  same: function(value, dom) {
    // value：谁的value？重复密码的值
    // 验证：获取密码值！密码的值 如何获取?  设置类名.val(); 
    //       可以不写正则！
    if ($(".pwd").val() != value) {
      return "密码和重复密码必须一致!"
    }
  },

  // 简写：数组[正则、不满足时文字提醒]
  // pass: [
  //   /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  // ]
});



// -------------------------------------------注册
// html：form表单！按钮/表单元素 name属性和参数名一致！
// JS ：收集数据！$.ajax()
$("#register form").on("submit", function(e) {
  e.preventDefault();

  // 1.收集数据  JQ  layui.form模块
  let data = $(this).serialize();


  // 2.提交数据
  $.ajax({
    url: "/api/reguser",
    type: "POST",
    data: data,
    success: function(res) {
      layer.msg(res.message);

      if (res.status == 0) {
        // 去登录！
        $("#goto-login").click();

        // 注册表单重置！
        $("#register form")[0].reset();
      }


    }
  })



});



// -------------------------------------------登录
$("#login form").on("submit", function(e) {
  e.preventDefault();

  // 1.收集数据  JQ  layui.form模块
  let data = $(this).serialize();


  // 2.提交数据
  $.ajax({
    url: "/api/login",
    type: "POST",
    data: data,
    success: function(res) {
      // res.token值设计思路，
      //   1.比如zs登录；转跳主页index.html
      //   2.network请求：url; 复制下 为我所用！
      //   3.要求：主页上所有url请求，必须在请求头携带上token值（当前用户凭证）！确保就是当前用户在使用接口！

      // 代码：
      //   1. 拿到token:res.token;(应该怎么处理，一会其他地方就可以用？存本地！)
      //   2. 一会转跳index.html  所有请求要用到token;
      layer.msg(res.message);
      if (res.status == 0) {
        location.href = "../index.html";
        localStorage.setItem("token", res.token);
      }

    }
  })


});