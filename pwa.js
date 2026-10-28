(function () {
'use strict';
var panel=document.getElementById('appSettings'), deferred=null, registration=null;
function button(id,text,fn){var b=document.createElement('button');b.id=id;b.type='button';b.textContent=text;b.className='quiet';b.onclick=fn;panel.appendChild(b);return b;}
function notice(text){var t=document.getElementById('toast');t.textContent=text;t.classList.remove('hidden');clearTimeout(notice.timer);notice.timer=setTimeout(function(){t.classList.add('hidden');},6500);}
var splash=document.getElementById('appSplash');
function hideSplash(){if(splash)splash.parentNode.removeChild(splash);splash=null;}
if(document.readyState==='complete')hideSplash();else window.addEventListener('load',hideSplash);
setTimeout(hideSplash,2500);
var displayMode=window.matchMedia('(display-mode: standalone)'),installKey='lingucat.pwa.installed',helpReturn=null;
function rememberedInstall(){try{return localStorage.getItem(installKey)==='1';}catch(e){return false;}}
var installed=displayMode.matches||navigator.standalone===true||rememberedInstall(),nativeInstallSupported='onbeforeinstallprompt' in window;
function rememberInstalled(value){installed=value;try{if(value)localStorage.setItem(installKey,'1');else localStorage.removeItem(installKey);}catch(e){}renderInstall();}
var promo=document.createElement('button');promo.id='installPromo';promo.type='button';promo.className='pwa-install-promo';promo.hidden=true;
promo.setAttribute('aria-label','LinguCat uygulamasını yükle');
promo.innerHTML='<span class="pwa-install-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v11m-4-4 4 4 4-4M5 15v5h14v-5"/></svg></span><span class="pwa-install-copy"><b>Uygulamayı İndir</b><small>Ücretsiz · Ana ekranına ekle</small></span><span class="pwa-install-arrow" aria-hidden="true">↗</span>';
function renderInstall(){
 var inApp=displayMode.matches||navigator.standalone===true,available=window.isSecureContext&&location.protocol!=='file:'&&!installed&&!inApp;
 promo.hidden=!available;
 install.hidden=!(available&&deferred);
 var brand=document.querySelector('#accountGate .account-brand');if(brand)brand.classList.toggle('has-install-promo',!promo.hidden&&promo.parentNode===brand);
}
function mountPromo(){var gate=document.getElementById('accountGate'),host=gate&&!gate.hidden?gate:document.querySelector('#hub .adventure-hero');if(host&&promo.parentNode!==host)host.appendChild(promo);renderInstall();}
async function requestInstall(){
 if(installed||displayMode.matches||navigator.standalone===true){renderInstall();return;}
 if(!deferred){showInstallHelp();return;}
 var prompt=deferred;deferred=null;renderInstall();
 try{await prompt.prompt();var choice=await prompt.userChoice;if(choice&&choice.outcome==='accepted')notice('Kurulum onaylandı. LinguCat simgesini uygulamalarında bulabilirsin.');}
 catch(e){notice('Kurulum penceresi açılamadı. Tarayıcının yükleme seçeneğini kullanabilirsin.');}
}
var install=button('installApp',"LinguCat'i Yükle",requestInstall);install.hidden=true;promo.onclick=requestInstall;
window.LinguPWA={attachGate:function(gate){new MutationObserver(mountPromo).observe(gate,{attributes:true,attributeFilter:['hidden']});mountPromo();}};
mountPromo();if(displayMode.matches||navigator.standalone===true)rememberInstalled(true);
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();if(displayMode.matches||navigator.standalone===true)return;deferred=e;rememberInstalled(false);});
window.addEventListener('appinstalled',function(){deferred=null;rememberInstalled(true);});
function displayChanged(){if(displayMode.matches)rememberInstalled(true);else renderInstall();}
if(displayMode.addEventListener)displayMode.addEventListener('change',displayChanged);else if(displayMode.addListener)displayMode.addListener(displayChanged);
window.addEventListener('storage',function(e){if(e.key===installKey){installed=rememberedInstall();renderInstall();}});
if(navigator.getInstalledRelatedApps)navigator.getInstalledRelatedApps().then(function(apps){var manifest=new URL('app.webmanifest',location.href).href,id=new URL('index.html',location.href).href;if(apps.some(function(app){return app.platform==='webapp'&&(app.id===id||app.url&&new URL(app.url,location.href).href===manifest);})){rememberInstalled(true);}}).catch(function(){});
var help=document.createElement('dialog');help.id='pwaHelp';help.setAttribute('aria-labelledby','pwaHelpTitle');
help.innerHTML='<h2 id="pwaHelpTitle">LinguCat uygulama rehberi</h2><p><b>Windows Chrome / Edge ve Pardus Chromium:</b> Tarayıcı kurulum sunarsa adres çubuğundaki yükleme simgesini veya ayarlardaki LinguCat’i Yükle seçeneğini kullan.</p><p><b>Android Chrome:</b> Tarayıcı menüsünden Uygulamayı yükle / Ana ekrana ekle seçeneğini kullan.</p><p><b>iPhone / iPad Safari:</b> Paylaş → Ana Ekrana Ekle yolunu izle; sunulursa Web Uygulaması Olarak Aç seçeneğini etkinleştir.</p><p><b>Pardus Firefox:</b> Tarayıcıda devam et. Tam ekran için F11; çıkmak için tekrar F11. Uygulama içi tam ekran düğmesini de kullanabilirsin.</p><p>İlk çevrimiçi açılış ve “Çevrimdışı hazır” bildirimi sonrasında arayüz, kelimeler ve uygun etkinlikler çevrimdışı açılır. Ses efektleri uygulamaya dahildir ve çevrimdışı çalışır. Videolar indirilmez; izleme kilidi olan etkinlikler videoyu önceden tamamlamayı gerektirir. İlerleme bu cihazın tarayıcısında saklanır; site verilerini silmek kayıtları siler.</p><button type="button" class="outline">Kapat</button>';
document.body.appendChild(help);
function showInstallHelp(){helpReturn=document.activeElement;if(help.showModal)help.showModal();else{help.setAttribute('open','');help.style.display='block';}help.querySelector('button').focus();}
var helpTrigger=button('installHelp','Kurulum ve çevrimdışı rehberi',showInstallHelp);
help.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();help.querySelector('button').click();}if(e.key==='Tab'){e.preventDefault();help.querySelector('button').focus();}});
help.querySelector('button').onclick=function(){if(help.close)help.close();else{help.removeAttribute('open');help.style.display='none';}var target=helpReturn&&helpReturn.isConnected&&helpReturn.getClientRects().length?helpReturn:document.getElementById('settingsToggle');target.focus();};
var update=button('updateApp','Yeni sürüm hazır · Yenile',function(){if(!registration||!registration.waiting)return;update.disabled=true;window.dispatchEvent(new Event('lingucat:before-update'));Array.prototype.forEach.call(document.querySelectorAll('video,audio'),function(media){media.pause();});if(window.stop)window.stop();registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});setTimeout(function(){if(!reloading){update.disabled=false;notice('Güncelleme bekliyor. Diğer LinguCat pencerelerini kapatıp yeniden dene; gerekirse uygulamayı kapatıp aç. İlerlemen kaydedildi.');}},15000);});update.hidden=true;
var reloading=false;
function waiting(){if(registration.waiting&&navigator.serviceWorker.controller)update.hidden=false;}
if('serviceWorker' in navigator&&window.isSecureContext){
 var hadController=!!navigator.serviceWorker.controller;
 navigator.serviceWorker.addEventListener('controllerchange',function(){var gate=document.getElementById('accountGate'),onEntry=gate&&!gate.hidden&&!gate.querySelector('input:focus,select:focus')&&!gate.querySelector('form[aria-busy=true]');if((update.disabled||hadController&&onEntry)&&!reloading){reloading=true;window.location.reload();}hadController=true;});
 navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(function(r){registration=r;waiting();r.addEventListener('updatefound',function(){var w=r.installing;if(w)w.addEventListener('statechange',function(){if(w.state==='installed'){waiting();if(!navigator.serviceWorker.controller)notice('Çevrimdışı hazır. İlerlemen bu cihazda saklanır.');}});});}).catch(function(){/* Offline setup is optional; keep the local application usable. */});
}
window.addEventListener('offline',function(){notice('Çevrimdışısın. İlerlemen cihazında saklanmaya devam eder; videolar internet gerektirir.');});
window.addEventListener('online',function(){notice('Bağlantı geri geldi. Cihazındaki ilerleme korunuyor.');if(registration)registration.update().catch(function(){});});
function fullscreenChanged(){var on=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,b=document.getElementById('fullscreenBtn');b.setAttribute('aria-label',on?'Tam ekrandan çık':'Tam ekrana geç');b.setAttribute('aria-pressed',String(!!on));if(on&&window.screen.orientation&&window.screen.orientation.lock){try{var result=window.screen.orientation.lock('landscape');if(result&&result.catch)result.catch(function(){});}catch(e){}}}
document.addEventListener('fullscreenchange',fullscreenChanged);document.addEventListener('mozfullscreenchange',fullscreenChanged);document.addEventListener('webkitfullscreenchange',fullscreenChanged);
}());
