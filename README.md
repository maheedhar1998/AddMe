# Add Me
This application is an improvement on the currently tedious contact sharing options available. It allows the user to create a profile to which they can add their social media and professional platforms of communication as well as some other contact information. This information can then be shared with other users via a QR code that is generated based on the information the user chooses to share. Users can also scan another user’s QR code and thus add their information straight to their contacts.
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
# Deployment
To run on a mobile device natively
* ```ionic cordova run <platform>``` 

To build a native installable app
* ```ionic cordova build <platform>```

***
# Authors
Maheedhar Mandapati  
   * maheedhar1998@hotmail.com  
Rohan Bhandari  
   * rohanb@email.sc.edu  
Joanna John  
   * joannajohnsc@gmail.com  
Samuel Menkus  
   * smenkus1@gmail.com  
Patrick Scott  
   * patrickscott2013@gmail.com
***
