let form = layui.form;
// **********************************************1.加载类别数据
$.ajax({
  url: "/my/article/cates",
  success: function(res) {
    if (res.status == 0) {
      let str = "";

      res.data.forEach(item => {
        str += `<option value="${item.Id}">${item.name}</option>`
      });

      $("select").html(str);

      // 表单的重新渲染：更新渲染！
      form.render('select');
    }
  }
})



// **************************************************2.单独封装JS文件
// 里面配置：http://tinymce.ax-z.cn/quick-start.php
initEditor(); // 因为代码太多，所有单独封装一个函数在文件中；



// ***************************************************图片裁剪
// 1.插件初始化 ：需要找插件文档
$('#image').cropper({
  // 宽高比例
  aspectRatio: 400 / 280, // 产品：400 / 280
  // 预览区容器的类名
  preview: '.img-preview'
});

// 2.JS更换 样式不好按钮
$(".btnimg").click(function() {
  $("#file").click();
});

// 3.input:flie 标签注册change事件
$("#file").change(function() {

  // 图片对象
  let imgObj = this.files[0];

  // 把图片信息对象转化为临时地址字符串(了解)
  let src = URL.createObjectURL(imgObj);

  // 通过cropper插件把临时地址替换上!
  $('#image').cropper("replace", src);
});



// **********************************************************表单提交
// 要求：FormData提交数据：
// 如何：HTML：name属性=参数名
//       JS ：let fd = new FormData(原生form节点) 
//       JS：$.ajax 专门配置 不编码 不默认！false

$(".layui-form").on("submit", function(e) {
  e.preventDefault();

  // 收集数据：标题、下拉框、状态；
  //           图片和文本收集不到,单独收集 : fd.append();
  let fd = new FormData(this);

  // -**************************文本内容：
  // append:  插入新的键值对！
  // set:     对已经存在键值对，做修改！content参数名："";

  // 文本域：已经被插件处理，插件方法！收集起来：
  //        tinyMCE：插件封装对象
  //        active：当前的  Editor：编辑器
  //        get：   得到       Content：其内容
  fd.set("content", tinyMCE.activeEditor.getContent());



  // ***************************图片：
  // FormData：主要收集大段文字和图片（对象）
  // 图片：被插件处理！

  let canvas = $('#image').cropper('getCroppedCanvas', {
    width: 400,
    height: 280 // 产品经理
  });

  // canvas：获取base64字符串
  //       ：获取图片要求对象
  canvas.toBlob(function(obj) { // cropper插件文档；

    // 收集图片信息：
    fd.append("cover_img", obj);



    // 提交数据:FormData传参方式！
    $.ajax({
      url: "/my/article/add",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: function(res) {}
    })

  });








})