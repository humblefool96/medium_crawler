# Medium _ Crawler\

A Node.js web crawler recursively crawling popular blogging website <https://medium.com> using Node.js and extracting all possible
hyperlinks that belong to medium.com and store them in a MongoDB database with their reference count.  

## Instructions to install on local machine\
> 1. Clone the project: git clone https://github.com/humblefool96/medium_crawler.git
> 2. Run npm install
> 3. Run npm start 
> 4. To run unit test Run : npm test

## To Start the Process of Scraping 
> Hit the URL in your browser - localhost:${portOnWhichYourLocalServerIsRunning}/crawl/start 

## To Retrieve the already parsed urls-
> Hit the URL in your browser - localhost:${portOnWhichYourLocalServerIsRunning}/crawl/getAnalytic
