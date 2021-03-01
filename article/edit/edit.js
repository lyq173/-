// ********************************************复制 发布初始化 js
let form = layui.form;
// 1.加载类别数据
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


// 2.富文本编辑器
initEditor();


// 3.裁剪插件
$('#image').cropper({
  // 宽高比例
  aspectRatio: 400 / 280, // 产品：400 / 280
  // 预览区容器的类名
  preview: '.img-preview'
});


$(".btnimg").click(function() {
  $("#file").click();
});

$("#file").change(function() {

  // 图片对象
  let imgObj = this.files[0];

  // 把图片信息对象转化为临时地址字符串(了解)
  let src = URL.createObjectURL(imgObj);

  // 通过cropper插件把临时地址替换上!
  $('#image').cropper("replace", src);
});


// **********************************************表单赋值！
// 1. 文章的id：怎么设置？在页面路径上，页面路径如何获取？
let str = location.href;
let arr = str.split("=");
let id = arr[1];


// 2. 拿到对应文章数据 ajax请求
$.ajax({
  url: "/my/article/" + id,
  success: function(res) {
    if (res.status == 0) {


      // 3. form.val();表单赋值
      form.val("edit", res.data);
      // 图片被插件处理了，又是单独设置：
      $('#image').cropper("replace", 'http://ajax.frontend.itheima.net' + res.data.cover_img);


    }
  }
});



// ********************************************** 修改后提交数据
$(".layui-form").on("submit", function(e) {
  e.preventDefault();

  // 收集数据：标题、下拉框、状态；
  let fd = new FormData(this);
  fd.append("Id", id);

  // 内容
  fd.set("content", tinyMCE.activeEditor.getContent());



  // 图片：
  let canvas = $('#image').cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  });
  canvas.toBlob(function(obj) {

    fd.append("cover_img", obj);


    // 提交数据:FormData传参方式！
    $.ajax({
      url: "/my/article/edit",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: function(res) {
        layer.msg(res.message)


        // 产品设计：页面转跳文章列表页面
        if (res.status == 0) {
          let a_list = window.parent.document.querySelector(".my_list");
          a_list.click(); // 模拟a点击行为
        }

      }
    })

  });


});



// 拓展：我作为开发者，我会怎么办！
//   1.编辑页面和新增页面：本质是一个！（新增和修改是一个页面）

//   2.JS代码不一样！
//      新增： a href属性="xxxx.html?key=add"
//      编辑   a href属性="xxxx.html?key=edit&id=10454"

//   3.JS代码：可以通过地址参数，知道页面是干啥来的？
//     key =add : 新增
//     key=edit ：编辑
//     同样代码：不用区分了！


// 强大：初学，分着来！毕竟涉及两块代码写在一起！尽量优化，混乱！