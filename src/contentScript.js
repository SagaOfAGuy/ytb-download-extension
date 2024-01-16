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
      // Code for including the download percentage values text in the buttons
      /*
      const options = {
        method: 'GET',
      }
      btn.appendChild(spinner); 
      const progressInterval = setInterval(async () => {
        const response = await fetch('https://pfmjmsnfzq.us-west-2.awsapprunner.com/getProgress'); 
        //const response = await fetch('http://127.0.0.1:3000/getProgress');
        const progressData = await response.json();


        // Handle progress data (you can log it or do something else)
        console.log(`Progress update: ${progressData.progress}%`);
        btn.innerText =  `Download Progress: ${progressData.progress.toFixed(2)}%`;
        

        // Check if progress is 100% and stop fetching
        if (progressData.progress.toFixed(2) == 100) {
          clearInterval(progressInterval);
          console.log("Download complete. Stopping progress updates.");
          btn.innerText = "Processing Video...";
        }
      }, 10);
      */ 


      // Send the link
      var linkResponse = await sendLink(); 
      //console.log(`The response: ${linkResponse}`); 
      window.location.href = linkResponse; 
      btn.innerText = "Download"; 

      // Ping endpoint to delete youtube video from s3 bucket
      await fetch('https://pfmjmsnfzq.us-west-2.awsapprunner.com/finished'); 
    });
  } else {
    console.log("Not on youtube video page"); 
  }
});