const {User} = require('../models')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const userId = handlerInput.requestEnvelope.context.System.user.userId
      console.log(userId);
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      User.findOne({userId}).then((usr,err)=>{
        if(err)
        {
          console.log(err)
        }
        if(usr)
        {
          console.log('User',JSON.stringify(usr,null,2))
          sessionAttributes.userName= 'xyz'
        }
        else
        {
          let user = new User({
            userId 
          });
          user.save().then(()=>{
            console.log('new user created')
          })
        }
      })
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder.speak('Welcome To Hack The Machine Team 2')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

  module.exports = {
    LaunchRequestHandler
  }