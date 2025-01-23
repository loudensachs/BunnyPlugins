(()=>{
"use strict";var $=(()=>{var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __commonJS=(cb,mod)=>function(){return mod||(0,cb[__getOwnPropNames(cb)[0]])((mod={exports:{}}).exports,mod),mod.exports};var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(var keys=__getOwnPropNames(from),i=0,n=keys.length,key;i<n;i++)key=keys[i],!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:(k=>from[k]).bind(null,key),enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var require_commands=__commonJS({"vendetta:@vendetta/commands"(exports,module){module.exports=vendetta.commands}});var require_plugin=__commonJS({"vendetta:@vendetta/plugin"(exports,module){module.exports=vendetta.plugin}});var require_vendetta=__commonJS({"vendetta:@vendetta"(exports,module){module.exports=vendetta}});var require_toasts=__commonJS({"vendetta:@vendetta/ui/toasts"(exports,module){module.exports=vendetta.ui.toasts}});var require_assets=__commonJS({"vendetta:@vendetta/ui/assets"(exports,module){module.exports=vendetta.ui.assets}});var require_common=__commonJS({"vendetta:@vendetta/metro/common"(exports,module){module.exports=vendetta.metro.common}});var require_components=__commonJS({"vendetta:@vendetta/ui/components"(exports,module){module.exports=vendetta.ui.components}});var require_storage=__commonJS({"vendetta:@vendetta/storage"(exports,module){module.exports=vendetta.storage}});var require_alerts=__commonJS({"vendetta:@vendetta/ui/alerts"(exports,module){module.exports=vendetta.ui.alerts}});var require_ui=__commonJS({"vendetta:@vendetta/ui"(exports,module){module.exports=vendetta.ui}});var src_exports={};__export(src_exports,{cstorage:()=>cstorage,onLoad:()=>onLoad,onUnload:()=>onUnload,settings:()=>Settings_default});var import_commands=__toESM(require_commands(),1),import_plugin2=__toESM(require_plugin(),1),import_vendetta=__toESM(require_vendetta(),1),import_toasts2=__toESM(require_toasts(),1),import_assets2=__toESM(require_assets(),1);var import_common=__toESM(require_common(),1),import_components=__toESM(require_components(),1),import_assets=__toESM(require_assets(),1),import_toasts=__toESM(require_toasts(),1),import_storage=__toESM(require_storage(),1),import_plugin=__toESM(require_plugin(),1);var import_alerts=__toESM(require_alerts(),1),import_ui=__toESM(require_ui(),1),styles=import_common.stylesheet.createThemedStyleSheet({destructiveIcon:{tintColor:import_ui.semanticColors.TEXT_DANGER}});var{FormIcon,FormSwitchRow,FormRow}=import_components.Forms;import_plugin.storage.signature??=!0;var Settings_default=()=>((0,import_storage.useProxy)(import_plugin.storage),(0,import_storage.useProxy)(cstorage),React.createElement(import_common.ReactNative.ScrollView,null,React.createElement(FormSwitchRow,{label:"GPT Signature",leading:React.createElement(FormIcon,{source:(0,import_assets.getAssetIDByName)("ic_edit_24px")}),onValueChange:v=>import_plugin.storage.signature=v,value:import_plugin.storage.signature}),React.createElement(FormRow,{label:"Set OpenAI API Key",leading:React.createElement(FormRow.Icon,{style:styles.destructiveIcon,source:(0,import_assets.getAssetIDByName)("ic_globe_24px")}),onPress:()=>{(0,import_alerts.showInputAlert)({title:"Set OpenAI API Key",confirmText:"Set",confirmColor:"blue",onConfirm:apiKey=>{cstorage.openai_api_key=apiKey,(0,import_toasts.showToast)("OpenAI API Key set successfully")},initialValue:cstorage.openai_api_key})}})));function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){reject(error);return}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _async_to_generator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)})}}var cstorage=import_plugin2.storage,chatGPTCommand;function callChatGPT(prompt,apiKey){return _callChatGPT.apply(this,arguments)}function _callChatGPT(){return _callChatGPT=_async_to_generator(function*(prompt,apiKey){try{var response=yield fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-4o",messages:[{role:"user",content:prompt}],max_tokens:550,temperature:.7})});if(!response.ok){var errorData=yield response.json();throw new Error(errorData.error.message||"Failed to fetch from OpenAI API")}var data=yield response.json();return data.choices[0].message.content.trim()}catch(error){throw import_vendetta.logger.error("ChatGPT API Error:",error),error}}),_callChatGPT.apply(this,arguments)}var onLoad=()=>{chatGPTCommand=(0,import_commands.registerCommand)({name:"chatgpt",displayName:"ChatGPT",description:"Write a message with ChatGPT-4o",displayDescription:"Write a message with ChatGPT-4o",type:1,applicationId:"-1",inputType:1,options:[{name:"prompt",displayName:"Prompt",description:"Your prompt to ChatGPT",displayDescription:"The prompt to send to ChatGPT",type:3,required:!0}],execute:function(){var _ref=_async_to_generator(function*([{value:prompt}],ctx){var apiKey=cstorage.openai_api_key;if(!apiKey)return(0,import_toasts2.showToast)("OpenAI API key not set. Please set it in the plugin settings.",(0,import_assets2.getAssetIDByName)("ic_error")),{content:"Error: API key not set."};if(typeof prompt!="string"){var errorMessage=`\u274C Error: Prompt must be a string. Received type: ${typeof prompt}`;return(0,import_toasts2.showToast)(errorMessage,(0,import_assets2.getAssetIDByName)("ic_error")),{content:errorMessage}}try{var fullPrompt="A discord user has invoked the command 'chatgpt' which should return a generated message. They prompted, this: "+prompt,response=yield callChatGPT(fullPrompt,apiKey),responseMSG=response;return import_plugin2.storage.signature===!0&&(responseMSG+=`
-# This message was generated with GPT-4o`),{content:responseMSG}}catch(error){var errorMessage1=`\u274C Error: ${error.message}`;return(0,import_toasts2.showToast)(errorMessage1,(0,import_assets2.getAssetIDByName)("ic_error")),{content:errorMessage1}}});return function(_,ctx){return _ref.apply(this,arguments)}}()})},onUnload=()=>{chatGPTCommand&&chatGPTCommand()};return __toCommonJS(src_exports);})();
return $;})();
