"use strict";
const crypto=require('node:crypto');
const E=require('./engine.cjs');
const stories=E.validate(require('./catalog/the-mysterious-student.json')),songs=E.validate(require('./catalog/every-day-every-way.json')),match=require('./catalog/match.json');
const types={quiz:['multiple','boolean'],who:['speaker','vocabulary'],order:['order'],grammar:['grammar']};
const avatars=['lili','star','book','rocket','cat','moon'];
function fail(text){throw new Error(text);}
function text(value,max=80){if(typeof value!=='string'||!value.trim()||value.trim().length>max)fail('Geçerli bir metin gir.');return value.trim();}
function profile(input){const requestedRole=input.requestedRole==='teacher'?'teacher':'student',grade=Number(input.grade);if(requestedRole==='student'&&(!Number.isInteger(grade)||grade<1||grade>12))fail('Sınıf seviyesi 1–12 olmalı.');if(input.noticeAccepted!==true)fail('Gizlilik bilgilendirmesini onayla.');return {displayName:text(input.displayName,80),grade:requestedRole==='student'?grade:null,avatar:avatars.includes(input.avatar)?input.avatar:'lili',requestedRole,noticeVersion:1,noticeAccepted:true};}
function activity(input){
 if(input.kind==='match'){const w=match.find(w=>w.id===input.questionId);if(!w||!match.some(w=>w.id===input.answerId))fail('Bilinmeyen eşleşme.');return {id:'match-'+w.id,content:{id:'match-'+w.id,questions:[{id:w.id,answer:0}]},question:{id:w.id,answer:0},value:input.answerId===w.id?0:1,kind:'match',title:'Match Rush'};}
 const content=input.module==='stories'?stories:input.module==='songs'?songs:null;if(!content||content.id!==input.contentId||!types[input.activityId])fail('Bilinmeyen etkinlik.');
 const grouped={...content,questions:content.questions.filter(q=>types[input.activityId].includes(q.type))},question=grouped.questions.find(q=>q.id===input.questionId);if(!question)fail('Bilinmeyen soru.');
 let value=input.value;if(question.type==='order'){if(!Array.isArray(value)||value.length!==question.options.length||new Set(value).size!==value.length||value.some(v=>!Number.isInteger(v)||v<0||v>=value.length))fail('Geçersiz sıra.');}else if(!Number.isInteger(value)||value<0||value>=question.options.length)fail('Geçersiz cevap.');
 return {id:input.module+'-'+input.activityId,content:grouped,question,value,kind:input.module,title:content.title};
}
function score(old,input){const a=activity(input),q=a.question,s={attempts:{},mastered:{},xp:0,correct:0,wrong:0,...old};s.attempts={...s.attempts};s.mastered={...s.mastered};const correct=JSON.stringify(q.answer)===JSON.stringify(a.value);let gain=0;
 if(!s.mastered[q.id]){const tries=Math.min(100000,(s.attempts[q.id]||0)+1);s.attempts[q.id]=tries;if(correct){gain=tries===1?100:tries===2?50:20;s.mastered[q.id]=true;s.xp+=gain;}}
 s.correct+=(correct?1:0);s.wrong+=(correct?0:1);s.complete=a.content.questions.every(q=>s.mastered[q.id]);s.total=a.content.questions.length;s.kind=a.kind;s.title=a.title;s.contentId=a.content.id;s.activityId=input.activityId||'match';s.revision=E.revision(a.content);return {activity:a,state:s,gain,correct};
}
function badgeIds(stats,activity){const ids=[];if(activity.complete){if(activity.kind==='stories')ids.push('story-explorer');if(activity.kind==='songs')ids.push('rhythm-star');if(activity.activityId==='grammar')ids.push('grammar-hero');if(activity.activityId==='order'||(activity.kind==='stories'&&activity.activityId==='who'))ids.push('listening-master');if(activity.activityId==='who'&&activity.kind==='songs')ids.push('word-hunter');if(activity.kind!=='match'&&Object.values(activity.attempts).every(n=>n===1))ids.push('perfect-round');}if((stats.wordsLearned||0)>=6)ids.push('word-hunter');return ids;}
function invite(){return crypto.randomBytes(6).toString('base64url').toUpperCase();}
function hash(code){return crypto.createHash('sha256').update(text(code,20).toUpperCase()).digest('hex');}
function activityId(input){return activity(input).id;}
module.exports={text,profile,activity,score,badgeIds,invite,hash,avatars,stories,songs,match,types,activityId};
