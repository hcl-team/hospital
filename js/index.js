//toast
function successToast () {
  toastr.success('提交数据成功');
}

//病历首页
$(function () {
  //提交、开立
  $('#homeSubmitBtn').on('click', () => {
    successToast();
  })
})


//检查申请方法
$(function () {
  //初始化
  function initTable() {
    let checkAll = $('#checkAll');
    let trs = $('#checkTbody tr');
    let tag = $('<td><input name="checkitem" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="checkitem"]');

    //给全选框添加事件
    checkAll.on('click', function (event) {
      if ($(this).prop('checked') == false) { //全部取消
        // console.log('false');
        $('#subTypeBtn').prop('disabled', true);
        $('input[name="checkitem"]').prop('checked', false);
      } else {
        // console.log('true');
        $('#subTypeBtn').prop('disabled', false);
        $('input[name="checkitem"]').prop('checked', true);
      }
    });

    //给每个单独的选择框加事件
    $('#checkTbody').on('click', function (event) {
      checks = $('input[name="checkitem"]');
      if (event.target.name == 'checkitem') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }
        //判断是否选满了
        if (checks.length == $('#checkTbody').find('input:checked').length) {
          checkAll.prop('checked', true);
        } else {
          checkAll.prop('checked', false);
        }

        //判断是否有选中
        if ($('#checkTbody').find('input:checked').length != 0) {
          $('#subTypeBtn').prop('disabled', false);
        } else {
          $('#subTypeBtn').prop('disabled', true);
        }

        //
        if ($("#checkTbody tr").length >= 1) {
          $('#checkSubmitBtn').prop('disabled', false);
        }
      }
    });
  }

  initTable();

  //新增点击事件
  $('#addTypeSubmit').on('click', function () {
    var html = '';
    html += '<tr class="active">';
    html += '<td><input name="checkitem" type="checkbox"/></td>'
    html += '<td><span>查血</span></td>';
    html += '<td><span>检验科</span></td>';
    html += '<td><span>未检查</span></td>';
    html += '<td><span>50</span></td>';
    html += '<td><span>暂无</span></td>'
    html += '<td><button type="button" class="btn btn-link p-0" data-toggle="modal" data-target="#resultModal">查看结果</button></td>';
    // html += '<td>';
    html += '</tr>';
    var html = $(html)
    $('#checkTbody').append(html);
    //取消全选
    $('#checkAll').prop('checked', false);
    $('#checkAll').prop('disabled', false);
    $('#checkSubmitBtn').prop('disabled', false);
    getCheckPriceSum();
  });

  $("#subTypeBtn").on('click', function () {
    /** 批量删除*/
    $("input[name='checkitem']:checked").each(function () {// 遍历选中的checkbox
      var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
      delRow(n);
    });
    getCheckPriceSum();
  });

  //删除选中行方法
  function delRow(n) {
    $("#checkTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行
    $('#subTypeBtn').prop('disabled', true);
    // console.log($("#checkTbody tr").length + '----' + n );
    // console.log($("#checkTbody tr").length == 0);
    //判断表格为空
    if ($("#checkTbody tr").length == 0) {

      $('#checkAll').prop('checked', false);
      $('#checkAll').prop('disabled', true);
      $('#subTypeBtn').prop('disabled', true);
      $('#checkSubmitBtn').prop('disabled', true);
    }
  }

  //提交、开立
  $('#checkSubmitBtn').on('click', () => {
    let tableHtml = $("#checkTbody");
    getCheckTableData(tableHtml);
    successToast();
  })

  //检查项价格总计
  function getCheckPriceSum() {
    let checkPriceSum = 0;
    $("#checkTbody").find('tr').each(function () {
      checkPriceSum += parseFloat($(this).find('td:eq(4) span').text());
    });
    $('#allCheckPrice').text(checkPriceSum)
  }

  //提交时获取表格内容
  function getCheckTableData(container) {
    let table = [];
    $(container).find('tr').each(function () {
      let row = [];
      $(this).find('td').each(function () {
        row.push($(this).text().trim());
      });
      table.push(row);
    });
    console.log(table);
  }
});

