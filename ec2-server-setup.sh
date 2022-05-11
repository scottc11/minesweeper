#! /usr/bin/bash

# Install node version manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# Activate nvm
. ~/.nvm/nvm.sh

# Use nvm to install Node.js version 16
nvm install 16

# confirm node is installed
node -e "console.log('Running Node.js ' + process.version)"

# install node modules
npm install

# install pm2 node process manager
npm install pm2 -g

# enable typescript for pm2
pm2 install typescript

# start node process
pm2 start src/server/server.ts --watch