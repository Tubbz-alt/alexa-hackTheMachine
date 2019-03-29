
const {LaunchRequestHandler, NameRequestHandler} = require('./LaunchRequestHandler')
const {HelpHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, ErrorHandler} = require('./AmazonIntentHandlers')
const {BuyIntentHandler, 
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler} = require('./PurchaseHandlers')
  
module.exports = {
    LaunchRequestHandler,NameRequestHandler,
    HelpHandler,
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
