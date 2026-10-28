(function () {
'use strict';
var panel=document.getElementById('appSettings'), deferred=null, registration=null;
function button(id,text,fn){var b=document.createElement('button');b.id=id;b.type='button';b.textContent=text;b.className='quiet';b.onclick=fn;panel.appendChild(b);return b;}
function notice(text){var t=document.getElementById('toast');t.textContent=text;t.classList.remove('hidden');clearTimeout(notice.timer);notice.timer=setTimeout(function(){t.classList.add('hidden');},6500);}
var splash=document.getElementById('appSplash');
function hideSplash(){if(splash)splash.parentNode.removeChild(splash);splash=null;}
if(document.readyState==='complete')hideSplash();else window.addEventListener('load',hideSplash);
setTimeout(hideSplash,2500);
var installed=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone;
var install=button('installApp',"LinguCat'i Yükle",function(){if(!deferred)return;var prompt=deferred;deferred=null;install.hidden=true;prompt.prompt();prompt.userChoice.then(function(){},function(){});});
install.hidden=true;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;if(!installed)install.hidden=false;});
window.addEventListener('appinstalled',function(){install.hidden=true;deferred=null;installed=true;});
var help=document.createElement('dialog');help.id='pwaHelp';help.setAttribute('aria-labelledby','pwaHelpTitle');
help.innerHTML='<h2 id="pwaHelpTitle">LinguCat uygulama rehberi</h2><p><b>Windows Chrome / Edge ve Pardus Chromium:</b> Tarayıcı kurulum sunarsa adres çubuğundaki yükleme simgesini veya ayarlardaki LinguCat’i Yükle seçeneğini kullan.</p><p><b>Android Chrome:</b> Tarayıcı menüsünden Uygulamayı yükle / Ana ekrana ekle seçeneğini kullan.</p><p><b>iPhone / iPad Safari:</b> Paylaş → Ana Ekrana Ekle yolunu izle; sunulursa Web Uygulaması Olarak Aç seçeneğini etkinleştir.</p><p><b>Pardus Firefox:</b> Tarayıcıda devam et. Tam ekran için F11; çıkmak için tekrar F11. Uygulama içi tam ekran düğmesini de kullanabilirsin.</p><p>İlk çevrimiçi açılış ve “Çevrimdışı hazır” bildirimi sonrasında arayüz, kelimeler ve uygun etkinlikler çevrimdışı açılır. Ses efektleri uygulamaya dahildir ve çevrimdışı çalışır. Videolar indirilmez; izleme kilidi olan etkinlikler videoyu önceden tamamlamayı gerektirir. İlerleme bu cihazın tarayıcısında saklanır; site verilerini silmek kayıtları siler.</p><button type="button" class="outline">Kapat</button>';
document.body.appendChild(help);
var helpTrigger=button('installHelp','Kurulum ve çevrimdışı rehberi',function(){if(help.showModal)help.showModal();else{help.setAttribute('open','');help.style.display='block';}help.querySelector('button').focus();});
help.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();help.querySelector('button').click();}if(e.key==='Tab'){e.preventDefault();help.querySelector('button').focus();}});
help.querySelector('button').onclick=function(){if(help.close)help.close();else{help.removeAttribute('open');help.style.display='none';}document.getElementById('settingsToggle').focus();};
var update=button('updateApp','Yeni sürüm hazır · Yenile',function(){if(!registration||!registration.waiting)return;update.disabled=true;window.dispatchEvent(new Event('lingucat:before-update'));Array.prototype.forEach.call(document.querySelectorAll('video,audio'),function(media){media.pause();});if(window.stop)window.stop();registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});setTimeout(function(){if(!reloading){update.disabled=false;notice('Güncelleme bekliyor. Diğer LinguCat pencerelerini kapatıp yeniden dene; gerekirse uygulamayı kapatıp aç. İlerlemen kaydedildi.');}},15000);});update.hidden=true;
var reloading=false;
function waiting(){if(registration.waiting&&navigator.serviceWorker.controller)update.hidden=false;}
if('serviceWorker' in navigator&&window.isSecureContext){
 navigator.serviceWorker.addEventListener('controllerchange',function(){if(update.disabled&&!reloading){reloading=true;window.location.reload();}});
 navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(function(r){registration=r;waiting();r.addEventListener('updatefound',function(){var w=r.installing;if(w)w.addEventListener('statechange',function(){if(w.state==='installed'){waiting();if(!navigator.serviceWorker.controller)notice('Çevrimdışı hazır. İlerlemen bu cihazda saklanır.');}});});}).catch(function(){/* Offline setup is optional; keep the local application usable. */});
}
window.addEventListener('offline',function(){notice('Çevrimdışısın. İlerlemen cihazında saklanmaya devam eder; videolar internet gerektirir.');});
window.addEventListener('online',function(){notice('Bağlantı geri geldi. Cihazındaki ilerleme korunuyor.');if(registration)registration.update().catch(function(){});});
function fullscreenChanged(){var on=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,b=document.getElementById('fullscreenBtn');b.setAttribute('aria-label',on?'Tam ekrandan çık':'Tam ekrana geç');b.setAttribute('aria-pressed',String(!!on));if(on&&window.screen.orientation&&window.screen.orientation.lock){try{var result=window.screen.orientation.lock('landscape');if(result&&result.catch)result.catch(function(){});}catch(e){}}}
document.addEventListener('fullscreenchange',fullscreenChanged);document.addEventListener('mozfullscreenchange',fullscreenChanged);document.addEventListener('webkitfullscreenchange',fullscreenChanged);
}());
