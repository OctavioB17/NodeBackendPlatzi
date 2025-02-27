#!/bin/bash

npx concurrently "wsl ./start-dev-wsl.bash" "nodemon --exec tsx ./src/Index.ts"
