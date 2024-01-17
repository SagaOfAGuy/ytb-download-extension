/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   areElementsLoaded: () => (/* binding */ areElementsLoaded),
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   createSpinner: () => (/* binding */ createSpinner),
/* harmony export */   downloadVideo: () => (/* binding */ downloadVideo),
/* harmony export */   getStorageItem: () => (/* binding */ getStorageItem),
/* harmony export */   isElementLoaded: () => (/* binding */ isElementLoaded),
/* harmony export */   postRequest: () => (/* binding */ postRequest),
/* harmony export */   sendLink: () => (/* binding */ sendLink),
/* harmony export */   setYoutubeLink: () => (/* binding */ setYoutubeLink)
/* harmony export */ });
// Search DOM and wait until element is loaded
async function isElementLoaded(selector) {
    while(!document.querySelector(selector)) {
      await new Promise(r => setTimeout(r, 500));
    }
    return document.querySelector(selector);
}; 
  


// Search DOM and wait until elements are loaded
async function areElementsLoaded(selector) {
    while(!document.querySelectorAll(selector)) {
      await new Promise(r => setTimeout(r, 500));
    }
    return [ document.querySelectorAll(selector) ];
}; 


// Create button
function createButton(text,color,btnclass) {
    var btn = document.createElement('button')
    btn.style.backgroundColor = color;
    btn.innerText = text
    btn.style.margin = '20px';
    btn.style.color = 'white'; 
    btn.style.borderRadius = '20px';
    btn.style.padding = '12.5px'; 
    btn.style.fontSize = '14px';
    btn.style.fontWeight = 'bold';
    btn.setAttribute('class',btnclass); 
    btn.style.border = '0'; 
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    return btn; 
}
  


// Create spinner
function createSpinner() { 
      // Create a loader element
      const loaderElement = document.createElement('div');
      // Create a loader container
      const loaderContainer = document.createElement('div'); 
      // Assign loader container a class
      loaderContainer.classList.add('loader');
      // Apply the specified styles to loader element
      loaderElement.style.border = '3px solid #f3f3f3';
      loaderElement.style.borderRadius = '50%';
      loaderElement.style.borderBottom = '2px solid black';
      loaderElement.style.width = '20px';
      loaderElement.style.height = '20px';
      loaderElement.style.webkitAnimation = 'spin 2s linear infinite';
      loaderElement.style.animation = 'spin 2s linear infinite';
      // Apply the specified styles to loader container
      loaderContainer.style.padding = '10px 10px 10px 10px';
      loaderContainer.style.alignItems = 'center';
      loaderContainer.style.display = 'flex';
      // Create the @keyframes rules
      const keyframesStyle = document.createElement('style');
      // Keyframe properties
      keyframesStyle.textContent = `
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
    
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      // append loader to the loader container
      loaderContainer.appendChild(loaderElement); 
      document.head.appendChild(keyframesStyle);
      return loaderContainer; 
}
  

// Method to create a request
async function postRequest(serverUrl,method,data='',contentType) {
    // Request options
    const options = {
      method: method,
      body:  JSON.stringify(data),
      headers: {
        "Content-Type": contentType
      }
    }
    // Request response
    const response = await fetch(serverUrl,options)
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(serverData => {
      console.log(serverData); 
      return serverData;
    })
    .catch(error => console.error('Error', error)); 
    return response; 
}


// function to download video
async function downloadVideo(url,filename) {
  try {
    // Fetch the video as a Blob
    const response = await fetch(url);
    const videoBlob = await response.blob();

    const contentLength = response.headers.get('Content-Length');
    console.log('Video size:', contentLength, 'bytes');


    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(videoBlob);
    downloadLink.download = filename; // You can set the desired filename here


    // Append the link to the document and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();


    // Clean up
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error:', error.message);
  }
}


// Store the youtube link
function setYoutubeLink(url) {
  var key = 'youtubeLink';

  var data = {};
  data[key] = url;

  chrome.storage.local.set(data, function() {
    console.log('youtubeLink stored:', url);
  });
}


// Retrieve the youtubeLink variable from chrome.storage.local
function getStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}


// Function to send link and retrieve the Cloudfront Url
async function sendLink() { 
    
    const youtubeLink = await getStorageItem('youtubeLink'); 
    // YouTube URL as data
    const postData = {
        link: youtubeLink
    };
    console.log(postData); 

    // Send the Data to the server
    try {
      // POST request options
      //const url = 'http://127.0.0.1:3000/getLink'; 
      const url = 'https://ixrhxyqtex.us-west-2.awsapprunner.com/getLink'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(postData), // Convert data to JSON format
      };
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await resp.json(); // Parse the JSON response
      return responseData['cloudfront']; 
    } 
  catch (error) {
    //console.error('Error:', error.message);
    // Run function again if we get a CORS error
    console.log(`Something went wrong: ${error}`)
    //await sendLink(btn); 
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");



chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  // Check if URL has changed
  if(request.type == "URL_CHANGE" && request.url.includes("youtube.com/watch")) {


    // alert that user is on a YouTube page
    console.log("on a youtube video page");


    // grab the youtube video link 
    const youtubeLink = request.url; 
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setYoutubeLink)(youtubeLink); 


    // Delete download button if it already exists
    let owner = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isElementLoaded)('#owner'); 
    var btn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createButton)('Download', '#d9534f','videoBtn');


    console.log("event source test");     


    // Add the download button to the youtube page
    owner.appendChild(btn); 
      let container = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.areElementsLoaded)('.videoBtn');
      if(container[0].length > 0) {
        for (var i=0; i < container[0].length-1; i++) {
          container[0][i].remove(); 
          console.log(i, ' button removed'); 
        }
      }


    // Click listener for when user clicks on button
    btn.addEventListener('click',async ()=>{
      btn.innerText = "Processing...";
      var spinner = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createSpinner)(); 
      btn.appendChild(spinner); 

      // Send the link
      var linkResponse = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendLink)(); 
      //console.log(`The response: ${linkResponse}`); 
      window.location.href = linkResponse; 
      btn.innerText = "Download"; 

      // Ping endpoint to delete youtube video from s3 bucket
      await fetch('https://ixrhxyqtex.us-west-2.awsapprunner.com/finished'); 
    });
  } else {
    console.log("Not on youtube video page"); 
  }
});
})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map