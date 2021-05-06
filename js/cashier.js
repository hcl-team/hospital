//医疗缴费
$(function () {
  //初始化
  function initTable() {
    // let checkAll = $('#checkAll');
    let trs = $('#medicalTbody tr');
    let tag = $('<td><input name="medicalCheckItem" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="medicalCheckItem"]');

    //给每个单独的选择框加事件
    $('#medicalTbody').on('click', function (event) {
      checks = $('input[name="medicalCheckItem"]');
      if (event.target.name == 'medicalCheckItem') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }

        //判断是否有选中
        if ($('#medicalTbody').find('input:checked').length != 0) {
          $('#allMedicalFee').prop('disabled', false);
        } else {
          $('#allMedicalFee').prop('disabled', true);
        }

      }
    });
  }

  initTable();

  /*
    * 缴费后修改属性
    */

  //多项缴费
  $("#allMedicalFeeSubmitModal").on('click', function () {
    let table = [];
    $("input[name='medicalCheckItem']:checked").each(function () {
      let n = $(this).parents("tr");
      n.each(function () {
        let row = [];
        $(this).find('td').each(function () {
          row.push($(this).text().trim());
        });
        table.push(row);
      });
      medicalFn(this);
      $('#allMedicalFee').prop('disabled', true);
    });
    // console.log(table);
  });

  // 单项缴费
  $("#medicalTbody button").on("click", function () {
    $('#singleMedicalFeeModal').modal('show')
    let sta = this;
    $("#singleMedicalFeeSubmitModal").on("click", function () {
      medicalFn(sta);
    })
  })

  // 缴费样式设置
  function medicalFn(sta) {
    let n = $(sta).parents("tr");
    n.find("td:first input").prop("checked", false);
    n.find("td:first input").prop("disabled", true);
    n.find("td:eq(6)").prop("class", "text-success");
    n.find("td:eq(6)").text("已缴费");
    n.find("td:last button").prop("disabled", true);
  }

  //筛选
  $('#cashierSelect').on('change', function () {
    let value = $('#cashierSelect option:selected').val();
    // console.log(value);
    $('#medicalTbody tr').hide().filter(":contains('" + value + "')").show();
  })

  //新增点击事件
  // $('#addTypeSubmit').on('click', function () {
  //   var html = '';
  //   html += '<tr class="active">';
  //   html += '<td><input name="checkitem" type="checkbox"/></td>'
  //   html += '<td><span>查血</span></td>';
  //   html += '<td><span>检验科</span></td>';
  //   html += '<td><span>未检查</span></td>';
  //   html += '<td><span>50</span></td>';
  //   html += '<td><button type="button" class="btn btn-link p-0" data-toggle="modal" data-target="#resultModal">查看结果</button></td>';
  //   // html += '<td>';
  //   html += '</tr>';
  //   var html = $(html)
  //   $('#checkTbody').append(html);
  //   //取消全选
  //   $('#checkAll').prop('checked', false);
  //   $('#checkAll').prop('disabled', false);
  //   $('#checkSubmitBtn').prop('disabled', false);
  // });


});

//药品缴费
$(function () {
  //初始化
  function initTable() {
    // let checkAll = $('#checkAll');
    let trs = $('#payDrugTbody tr');
    let tag = $('<td><input name="payDrugCheckItem" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="payDrugCheckItem"]');

    //给每个单独的选择框加事件
    $('#payDrugTbody').on('click', function (event) {
      checks = $('input[name="payDrugCheckItem"]');
      if (event.target.name == 'payDrugCheckItem') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }

        //判断是否有选中
        if ($('#payDrugTbody').find('input:checked').length != 0) {
          $('#allDrugFee').prop('disabled', false);
        } else {
          $('#allDrugFee').prop('disabled', true);
        }

      }
    });
  }

  initTable();

  /**
   * 缴费后修改属性
   */

  //多项缴费
  $("#allDrugFeeSubmitModal").on('click', function () {
    let table = [];
    $("input[name='payDrugCheckItem']:checked").each(function () {
      let n = $(this).parents("tr");
      n.each(function () {
        let row = [];
        $(this).find('td').each(function () {
          row.push($(this).text().trim());
        });
        table.push(row);
      });
      medicalFn(this);
      $('#allDrugFee').prop('disabled', true);
    });
    // console.log(table);
  });

  // 单项缴费
  $("#payDrugTbody button").on("click", function () {
    $('#singleDrugFeeModal').modal('show')
    let sta = this;
    $("#singleDrugFeeSubmitModal").on("click", function () {
      medicalFn(sta);
    })
  })

  // 缴费样式设置
  function medicalFn(sta) {
    let n = $(sta).parents("tr");
    n.find("td:first input").prop("checked", false);
    n.find("td:first input").prop("disabled", true);
    n.find("td:eq(6)").prop("class", "text-success");
    n.find("td:eq(6)").text("已缴费");
    n.find("td:last button").prop("disabled", true);
  }

  //筛选
  $('#payDrugSelect').on('change', function () {
    let value = $('#payDrugSelect option:selected').val();
    // console.log(value);
    $('#payDrugTbody tr').hide().filter(":contains('" + value + "')").show();
  })
});
