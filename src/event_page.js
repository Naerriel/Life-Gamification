chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    'url': chrome.extension.getURL('src/popup.html')
  }, function(tab) {});
});
