'use strict';

const Alexa = require('ask-sdk-core');
const { LaunchRequestHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, ErrorHandler } = require('./handlers/handlers')
if ('undefined' === typeof process.env.DEBUG) {
    Alexa.appId = '...';
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();