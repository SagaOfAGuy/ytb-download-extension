import { sendLink, isElementLoaded, createButton, areElementsLoaded, createSpinner, downloadVideoWithProgress, downloadVideoWithAxios, setYoutubeLink, getStorageItem } from "./utils";


chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  // Check if URL has changed
  if(request.type == "URL_CHANGE" && request.url.includes("youtube.com/watch")) {


    // alert that user is on a YouTube page
    console.log("on a youtube video page");


    // grab the youtube video link 
    const youtubeLink = request.url; 
    setYoutubeLink(youtubeLink); 


    // Delete download button if it already exists
    let owner = await isElementLoaded('#owner'); 
    var btn = createButton('Download', '#d9534f','videoBtn');


    console.log("event source test");     


    // Add the download button to the youtube page
    owner.appendChild(btn); 
      let container = await areElementsLoaded('.videoBtn');
      if(container[0].length > 0) {
        for (var i=0; i < container[0].length-1; i++) {
          container[0][i].remove(); 
          console.log(i, ' button removed'); 
        }
      }


    // Click listener for when user clicks on button
    btn.addEventListener('click',async ()=>{
      btn.innerText = "Processing...";
      var spinner = createSpinner(); 
      btn.appendChild(spinner); 

      // Send the link
      var linkResponse = await sendLink(); 
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