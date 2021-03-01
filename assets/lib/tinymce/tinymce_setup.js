// 学校配置好的：工作中可以直接用么！但是肯定得修改配置！
function initEditor() {
  tinymce.init({
    //选择class为content的标签作为编辑器
    selector: 'textarea',
    //方向从左到右
    directionality: 'ltr',
    //语言选择中文
    language: 'zh_CN',
    //高度为400
    height: 300,
    statusbar: false,
    width: '100%',
    //工具栏上面的补丁按钮
    plugins: [
      'advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code insertdatetime nonbreaking',
      'save table contextmenu directionality template paste textcolor',
      'codesample imageupload'
    ],
    //工具栏的补丁按钮
    toolbar: 'insertfile undo redo | \
       styleselect | \
       bold italic | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | \
       image | \
       preview | \
       forecolor emoticons |\
       codesample fontsizeselect |\
       imageupload',
    //字体大小
    fontsize_formats: '10pt 12pt 14pt 18pt 24pt 36pt',
    //按tab不换行
    nonbreaking_force_tab: true
      //   imageupload_url: '/user/submit-image'
  });
  // tinymce.init({
  //   selector: 'textarea',
  //   //skin:'oxide-dark',
  //   language: 'zh_CN',
  //   plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs',
  //   toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
  //   styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
  //   table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
  //   height: 650, //编辑器高度
  //   min_height: 400,
  //   /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
  //       '/static/reset.css',
  //       '/static/ax.css',
  //       '/static/css.css',
  //   ],*/
  //   fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
  //   font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
  //   link_list: [
  //     { title: '预置链接1', value: 'http://www.tinymce.com' },
  //     { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
  //   ],
  //   image_list: [
  //     { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
  //     { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
  //   ],
  //   image_class_list: [
  //     { title: 'None', value: '' },
  //     { title: 'Some class', value: 'class-name' }
  //   ],
  //   importcss_append: true,
  //   //自定义文件选择器的回调内容
  //   file_picker_callback: function(callback, value, meta) {
  //     if (meta.filetype === 'file') {
  //       callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
  //     }
  //     if (meta.filetype === 'image') {
  //       callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
  //     }
  //     if (meta.filetype === 'media') {
  //       callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
  //     }
  //   },
  //   autosave_ask_before_unload: false,
  // });
}