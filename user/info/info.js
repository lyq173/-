let form = layui.form;
let layer = layui.layer;
// *****************************************************获取基本信息
// 设计：
//     1.用户名：disabled！不让大家去修改！不是昵称！
//     2.页面加载，获取曾经注册信息；
function get() {
  $.ajax({
    url: "/my/userinfo",
    success: function(res) {
      if (res.status == 0) {
        // 3.数据回填：表单赋值！
        form.val("info", res.data);


      }
    }
  });
}
get();



// *****************************************************提交数据
$(".layui-form").on("submit", function(e) {
  e.preventDefault();


  // 1.数据验证：不需要写！

  // 2.收集数据：form;
  let data = form.val("info");
  // HTML:  <input type="hidden" name="id"> 隐藏看不见表单元素，name="id"作用猜下：存放数据！
  // JS为什么要收集：接口要求！非要传个id?  确实这个数据是哪个用户的!


  // 3.提交数据
  $.ajax({
    url: "/my/userinfo",
    type: "POST",
    data: data,
    success: function(res) {
      if (res.status == 0) {
        layer.msg(res.message);

        // 4.商品需求：更新数据成功，index头部也需要跟着更新下！
        //   解决：需要让父级的 获取用户信息ajax 重新调用！
        //   代码：父级?!  window.parent  index页面
        //         获取用户信息ajax JS调用！
        //           回顾:全局变量和函数，是window属性和方法！
        //           封装函数，隶属于window，就让window调用方法！
        window.parent.getInfo();


        //   问题:没有iframe  window还有parent吗   试试！没有！

      }
    }
  })





});



// ****************************************************重置：回复到填写表一开始；
// 重置：发现昵称不想用，邮箱换个邮箱！重置：恢复到一开始的样子！页面加载完成时候！
// 置空：<button type="reset" class="layui-btn layui-btn-primary">重置</button> 
//      把保存id置空！默认自动置空不能用！

$(".reset").click(function(e) {
  e.preventDefault();

  // 获取用户数据 ajax重新调用！
  get();
});