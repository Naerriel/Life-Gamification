// My part
var exp_value = 0;

function displayValue() {
  $(".expValue").html(exp_value);
}

function pressButton(){
  extension_log("Nacisnalem button.");
  exp_value += parseInt($(".add_value_form").val());
  displayValue();
}

function extension_log (message) {
  var script = 'console.log(`' + message + '`);';
  chrome.tabs.executeScript({
    code: script
  });
}

document.addEventListener('DOMContentLoaded', function () {
  $('.add_value_button').click(pressButton);
  displayValue();
});
