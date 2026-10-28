(function(){'use strict';
var url='https://tinyurl.com/lingucat',active=null,box=null,timer=null;
var icon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4"/></svg>';
function close(){clearTimeout(timer);if(box)box.remove();box=null;}
function feedback(copied){close();box=document.createElement('div');box.className='app-share-feedback';box.setAttribute('role','status');var text=document.createElement('span');text.textContent=copied?'Paylaşım bağlantısı kopyalandı.':'Bağlantıyı seçip kopyalayabilirsin.';var input=document.createElement('input');input.value=url;input.readOnly=true;input.setAttribute('aria-label','LinguCat paylaşım bağlantısı');input.onclick=function(){this.select();};var exit=document.createElement('button');exit.type='button';exit.textContent='×';exit.setAttribute('aria-label','Paylaşım bilgisini kapat');exit.onclick=close;box.appendChild(text);box.appendChild(input);box.appendChild(exit);document.body.appendChild(box);if(!copied){input.focus();input.select();}else timer=setTimeout(close,4000);}
async function share(event){active=event.currentTarget;if(navigator.share){try{await navigator.share({title:'LinguCat',text:'İngilizceyi izleyerek, oynayarak keşfet!',url:url});return;}catch(e){if(e.name==='AbortError')return;}}
try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error('clipboard unavailable');await navigator.clipboard.writeText(url);feedback(true);}catch(e){feedback(false);}}
function button(extra){var b=document.createElement('button');b.type='button';b.className='app-share-button '+(extra||'');b.setAttribute('aria-label','Uygulamayı paylaş');b.title='Uygulamayı paylaş';b.innerHTML=icon;b.onclick=share;return b;}
var header=document.querySelector('.header-actions');if(header)header.insertBefore(button('app-share-header'),document.getElementById('fullscreenBtn'));
window.LinguShare={attachGate:function(gate){if(!gate.querySelector('.app-share-login'))gate.appendChild(button('app-share-login'));}};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&box){close();if(active)active.focus();}});
document.addEventListener('click',function(e){if(box&&!box.contains(e.target)&&!e.target.closest('.app-share-button'))close();});
}());
