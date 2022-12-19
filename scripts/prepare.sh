#!/usr/bin/env sh

HUSKY_BIN=$(pwd)/node_modules/.bin/husky

if [[ $NODE_ENV != production && $NODE_ENV != staging && $NODE_ENV != cloud && $NODE_ENV != yandex ]]; then
    echo running husky hooks installation ...
    $HUSKY_BIN install
else
    echo "environment:: $NODE_ENV ... no running husky" 1>&2
fi
