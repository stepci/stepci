#!/bin/sh

set +x

EXECUTION_COMMAND="node /dist/index.js run $1"

if [ -n "$ENV" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -e $ENV"
fi

if [ -n "$SECRETS" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -s $SECRETS"
fi

if [ "$VERBOSE" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -v"
fi

if [ "$LOADTEST" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --load"
fi

if [ -n "$CONCURRENCY" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --concurrency $CONCURRENCY"
fi

eval $EXECUTION_COMMAND
