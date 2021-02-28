let layer = layui.layer;
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
                  <button type="button" class="layui-btn layui-btn-xs btnEdit">编辑</button>
                  <button type="button" class="layui-btn layui-btn-xs layui-btn-danger btnDelete">删除</button>
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
let add_str = `<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
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