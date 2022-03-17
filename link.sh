#!/bin/bash

CURRENT_PATH=$(pwd)

echo "Building JET STYLE"
cd ../jet-style
npm install
npm run build
npm link

echo "Building JET STYLE REACT";
cd ../jet-style-react
npm install
npm link @neojets/jet-style
npm run build
npm link

cd "$CURRENT_PATH"
npm install
npm link @neojets/jet-style-react

echo "Done. Press any key for exit"
read end
