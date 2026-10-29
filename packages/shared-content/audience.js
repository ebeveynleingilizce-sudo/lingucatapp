(function(root){'use strict';
const cefr=['A1','A2','B1','B2','C1','C2'];
function grades(record){const values=record.grades===undefined?(record.grade?[Number(record.grade)]:[]):record.grades;if(!Array.isArray(values)||values.length>12||values.some(v=>!Number.isInteger(v)||v<1||v>12))throw Error('Gösterilecek sınıflar 1–12 arasında seçilmeli.');return [...new Set(values)].sort((a,b)=>a-b)}
function levels(record){let values=record.cefrLevels;if(values===undefined){values=(String(record.payload?.level||record.level||'').toUpperCase().match(/\b[ABC][12]\b/g)||[]);if(!values.length)values={easy:['A1','A2'],normal:['B1','B2'],hard:['C1','C2']}[record.difficulty]||[];}if(!Array.isArray(values)||values.length>6||values.some(v=>!cefr.includes(v)))throw Error('Geçerli bir A1–C2 seviyesi seç.');return cefr.filter(v=>values.includes(v))}
function band(level){return /^A/.test(level)?'easy':/^B/.test(level)?'normal':'hard'}
function bands(record){return [...new Set(levels(record).map(band))]}
function label(record,role='student'){const values=levels(record);return role==='teacher'||role==='admin'?values.join(' · '):[...new Set(values.map(v=>({easy:'Kolay',normal:'Orta',hard:'Zor'})[band(v)]))].join(' · ')}
function matches(record,{role='student',grade=0,level='all',difficulty='all'}={}){const g=grades(record),l=levels(record);return (!grade||!g.length||g.includes(Number(grade)))&&(role==='teacher'?level==='all'||!l.length||l.includes(level):difficulty==='all'||!l.length||bands(record).includes(difficulty))}
const api={cefr,grades,levels,bands,label,matches,context:{role:'student',grade:0},records:[]};
api.find=id=>api.records.find(r=>r.id===id);api.describe=content=>api.find(content.id)||{...content,payload:content};api.display=content=>label(api.describe(content),api.context.role);api.setContext=function(context){api.context={role:context?.role==='teacher'?'teacher':'student',grade:Number(context?.grade)||0};if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent('lingucat:audience-changed'));};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LinguAudience=api;
})(typeof window==='undefined'?globalThis:window);
