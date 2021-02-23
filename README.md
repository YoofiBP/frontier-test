# Frontier Automated Application Submission
author: Yoofi Brown-Pobee

## Instructions

Install dependencies

    npm install

Run Server
    
    npm run dev

The App is configured to run on PORT 5000

Execute POST request to endpoint
    
    http://localhost:5000/forms/frontier/applications

Payload Structure

    {
        "fullname": "Test",
        "lastname": "Lastname",
        "phoneno": "+1 234 234 0000",
        "location": "London, UK",
        "linkedin": "linkedin.com/profile/me"
        "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"  # link to publicliy available Resume
    }

### Testing

Run tests

    npm test //or
    npm run test

### On differences between payload in product spec and payload in this documentation
Using 'fullname' and 'phoneno' instead of the indicated 'firstname' and 'phone' makes iteration over the input fields
easier. There is no need for additional code to remap the property names to the input names. The names of the input fields took
precedence over the indicated property names.

### On implementation of asynchronous endpoint
An asynchronous API endpoint can be implemented using a message queuing system like RabbitMQ.

The client sends a request to the asynchronous endpoint (Message Producer) which receives the request, pushes a new message/job unto the queue
(for a background worker (Consumer) to fill the application form) and responds with a url which would have the result of the 
background work sometime in the future. 

When the background process completes, 
the endpoint that was given to the user will be updated with the status of the background task.

The client accesses the url given when the request was first made and are able to see the results of their original request. In this case
a success/error message

> An attempt to implement the queue can be seen in the src/services/async folder however give my 
> level of familiarity with actual implementation it would take more time than I would like to spend on
> this exercise before submission.

## Thoughts on exercise
This was a great assessment exercise! I started in the morning and was at it and did not notice the time fly.
Considering my experience with automated tools encompasses CypressJS and Selenium web driver, this assessment was 
a great opportunity for me to engage with Puppeteer for RPA. For a while I believed RPA to be some far away term but 
this project made it clear to me that I had been doing it all along. Very grateful for the opportunity to turn this in.


### Time Spent: 7 hours

Bulk of the above time was spending debugging Puppeteer behaviour as I was getting it to behave 
consistently. Puppeteer has a long of asynchronous behaviour and using it to automate the form inputs
predictably was a large part of the challenge. I also spent roughly 30 minutes debugging Typescript and Babel Transpiling
issues. 45 minutes was spent attempting to implement the Asynchronous endpoints however given the time already
spent I prioritised the initial task over the bonus task and went ahead to just describe the implementation as seen above.

