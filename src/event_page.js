chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    'url': chrome.extension.getURL('src/View/menu.html')
  }, function(tab) {});
});
