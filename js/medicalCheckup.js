//取药
$(function () {
  /*
    * 操作后修改属性
    */

  // 单项检查
  $("#medicalCheckupTbody button").on("click", function () {
    $('#singleMedicalCheckupModal').modal('show')
    let sta = this;
    $("#singleMedicalCheckupSubmitModal").on("click", function () {
      medicalFn(sta);
    })
  })

  // 操作后样式设置
  function medicalFn(sta) {
    let n = $(sta).parents("tr");
    n.find("td:eq(4)").prop("class", "text-success");
    n.find("td:eq(4)").text("已检查");
    n.find("td:last button").prop("disabled", true);
  }

  //筛选
  $('#medicalCheckupSelect').on('change', function () {
    let value = $('#medicalCheckupSelect option:selected').val();
    // console.log(value);
    $('#medicalCheckupTbody tr').hide().filter(":contains('" + value + "')").show();
  })
});