//开处方单方法
$(function () {
  //初始化
  function initTable2() {
    let checkAll = $('#drugCheckAll');
    let trs = $('#drugTbody tr');
    let tag = $('<td><input name="checkitem2" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="checkitem2"]');

    //给全选框添加事件
    checkAll.on('click', function (event) {
      if ($(this).prop('checked') == false) { //全部取消
        // console.log('false');
        $('#subDrugBtn').prop('disabled', true);
        $('input[name="checkitem2"]').prop('checked', false);
      } else {
        // console.log('true');
        $('#subDrugBtn').prop('disabled', false);
        $('input[name="checkitem2"]').prop('checked', true);
      }
    });

    //给每个单独的选择框加事件
    $('#drugTbody').on('click', function (event) {
      checks = $('input[name="checkitem2"]');
      if (event.target.name == 'checkitem2') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }
        //判断是否选满了
        if (checks.length == $('#drugTbody').find('input:checked').length) {
          checkAll.prop('checked', true);
        } else {
          checkAll.prop('checked', false);
        }

        //判断是否有选中
        if ($('#drugTbody').find('input:checked').length != 0) {
          $('#subDrugBtn').prop('disabled', false);
        } else {
          $('#subDrugBtn').prop('disabled', true);
        }

        //
        if ($("#drugTbody tr").length >= 1) {
          $('#drugSubmitBtn').prop('disabled', false);
        }
      }
    });
  }

  initTable2();

  //新增点击事件
  $('#addDrugSubmit').on('click', function () {
    var html = '';
    html += '<tr class="active">';
    html += '<td><input name="checkitem2" type="checkbox"/></td>'
    html += '<td><span class="drugName">复方甘露醇注射液(伸宁)</span></td>';
    html += '<td><span class="drugSpeci">250ml*1袋</span></td>';
    html += '<td><span class="drugPrice">15.56</span></td>';
    html += '<td><span class="drugUsage">静脉注射</span></td>';
    html += '<td><span class="drugSize">200ml</span></td>';
    html += '<td><span class="drugUseFrequ">一日一次</span></td>';
    html += '<td><span class="drugNum">1</span></td>';
    html += '<td><span class="drugDate">暂无</span></td>'
    html += '</tr>';
    var html = $(html)
    $('#drugTbody').append(html);
    //取消全选
    $('#drugCheckAll').prop('checked', false);
    $('#drugCheckAll').prop('disabled', false);
    $('#drugSubmitBtn').prop('disabled', false);
    getDrugPriceSum();
  });

  $("#subDrugBtn").on('click', function () {
    /** 批量删除*/
    $("input[name='checkitem2']:checked").each(function () {// 遍历选中的checkbox
      var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
      delRow2(n);
    });
    getDrugPriceSum();
  });

  //删除选中行方法
  function delRow2(n) {
    $("#drugTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行
    $('#subDrugBtn').prop('disabled', true);
    // console.log($("#checkTbody tr").length + '----' + n );
    // console.log($("#checkTbody tr").length == 0);
    //判断表格为空
    if ($("#drugTbody tr").length == 0) {

      $('#drugCheckAll').prop('checked', false);
      $('#drugCheckAll').prop('disabled', true);
      $('#subDrugBtn').prop('disabled', true);
      $('#drugSubmitBtn').prop('disabled', true);
    }
  }

  //提交、开立
  $('#drugSubmitBtn').on('click', () => {
    let tableHtml = $("#drugTbody");
    getDrugTableData(tableHtml);
    successToast();
  })

  //药品价格总计
  function getDrugPriceSum() {
    let drugSum = 0;
    $("#drugTbody").find('tr').each(function () {
      drugSum += parseFloat($(this).find('td:eq(3) span').text()) * parseInt($(this).find('td:eq(7) span').text());
    });
    $('#allDrugPrice').text(drugSum)
  }

  //提交时获取表格内容
  function getDrugTableData(container) {
    let table = [];
    $(container).find('tr').each(function () {
      let row = [];
      $(this).find('td').each(function () {
        row.push($(this).text().trim());
      });
      table.push(row);
    });
    // console.log(table);
  }

})


