# Medima PI UI

## Abstract

This application is part of Medima Project: a multi part application providing tools to manage more efficiently medias.

For best result, it must be used in conjunction of:

* Medima PI (server): go lang REST service, designed to run on Raspberry PI 3, exposing available medias.

## Building and Distribution

To build and publish application, run:

    npm run-script build && npm run-script publish

Distributed as part of [medima-pi](https://github.com/TomDush/medima-pi).

## Contribute

### Development server

Checkout [medima-pi](https://github.com/TomDush/medima-pi) and run `./grun` to start server side (port 8080).  

Then run `npm start` for a dev server (browser will open on `http://localhost:4200/`).


---------------------------------------

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4._
