chrome.browserAction.onClicked.addListener(function (tab) {
  if (tab.url.indexOf("https://www.instagram.com/") != -1) {
    chrome.tabs.executeScript(tab.id, {
      file: 'contentscript.js'
    });
  }
});

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "InstagramExtensionData");
  port.onMessage.addListener(function (msg) {
    console.log(msg);
    localStorage.sharedData = JSON.stringify({ "followers": msg["followers"], "following": msg["following"] });
    chrome.tabs.create({ url: 'display.html' });
  });
});