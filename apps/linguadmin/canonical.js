// A separate origin prevents the installed LinguCat PWA from capturing LinguAdmin.
if(location.hostname==='ebeveynleingilizce-sudo.github.io'&&!new URLSearchParams(location.search).has('local-export'))location.replace('https://linguadmin-818758464845.web.app/apps/linguadmin/'+location.search+location.hash);
