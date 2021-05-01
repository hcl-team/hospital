//toast
function successToast () {
  toastr.success('添加成功');
}

//药品管理方法
$(function () {
  //初始化
  function initTable2 () {
    let checkAll = $('#manageCheckAll');
    let trs = $('#manageDrugTbody tr');
    let tag = $('<td><input name="manageCheckItem" type="checkbox"/></td>');
    trs.prepend(tag);

    //得到tbody中的所有选框.
    let checks = $('input[name="manageCheckItem"]');

    //给全选框添加事件
    checkAll.on('click', function (event) {
      if ($(this).prop('checked') == false) { //全部取消
        // console.log('false');
        $('#batchDrugDel').prop('disabled', true);
        $('input[name="manageCheckItem"]').prop('checked', false);
      } else {
        // console.log('true');
        $('#batchDrugDel').prop('disabled', false);
        $('input[name="manageCheckItem"]').prop('checked', true);
      }
    });

    //给每个单独的选择框加事件
    $('#manageDrugTbody').on('click', function (event) {
      checks = $('input[name="manageCheckItem"]');
      if (event.target.name == 'manageCheckItem') {
        if ($(this).prop('checked') == false) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }
        //判断是否选满了
        if (checks.length == $('#manageDrugTbody').find('input:checked').length) {
          checkAll.prop('checked', true);
        } else {
          checkAll.prop('checked', false);
        }

        //判断是否有选中
        if ($('#manageDrugTbody').find('input:checked').length != 0) {
          $('#batchDrugDel').prop('disabled', false);
        } else {
          $('#batchDrugDel').prop('disabled', true);
        }
      }
    });
  }

  initTable2();

  //新增点击事件
  $('#addDrugSubmit').on('click', function () {
    var html = '';
    html += '<tr class="active">';
    html += '<td><input name="manageCheckItem" type="checkbox"/></td>';
    html += '<td><span class="manageDrugID">9090980</span></td>';
    html += '<td><span class="manageDrugName">' + $('#manageDrugName').val() + '</span></td>';
    html += '<td><span class="manageDrugSpeci">' + $('#manageDrugSpeci').val() + '</span></td>';
    html += '<td><span class="manageDrugUnit">' + $('#manageDrugUnit').val() + '</span></td>';
    html += '<td><span class="manageDrugPrice">' + $('#manageDrugPrice').val() + '</span></td>';
    html += '<td><span class="manageDrugType">' + $('#manageDrugType').val() + '</span></td>';
    html += '<td class="text-center">' +
      '<button type="button" class="btn btn-success py-1 mr-1" name="editDrugItem" data-toggle="modal" data-target="#editDrugModal">编辑</button>' +
      '<button type="button" class="btn btn-danger py-1" name="delDrugItem" data-toggle="modal" data-target="#singleDrugDelModal">删除</button>' +
      '</td>';
    html += '</tr>';
    var html = $(html)
    $('#manageDrugTbody').append(html);
    //取消全选
    $('#manageCheckAll').prop('checked', false);
    $('#manageCheckAll').prop('disabled', false);
    successToast();
  });

  $("#batchDrugDel").on('click', function () {
    /** 批量删除*/
    $('#batchDrugDelModal').modal('show');
    $("#batchDrugDelModalSubmit").on("click", function () {
      $("input[name='manageCheckItem']:checked").each(function () {// 遍历选中的checkbox
        var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
        delRow2(n);
      });
    })
  });

  //单项删除
  /**
   * 这里暂时存在一个问题，添加一项之后，删除功能无法触发，添加之前是可以的
   * */
  $("#manageDrugTbody").find("button[name='delDrugItem']").on("click", function () {
    $('#singleDrugDelModal').modal('show');
    let sta = this;
    console.log(sta);
    $("#singleDrugDelModalSubmit").on("click", function () {
      delRow(sta);
    })
  })

  //删除当前行方法
  function delRow (sta) {
    let n = $(sta).parents("tr").index();
    $("#manageDrugTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行
    //判断表格为空
    if ($("#manageDrugTbody tr").length == 0) {
      $('#manageCheckAll').prop('checked', false);
      $('#manageCheckAll').prop('disabled', true);
    }
  }

  //删除选中行方法
  function delRow2 (n) {
    $("#manageDrugTbody").find("tr:eq(" + n + ")").remove(); //移除选中的行
    $('#batchDrugDel').prop('disabled', true);
    // console.log($("#checkTbody tr").length + '----' + n );
    // console.log($("#checkTbody tr").length == 0);
    //判断表格为空
    if ($("#manageDrugTbody tr").length == 0) {
      $('#manageCheckAll').prop('checked', false);
      $('#manageCheckAll').prop('disabled', true);
      $('#batchDrugDel').prop('disabled', true);
    }
  }

  //模糊查询
  $('#drugSearchBtn').on('click', function () {
    let value = $('#drugSearchTxt').val();
    // console.log(value);
    $('#manageDrugTbody tr').hide().filter(":contains('" + value + "')").show();
  })
})
