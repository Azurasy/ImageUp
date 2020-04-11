
# ImageUp
Image hosting and sharing web application. Uploaded images recieve a unique link for ease of sharing.  
In development [example website](http://ec2-34-205-141-243.compute-1.amazonaws.com) as of 4/10/20

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

Rename the `.env_sample` file to `.env`. (`ImageUp/.env_sample` to `ImageUp/.env`)  
Edit and configure the `.env` file.

`NODE_ENV` - The envirnoment where the application is located can be set to either development or production. 
- When set to `production` (or `prod` or `p`), the entire application will be served. This includes the static front-end files located in `ImageUp/server/public` along with the back-end API
- When set to `developoment` (or anything other than production), only the back-end API will be served.  

`UPLOAD_DIR` - Directory where uploaded images will be stored. Keep in mind that ANY files in this directory will publicly available.  

`PROD_PORT` - The port on which the application will be served when `NODE_ENV` is set to production.  
`DEV_PORT` - The port on which the application will be served when `NODE_ENV` is set to development.  


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
If `NODE_ENV` is set to `production` then it is expected that you have already built the static front-end files as described in the previous section.
```bash
npm run start
```
The application should now be up and running.


If `NODE_ENV` is set to `development` then you must also simultaneously host the front-end in another terminal session
```bash
cd ImageUp/client
npm run serve
```