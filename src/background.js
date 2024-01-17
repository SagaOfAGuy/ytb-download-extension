chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === 'complete') {
    console.log("Tab has changed");
    chrome.tabs.sendMessage(tabId, {
      type: 'URL_CHANGE',
      url: tab.url
    })
  }
}); 
