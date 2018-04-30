# docker build -t tomdush/circleci-node-aws:9 . && docker push tomdush/circleci-node-aws:9
FROM circleci/node:9
MAINTAINER Thomas Duchatelle <duchatelle.thomas@gmail.com>

RUN sudo apt-get update && sudo apt-get install -y awscli

RUN sudo chown -R circleci:staff /usr/local/lib/node_modules/ \
  && sudo chown -R circleci:staff /usr/local/bin \
  && npm install -g @angular/cli
