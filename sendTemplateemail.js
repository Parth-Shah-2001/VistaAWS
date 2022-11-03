// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create sendTemplatedEmail params 
var params = {
  Destination: { /* required */
    ToAddresses: [
      'parth2001pks@gmail.com',
      /* more To email addresses */
    ]
  },
  Source: 'vistasolutions24x7@gmail.com', /* required */
  Template: 'Final_Copy-1667148913749', /* required */
  TemplateData: '{ \"REPLACEMENT_TAG_NAME\":\"REPLACEMENT_VALUE\" }', /* required */
  ReplyToAddresses: [
    'vistasolutions24x7@gmail.com'
  ],
};


// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
