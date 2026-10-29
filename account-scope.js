(function(){'use strict';
  window.LinguPreview=(parent!==window||!!opener)&&new URLSearchParams(location.search).has('lingu-preview');if(window.LinguPreview){window.LinguAccountScope='preview';return;}var uid=null;try{uid=localStorage.getItem('lingucat.account.uid');}catch(e){}
  window.LinguAccountScope=/^[A-Za-z0-9_-]{1,128}$/.test(uid||'')?uid:null;
  document.documentElement.classList.add('account-boot');
}());
