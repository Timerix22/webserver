#!/bin/bash
source /home/timerix/.allrc
echo $PATH
./build.sh
node out/src/main/index.js
