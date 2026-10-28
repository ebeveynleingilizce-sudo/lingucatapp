(function(){'use strict';
  var uid=null;try{uid=localStorage.getItem('lingucat.account.uid');}catch(e){}
  window.LinguAccountScope=/^[A-Za-z0-9_-]{1,128}$/.test(uid||'')?uid:null;
  document.documentElement.classList.add('account-boot');
}());
