# ImageUp

Image hosting and sharing web application.  
In development [example website](http://ec2-34-205-141-243.compute-1.amazonaws.com) (updated periodically, may not include latest features)

## This app requires Node.JS and NPM to run

Commands to install on ubuntu:

```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Instructions to download and run:

1. Download and extract [ImageUp_v0.1-alpha.zip](https://github.com/Onusai/ImageUp/releases/download/v0.1-alpha/ImageUp_v0.1-alpha.zip)
2. Edit the `.env` file to configure server options (optional)
3. Run the command `npm run start` in the root directory
4. The server should now be up and running on http://localhost:8080

The port will vary if altered in `.env`.  
Keep in mind that running port `80` may require root privileges

# Instructions to build & run from source (ubuntu):

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

#### Configure environment variables

Create a copy of the `.env_sample` file (`ImageUp/.env_sample`) and rename it to `.env` (`ImageUp/.env`)
Edit and configure the `.env` file.

#### The default values will work as is, changing them is optional

`NODE_ENV` - The envirnoment where the application is located can be set to either development or production.

- When set to `production` (or `prod` or `p`), the entire application will be served. This includes the static front-end files located in `ImageUp/server/public` along with the back-end API
- When set to `developoment` (or anything other than production), only the back-end API will be served.

`DEV_PORT` - The port on which the application will be served when `NODE_ENV` is set to development.

`PROD_PORT` - The port on which the application will be served when `NODE_ENV` is set to production.

`DB_DIALECT` - Determines the database dialect. Set to `sqlite` by default so that no additional setup is required, however you may also use: `mysql`, `mariadb`, `postgres`, or `mssql`. However, if using any of these you must setup the database server yourself.

The following variables are only required for `mysql`, `mariadb`, `postgres`, or `mssql`. Skip this section if using `sqlite`.

`DB_HOST` - Address to database server  
`DB_USER` - DB Username  
`DB_PASSWORD` - DB Password  
`DB_NAME` - DB Name

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

The application server should now be up and running.

If `NODE_ENV` is set to `development` then you must also simultaneously host the front-end in another terminal session. This is useful for debugging and development because changes to the front-end code update in the browser automatically.

```bash
cd ImageUp/client
npm run serve
```
