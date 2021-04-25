//取药
$(function () {
  //初始化
  function initTable() {
    // let checkAll = $('#checkAll');
    let trs = $('#takeMedicineTbody tr');
    let tag = $('<td><input name="takeMedicineItem" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="takeMedicineItem"]');

    //给每个单独的选择框加事件
    $('#takeMedicineTbody').on('click', function (event) {
      checks = $('input[name="takeMedicineItem"]');
      if (event.target.name == 'takeMedicineItem') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }

        //判断是否有选中
        if ($('#takeMedicineTbody').find('input:checked').length != 0) {
          $('#allTakeMedicine').prop('disabled', false);
        } else {
          $('#allTakeMedicine').prop('disabled', true);
        }

      }
    });
  }

  initTable();

  /*
    * 操作后修改属性
    */

  //多项取药
  $("#allTakeMedicineSubmitModal").on('click', function () {
    $("input[name='takeMedicineItem']:checked").each(function () {
      medicalFn(this);
      $('#allTakeMedicine').prop('disabled', true);
    });
  });

  // 单项取药
  $("#takeMedicineTbody button").on("click", function () {
    $('#singleTakeMedicineModal').modal('show')
    let sta = this;
    $("#singleTakeMedicineSubmitModal").on("click", function () {
      medicalFn(sta);
    })
  })

  // 取药样式设置
  function medicalFn(sta) {
    let n = $(sta).parents("tr");
    n.find("td:first input").prop("checked", false);
    n.find("td:first input").prop("disabled", true);
    n.find("td:eq(5)").prop("class", "text-success");
    n.find("td:eq(5)").text("已取药");
    n.find("td:last button").prop("disabled", true);
  }

  //筛选
  $('#takeMedicineSelect').on('change', function () {
    let value = $('#takeMedicineSelect option:selected').val();
    // console.log(value);
    $('#takeMedicineTbody tr').hide().filter(":contains('" + value + "')").show();
  })
});
