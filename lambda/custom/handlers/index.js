
const {LaunchRequestHandler, NameRequestHandler} = require('./LaunchRequestHandler')
const {HelpHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, ErrorHandler} = require('./AmazonIntentHandlers')
const { BuyIntentHandler,
    ProductDetailIntentHandler,
    ProductPriceIntentHandler,
    OrderDetailIntentHandler,
    ModifyOrderIntentHandler,
    CancelOrderIntentHandler,
    QuantityIntentHandler, 
    CustomAddressIntentHandler} = require('./PurchaseHandlers')
const {
    CompanyInfoHandler,
    CEOInfoIntentHandler,
    CIOCustomIntentHandler
    } = require('./InfoHandler')
  
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
    CancelOrderIntentHandler,
    QuantityIntentHandler, 
    CustomAddressIntentHandler,
    CompanyInfoHandler,
    CEOInfoIntentHandler,
    CIOCustomIntentHandler
}
