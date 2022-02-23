function Validator(formSelector,options={}) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var formRules = {};

  //QUy uoc tao rules
  //-Neu co loi return errorMessage
  //-Neu khong co loi thi return undefined
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui long nhap truong nay";
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui long nhap email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui long nhap toi thieu {min} ky tu `;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : `Vui long nhap nhieu nhat {max} ky tu `;
      };
    },
  };
  //Lay ra form element trong DOM the 'formSelector'
  var formElement = document.querySelector(formSelector);

  //Chi xu lu khi co element trong DOM
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          var ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
      //Lắng nghe sự kiên để validate(blur,change,...)
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }
    //Hàm thực hiện validate
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;

      for(var rule of rules) {
        errorMessage = rule(event.target.value);
        if(errorMessage) break;
      }
       
      
      //Nếu có lỗi thì hiển thị message lỗi
      if (errorMessage) {
        var formGroup = getParent(event.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage
    }
    //Hàm clear message lỗi
    function handleClearError(event) {
      var formGroup = getParent(event.target, ".form-group");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");

        var formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }

  }
  //Xử lý hành vi submit form
  formElement.onsubmit = function(event) {
      event.preventDefault()

      var inputs = formElement.querySelectorAll('[name][rules]');
      var isValid =true
      for(var input of inputs){
          if(!handleValidate({target:input})){
              isValid = false;
          }
      }
      if(isValid){
          if(typeof options.onSubmit==="function"){
            var enableInputs = formElement.querySelectorAll('[name]');
            var formValues = Array.from(enableInputs).reduce(function(values, input) {

                switch (input.type) {
                    case 'radio':
                        if (input.matches(':checked')) {
                            values[input.name] = input.value;
                        } else {
                            values[input.name] = ''
                        }
                        break;
                    case 'checkbox':
                        if (input.matches(':checked')) {
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                        } else if (!values[input.name]) {
                            values[input.name] = '';
                        }
                        break;
                    case 'file':
                        values[input.name] = input.files;
                        break;
                    default:
                        values[input.name] = input.value;
                }

                return values;
            }, {});
              return options.onSubmit(formValues)
          }
          formElement.submit()
      }
  }
}
