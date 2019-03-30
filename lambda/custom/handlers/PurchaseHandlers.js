const dbHelper = require('./dbHelper');

const BuyIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },

    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.modifyOrderID = null;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
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
    async handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if(sessionAttributes.modifyOrderID) {
            //modify case
            const slots = handlerInput.requestEnvelope.request.intent.slots;
            let data = await dbHelper.modifyQuantity(sessionAttributes.modifyOrderID, slots.quantity.value).catch((err) => {
                return handlerInput.responseBuilder
                    .speak("Unable to update quantity, No such order found.")
                    .reprompt("You can say help me to know more.")
                    .getResponse();
            });
            sessionAttributes.modifyOrderID = null;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            if (data) {
                return handlerInput.responseBuilder
                    .speak("Order Updated Successfully")
                    .reprompt("You can say help me to know more.")
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                .speak("Unable to update quantity, No such order found.")
                .reprompt("You can say help me to know more.")
                .getResponse();
            }
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
        if (handlerInput.requestEnvelope.request.intent.confirmationStatus === "CONFIRMED") {
            const slots = handlerInput.requestEnvelope.request.intent.slots;
            var completeAddress = slots.postal_address.value + ' ' + slots.address_city.value + ' '  + slots.address_state.value;
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            if(sessionAttributes.modifyOrderID) {
                //modify case
                const slots = handlerInput.requestEnvelope.request.intent.slots;
                let data = await dbHelper.modifyAddress(sessionAttributes.modifyOrderID, completeAddress).catch((err) => {
                    return handlerInput.responseBuilder
                        .speak("Unable to update address, No such order found.")
                        .reprompt("You can say help me to know more.")
                        .getResponse();
                });
                sessionAttributes.modifyOrderID = null;
                handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
                if (data) {
                    return handlerInput.responseBuilder
                        .speak("Order Updated Successfully")
                        .reprompt("You can say help me to know more.")
                        .getResponse();
                } else {
                    return handlerInput.responseBuilder
                    .speak("Unable to update address, No such order found.")
                    .reprompt("You can say help me to know more.")
                    .getResponse();
                }
            } else {
                //sessionAttributes.completeaddress = completeAddress;
                //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
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
        } else {
            return handlerInput.responseBuilder.speak('Please give me your shipping address')
            .reprompt('I don\'t get your shipping address. Please give me your shipping address')
            .getResponse();  
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
        if(data) {
            return handlerInput.responseBuilder.speak(`Your have placed order for ${data.qty} SKU which will be delivered on
            your shipping address ${data.address} with order id ${data.orderId}`)
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
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        if(slots.modifyorderid.value && slots.modifyorderid.value !== "?") {
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes.modifyOrderID = slots.modifyorderid.value;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder.speak('What do you want to modify, Quantity or Address')
            .reprompt('Sorry, I can\'t understand the command. Please you what you want to modify.')
            .getResponse();
        }
        return handlerInput.responseBuilder.speak("Please give order id you want to modify")
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
        if (handlerInput.requestEnvelope.request.intent.confirmationStatus === "CONFIRMED") {
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

                return handlerInput.responseBuilder.speak(`Ok your order with order id ${orderID} is cancelled.`)
                    .reprompt('You can say help me to know more.')
                    .getResponse();
            } else {
                return handlerInput.responseBuilder.speak('No order id specified')
                    .reprompt('You can say help me to know more.')
                    .getResponse();
            }
        } else {
            return handlerInput.responseBuilder.speak('Request cancelled. You can say help me to know more.')
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
