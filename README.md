# Self Reward Actions

A simple GitHub Action that posts this image whenever someone merges his own Pull Request:

![image](https://user-images.githubusercontent.com/9394141/67147509-cf17c080-f295-11e9-95ac-74522a1ed82c.png)


## Example Workflow

````
name: PR Test
on: 
 pull_request:
    types: [closed] 
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: alstol/Self-Reward-Actions@master
      env:
       GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

````

## Required variables

This Action requires you have the `GITHUB_TOKEN` secret, so it can post the comment on the PR.


## Why?

Why not?

### Inspiration

I've pretty much combined two already existing repos to create this. Feel free to support them however you want :3

* [print-env by managedkaos](https://github.com/managedkaos/print-env)
* [pr-status-giphy by jzweifel](https://github.com/jzweifel/pr-status-giphy-action)
