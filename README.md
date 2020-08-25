# Group-2-VR-SnL
## Building The Project
### Before running the project please ensure the following:
 - Ensure that "node" is installed
 - Ensure that Unity Hub is installed
 - Ensure that the Unity version you have installed is 2019.1.7f1

### Server
 - From the project folder, navigate to group-project-dashboard/backend/ folder
 - Open CMD in this backend folder
 - Run the command "npm install"

### Client
 - From the project folder, navigate to the group-project-dashboard folder
 - Open CMD in this group-project-dashboard folder
 - Run the command "npm install"

### Game
 - Using the Unity version 2019.1.7f1, open the Project folder "PhysioFeed",  which is found in the game folder, in Unity.
 - In the top right corner, click File/Build Settings.
 - Ensure that the target Platform is "Android"
 - Ensure that the Player Setting's are to what you desire
 - Press "Build", and save the apk to you desired location

## Running The Project
### Important Information for Running
 - Ensure that you have successfully completed the above build steps before attempting to run
 - Android Minimum 19 is required for running the APK
 - The Client Site runs on port 3000
 - The Server runs on port 3001
 - Initial client login details are:
   - username: "username"
   - password: "password"
 - For correct functionality, run the projects in the following order:
   - server
   - client
   - game
   
### Running the Server
 - Navigate to the folder group-project-dashboard/backend, from the root folder
 - In this folder, open CMD
 - Run command "npm start"

### Running the Client
 - Navigate to the folder group-project-dashboard/, from the root folder
 - In this folder, open CMD
 - Run command "npm start" 

### Running the game
#### Method 1
 - Install the APK on desired Android Device
 - Once installed, open App

#### Method 2
 - When in Unity, with the project open, plug desired Android Device into computer/laptop
 - Ensuring the correct build settings are being used, click File -> Build and Run (or use "Control + B" on the keyboard)

## Known Errors
### Server Database Connection Error
```
MongoDB connection error: { Error: querySrv ECONNREFUSED _mongodb._tcp.group2-vr
-i4w1s.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (dns.js:196:19)
  errno: 'ECONNREFUSED',
  code: 'ECONNREFUSED',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.group2-vr-i4w1s.mongodb.net' }
```
This error occurs when the server has no access to the MongoDB Atlas database.
To solve this, you can:
  - Ensure that your server has internet access
  - Ensure that there is nothing from your internet firewall blocking access to the MongoDB Atlas cloud.

### Cannot find module on server
```
internal/modules/cjs/loader.js:584
    throw err;
    ^

Error: Cannot find module 'mongoose'
```
This occurs when a module that is required for the server can not be found
To solve this:
 - Run the command "npm install" in the folder group-project-dashboard/backend.


### Cannot find module on client
```
'react-scripts' is not recognized as an internal or external command,
```
This occurs when a module that is required for the client can not be found
To solve this:
 - Run the command "npm install" in the folder group-project-dashboard.
 
 Created by Myself, Vince Mojares, Alex Atherton, Jack White
