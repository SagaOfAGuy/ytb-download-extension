/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === 'complete') {
    console.log("Tab has changed");
    chrome.tabs.sendMessage(tabId, {
      type: 'URL_CHANGE',
      url: tab.url
    })
  }
}); 

/******/ })()
;
//# sourceMappingURL=background.js.map