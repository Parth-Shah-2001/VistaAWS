// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const reader = require('xlsx')
// Set the region 
AWS.config.update({region: 'us-east-1'});

// templates name : Final_Copy-1667146471883

var parameters = {
  Destination: { /* required */
    // CcAddresses: [
    //   'EMAIL_ADDRESS',
    //   /* more items */
    // ],
    ToAddresses: [
      'parth2001pks@gmail.com',
      /* more items */
    ]
  },
  
  Source: 'vistasolutions24x7@gmail.com', /* required */
  Template: 'Final_Copy-1667148913749',
  TemplateData: "{}",
  ReplyToAddresses: [
     'vistasolutions24x7@gmail.com',
    /* more items */
  ],
};

const sendemail = (params) => {
  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });

}





//validating email address
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
//reading file 
const file = reader.readFile('./TestVista.xlsx')
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
    const emailStr = res.emailId;
    if(emailStr !== undefined){
      const emailSite = emailStr.split(", ");
      if(emailSite.length > 1 && validateEmail(emailSite[1])){
        let email_addresses = []
        email_addresses.push(emailSite[1]);
        parameters.Destination.ToAddresses = email_addresses
        sendemail(parameters)
      }else if(validateEmail(emailSite[0])){
        let email_addresses = []
        email_addresses.push(emailSite[0]);
        parameters.Destination.ToAddresses = email_addresses
        sendemail(parameters)
      }
      
    }
    
    
   })
}



// Create sendEmail params 

