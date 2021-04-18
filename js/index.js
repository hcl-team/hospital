//检查申请方法
$(function () {
  //初始化
  function initTable () {
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
    html += '<td><button type="button" class="btn btn-link p-0" data-toggle="modal" data-target="#resultModal">查看结果</button></td>';
    // html += '<td>';
    html += '</tr>';
    var html = $(html)
    $('#checkTbody').append(html);
    //取消全选
    $('#checkAll').prop('checked', false);
    $('#checkAll').prop('disabled', false);
    $('#checkSubmitBtn').prop('disabled', false);
  });

  $("#subTypeBtn").on('click', function () {
    /** 批量删除*/
    $("input[name='checkitem']:checked").each(function () {// 遍历选中的checkbox
      var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
      delRow(n);
    });
  });

  //删除选中行方法
  function delRow (n) {
    // console.log($("#checkTbody tr").length + '----' + n );
    //判断表格为空
    if ($("#checkTbody tr").length == n + 1) {
      $('#checkAll').prop('checked', false);
      $('#checkAll').prop('disabled', true);
      $('#subTypeBtn').prop('disabled', true);
      $('#checkSubmitBtn').prop('disabled', true);
    }
    $("#checkTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行

  }
});

//开处方单方法
$(function () {
  //初始化
  function initTable2 () {
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
    html += '<td><span>复方甘露醇注射液(伸宁)</span></td>';
    html += '<td><span>250ml*1袋</span></td>';
    html += '<td><span>15.56</span></td>';
    html += '<td><span>静脉注射</span></td>';
    html += '<td><span>200ml</span></td>';
    html += '<td><span>一日一次</span></td>';
    html += '<td><span>1</span></td>';
    html += '</tr>';
    var html = $(html)
    $('#drugTbody').append(html);
    //取消全选
    $('#drugCheckAll').prop('checked', false);
    $('#drugCheckAll').prop('disabled', false);
    $('#drugSubmitBtn').prop('disabled', false);
  });

  $("#subDrugBtn").on('click', function () {
    /** 批量删除*/
    $("input[name='checkitem2']:checked").each(function () {// 遍历选中的checkbox
      var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
      delRow2(n);
    });
  });

  //删除选中行方法
  function delRow2 (n) {
    // console.log($("#checkTbody tr").length + '----' + n );
    //判断表格为空
    if ($("#drugTbody tr").length == n + 1) {
      $('#drugCheckAll').prop('checked', false);
      $('#drugCheckAll').prop('disabled', true);
      $('#subDrugBtn').prop('disabled', true);
      $('#drugSubmitBtn').prop('disabled', true);
    }
    $("#drugTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行

  }
})

//toast
function successToast () {
  toastr.success('提交数据成功');
}

$('#checkSubmitBtn').on('click', () => {
  successToast();
})

$('#homeSubmitBtn').on('click', () => {
  successToast();
})

$('#drugSubmitBtn').on('click', () => {
  successToast();
})
