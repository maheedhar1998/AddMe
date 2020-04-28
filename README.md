# Add Me
This application is an improvement on the currently tedious contact sharing options available. It allows the user to [create a profile](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#sign-up-page) to which they can add their [personal](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#personal-home-page) social media and [professional](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#business-home-page) platforms of communication as well as some other contact information. This information can then be shared with other users via a [QR code](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#scannable-qr-code-page) that is generated based on the information the user chooses to share. Users can also scan another user’s [QR code](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#qr-code-scanner-page) and thus add that user's information straight to their [contacts](https://github.com/SCCapstone/AddMe/wiki/Detailed-Design#contacts-page). 
***
# Technologies
In order to build this project you will need to install
* [Node.js](https://nodejs.org/en/)
   * For Windows systems use the installer from their website.
   * For Debian based Linux systems
      * ```sudo apt-get install curl```
      * ```curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -```
      * ```sudo apt-get install nodejs```
* [Ionic](https://ionicframework.com)
   * ```npm install -g ionic```
* [Cordova](https://cordova.apache.org)
   * ``` npm install -g cordova```
***
# Setup
The first time you run the Ionic app you will need to install the necessary node modules.  
   * ```npm i```  

Before you can run the app natively on any device you need to add the corresponding platform ```<platform>``` Android or IOS
   * ```ionic cordova platform add <platform>```
***
# Running
To run the app locally on your laptop
   * ```ionic serve```  

To run on a mobile device via Ionic Devapp
   * ```ionic serve --devapp```  

To run on an emulator
   * ```ionic cordova emulate <platform>```
***
# Testing
Ionic framework uses Protractor for it's behavioral testing. The unit test framework we are using is Jasmine. The end to end test files (behavioral) are located at ```AddMe/e2e/src/```. The unit test are located in ```AddMe/src/app/``` and it's subdirectories. The unit tests for each page/service/components are located in their corresponding ```spec.ts``` pages.

To run unit tests for the app
   * ```npm test```

To run behavioral/end to end tests for the app
   * ```npm run e2e```
***
# Deployment
To run on a mobile device natively
* ```ionic cordova run <platform>```

To build a native installable app
* ```ionic cordova build <platform>```

***
# Authors

Name | Email
------------------- | -------------------------
Maheedhar Mandapati | maheedhar1998@hotmail.com  
Rohan Bhandari | rohanb@email.sc.edu
Joanna John | joannajohnsc@gmail.com
Samuel Menkus | smenkus1@gmail.com
Patrick Scott | patrickscott2013@gmail.com
***
