# Match Rush

Oyunlar → Match Rush üzerinden açılır. Mevcut uygulamaya eklenmiştir; hikâye, şarkı ve diğer oyunların gezinmesi korunur.

## İçerik ve algoritma
- 12 kelime; Kelime–Kelime modunda 3 tur, Görsel–Kelime modunda 8 görselli kelime ile 2 tur.
- Her tur 4+4 HTML düğmesi. Eşleşme `data-pair-id` üzerinden yapılır. İki sütun bağımsız Fisher–Yates karıştırmasıyla oluşturulur; aynı satırdaki eşleşmeler reddedilir.
- Kartlar doğru yanıttan 650 ms sonra görünmez olur; grid hücreleri korunur. Yanlış yanıt 450 ms sonra temizlenir. Hareket azaltma ayarında bekleme 60 ms; animasyonlar kapalıdır.
- İçerik kaynağı `data/match-rush.json`; `match-rush-data.js`, aynı içeriğin file:// ve çevrimdışı açılışa uygun JavaScript kopyasıdır. İçerik güncellemelerinde ikisi birlikte güncellenmelidir.
- Görseli olmayan kelimeler görsel moduna alınmaz. Görsel kartlarında sadece img, kelime kartlarında sadece metin vardır. Görsel alternatif metinleri ekran okuyucular içindir.

## XP ve kayıtlar
- XP ayrı bir formülle hesaplanmaz: `LinguEngine.answer`, `next`, `restore` kullanılır. Mevcut motor ilk/ikinci/daha sonraki doğru denemeye 100/50/20 XP verir.
- Her kelimenin motor durumu mevcut `LinguTabAPI.read/write` depolama katmanında `match.progress.<id>` anahtarına kaydedilir. İki mod aynı kaydı paylaşır. Yeniden başlatma bu kaydı silmez; aynı kelime tekrar XP vermez.
- Profildeki toplam XP ve mevcut ödül sisteminin seviye hesabı bu kazanımları içerir. Kelime Avcısı ilk tamamlamada, Mükemmel Tur hatasız tamamlamada mevcut ödül arayüzü üzerinden açılır.
- Son oynanışın doğru/yanlış denemeleri, mod, ipucu sayısı ve tamamlanma bilgisi `match.lastRun` kaydındadır. Kısmi oyundan çıkışta kazanılmış XP korunur; yeniden giriş yeni oyunla başlar.

## Assetler
Mevcut `assets/home/hero.webp`, `assets/home/lili.webp` ve Mystery Box doğru/yanlış sesleri kullanılır. Nesneler mevcut Mystery Box çizimlerinden en fazla 256×256 WebP dosyalarına dönüştürülmüştür. Yeni emoji metni kullanılmaz. Arka plan ve karakterler düğmelerden bağımsızdır.

Ayrı Lili poz dosyaları projede yoktur. Şimdiki tepkiler aynı maskot üzerinde kısa zıplama, eğilme ve konuşma balonu değişimiyle sağlanır. Daha gelişmiş mimikler için eksik/önerilen assetler:
- `assets/match-rush/lili-happy.webp` — 512×512, şeffaf; sevinme pozu.
- `assets/match-rush/lili-thinking.webp` — 512×512, şeffaf; düşünme pozu.
- `assets/match-rush/lili-celebrate.webp` — 512×512, şeffaf; bitiş kutlaması.
- `book.webp`, `pencil.webp`, `school.webp`, `teacher.webp` — 256×256, şeffaf, mevcut çizimlerle tutarlı; bu sözcükleri görsel moduna eklemek için. Bu dosyalar gelene kadar söz konusu kelimeler görsel havuzuna alınmaz.

## Doğrulama
`node tests/match-rush.test.cjs`: 500 karıştırmada aynı satırda doğru eş olmaması, iki modun içerik ayrımı, doğru/yanlış eşleşme, dokunma emülasyonu, yeniden başlatma, modlar arası tekrar XP engeli, kalıcı kayıt ve rozetler. Chrome headless; 1920×1080, 1366×768, 1024×768, 844×390, 667×375, 390×844 boyutlarında dialog taşması ve kartların ekranda kalması kontrol edildi.

`node tests/match-rush-interactions.test.cjs`: normal animasyon, klavyeyle seçim, ipucu, bulunan karttan sonra diğer kartların yerlerinin korunması, kısmi oyun XP kaydının yeniden yüklemede korunması ve çıkış.

`node tests/reward-engine.test.cjs` ve `node tests/reward-flows.test.cjs`: mevcut ödül sistemi regresyon testleri geçti.

Ekran görüntüleri `tests/match-rush-*.png`, sonuç özeti `tests/match-rush-results.json` içindedir. Android, iOS, akıllı tahta, Pardus ve Firefox üzerinde fiziksel/yerel test yapılmadı. PWA önbellek listesine oyunun CSS, veri ve ses dosyaları eklendi; çevrimdışı kurulum bu görev kapsamında ayrıca test edilmedi.
