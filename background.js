
  
chrome.browserAction.onClicked.addListener(function(tab) {
  var html = load(chrome.extension.getURL("chrome.html"));
  
   console.log(html);
    $("body").append(html);
  });

  