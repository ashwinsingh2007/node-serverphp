# node-servephp

```
npm install node-servephp
```

## Description


   Node-servephp is an http server for php built in nodejs and uses
   Module fastcgi-client. It just works like nginx for php or
   Wamp/xamp (apache) for php. Currently tested only on windows.

   Node-servephp is basically build using “fastcgi-client” module, where
   Fastcgi-client module helps to communicate with phpfpm.
   Node-servephp is designed to provide friendlier environment for
   End users to build their php website using event driven server.
   
   The difference between apache and node-servephp is the concept of
   Difference in thread based server and event driven based server.
   Nodejs is an event based and node-servephp acts like in that way.
  
   Node-servephp is still in the initial phase of its development
   And needs more developer to contribute in this project.

              



## Usage

1. Install node-servephp using “npm install node-servephp” also
Install its dependency fastcgi-client using 
“npm install fastcgi-client”.

2. Install phpfpm. Latest versions of php contains phpfpm in itself, so download php from “http://windows.php.net/download/”.

3. Through command prompt go to the php folder and execute the command “php-cgi.exe –b 127.0.0.1:9000”.This command runs phpfpm at port 9000;

4. Through another command prompt go to node-servephp folder and run “node server.js 127.0.0.1 80”. Here 80 is port number. This will start the server.

5. As like wamp, xamp all php and html files are stored in www folder, node-servephp also contains www folder to store all php and html files. 

6. We can also connect it to database that is the php part, download MySQL for your OS and start it using username and password and on host 127.0.0.1



## API


## Thanks

This project is based on the great work of `node-fastcgi-client` written by LastLeaf. [LastLeaf/node-fastcgi-client](https://github.com/LastLeaf/node-fastcgi-client).


