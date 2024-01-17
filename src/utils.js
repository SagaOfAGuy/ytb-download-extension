// Search DOM and wait until element is loaded
export async function isElementLoaded(selector) {
    while(!document.querySelector(selector)) {
      await new Promise(r => setTimeout(r, 500));
    }
    return document.querySelector(selector);
}; 
  


// Search DOM and wait until elements are loaded
export async function areElementsLoaded(selector) {
    while(!document.querySelectorAll(selector)) {
      await new Promise(r => setTimeout(r, 500));
    }
    return [ document.querySelectorAll(selector) ];
}; 


// Create button
export function createButton(text,color,btnclass) {
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
export function createSpinner() { 
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
export async function postRequest(serverUrl,method,data='',contentType) {
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
export async function downloadVideo(url,filename) {
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
export function setYoutubeLink(url) {
  var key = 'youtubeLink';

  var data = {};
  data[key] = url;

  chrome.storage.local.set(data, function() {
    console.log('youtubeLink stored:', url);
  });
}


// Retrieve the youtubeLink variable from chrome.storage.local
export function getStorageItem(key) {
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
export async function sendLink() { 
    
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
