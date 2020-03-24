
# ImageUp
Image hosting and sharing web application. Uploaded images recieve a unique link for ease of sharing.  
In development [example website](http://ec2-34-205-141-243.compute-1.amazonaws.com) as of 3/23/20

## Build & Run (ubuntu)
Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Download project files
```bash
git clone https://github.com/Onusai/ImageUp.git
```

### Backend (server) setup
Install backend dependencies
```bash
cd ImageUp
npm install
```
Edit and configure the `.env` file. (`ImageUp/.env`).  

`NODE_ENV` - Can be set to either `development` or `production`  
- When set to developoment, only the back-end API will be served  
- When set to production, the static front-end files located in `ImageUp/server/public`  will be served along with the back-end API  

`PORT` - The port on which the API will be served (and front-end if NODE_ENV is set to production)  

`UPLOAD_DIR` - Directory where uploaded images will be stored. Keep in mind that ANY files in this directory will publicly available.  

`DB_HOST` - URL to a Mariadb server  
`DB_USER` - DB Username  
`DB_PASSWORD` - DB Password  
`DB_NAME` - DB Name  

### Database
This application requires a connection to a Mariadb server.
It will automatically create a database inside it, with the name specified in the .env file.

### Build static front-end files
Install frontend dependenices
```bash
cd ImageUp/client
sudo npm i -g @vue/cli
npm install
```
Build
```bash
npm run build
```
The files will output into `ImageUp/server/public`


## Running the server
If `NODE_ENV` is set to `production`
```bash
npm run start
```
The application should now be up and running.


If `NODE_ENV` is set to `development` then you must also simultaneously host the front-end in another terminal session
```bash
cd ImageUp/client
npm run serve
```
