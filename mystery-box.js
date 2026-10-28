(function () {
  'use strict';
  var dialog = document.createElement('dialog');
  dialog.className = 'mystery-dialog';
  dialog.setAttribute('aria-labelledby', 'mystery-title');
  dialog.innerHTML = '<header class="mystery-toolbar"><div><b id="mystery-title">Mystery Box</b><span>İpuçlarını oku, gizli nesneyi bul.</span></div><button class="outline" type="button">← Oyunlar</button></header><iframe title="Mystery Box İngilizce kelime oyunu" allow="autoplay; fullscreen"></iframe>';
  document.body.appendChild(dialog);
  var frame = dialog.querySelector('iframe'), previousFocus, oldOverflow;
  function close() { dialog.close(); }
  dialog.querySelector('button').onclick = close;
  dialog.addEventListener('close', function () {
    if(window.LinguWorkspace)window.LinguWorkspace.leaveGame(dialog);
    if(window.LinguFX)window.LinguFX.stop();frame.removeAttribute('src');
    document.body.style.overflow = oldOverflow;
    if (previousFocus) previousFocus.focus();
  });
  window.addEventListener('message', function (event) {
    if (event.source === frame.contentWindow && event.data === 'lingucat:mystery-close' && dialog.open) close();
    var audioEvent=event.data;if(event.source===frame.contentWindow&&dialog.open&&audioEvent&&audioEvent.type==='lingucat:game-sound'){var cues={click:'select',yes:'correct',no:'incorrect',success:'complete',correct:'correct',wrong:'incorrect'};if(cues[audioEvent.cue]&&window.LinguFX){window.LinguAudio.unlock();window.LinguFX.play(cues[audioEvent.cue]);}return;}if(event.source===frame.contentWindow&&dialog.open&&audioEvent&&audioEvent.type==='lingucat:game-audio-enabled'){if(window.LinguFX)window.LinguFX.setEnabled(audioEvent.enabled===true);return;}var d=event.data;if(event.source===frame.contentWindow&&dialog.open&&d&&d.type==='lingucat:game-complete'&&d.game==='mystery-box'&&d.completed===10&&Number.isFinite(d.score)&&d.score>=-1000&&d.score<=400&&['easy','normal','hard','expert'].indexOf(d.difficulty)>=0){window.dispatchEvent(new CustomEvent('lingucat:standalone-complete',{detail:d}));}
  });
  function open() {
    previousFocus = document.activeElement;
    document.querySelectorAll('video,audio').forEach(function (media) { media.pause(); });
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    frame.src = 'games/mystery-box/index.html' + (window.LinguFX&&!window.LinguFX.state().enabled?'?muted=1':'');
    dialog.showModal();
    if(window.LinguWorkspace)window.LinguWorkspace.enterGame(dialog);
  }
  function card(container, catalog) {
    if (container.querySelector('[data-standalone-game="mystery-box"]')) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.dataset.standaloneGame = 'mystery-box';
    button.className = catalog ? 'catalog-game mystery-card' : 'discover-card game-tile mystery-card';
    if (catalog) {
      button.innerHTML = '<b>Mystery Box</b><span>İpuçlarını oku, gizli nesneyi tahmin et.</span><small>İngilizce kelimeler · Hemen oyna</small>';
    } else {
      button.innerHTML = '<span class="tile-art"><span class="tile-badge">KELİME OYUNU · HEMEN OYNA</span><span class="tile-symbol" aria-hidden="true">?</span></span><span class="tile-copy"><b>Mystery Box</b><small>İpuçlarını keşfet · Gizli nesneyi bul</small></span>';
    }
    button.onclick = open;
    container.appendChild(button);
  }
  var home = document.getElementById('homeGames');
  var catalog = document.getElementById('catalogItems');
  function update() {
    card(home, false);
    if (document.getElementById('catalogTitle').textContent === 'Oyunlar') card(catalog, true);
  }
  new MutationObserver(update).observe(home, {childList:true});
  new MutationObserver(update).observe(catalog, {childList:true});
  update();
})();
