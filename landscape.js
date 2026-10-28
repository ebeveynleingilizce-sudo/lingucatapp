(function(){'use strict';
var toggle=document.getElementById('settingsToggle'),panel=document.getElementById('appSettings');
function closeSettings(){if(!panel.classList.contains('hidden')&&window.LinguFX)window.LinguFX.play('back');panel.classList.add('hidden');toggle.setAttribute('aria-expanded','false');}
toggle.onclick=function(){var open=panel.classList.contains('hidden');panel.classList.toggle('hidden',!open);toggle.setAttribute('aria-expanded',String(open));if(open)panel.querySelector('button').focus();};
document.addEventListener('click',function(e){if(!panel.contains(e.target)&&!toggle.contains(e.target))closeSettings();});
panel.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&b.id!=='soundBtn'&&b.id!=='fxPreview')closeSettings();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.classList.contains('hidden')){closeSettings();toggle.focus();}});
var portrait=window.matchMedia('(orientation: portrait) and (max-width: 900px)');
function orientationChanged(){document.getElementById('rotatePrompt').setAttribute('aria-hidden',String(!portrait.matches));if(portrait.matches)Array.prototype.forEach.call(document.querySelectorAll('video,audio'),function(v){v.pause();});}
if(portrait.addEventListener)portrait.addEventListener('change',orientationChanged);else if(portrait.addListener)portrait.addListener(orientationChanged);
orientationChanged();
}());
