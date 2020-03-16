
# ImageUp
Image hosting and sharing web application. Uploaded images recieve a unique link for ease of sharing.
## Information
This web application consists of two seperate NodeJs projects which must be hosted simultaneously:
- back-api (backend)
- front-vue (frontend)

If you plan to host both on the same machine, you will need to use a program like [Screen](https://www.gnu.org/software/screen/) to create multiple terminal sessions.

## Installation (ubuntu)
Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Download project files
```bash
git clone https://github.com/Onusai/ImageUp.git
```

### Frontend setup
Install frontend dependenices
```bash
cd ImageUp/front-vue
sudo npm i -g @vue/cli
npm install
```
Build project files
```bash
npm run build
```
There should now be a folder named  `dist` in this directory (`ImageUp/front-vue/dist`) the contents of which can be served by any static file server.

For simplicity, we will use `serve`.
```bash
# install
npm i serve
# host
npx serve -s dist
```
The front end should now be reachable on http://localhost:5000
However, functions that require the backend api, such as uploading images, will not work yet.

### Backend setup
Open a new terminal session. If you are hosting the backend on another machine, then repeat the NodeJs installation instructions and download the project files before continuing.

Install backend dependenices
```bash
cd ImageUp/back-api
npm install
```
Edit the `appconfig.json` file to match your configuration.
Finally, run the program
```bash
npm run start
```

## Usage
```


```
