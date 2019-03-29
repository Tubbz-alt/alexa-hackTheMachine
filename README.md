# alexa-hackTheMachine
## Global install 
`npm install -g alexa-skill-test`

## Running alexa-skill-test
Alexa Skill Test works off one command:

`alexa-skill-test [--path] [--interaction-model]`

`--path` let's you optionally specify a relative path to your skill. `--interaction-model` let's you optionally specify a relative path to your interaction model.

## AWS CI download link
https://aws.amazon.com/cli/

## AWS Code commit Repository
lambda-pipeline-repo

## Intents and Handlers
The following are some of the intents in this Alexa skill

### NameRequestIntent
Used to determine who is interacting with the skill. This is requested after launching the skill.

#### Intent Slots
* username: The name of the user interacting with the skill

#### Sample Utterances
* “My name is {username}”
* “Name is {username}”
* “{username}”
* “{username} is my name”
* “{username} is me”

#### Alexa Response
* “Welcome {username} to Hack the Machine Team 2”

### CompanyInfoIntent
Used to learn more information about SoftWidget

#### Sample Utterances
* “Information about SoftWidget”
* “Tell me about the company”
* “Tell me about SoftWidget”
* “What is SoftWidget?”
#### Alexa Response
* “Okay, SoftWidget Inc is a consumer product company established in 2017. The company has […]”

### BuyIntent
Used to purchase a product from SoftWidget

#### Intent Slots
* product

#### Sample Utterances
* “Purchase {product}”
* “Purchase {product} for me”
* “I want to purchase {product}”
* “I’d like to purchase {product}”

#### Alexa Response
* “Let me know the quantity you would like to purchase”
