#!/bin/sh

set +x

EXECUTION_COMMAND="stepci run $1"

if [ -n "$2" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -e $2"
fi

if [ -n "$3" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND -s $3"
fi

if [ "$4" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --hide"
fi

if [ "$5" == "true" ]; then
    EXECUTION_COMMAND="$EXECUTION_COMMAND --load"
fi

eval $EXECUTION_COMMAND
