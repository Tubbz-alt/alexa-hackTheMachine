const BuyIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const userID = handlerInput.requestEnvelope.context.System.user.userId;
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const movieName = slots.MovieName.value;
        return dbHelper.addMovie(movieName, userID)
            .then((data) => {
                const speechText = `You have added product ${movieName}. You can say add to add another one or remove to remove product`;
                return responseBuilder
                    .speak(speechText)
                    .reprompt(GENERAL_REPROMPT)
                    .getResponse();
            })
            .catch((err) => {
                console.log("Error occured while saving product", err);
                const speechText = "we cannot save your product right now. Try again!"
                return responseBuilder
                    .speak(speechText)
                    .getResponse();
            })
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