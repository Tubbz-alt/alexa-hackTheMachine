const CompanyInfoHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CompanyInfoIntent';
    },
    handle(handlerInput) {
        let request = handlerInput.requestEnvelope.request.intent
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        return handlerInput.responseBuilder.speak('Ok SoftWidget Inc is a consumer product company established in 2017. The company has rapidly grow with over 23000 employees.The company has a reported 50 million in revenue with a technology spend of 20 million')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const CEOInfoIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CEOInfoIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('The CEO of Softwidget Inc is Sally Fields.Sally started SoftWidget in 2017 and has quickly grown the company through the savvy use of consumer marketing which has caused SoftWidget to go viral. She has a strong background in product development and process engineering. Her vision for SoftWidget is to be a globally recognized widget provider direct to consumer')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const CIOCustomIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CIOCustomIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('The CIO of Softwidget Inc is Sean Connery. Sean is a demolition expert and master of espionage from the CIA. He jumped at the opportunity to work with Sally Fields at SoftWidget as her CIO. Sean is in charge of revolutionizing SoftWidget platforms and maintaining IT operations.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};


module.exports = {
    CompanyInfoHandler,
    CEOInfoIntentHandler,
    CIOCustomIntent
}
