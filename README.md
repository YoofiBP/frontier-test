# Frontier Automated Application Submission

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
        "firstname": "Test",
        "lastname": "Lastname",
        "phone": "+1 234 234 0000",
        "location": "London, UK",
        "linkedin": "linkedin.com/profile/me"
        "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"  # link to publicliy available Resume
    }

### Testing

Run tests

    npm test //or
    npm run test

