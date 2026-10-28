(function(){
'use strict';
var active=null,trigger=null;
function openBattle(button){
 trigger=button;
 if(location.protocol==='file:'){
  alert('3D Battle Arena için LinguCat klasöründeki LinguCat-Baslat.cmd dosyasını aç. Tarayıcı, 3D oyunu dosyaya çift tıklayarak başlatmaya izin vermiyor.');return;
 }
 Array.prototype.forEach.call(document.querySelectorAll('video,audio'),function(v){v.pause();});
 active=document.createElement('div');active.className='battle-overlay';active.setAttribute('role','dialog');active.setAttribute('aria-modal','true');active.setAttribute('aria-label','English Battle Arena');
 var bar=document.createElement('div');bar.className='battle-topbar';
 var title=document.createElement('strong');title.textContent='English Battle Arena';
 var back=document.createElement('button');back.className='outline';back.textContent='← Oyunlar';back.onclick=closeBattle;
 bar.appendChild(title);bar.appendChild(back);active.appendChild(bar);
 var frame=document.createElement('iframe');frame.title='English Battle Arena · İngilizce soru savaşı';frame.src='games/battle-arena/game.html';frame.allow='autoplay; fullscreen';active.appendChild(frame);
 if(window.LinguWorkspace)window.LinguWorkspace.frame(active,bar,frame,'battle');document.body.appendChild(active);document.body.style.overflow='hidden';back.focus();if(window.LinguWorkspace)window.LinguWorkspace.enterGame(active);
}
function closeBattle(){if(active){if(window.LinguWorkspace)window.LinguWorkspace.leaveGame(active);if(window.LinguFX)window.LinguFX.play('back');active.remove();active=null;document.body.style.overflow='';if(trigger)trigger.focus();}}
function card(box){if(!box||box.querySelector('[data-battle-arena]'))return;
 var button=document.createElement('button');button.className='catalog-game battle-game-card';button.setAttribute('data-battle-arena','true');
 var art=document.createElement('span');art.className='battle-art';art.setAttribute('aria-hidden','true');
 var title=document.createElement('b');title.textContent='English Battle Arena';
 var detail=document.createElement('span');detail.textContent='Kartını seç, İngilizce sorusunu çöz, rakibini yen.';
 var meta=document.createElement('small');meta.textContent='2–5. sınıf · 200 İngilizce sorusu · 3D savaş';
 button.appendChild(art);button.appendChild(title);button.appendChild(detail);button.appendChild(meta);button.onclick=function(){openBattle(button);};box.appendChild(button);
}
function refresh(){card(document.getElementById('homeGames'));var title=document.getElementById('catalogTitle');if(title&&title.textContent==='Oyunlar')card(document.getElementById('catalogItems'));}
var observer=new MutationObserver(refresh);
['homeGames','catalogItems'].forEach(function(id){var el=document.getElementById(id);if(el)observer.observe(el,{childList:true});});
refresh();
})();
