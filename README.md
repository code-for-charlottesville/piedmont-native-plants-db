# piedmont-native-plants-db
Code for Charlottesville version of Piedmont Native Plants DB

# Development Setup
Below describes how to get the web application running for development

## Running Frontend
- `cd ./frontend`
- `npm run start`

## Running API
- `cd ./backend`
- `npm run start`

---
# Setup
- Make sure to download Docker

# Auto-Deploy
Our host compute instance uses [webhook](https://github.com/adnanh/webhook) to automatically listen for updates to this repository's master branch.

- `hooks.json` is located in `/var/hooks` and defines the ID of the WebHook
- `redeploy.sh` is located in `/var/scripts` and defines the script that runs on successful WebHook request

## Installing Go
- `wget https://dl.google.com/go/go1.17.7.linux-amd64.tar.gz`
- `tar -xzf go1.17.7.linux-amd64.tar.gz`
- `mv go /usr/local`
- `export GOROOT=/usr/local/go`
- `export GOPATH=$HOME/Projects/Proj1`
- `export PATH=$GOPATH/bin:$GOROOT/bin:$PATH`
- `go version`

## Installing webhook
- `cd /usr/local/go/bin`
- `go install github.com/adnanh/webhook@latest`
- `go build github.com/adnanh/webhook`

## Checking webhook service status
- Log in to host
- Authenticate as root user
- `sudo service webhook status`

## Restarting webhook service status (if not running)
- Log in to host
- Authenticate as root user
- `sudo systemctl start webhook.service`
