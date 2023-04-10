#!/bin/sh

set +x

EXECUTION_COMMAND="stepci run $1"

if [ -n "$ENV" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -e $ENV"
fi

if [ -n "$SECRETS" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -s $SECRETS"
fi

if [ "$NO_CONTEXT" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --hide"
fi

if [ "$LOADTEST" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --load"
fi

eval $EXECUTION_COMMAND
