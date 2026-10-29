/* One predecoded effect voice; embedded assets never request audio downloads. */
(function(){'use strict';
var storage='lingucat.audio.crisp.v1',prefs={};try{prefs=JSON.parse(localStorage.getItem(storage)||'{}');}catch(e){}
var enabled=prefs.enabled!==false,volume=typeof prefs.volume==='number'?Math.max(0,Math.min(1,prefs.volume)):.4;
var assets=window.LinguAudioAssets||{},ctx=null,buffers={},loading={},fallback={},source=null,gain=null,audio=null,current=null,unlocked=false,requested=0,played=0,lastCue=null,token=0;
var aliases={tap:'click',page:'click',flip:'click',select:'click',start:'open',end:'complete',back:'close',incorrect:'error',learn:'xp',unlock:'badge','level-up':'complete','toggle-on':'click','toggle-off':'click'};
var priority={click:0,open:1,close:1,xp:3,correct:4,error:4,complete:5,badge:6};
var gains={click:.45,open:.55,close:.5,xp:.65,correct:.75,error:.55,complete:.7,badge:.7};
function save(){try{localStorage.setItem(storage,JSON.stringify({enabled:enabled,volume:volume}));}catch(e){}}
function stop(){token++;if(source){source.onended=null;try{source.stop();}catch(e){}source.disconnect();source=null;}if(gain){gain.disconnect();gain=null;}if(audio){audio.pause();try{audio.currentTime=0;}catch(e){}audio=null;}current=null;}
function busy(){return !!current;}
function prepare(){var AC=window.AudioContext||window.webkitAudioContext;if(AC){try{ctx=new AC({latencyHint:'interactive'});}catch(e){try{ctx=new AC();}catch(ignore){}}}Object.keys(assets).forEach(function(key){if(ctx){loading[key]=new Promise(function(resolve){try{var raw=atob(assets[key].split(',')[1]),bytes=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);ctx.decodeAudioData(bytes.buffer,function(buffer){buffers[key]=buffer;resolve(buffer);},function(){resolve(null);});}catch(e){resolve(null);}});}else{var a=new Audio(assets[key]);a.preload='auto';a.load();fallback[key]=a;}});}
function started(cue,id){if(id!==token)return;played++;window.dispatchEvent(new CustomEvent('lingucat:fx-playing',{detail:{cue:cue}}));}
function play(cue){var key=aliases[cue]||cue;if(!enabled||!volume||!unlocked||document.hidden||!assets[key])return false;if(busy()&&current.priority>priority[key])return false;
 stop();var id=token,at=performance.now();current={key:key,priority:priority[key]};lastCue=cue;requested++;
 function begin(){if(id!==token||!enabled||document.hidden)return;if(ctx){if(!buffers[key]||ctx.state!=='running'){current=null;return;}source=ctx.createBufferSource();gain=ctx.createGain();source.buffer=buffers[key];gain.gain.value=volume*gains[key];source.connect(gain);gain.connect(ctx.destination);source.onended=function(){if(id===token)stop();};source.start(0);started(cue,id);}else{audio=fallback[key];if(!audio){current=null;return;}audio.volume=volume*gains[key];audio.currentTime=0;audio.onplaying=function(){started(cue,id);};audio.onended=audio.onerror=function(){if(id===token)current=null;};try{var result=audio.play();if(result&&result.catch)result.catch(function(){if(id===token)current=null;});}catch(e){current=null;}}}
 if(ctx&&(ctx.state!=='running'||!buffers[key])){Promise.all([ctx.state==='running'?Promise.resolve():ctx.resume(),loading[key]]).then(function(){if(id!==token)return;if(performance.now()-at>150){current=null;return;}begin();}).catch(function(){if(id===token)current=null;});}else begin();return true;}
function unlock(){unlocked=true;if(ctx&&ctx.state==='suspended')ctx.resume().catch(function(){});}
prepare();
['pointerdown','mousedown','touchstart','click','keydown'].forEach(function(type){document.addEventListener(type,unlock,true);});
window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',function(){if(document.hidden)stop();});
window.LinguAudio={play:play,stop:stop,unlock:unlock,setEnabled:function(value){enabled=!!value;if(!enabled)stop();save();window.dispatchEvent(new Event('lingucat:audio-settings'));return enabled;},setVolume:function(value){volume=Math.max(0,Math.min(1,Number(value)||0));if(gain&&current)gain.gain.setValueAtTime(volume*gains[current.key],ctx.currentTime);if(audio&&current)audio.volume=volume*gains[current.key];if(!volume)stop();save();},state:function(){return {enabled:enabled,effectsEnabled:enabled,volume:volume,lastCue:lastCue,requested:requested,played:played,activeVoices:busy()?1:0,backend:ctx?'webaudio':'htmlaudio',ready:ctx?Object.keys(buffers).length===Object.keys(assets).length:true};}};
}());
