(function(root){'use strict';
function copy(v){return JSON.parse(JSON.stringify(v));}
function text(v,max,label){if(typeof v!=='string'||!v.trim()||v.length>max)throw Error(label+' alanı 1–'+max+' karakter içermeli.');return v.trim();}
function number(v,label){if(typeof v!=='number'||!isFinite(v)||v<0||v>86400)throw Error(label+' değeri 0 ile 86400 saniye arasında olmalı.');return v;}
function validate(raw){
 if(!raw||raw.schemaVersion!==1)throw Error('Desteklenmeyen hikâye yapısı. schemaVersion: 1 olmalı.');
 var s={schemaVersion:1,id:text(raw.id,80,'Hikâye kimliği'),title:text(raw.title,120,'Başlık'),level:text(raw.level,40,'Seviye'),description:text(raw.description,600,'Tanıtım'),videoDuration:number(raw.videoDuration,'Video süresi'),expressions:[],questions:[]},seen={};
 if(!/^[a-z0-9_-]+$/i.test(s.id))throw Error('Hikâye kimliğinde yalnızca harf, sayı, _ ve - kullanılabilir.');
 if(!Array.isArray(raw.expressions)||raw.expressions.length>30)throw Error('En fazla 30 hedef ifade eklenebilir.');
 raw.expressions.forEach(function(e){s.expressions.push(text(e,200,'Hedef ifade'));});
 if(!Array.isArray(raw.questions)||!raw.questions.length||raw.questions.length>100)throw Error('Bir hikâyede 1–100 soru olmalı.');
 raw.questions.forEach(function(v){
  var q={id:text(v.id,80,'Soru kimliği'),type:v.type,prompt:text(v.prompt,700,'Soru'),hint:typeof v.hint==='string'?v.hint.slice(0,500):'',scene:{label:text(v.scene&&v.scene.label,100,'Sahne adı'),start:number(v.scene&&v.scene.start,'Sahne başlangıcı'),end:number(v.scene&&v.scene.end,'Sahne bitişi')},feedback:text(v.feedback,700,'Açıklama')};
  if(!/^[a-z0-9_-]+$/i.test(q.id)||seen[q.id])throw Error('Soru kimlikleri benzersiz olmalı; yalnızca harf, sayı, _ ve - içermeli.');seen[q.id]=true;
  if(['multiple','speaker','boolean','order','grammar','vocabulary'].indexOf(q.type)<0)throw Error('Bilinmeyen soru türü: '+q.type);
  if(q.scene.end<=q.scene.start||(s.videoDuration&&q.scene.end>s.videoDuration+.05))throw Error('Sahne bitişi başlangıçtan sonra ve video süresi içinde olmalı.');
  if(!Array.isArray(v.options)||v.options.length<2||v.options.length>6)throw Error('Her soruda 2–6 seçenek veya olay olmalı.');
  q.options=v.options.map(function(o){return text(o,250,'Seçenek');});
  if(q.options.some(function(o,i){return q.options.indexOf(o)!==i;}))throw Error('Seçenekler birbirinden farklı olmalı.');
  if(q.type==='boolean'&&q.options.length!==2)throw Error('Doğru / Yanlış sorusunda iki seçenek olmalı.');
  if(q.type==='order'){
   if(!Array.isArray(v.answer)||v.answer.length!==q.options.length)throw Error('Sıralama cevabı bütün olayları içermeli.');
   q.answer=v.answer.slice();q.answer.forEach(function(n,i){if(n%1||n<0||n>=q.options.length||q.answer.indexOf(n)!==i)throw Error('Doğru sırada her olay numarası bir kez kullanılmalı.');});
  }else{if(v.answer%1||v.answer<0||v.answer>=q.options.length||typeof v.answer!=='number')throw Error('Geçerli bir doğru seçenek seçin.');q.answer=v.answer;}
  ['image','audio'].forEach(function(key){if(v[key]){if(typeof v[key]!=='string'||v[key].length>2000||!((root.LinguPreview&&/^blob:/.test(v[key]))||/^https:\/\//i.test(v[key])||/^assets\/[a-zA-Z0-9_./ -]+$/.test(v[key])&&!v[key].includes('..')))throw Error('Geçersiz soru medyası.');q[key]=v[key];}});
  s.questions.push(q);
 });return s;
}
function revision(s){var t=JSON.stringify(s),h=2166136261;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);}return (h>>>0).toString(16);}
function fresh(s){return {version:1,revision:revision(s),round:1,queue:s.questions.map(function(q){return {id:q.id,bridge:false};}),retry:[],attempts:{},mastered:{},xp:0,firstCorrect:0,answered:false,result:null,lastId:null};}
function find(s,id){for(var i=0;i<s.questions.length;i++)if(s.questions[i].id===id)return s.questions[i];return null;}
function restore(s,v){
 if(!v||v.version!==1||v.revision!==revision(s))return fresh(s);
 try{
  if(!Array.isArray(v.queue)||!Array.isArray(v.retry)||v.queue.length>101||v.retry.length>100)throw Error();
  var rebuilt=fresh(s),sum=0,first=0,ids={};
  s.questions.forEach(function(q){var n=v.attempts[q.id]||0;if(n%1||n<0||n>100000)throw Error();rebuilt.attempts[q.id]=n;if(v.mastered[q.id]){if(!n)throw Error();rebuilt.mastered[q.id]=true;sum+=n===1?100:n===2?50:20;if(n===1)first++;}});
  v.queue.forEach(function(e,i){if(!e||!find(s,e.id)||typeof e.bridge!=='boolean'||ids[e.id])throw Error();ids[e.id]=true;if(!e.bridge&&rebuilt.mastered[e.id]&&!(i===0&&v.answered===true&&v.result&&v.result.correct===true))throw Error();});
  v.retry.forEach(function(id,i){if(!find(s,id)||rebuilt.mastered[id]||v.retry.indexOf(id)!==i)throw Error();});
  s.questions.forEach(function(q){if(!rebuilt.mastered[q.id]&&!ids[q.id]&&v.retry.indexOf(q.id)<0)throw Error();});
  if(v.round%1||v.round<1||v.round>100000)throw Error();
  rebuilt.queue=copy(v.queue);rebuilt.retry=v.retry.slice();rebuilt.round=v.round;rebuilt.xp=sum;rebuilt.firstCorrect=first;rebuilt.lastId=find(s,v.lastId)?v.lastId:null;rebuilt.pause=v.pause===true;
  rebuilt.answered=v.answered===true&&rebuilt.queue.length>0;
  if(rebuilt.answered){var r=v.result;if(!r||typeof r.correct!=='boolean'||[0,20,50,100].indexOf(r.xp)<0)throw Error();rebuilt.result={correct:r.correct,xp:r.xp,bridge:rebuilt.queue[0].bridge};}
  if(!rebuilt.queue.length&&Object.keys(rebuilt.mastered).length!==s.questions.length)throw Error();return rebuilt;
 }catch(e){return fresh(s);}
}
function answer(s,state,value){
 if(state.answered||!state.queue.length)return null;
 var entry=state.queue[0],q=find(s,entry.id),right=q.type==='order'?JSON.stringify(value)===JSON.stringify(q.answer):value===q.answer,award=0;
 if(!entry.bridge){var n=(state.attempts[q.id]||0)+1;state.attempts[q.id]=n;if(right&&!state.mastered[q.id]){award=n===1?100:n===2?50:20;state.mastered[q.id]=true;state.xp+=award;if(n===1)state.firstCorrect++;}else if(!right&&state.retry.indexOf(q.id)<0)state.retry.push(q.id);}
 state.answered=true;state.result={correct:right,xp:award,bridge:entry.bridge};return state.result;
}
function next(s,state){
 if(!state.answered||!state.queue.length)return false;
 state.lastId=state.queue.shift().id;state.answered=false;state.result=null;
 if(!state.queue.length&&state.retry.length){state.round++;state.queue=state.retry.map(function(id){return {id:id,bridge:false};});state.retry=[];
  if(state.queue[0].id===state.lastId){if(state.queue.length>1)state.queue.push(state.queue.shift());else{var other=s.questions.filter(function(q){return q.id!==state.lastId;})[0];if(other)state.queue.unshift({id:other.id,bridge:true});else state.pause=true;}}
 }return true;
}
function metrics(s,state){var learned=Object.keys(state.mastered).length;return {xp:state.xp,first:Math.round(state.firstCorrect/s.questions.length*100),completion:Math.round(learned/s.questions.length*100),learned:learned,total:s.questions.length,repeated:s.questions.filter(function(q){return (state.attempts[q.id]||0)>1;}).length};}
// Coverage only advances during plausible continuous playback. Seeking never grants coverage.
function WatchGate(frontier){this.frontier=Math.max(0,Number(frontier)||0);this.last=null;this.wall=null;this.seeking=false;}
WatchGate.prototype.sample=function(time,wall,playing,rate){if(!playing){if(this.last===null){this.last=time;this.wall=wall;}return this.frontier;}if(this.last!==null&&!this.seeking){var delta=time-this.last,elapsed=(wall-this.wall)/1000;if(delta>=0&&delta<=Math.max(.3,elapsed*Math.min(rate||1,2)+.35)&&this.last<=this.frontier+.3)this.frontier=Math.max(this.frontier,time);}this.last=time;this.wall=wall;return this.frontier;};
WatchGate.prototype.seek=function(time){this.seeking=true;this.last=null;return time>this.frontier+.3?this.frontier:time;};
WatchGate.prototype.endSeek=function(){this.seeking=false;this.last=null;};
WatchGate.prototype.complete=function(duration){return isFinite(duration)&&duration>0&&this.frontier>=duration-.35;};
var api={validate:validate,revision:revision,fresh:fresh,restore:restore,find:find,answer:answer,next:next,metrics:metrics,WatchGate:WatchGate};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LinguEngine=api;
}(this));
