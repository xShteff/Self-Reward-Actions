FROM mhart/alpine-node:10

LABEL "maintainer"="alstol"
LABEL "repository"="https://github.com/managedkaos/print-env"
LABEL "com.github.actions.name"="GitHub self-medal"
LABEL "com.github.actions.description"="Posts a meme in case you merge your own PR"
LABEL "com.github.actions.icon"="briefcase"
LABEL "com.github.actions.color"="purple"

RUN apk add --no-cache \
        bash \
        jq && \
        which bash && \
        which jq

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
