# Youtube Downloader Extension

Basic YouTube Video Downloader chrome extension

## Features

- Allows for user to download YouTube videos when they are on a YouTube Video page

## Install
1. Clone this repository
```
git clone https://github.com/SagaOfAGuy/ytb-download-extension.git
```
![Alt text](images/image.png)


2. Open up the Chrome extensions page by going to `chrome://extensions` and enable the **"Developer Mode"** option

![Alt text](images/image-1.png)


3. Click **"Load Unpacked"**

![Alt text](images/image-2.png)


4. Import the `build` directory, and click the **"Select"** button

![Alt text](images/image-3.png)

5. Observe that the chrome extension has been loaded in the browser: 

![Alt text](images/image-4.png)
   

## Usage
1. Navigate to a YouTube video page and notice that there's a red "Download" button that appears on the page: 

![Alt text](images/image-5.png)



2. Click the **"Download"** button. It may take a while for the video to download depending on how large the video file is. Notice that the button text has changed to **"Processing..."**

![Alt text](images/image-6.png)


3. We can save the video to the local filesystem

![Alt text](images/image-7.png)

4. After the video has been downloaded, we can view the video in our favorite video player: 

![Alt text](images/image-8.png)




## Features to add
- Ability to choose video or audio format
- Ability to show download progress to the user


This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)



