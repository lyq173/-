let layer = layui.layer;
let form = layui.form;
// 整个例子：ajax带弹窗班  todolist 
// 回顾：   todolist面试题，从头敲出来！
// ******************************************************列表加载
function getList() {
  $.ajax({
    url: "/my/article/cates",
    success: function(res) {
      if (res.status == 0) {
        let str = "";
        res.data.forEach(item => {
          str += `<tr>
                <td>${item.name}</td>
                <td>${item.alias}</td>
                <td>
                  <button type="button" class="layui-btn layui-btn-xs btnEdit" _id=${item.Id} _name=${item.name} _alias=${item.alias}>编辑</button>
                  <button type="button" class="layui-btn layui-btn-xs layui-btn-danger btnDelete" del_id=${item.Id}>删除</button>
                </td>
              </tr>`;
        });

        $("tbody").html(str);
      }
    }
  })
}
getList();



// ------------------------------------------------------添加类别
// 1.准备弹窗内容
let add_str = `<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;">
                <div class="layui-form-item">
                  <label class="layui-form-label">类别名称</label>
                  <div class="layui-input-block">
                    <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">类别别名</label>
                  <div class="layui-input-block">
                    <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-input-block">
                    <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
                    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                  </div>
                </div>
              </form>`;


// 2.点击后有弹窗：
$(".add").click(function() {


  // 弹窗：非常常用知识！
  layer.open({
    type: 1, // 页面层，弹窗内部设置一些页面结构 HTML结构！
    title: '添加类别', // 左上角显示标题
    area: ['500px', '250px'], // area区域：弹窗宽和高！
    content: add_str, // content:内容？弹窗的内容！HTML结构字符串！

    // 当弹窗弹出成功时调用这个函数：
    success: function(dom, index) {
      // dom 弹窗dom节点！
      // index:弹窗标识；
      // 提交事件： 弹窗成功后：在此函数内部可以获取 form表单元素
      addSub(index);
    }
  });


  // 提交事件：有可能就获取不到form;此时form还是字符串，不是DOM节点！
});



// 3.点击弹窗内确认执行提交：
function addSub(numb) {
  $(".add-form").on("submit", function(e) {
    e.preventDefault();

    // 1.收集数据
    let data = $(this).serialize();

    // 2.ajax提交
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data: data,
      success: function(res) {
        layer.msg(res.message);
        if (res.status == 0) {
          // 再次调用列表接口：
          getList();

          // 关闭弹窗：
          layer.close(numb);
        }
      }
    })

  });
}



// -------------------------------------------------------删除
// 步骤：
//    1.注册点击：如何注册？直接给所有删除按钮注册？还是怎么？事件委托！
//      $(".btnDelete")为什么获取不到？先获取，再渲染！

$("tbody").on("click", ".btnDelete", function(e) {

  //  2.获取对应删除数据id值；
  //     2.1 回到初始化渲染，删除和id绑定在一起！
  //     2.2 自定义属性获取，
  let id = $(this).attr("del_id");


  //  3.删除对应数据 看接口文档  /my/article/deletecate/:id 动态接口
  $.ajax({
    url: "/my/article/deletecate/" + id,
    success: function(res) {
      layer.msg(res.message);
      if (res.status == 0) {
        getList();
      }
    }
  });
});



// ---------------------------------------------------------编辑
// 步骤：
//    1.准备编辑HTML结构的字符串：从新增复制过来！
let edit_str = `<form class="layui-form edit-form" action="" style="margin: 30px; margin-left: 0px;" lay-filter="edit">
                <div class="layui-form-item">
                  <label class="layui-form-label">类别名称</label>
                  <div class="layui-input-block">
                    <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">类别别名</label>
                  <div class="layui-input-block">
                    <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-input-block">
                    <input type="hidden" name="Id">
                    <button class="layui-btn" lay-submit lay-filter="formDemo">确认修改</button>
                  </div>
                </div>
                
              </form>`;


//    2..注册点击：如何注册？事件委托！弹窗代码
$("tbody").on("click", ".btnEdit", function() {

  layer.open({
    type: 1,
    title: '修改类别',
    area: ['500px', '250px'],
    content: edit_str,

    // 当弹窗弹出成功时调用这个函数：
    success: (dom, index) => {


      // 3.1 表单赋值！
      //       1.form.val(); 准备数据对象：{需要：获取 点击编辑 对应这条数据 }
      //       2.对应这条数据：如何获取；删除的时候，id是怎么拿的？
      //       3.回到渲染地方，设置自定义属性  id  name  别名; (3个)
      let Id = $(this).attr("_id");
      let name = $(this).attr("_name");
      let alias = $(this).attr("_alias");
      form.val("edit", {
        name,
        alias,
        Id,
      });



      // 3.2提交数据：提交修改，知道修改的是哪个数据？根据Id;
      editSub(index);
    }
  });

});


//    3.弹窗成功出现：
//        3.1 表单赋值！
//        3.2 注册提交事件：单独封装函数！
function editSub(numb) {
  $(".edit-form").on("submit", function(e) {
    e.preventDefault();

    // 1.收集数据
    let data = $(this).serialize();

    // 2.ajax提交
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data: data,
      success: function(res) {
        layer.msg(res.message);
        if (res.status == 0) {
          // 再次调用列表接口：
          getList();

          // 关闭弹窗：
          layer.close(numb);
        }
      }
    })

  });
}


// 箭头函数:内部this指向===>没有自己的this,一定上个作用域this;