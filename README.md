# APPLICATION NAME
This is the core of the "College Certificate Project on top of the Blockchain". This is a mobile application developed using React Native and expo, built on top of Hyperledger Indy using Hyperledger Aries framework and trinsic.
It acts a mobile wallet, one per device, for each student or graduate. It holds all his connections, with Issuer enteties like College and verifier enteties like the Job.
It also hold all the issued credentials to that student, and reaceives any new credential or verification offers that the student could either accept or decline.


## Prerequisites:
- [npm](https://www.npmjs.com/get-npm)
- [expo] (https://expo.io/)

## Then run the following commands:
  expo start 
  
  
##Now you are ready to run the application:
When first running the app;ication you will find a register page where you register your data only when first using the application. Then you need to press the scan QR code button to connect with any entity.
The scenario goes excatly as follows:
1- You connect with the college and press the Get Transcript offer.
2- You receive a credential offer, upon accepting that offer a credential (either Bachelor or Masters) will be issued and can be viewed in your application and downloaded as PDF.
3- The same procedure for connecting with the Job is done.
4- Upon pressing the "Apply" button in the Job webpage a verification offer is received.
5- Finally you chose the correct credential and present the requested attributes from it. The job finally verifies the corectness of credential againt the ledger.
  
## Finally use the following 2 projects to continue the Isuuing credential and verifying it scenario.
1- Job Website:   <br />                                                                                                                     
 https://github.com/MarinaGamal/Job-Web <br />                                                                                                                    
2-College Website: <br />                                                                                                   
https://github.com/MarinaGamal/College-Credential-Issuing-Website
