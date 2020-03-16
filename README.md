
# ImageUp
Image hosting and sharing web application. Uploaded images recieve a unique link for ease of sharing.
## Information
This web application consists of two seperate NodeJs projects which must be hosted simultaneously:
- back-api (backend)
- front-vue (frontend)

## Installation (ubuntu)
Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Download project files
```bash
git clone https://github.com/Azurasy/ImageUp.git
```

### Frontend setup
Install project dependenices
```bash
cd imageup/font-vue
npm install
```
Build project files
```bash
npm run build
```
There should now be a folder named  `dist` in this directory (`imageup/front-vue/dist`) the contents of which can be served by any static file server.

In this case, for simplicity, we will use `serve`.
```bash
# install 
sudo npm install -g serve
# host
serve -s dist
```

## Usage
```

```
