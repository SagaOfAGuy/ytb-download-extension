/*
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    console.log("on youtube page"); 
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
    
  }
});
*/ 
/*
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id), { message: "background_to_content"}
})
*/ 

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === 'complete') {
    console.log("Tab has changed");
    chrome.tabs.sendMessage(tabId, {
      type: 'URL_CHANGE',
      url: tab.url
    })
  }
}); 
