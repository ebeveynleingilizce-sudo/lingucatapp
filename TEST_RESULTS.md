# LinguCat — hikâye ve şarkı modülleri: test raporu

26 Ekim 2026. Mevcut uygulama klasörü ve dosya adresi korundu. Önceki kaynaklar `output/lingucat_before_song` altında yedeklendi.

## Yeni şarkı modülü

**Every Day, Every Way**, Şarkılar kataloğuna eklendi. Kullanıcının önceden altyazı eklenmiş 73,7 saniyelik 1080p videosu pakete birebir kopyalandı. Video yeniden kodlanmadı. Sorular yalnızca bu kesitte söylenen sözlere dayanır; bütün ipucu aralıkları ilk 58,4 saniye içindedir. Şarkının bu kesitte olmayan sonraki kıtaları kullanılmadı.

| Etkinlik | Soru sayısı | İlk denemelerde en fazla XP |
|---|---:|---:|
| Şarkı Testi | 4 | 400 |
| Kelime Avı | 3 | 300 |
| Sözleri Sırala | 2 | 200 |
| Dil Bilgisi Oyunları | 5 | 500 |
| Toplam | 14 | 1400 |

Arayüz, kullanım yönergeleri ve açıklamalar Türkçe; soru kökleri, seçenekler ve hedef ifadeler İngilizcedir. Her sorunun gerçek şarkı aralığına bağlı **Bölümü Tekrar Dinle** düğmesi vardır. Öğretmen paneli seçili modülün soru setini açar; kelime soruları için `vocabulary` türü eklendi.

Hikâye ve şarkı medya kaynakları, izleme kilitleri, soru kuyrukları, XP ve öğretmen içerik kayıtları ayrıdır. Şarkı ilerlemesi ayrı depolama anahtarında tutulur; hikâyenin mevcut V3/V4 ilerleme anahtarları korunur. Video dosyası tarayıcı depolamasına kopyalanmaz.

## Otomatik doğrulama: 51 kontrol geçti

- **16 motor kontrolü:** soru doğrulama, yanlış tekrar kuyruğu, 100/50/20 XP, aynı sorudan ikinci kez puan alınmaması, bozuk kayıt, izleme kapsamı, tek sorulu modül.
- **16 öğrenci/hikâye kontrolü:** Türkçe rehber ve arayüz, İngilizce soru/seçeneklerin korunması, kataloglar, gerçek videoyu tam oynatma, kilit, gecikmeli tekrar, sahne tekrarında durma, dört etkinlik, 900 XP senaryosu, kayıt yenileme, eski V3'ten 1000 XP aktarımı, mobil/tahta görünümü.
- **8 öğretmen/kenar durum kontrolü:** soru ekleme, taslağı koruma, önizleme, yayınlama, yerel video, JSON aktarımı, bozuk JSON ve zaman aralıkları, HTML'in yürütülmemesi, kayıt engeli, videosuz önizleme.
- **11 şarkı kontrolü:** gerçek şarkının baştan sona 2× oynatılması, ileri sarma ve yapay bitişin kilidi aşamaması, dört etkinlik, kelime ve sıralama etkileşimi, gecikmeli tekrar, doğru cevap açıklanmaması, bölüm tekrarının doğru noktada durması, modüller arasında bağımsızlık, yenilemede kayıt, öğretmen soru seti/dışa aktarma/yayınlama, mobil ve tahta görünümü, harici ağ isteği ve JavaScript hatası olmaması.

Şarkı testinde bir soru ilk denemede yanlış, ikinci denemede doğru cevaplandı: **1350 XP, 14/14 öğrenilen soru, 4/4 etkinlik**. Hikâyeye dönüldüğünde hikâye XP'si 0 ve kilidi kapalı kaldı; şarkıya dönüldüğünde 1350 XP ve tamamlanmış etkinlikler korundu. Sonuç ekranı ikinci kez XP vermedi. Şarkı taslağı yayınlandığında yalnızca şarkı ilerlemesi sıfırlandı; hikâye içerik kaydı değişmedi.

## Ortam ve sınırlar

Testler Windows Chrome/Playwright ile doğrudan yerel dosya üzerinden çalıştırıldı. 390×844 mobil ve 1920×1080 ekranlarda soru/sıralama görünümü kontrol edildi; yatay taşma yok. Ekran görüntüleri `tests/song-*.png` ve `tests/tr-*.png` altında. Gerçek Firefox/Pardus veya fiziksel dokunmatik tahta bu ortamda test edilmedi. ES5 yazımı ve mevcut CSS/tam ekran yedekleri korundu; cihazın H.264/AAC desteği gerekir.

İndirme ortam tarafından engellenebilir; geçerli JSON üretimi, seçilebilir metin yedeği ve içe aktarma doğrulandı. Gerçek öğrenci kullanılabilirlik araştırması yapılmadı. Kaynak video ve söz dosyaları değiştirilmedi.

## Testleri çalıştırma

```
node tests/engine.test.cjs
node tests/student-tr.test.cjs
node tests/teacher-tr.test.cjs
node tests/song.test.cjs
```

Tarayıcı testleri yerel Playwright ve Chrome yolunu kullanır. Uygulamanın kendisi bunları gerektirmez; çevrimdışı kullanım için klasörün tümünü taşıyıp `index.html` dosyasını açmak yeterlidir.
