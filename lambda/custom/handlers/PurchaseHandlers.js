const dbHelper = require('./dbHelper');

const BuyIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },

    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        if (slots.product.value && slots.product.value !== "?") {
            return handlerInput.responseBuilder.speak(`Let me know quantity of product S K U, you want to purchase`)
            .reprompt('Let me know quantity of product S K U you want to purchase')
            .getResponse();
        } else {
            return handlerInput.responseBuilder.speak("We only sell product S K U")
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
        }
    },
};

const QuantityIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'QuantityIntent';
    },
    handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if(sessionAttributes.orderId) {
            //modify case
        } else {
            //new order
            const slots = handlerInput.requestEnvelope.request.intent.slots;
            sessionAttributes.quantity = slots.quantity.value;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
            return handlerInput.responseBuilder.speak('Please give me your shipping address')
            .reprompt('I don\'t get your shipping address. Please give me your shipping address')
            .getResponse(); 
        }
    },
};

const CustomAddressIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CustomAddressIntent';
    },
    async handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.orderId) {
            //modify address 
        } else {
            const slots = handlerInput.requestEnvelope.request.intent.slots;
            var completeAddress = slots.postal_address.value + ' ' + slots.address_city.value + ' '  + slots.address_state.value;
            sessionAttributes.completeaddress = completeAddress;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            const userID = handlerInput.requestEnvelope.context.System.user.userId;
            const quantity = sessionAttributes.quantity;
            const phn = "123456789";
            const orderID = Math.floor(Date.now() % 1000);
            return dbHelper.addItemToOrders(orderID, userID, quantity, completeAddress, phn)
                .then((data) => {
                    return handlerInput.responseBuilder.speak(`Congratulations, your order is placed and your order id is ${orderID}`)
                    .reprompt('You can say help me to know more.')
                    .getResponse(); 
                })
                .catch((err) => {
                    console.log("Error occured while saving order", err);
                    const speechText = "we cannot save your product right now. Try again!"
                    return handlerInput.responseBuilder
                        .speak(speechText)
                        .getResponse();
                })
        }
    },
};

const ProductDetailIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ProductDetailIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('The "SWGen2dx" (conveniently the product SKU) is a revolutionary house-hold product created by SoftWidget everyone wants. It features a sleek casing with intuitive features. Features include: Rock-solid audio engagement ,Silver-bullet touch response system and Long lasting rechargeable battery ')
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
        return handlerInput.responseBuilder.speak('Price of product S K U is $1000')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const OrderDetailIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'OrderDetailIntent';
    },

    async handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const orderId = slots.orderid.value;
        const userID = handlerInput.requestEnvelope.context.System.user.userId;
        let data = await dbHelper.getOrderByOrderID(orderId, userID).catch((err) => {
            return handlerInput.responseBuilder
                .speak("No such order found.")
                .reprompt("You can say help me to know more.")
                .getResponse();
        });
        if(data && data.length > 0) {
            return handlerInput.responseBuilder.speak(`Your have placed order for ${data[0].qty} SKU which will be delivered on
            your shipping address ${data[0].address} with order id ${data[0].orderId}`)
            .reprompt('You can say help me to know more.')
                .getResponse();
        } else {
            return handlerInput.responseBuilder.speak("No such order found.")
                .reprompt("You can say help me to know more.")
                .getResponse();
        }   
    },
};

const ModifyOrderIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ModifyOrderIntent';
    },
    async handle(handlerInput) {
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
    async handle(handlerInput) {
        var orderID;
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        if (slots.orderid.value && slots.orderid.value !== "?") {
            orderID = slots.orderid.value;
            const userID = handlerInput.requestEnvelope.context.System.user.userId;
            let data = await dbHelper.removeOrder(orderID, userID).catch((err) => {
                return handlerInput.responseBuilder
                    .speak("No such order found.")
                    .reprompt("You can say help me to know more.")
                    .getResponse();
            });
            if (data && data.Count > 0) {
                return handlerInput.responseBuilder.speak(`Ok your order with order id ${orderID} is cancelled.`)
                .reprompt('You can say help me to know more.')
                .getResponse();
            } else {
                return handlerInput.responseBuilder.speak('No such order found.')
                .reprompt('You can say help me to know more.')
                .getResponse();
            }          
        } else {
            return handlerInput.responseBuilder.speak('No order id specified')
                .reprompt('You can say help me to know more.')
                .getResponse();
        }
    },
};

module.exports = {
    BuyIntentHandler,
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler,
    QuantityIntentHandler, 
    CustomAddressIntentHandler
}
