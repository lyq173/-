let layer = layui.layer;




$('#image').cropper({
  aspectRatio: 1 / 1, // 纵横比:正方形

  preview: '.img-preview' // 指定预览区的类名（css选择器字符串）
});


// ---------------------------------------------------上传图片
// 1.更换 【打开文件】按钮
$(".open-img").click(function() {
  $("#file").click();
});


// 2.当我们通过系统提供文件夹 打开某个图片时：
//   建议：收集起来！备注：生僻但是可能会用到的知识！
$("#file").change(function() {

  // 2.1.收集图片信息对象（不常用）回顾：formData 收集图片数据！fd.append("avatar",图片信息对象)
  let imgObj = this.files[0];

  // 2.2 把图片信息对象转化为临时地址字符串(了解)
  let src = URL.createObjectURL(imgObj);

  // 2.3 通过cropper插件把临时地址替换上! 页面中img比较已经经过cropper处理！（官方文档阅读）
  $('#image').cropper("replace", src);
});



// ---------------------------------------------------提交图片数据
// 接口：参数名avatar   值：string类名 base64位字符串！
// 前端：生成base64位字符串，一般是后台负责！
//       只能借助cropper插件，内部封装方法，得到base64位字符串
$(".sure").click(function() {

  // 1.准备数据：用插件 准备 base64位字符串；
  let canvas = $('#image').cropper('getCroppedCanvas', {
    width: 100,
    height: 100
  });
  let str = canvas.toDataURL('image/png');



  // 2.ajax提交数据
  $.ajax({
    url: "/my/update/avatar",
    type: "POST",
    data: {
      avatar: str,
    },
    success: function(res) {
      // 3.提交成功了
      layer.msg(res.message);

      if (res.status == 0) {
        window.parent.getInfo(); // 更新index页面 用户数据显示
      }
    }
  });




})