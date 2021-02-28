let form = layui.form;
// 要求：
//    1.长度  6-12 非空；
//    2.新密码和旧密码不能一致！
//    3.新密码  和 再次输入 必须保持一致！


// 问题：输入框要不要改成  type = text？
// 解答：不建议，因为不安全！


// 问题：复制出来粘贴看？
// 解答：表单元素发明的时候考虑到这个问题，不让你复制！




form.verify({
  // 长度 6~12 位，且不能出现空格
  changdu: function(value, dom) {
    let reg = /^\S{6,12}$/;
    if (reg.test(value) == false) {
      return "密码必须6到12位，且不能出现空格";
    }
  },

  // 新密码 和 确认密码 必须一致   same设置给谁？设置确认密码
  same: function(value, dom) {
    // value：谁的value？确认密码的值
    // 新密码值： 设置类名.val(); 
    if ($(".newPwd").val() != value) {
      return "新密码和重复密码必须一致!"
    }
  },

  // 旧密码 和 新密码 不能一样！   diff设置给谁？设置新密码！
  diff: function(value, dom) {
    // value：谁的value？新密码！
    // 旧密码值： 设置类名.val(); 
    if ($(".oldPwd").val() == value) {
      return "旧密码和新密码不能相同!"
    }
  },

});






// ************************************************提交数据
$(".layui-form").on("submit", function(e) {
  e.preventDefault();


  // 1.表单验证：开文档！  


  // 2.收集数据
  let data = form.val("pwd");


  // 3.提交数据
  $.ajax({
    url: "/my/updatepwd",
    type: "POST",
    data: data,
    success: function(res) {
      layer.msg(res.message); // 无论修改成功或失败，都应该提醒
      if (res.status == 0) {

        $('form')[0].reset(); // 是否置空！
      }
    }
  })





});