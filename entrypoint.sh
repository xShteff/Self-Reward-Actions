#!/bin/sh

# print the environment
echo "-----------------------------------------------------------"
echo "Printing environment variables"
echo "-----------------------------------------------------------"

echo $GITHUB_ACTOR

/usr/bin/env

#
# check for the environment variable GITHUB_EVENT_PATH
# if this variable is not zero length, then the entrypoint script is being
# run as a GitHub Action.
#
# GITHUB_EVENT_PATH contiains the path to the JSON  data
# for the event that triggered the WorkFlow
#
# set EVENT_DATA_PATH = $GITHUB_EVENT_PATH
#
if [ -n "$GITHUB_EVENT_PATH" ];
then
    EVENT_PATH=$GITHUB_EVENT_PATH
#
# If the entrypoint script is not being run as an Action, check for
# a local file with sample data for testing.
#
# set EVENT_DATA_PATH = the local file with sample data
#
elif [ -f ./sample_push_event.json ];
then
    EVENT_PATH='./sample_push_event.json'

#
# If no file is available for processing, exit with an error
#
else
    echo "No JSON data to process. :("
    exit 1
fi

echo "-----------------------------------------------------------"
echo "Printing $EVENT_PATH"
echo "-----------------------------------------------------------"

jq . < $EVENT_PATH
