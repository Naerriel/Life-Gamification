var storage_id = "storage_id"


function send(added_exp, callback){
  /* (int) -> (int)
   *
   * Gives amount of exp by which overall exp increases and returns overall exp.
   */

  var updateStorage = function (result) {
    var overall_exp;
    if (storage_id in result) {
      overall_exp = result[storage_id] + added_exp;
    }
    else {
      overall_exp = added_exp;
    }
    chrome.storage.sync.set({storage_id: overall_exp});
    callback(overall_exp);
  }

  chrome.storage.sync.get([storage_id], updateStorage);
}

function get(callback){
  /* (null) -> (int)
   *
   * Gets the amount of overall exp.
   */

  chrome.storage.sync.get([storage_id], function (result) {
    var overall_exp;
    if (storage_id in result) {
      overall_exp = result[storage_id];
    }
    else{
      overall_exp = 0;
    }
    callback(overall_exp);
  });
}

function displayExp(exp_value) {
  $(".expValue").html(exp_value);
}

function pressButton(){
  extension_log("Nacisnalem button.");
  send(parseInt($(".add_value_form").val()),
       displayExp);
}

function setExp(){
  get(displayExp);
}

function extension_log (message) {
  var script = 'console.log(`' + message + '`);';
  chrome.tabs.executeScript({
    code: script
  });
}

document.addEventListener('DOMContentLoaded', function () {
  $('.add_value_button').click(pressButton);
  setExp();
});
