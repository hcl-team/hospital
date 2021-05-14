$('#registration').bootstrapValidator({

  message: '此值无效!',
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  fields: {
    userName: {
      validators: {
        notEmpty: {
          message: '姓名不能为空！'
        },
        stringLength: {
          min: 2,
          message: '用户名长度必须大于2！'
        },
        regexp: {
          regexp: /^[a-zA-Z\u4e00-\u9fa5]+$/,
          message: '用户名不能有数字和字符！'
        }
      },
    },
    personalID: {
      validators: {
        notEmpty: {
          message: '身份证号码不能为空！'
        },
        regexp: {
          regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          message: '身份证号码格式不正确，为15位和18位身份证号码！'
        },
        callback: {/*自定义，可以在这里与其他输入项联动校验*/
          message: '身份证号码无效！',
          callback: function (value, validator, $field) {
            //15位和18位身份证号码的正则表达式
            var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            //如果通过该验证，说明身份证格式正确，但准确性还需计算
            var idCard = value;
            if (regIdCard.test(idCard)) {
              if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                  idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }
                var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);//得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                  if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("恭喜通过验证啦！");
                  } else {
                    return false;
                    //alert("身份证号码错误！");
                  }
                } else {
                  //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                  if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                  } else {
                    return false;
                    //alert("身份证号码错误！");
                  }
                }
              }
            } else {
              //alert("身份证格式不正确!");
              return false;
            }
          }
        }
      }
    },
    address: {
      validators: {
        notEmpty: {
          message: '地址不能为空'
        },
      }
    },
    dept: {
      trigger: 'change',
      validators: {
        callback: {
          message: '请选择科室',
          callback: function (value, validator) {
            if (value == "") { //空是--请选择--选项
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  }
});

$("#personalID").blur(function () {

  //出生日期
  var ele = $("#personalID").val();
  var birth = ele.substring(6, 10) + "/" + ele.substring(10, 12) + "/" + ele.substring(12, 14);
  // console.log(birth);

  // 性别
  var sex = "";
  if (parseInt(ele.substr(16, 1)) % 2 == 1) {
    sex = "男";
  } else {
    sex = "女";
  }
  // console.log(sex);

  //年龄
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var age = myDate.getFullYear() - ele.substring(6, 10) - 1;
  if (ele.substring(10, 12) < month || ele.substring(10, 12) == month && ele.substring(12, 14) <= day) {
    age++;
  }
  // console.log(age);

  //处理默认初始值
  if ($("#personalID").val() == "") {
    $("#age").val("");
    $("#birth").val("");
    $("#sex").val("");
  } else {
    $("#age").val(age);
    $("#birth").val(birth);
    $("#sex").val(sex);
  }
})

$(function () {
  $("#printCheck").on("click", function () {
    if ($("input[type='checkbox']").prop('checked')) {
      $("#money").val(9);
    } else {
      $("#money").val(8);
    }
  })

  // 获取当前日期
  function getNowDate() {
    //判断是否在前面加0
    function getNow(s) {
      return s < 10 ? '0' + s: s;
    }

    var myDate = new Date();

    var year=myDate.getFullYear();        //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var day=myDate.getDate();            //获取当前日

    var date = getNow(year) + "/" + getNow(month) + "/" + getNow(day)

    $("#visitDate").val(date)
  }
  // 调用获取当前日期方法
  getNowDate();

})

// 获取查询条件  可以被公用
function getLoadCondition(){
  var jsonCondition = {}; // 拼接需要传输的参数

  let msgArr = [
    {
      name: 'userName',
      message: '姓名未填写'
    },
    {
      name: 'personalID',
      message: '身份证未填写'
    },
    {
      name: 'age',
      message: '年龄未填写'
    },
    {
      name: 'sex',
      message: '性别未填写'
    },
    {
      name: 'birth',
      message: '出生日期未填写'
    },
    {
      name: 'address',
      message: '家庭地址未填写'
    },
  ]
  // 循环获取所有的 文本框 input[type=text]
  $("#registration input[type=text]").each(function(){
    if($.trim($(this).val()) != ''){
      jsonCondition[$(this).attr('name')]= $.trim($(this).val());
    } else {
      jsonCondition[$(this).attr('name')]= "";
      msgArr.forEach((item, index) => {
        if (item.name == $(this).attr('name')) {
          toastr.warning(item.message);
          console.log(item.message);
        }
      })
    }
  });

  // 循环获取所有的 单选框 input[type=radio]:checked
  $("#registration input[type=radio]:checked").each(function(){
    if($.trim($(this).val()) != ''){
      jsonCondition[$(this).attr('name')]= $.trim($(this).val());
    } else {
      jsonCondition[$(this).attr('name')]= "";
    }
  });

  var arr = new Array();
  // 循环获取所有的 复选框 input[type=checkbox]:checked
  $("#registration input[type=checkbox]:checked").each(function(){
    arr.push($.trim($(this).attr('name')) + '--' + $.trim($(this).val()));//向数组中添加元素  将数组元素连接起来以构建一个字符串
  });

  // 循环获取所有的 下拉选择框 input[type=checkbox]:checked
  $("#registration option:selected").each(function(){
    if($.trim($(this).val()) != '') {
      arr.push($.trim($(this).parent().attr('name')) + '--' + $.trim($(this).val()));//向数组中添加元素  将数组元素连接起来以构建一个字符串
    } else {
      arr.push($.trim($(this).parent().attr('name')) + '--' + "");
      toastr.warning('科室未选择');
    }
  });

  // 开始对 arr 集合循环
  $.each(arr, function(index, value){

    var name = value.split('--')[0];
    var val = value.split('--')[1];

    if (jsonCondition[name] !== undefined) {
      if (!jsonCondition[name].push) {
        jsonCondition[name] = [jsonCondition[name]];
      }
      jsonCondition[name].push(val || '');
    } else {
      jsonCondition[name] = val || '';
      jsonCondition[name] = [jsonCondition[name]];
    }
  });
  return jsonCondition;
}

function staticBackdropBlock() {
  $('#staticBackdrop').modal('show')
}

function staticBackdropHide() {
  $('#staticBackdrop').modal('hide')
}

// 验证是否通过
$("#registrationBtn").on("click", function () {


  setTimeout(function () {
    $("#registrationBtn").prop('disabled', false)
  }, 500)

  let jsonData = getLoadCondition();
  //判断有否值为空
  for (let item in jsonData) {
    console.log(jsonData[item]);
    if (jsonData[item] == '' || jsonData[item] == undefined) {
      return false;
    }
  }
  //打开模态框
  staticBackdropBlock();

  console.log(jsonData);
})

$("#infoModalConfirm").on("click", function () {
  //刷新页面
  window.location.reload();
})


