'use strict';

const Alexa = require('ask-sdk-core');
const { LaunchRequestHandler,
    NameRequestHandler,
    HelpHandler,
    CancelAndStopIntentHandler, 
    SessionEndedRequestHandler,
    ErrorHandler,
    BuyIntentHandler, 
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler,
    QuantityIntentHandler, 
    CustomAddressIntentHandler,
    CompanyInfoHandler,
    CEOInfoIntentHandler,
    CIOCustomIntentHandler
    } = require('./handlers')

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        NameRequestHandler,
        HelpHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        BuyIntentHandler,
        ProductDetailIntentHandler,
        ProductPriceIntentHandler,
        OrderDetailIntentHandler,
        ModifyOrderIntentHandler,
        CancelOrderIntentHandler,
        QuantityIntentHandler, 
        CustomAddressIntentHandler,
        CompanyInfoHandler,
        CEOInfoIntentHandler,
        CIOCustomIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();