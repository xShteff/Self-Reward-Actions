#!/bin/sh

# print the environment
echo "-----------------------------------------------------------"
echo "Printing environment variables"
echo "-----------------------------------------------------------"

echo $GITHUB_ACTOR

/usr/bin/env

if [ -n "$GITHUB_EVENT_PATH" ];
then
    EVENT_PATH=$GITHUB_EVENT_PATH

elif [ -f ./sample_push_event.json ];
then
    EVENT_PATH='./sample_event.json'
else
    echo "No JSON data to process. :("
    exit 1
fi

if [ $GITHUB_ACTOR == $(jq .pull_request.merged_by.login < $EVENT_PATH) ]
then
    echo "YEAH";
else
    echo "NO!"
fi


jq .pull_request.merged_by.login < $EVENT_PATH
