# APPLICATION NAME
This is the core of the "College Certificate Project on top of the Blockchain". This is a mobile application developed using React Native and Expo, built on top of Hyperledger Indy using Hyperledger Aries framework and Trinsic.
It acts as a mobile wallet, one per device, for each student or graduate. It holds all his connections, with Issuer entities like College and verifier entities like the Job.
It also holds all the issued credentials to that student, and reaceives any new credential or verification offer that the student could either accept or decline.


## Prerequisites:
- [npm](https://www.npmjs.com/get-npm)
- [expo](https://expo.io/)
- [ngrok](https://ngrok.com/download)

## Then run the following commands:
  expo start <br />
  Search for the hidden folder ".ngrok2" and add the following to the configuration file <br />
	tunnels: <br />
			first: <br />
				addr: 3002 <br />
				proto: http  <br />
				bind_tls: false <br />
			second: <br />
				addr: 5004 <br />
				proto: http <br />
				bind_tls: false <br />
			third: <br />
				addr: 5002 <br />
				proto: http <br />
				bind_tls: false <br />
  
  Go to the directory where you downloaded ngrok an open terminal and run ./ngrok start --all <br />
	Finally, go to the project's directory, open terminal and change directory to "socket-io-server", open terminal and run node server.js
  
## Now you are ready to run the application:
When first running the application you will find a register page where you register your data only when first using the application. Then you need to press the scan QR code button to connect with any entity.  <br /> 
The scenario goes excatly as follows: <br /> 
1- You connect with the college and press the Get Transcript offer. <br /> 
2- You receive a credential offer, upon accepting that offer a credential (either Bachelor or Masters) will be issued and can be viewed in your application and downloaded as PDF. <br /> 
3- The same procedure for connecting with the Job is done. <br /> 
4- Upon pressing the "Apply" button in the Job webpage a verification offer is received. <br /> 
5- Finally you choose the correct credential and present the requested attributes from it. The job finally verifies the corectness of credential againt the ledger. <br /> 
  
## Finally use the following 2 projects to continue the Isuuing a credential and verifying it scenario.
1- Job Website:   <br />                                                                                                                     
 https://github.com/MarinaGamal/Job-Web <br />                                                                                                                    
2-College Website: <br />                                                                                                   
https://github.com/MarinaGamal/College-Credential-Issuing-Website
