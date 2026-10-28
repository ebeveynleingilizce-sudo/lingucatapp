/* One effect voice, local embedded assets, no network/audio downloads. */
(function(){'use strict';
var storage='lingucat.audio.crisp.v1',prefs={};try{prefs=JSON.parse(localStorage.getItem(storage)||'{}');}catch(e){}
var enabled=prefs.enabled!==false,volume=typeof prefs.volume==='number'?Math.max(0,Math.min(1,prefs.volume)):.4;
var assets=window.LinguAudioAssets||{},audio=null,current=null,pending=null,timer=null,unlocked=false,requested=0,played=0,lastCue=null,token=0;
var aliases={tap:'click',page:'click',flip:'click',select:'click',start:'open',end:'complete',back:'close',incorrect:'error',learn:'xp',unlock:'badge','level-up':'complete','toggle-on':'click','toggle-off':'click'};
var priority={click:0,open:1,close:1,xp:3,correct:4,error:4,complete:5,badge:6};
var gains={click:.45,open:.55,close:.5,xp:.65,correct:.75,error:.55,complete:.7,badge:.7};
function save(){try{localStorage.setItem(storage,JSON.stringify({enabled:enabled,volume:volume}));}catch(e){}}
function stop(){token++;clearTimeout(timer);timer=null;pending=null;if(audio){audio.pause();try{audio.currentTime=0;}catch(e){}}current=null;}
function busy(){return current&&audio&&!audio.ended;}
function play(cue){var key=aliases[cue]||cue;if(!enabled||!volume||!unlocked||document.hidden||!assets[key])return false;
 if(busy()&&current.priority>priority[key])return false;
 if(pending&&pending.priority>=priority[key])return false;
 pending={key:key,cue:cue,priority:priority[key]};clearTimeout(timer);
 timer=setTimeout(function(){var next=pending;pending=null;timer=null;if(!next||!enabled||document.hidden)return;if(busy()&&current.priority>next.priority)return;
 if(audio)audio.pause();audio=new Audio(assets[next.key]);audio.preload='none';audio.volume=volume*gains[next.key];current=next;lastCue=next.cue;requested++;var id=++token;
 audio.onplaying=function(){if(id!==token)return;played++;window.dispatchEvent(new CustomEvent('lingucat:fx-playing',{detail:{cue:next.cue}}));};
 audio.onended=audio.onerror=function(){if(id===token)current=null;};try{var result=audio.play();if(result&&result.catch)result.catch(function(){if(id===token)current=null;});}catch(e){current=null;}
 },0);return true;}
function unlock(){unlocked=true;}
['pointerdown','mousedown','touchstart','click','keydown'].forEach(function(type){document.addEventListener(type,unlock,true);});
window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',function(){if(document.hidden)stop();});
window.LinguAudio={play:play,stop:stop,unlock:unlock,setEnabled:function(value){enabled=!!value;if(!enabled)stop();save();window.dispatchEvent(new Event('lingucat:audio-settings'));return enabled;},setVolume:function(value){volume=Math.max(0,Math.min(1,Number(value)||0));if(audio&&current)audio.volume=volume*gains[current.key];if(!volume)stop();save();},state:function(){return {enabled:enabled,effectsEnabled:enabled,volume:volume,lastCue:lastCue,requested:requested,played:played,activeVoices:busy()?1:0};}};
}());
