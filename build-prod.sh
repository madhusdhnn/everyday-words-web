#!/bin/bash
set -e


npm run build

firebase deploy

rm -rf build/
