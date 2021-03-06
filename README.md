# Frontier Automated Application Submission

author: Yoofi Brown-Pobee

## Instructions

Clone Repository in a directory of choice and navigate into project directory

    git clone https://github.com/YoofiBP/frontier-test.git
    cd frontier-test

> Install and testing commands should be run from the root of the project directory

Install dependencies

    npm install

Note: Kindly note that environment variables have been committed for a smooth setup experience albeit not best practice

Run Server

    npm start

The App is configured to run on PORT 5000. Kindly wait for the following messages to appear on the console before executing request
* Server running on port: PORT_NUMBER
* Database connected successfully
* Queueing Channel created (for async endpoints)


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

Success Response

    {
      "message": "Success"
    }

    Status code: 200

Failure Response

    {
      status: "err",
      message: "errorMessage"
    }

    Status code: 500

### Testing

Tests can be found in the tests directory

Run tests

    npm run test

---

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

### Update on asynchronous endpoint

The asynchronous endpoint has been implemented and can be accessed on the branch 'async-endpoint-test'

#### Instructions

Execute POST request to endpoint

    http://localhost:5000/forms/frontier/applications/async

Success Response

    {
      "referral": "link-to-payload-showing-status-of-async-job"
    }

    Status code: 200

Failure Response

    {
      status: "err",
      message: "errorMessage"
    }

    Status code: 500

---
### On differences between payload in product spec and payload in this documentation

Using 'fullname' and 'phoneno' instead of the indicated 'firstname' and 'phone' makes iteration over the input fields
easier. There is no need for additional code to remap the property names to the input names. The names of the input fields took
precedence over the indicated property names.

## Thoughts on exercise

This was a great assessment exercise! I started in the morning and was at it and did not notice the time fly.
Considering my experience with automated tools encompasses CypressJS and Selenium web driver, this assessment was
a great opportunity for me to engage with Puppeteer for RPA. For a while I believed RPA to be some far away term but
this project made it clear to me that I had been doing it all along. Very grateful for the opportunity to turn this in.

### Components to highlight

- Validation takes place in globalMiddleware that can be found in src/config. This middleware ensures that only expected fields are passed on the controller and no fields are empty
- HelmetJS was added to add HTTP security headers such as 'Content-Security-Policy'. This was not a requirement but simply based on personal practice for minimum security
- Form Inputs were composed as classes as this made it easier to modify and maintain Puppeteers actions as it filled each input
- Although there is no database, a models directory was created to store the desired structure of the request
- The constants file in src/config holds text constants used by Puppeteer during automation

### Time Spent: 7 hours

Bulk of the above time was spending debugging Puppeteer behaviour to get it to behave
consistently. Puppeteer has a long of asynchronous behaviour and using it to automate the form inputs
predictably was a large part of the challenge. I also spent roughly 30 minutes debugging Typescript and Babel Transpiling
issues. 45 minutes was spent attempting to implement the Asynchronous endpoints however given the time already
spent I prioritised the initial task over the bonus task and went ahead to just describe the implementation as seen above.

### Thoughts on improvement

- Inclusion of unique data attributes or IDs on the relevant html elements would help make puppeteer more precise and give more confidence over the automation. Currently the solution was implemented using the available
  class selectors on the elements.
- On a lower level, I believe greater exposure to Puppeteer, its architecture and patterns would result in cleaner and more organised automation scripts
- Given how long the request-response lifecycle is evidently, the asynchronous endpoint is a must for a large scale system as indicated in the design brief
