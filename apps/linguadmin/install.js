(function(){'use strict';
var button=document.getElementById('adminInstall'),promptEvent=null,mode=matchMedia('(display-mode: standalone)'),key='linguadmin.pwa.installed',installed=mode.matches||navigator.standalone===true;
try{installed=installed||localStorage.getItem(key)==='1';}catch(e){}
function render(){button.hidden=!isSecureContext||installed||mode.matches||navigator.standalone===true;}
function mark(){installed=true;try{localStorage.setItem(key,'1');}catch(e){}render();}
function help(){var dialog=document.createElement('dialog'),title=document.createElement('h2'),copy=document.createElement('p'),close=document.createElement('button');title.id='adminInstallTitle';title.textContent='LinguAdmin’i yükle';copy.textContent=/iPad|iPhone|iPod/.test(navigator.userAgent)?'Safari’de Paylaş menüsünü açıp “Ana Ekrana Ekle” seçeneğini kullan.':'Chrome veya Edge’de adres çubuğundaki uygulama yükleme simgesini ya da tarayıcı menüsündeki “Uygulamayı yükle” seçeneğini kullan. Firefox’ta bu seçenek görünmüyorsa Chrome veya Edge ile açabilirsin.';close.type='button';close.textContent='Tamam';dialog.setAttribute('aria-labelledby',title.id);dialog.append(title,copy,close);document.body.appendChild(dialog);close.onclick=function(){dialog.close();};dialog.addEventListener('close',function(){dialog.remove();button.focus();});dialog.showModal();close.focus();}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();promptEvent=e;installed=false;try{localStorage.removeItem(key);}catch(err){}render();});
window.addEventListener('appinstalled',function(){promptEvent=null;mark();});
if(mode.addEventListener)mode.addEventListener('change',render);else if(mode.addListener)mode.addListener(render);
button.onclick=async function(){if(installed||mode.matches){render();return;}if(!promptEvent){help();return;}var event=promptEvent;promptEvent=null;try{await event.prompt();var choice=await event.userChoice;if(choice.outcome==='accepted')mark();}catch(e){help();}render();};
window.addEventListener('online',network);window.addEventListener('offline',network);
function network(){var n=document.getElementById('adminNetwork');n.hidden=navigator.onLine;n.textContent=navigator.onLine?'':'Çevrimdışısın. Giriş, kayıt ve yayınlama için internet bağlantısı gerekli.';}
render();network();
if('serviceWorker' in navigator&&isSecureContext){navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'}).then(function(reg){reg.update().catch(function(){});}).catch(function(){document.getElementById('adminNetwork').hidden=false;document.getElementById('adminNetwork').textContent='Uygulama kurulumu hazırlanamadı. Bağlantını kontrol edip sayfayı yenile.';});}
})();
