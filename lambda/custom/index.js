'use strict';

const Alexa = require('ask-sdk-core');
const { LaunchRequestHandler,
    CancelAndStopIntentHandler, 
    SessionEndedRequestHandler,
    ErrorHandler,
    BuyIntentHandler, 
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler} = require('./handlers')

if ('undefined' === typeof process.env.DEBUG) {
    Alexa.appId = '...';
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        BuyIntentHandler,
        ProductDetailIntentHandler,
        ProductPriceIntentHandler,
        OrderDetailIntentHandler,
        ModifyOrderIntentHandler,
        CancelOrderIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();