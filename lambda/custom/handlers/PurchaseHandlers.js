const BuyIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },
    handle(handlerInput) {
        let request = handlerInput.requestEnvelope.request.intent
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        return handlerInput.responseBuilder.speak('Ok Got Buy Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const ProductDetailIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ProductDetailIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Prouct Detail Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const ProductPriceIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ProductPriceIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Product Price Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const OrderDetailIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'OrderDetailIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Order detail Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const ModifyOrderIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ModifyOrderIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Modify Order Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const CancelOrderIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CancelOrderIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Cancel Order Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

module.exports = {
    BuyIntentHandler,
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler
}