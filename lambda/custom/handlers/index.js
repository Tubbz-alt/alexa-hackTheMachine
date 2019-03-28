
const {LaunchRequestHandler, NameRequestHandler} = require('./LaunchRequestHandler')
const {CancelAndStopIntentHandler, SessionEndedRequestHandler, ErrorHandler} = require('./AmazonIntentHandlers')
const {BuyIntentHandler, 
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler} = require('./PurchaseHandlers')
  
module.exports = {
    LaunchRequestHandler,NameRequestHandler,
    CancelAndStopIntentHandler, 
    SessionEndedRequestHandler,
    ErrorHandler,
    BuyIntentHandler, 
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler
}
