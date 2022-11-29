# WorkerPaidVerifier
Hello developer! This application was made as a customer facing platform that shows useful data that was collected through the mobile applications. The data is uploaded onto theGraph, and will be queried for using the queries listed in src/query.js. 

## Running the application
`npm start` will run the application in a window. There should also be a link that pops up in terminal that will allow you to connect a device (phone) to the local application.

## Deploying the application locally
`npm start`

### Verifying workers
Currently the paid verification process only depends on the daysUnpaid for the workers. If any worker has daysUnpaid longer than 14 days, then the works are deemed unpaid. This should be extended to also depend on the last payment date, and making sure that payments have been going out recently.

### Deploying the application globally
We are currently hosting the Cafe Justo website on Heroku under Hudson's account.
Heroku is getting rid of their free features at the start of the new year. 
The new team should look to find a new platform for hosting the website.
