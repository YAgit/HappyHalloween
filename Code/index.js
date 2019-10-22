'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'Happy Halloween';

//Greetings array
const greetingsArray=['<audio src="soundbank://soundlibrary/horror/horror_07"/>' + '<voice name="Conchita">  <say-as interpret-as="interjection">boo!. </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_01"/>',
'<audio src="soundbank://soundlibrary/monsters/griffen/griffen_07"/>' + '<voice name="Ivy">  <say-as interpret-as="interjection">boo!. </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_01"/>',
'<audio src="soundbank://soundlibrary/monsters/ghosts_demons/ghosts_demons_04"/>' + '<voice name="Joanna">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/animals/dinosaurs/dinosaurs_15"/>',
'<audio src="soundbank://soundlibrary/monsters/human_vocals/human_vocals_03"/>'+ '<voice name="Justin">  <say-as interpret-as="interjection">boo!.  </say-as>  <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/animals/amzn_sfx_wolf_howl_02"/>',
'<audio src="soundbank://soundlibrary/monsters/ghosts_demons/ghosts_demons_11"/>' + '<voice name="Kendra">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/bell/chimes/chimes_02"/>',
'<audio src="soundbank://soundlibrary/monsters/pigmy_bats/pigmy_bats_05"/>' + '<voice name="Hans">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/horror/horror_02"/>',
'<audio src="soundbank://soundlibrary/monsters/giant_monster/giant_monster_11"/>' + '<voice name="Raveena">  <say-as interpret-as="interjection">boo!. </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/horror/horror_15"/>',
'<audio src="soundbank://soundlibrary/monsters/vampires/vampires_12"/>' + '<voice name="Enrique">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_03"/>',
'<audio src="soundbank://soundlibrary/monsters/werewolves/werewolves_04"/>' + '<voice name="Amy">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/monsters/evolution_monsters/evolution_monsters_03"/>',
'<audio src="soundbank://soundlibrary/alarms/buzzers/buzzers_04"/>' + '<voice name="Brian">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01"/>',
'<audio src="soundbank://soundlibrary/monsters/griffen/griffen_01"/>' + '<voice name="Carla"> <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/water/nature/nature_05"/>',
'<audio src="soundbank://soundlibrary/monsters/giant_monster/giant_monster_13"/>' + '<voice name="Takumi">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/nature/amzn_sfx_strong_wind_whistling_01"/>',
'<audio src="soundbank://soundlibrary/magic_spells/magic_spells_08"/>' + '<voice name="Lea">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/explosions/fireworks/fireworks_08"/>',
'<audio src="soundbank://soundlibrary/metal/metal_06"/>' + '<voice name="Russell">  <say-as interpret-as="interjection">boo!.  </say-as> <prosody pitch="x-high"> Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/vehicles/electric/electric_05"/>',
'<audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_08"/>' + '<voice name="Kendra">  <say-as interpret-as="interjection">boo!. </say-as>  <prosody pitch="x-high">  Happy Halloween </prosody> </voice>' + '<audio src="soundbank://soundlibrary/explosions/fireworks/fireworks_11"/>'

  ];
  
const totalGreetings = greetingsArray.length;
//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Happy Halloween ... make sure you give the trick or treaters lots of candy, and let me greet them for you. I will say a new and fun greeting every time you say Next. Just let me know when you are ready with candy when the doorbell rings! Are you ready for a greeting?';
        //welcome screen message
        let displayText = ""
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers
const GreetingIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GreetingIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      

  
      let greetingIndex = 0
      let repromptText = 'Are you ready for the greeting?';
      let displayText = 'Happy Halloween';
      let endSession = false;
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      //----
       console.log("total greetings "+ totalGreetings);
       console.log("greeting index befor "+ greetingIndex)
      if (typeof sessionAttributes.inSessionGreetingIndex === 'undefined') {        
        // set the first greeting
          greetingIndex = 0;
      } else if (sessionAttributes.inSessionGreetingIndex == totalGreetings -1) {
        
          greetingIndex = 0;
      }
      else {
         greetingIndex = sessionAttributes.inSessionGreetingIndex +1;
      }  
      console.log("greeting index "+ greetingIndex);
     //----
     // if (greetingIndex > totalGreetings) {
     //     greetingIndex = 0;
     // }


      speechText = greetingsArray[greetingIndex];
       
        // Add to greeting count
           //console.log("endSession "+ endSession);
        //set session attributes
        sessionAttributes.inSessionGreetingIndex = greetingIndex;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        console.log("in session index" + sessionAttributes.inSessionGreetingIndex);
       
        
       //Perform operation
       
  
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .withSimpleCard(appName, displayText)    
        .withShouldEndSession(endSession)
        .getResponse();
  
        }
  };
  

//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'I will greet trick or treaters on Halloween day with some exciting and scary - but not too scary - Halloween greetings. Just say next when you are ready to open the door with candy in your hand ';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        //help text 
        let speechText = 'I am Sorry, I did not understand that. Just say next if you are ready with candy to greet a trick or treater'
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         GreetingIntentHandler,
                         HelpIntentHandler,
                         FallbackIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
