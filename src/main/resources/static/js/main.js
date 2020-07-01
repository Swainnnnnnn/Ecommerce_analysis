$(document).ready(function() {
    var LostUser_Element_Model = new Vue({
        el:"#nav",
        methods: {

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }, handleOpen(key, keyPath) {
                console.log(key, keyPath);
          },handleSelect(key, keyPath) {
                console.log(key, keyPath);
                //key   el-menu-item 的index
                $('.data_table').removeClass("data_table_selected");
                $(".data_table").eq(key-1).addClass('data_table_selected');
                console.log(key,keyPath)
            }
        }
    });


});