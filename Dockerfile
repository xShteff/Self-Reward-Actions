FROM mhart/alpine-node:10

RUN apk add --no-cache \
        bash \
        jq && \
        which bash && \
        which jq

COPY ./src /action

ENTRYPOINT ["/action/entrypoint.sh"]

LABEL "maintainer"="alstol"
LABEL "repository"="https://github.com/alstol/Self-Reward-Actions"
LABEL "com.github.actions.name"="GitHub self-medal"
LABEL "com.github.actions.description"="Posts a meme in case you merge your own PR"
LABEL "com.github.actions.icon"="briefcase"
LABEL "com.github.actions.color"="purple"

