# LinguCat — referansa dayalı yatay ana sayfa

## Sonuç
Referanstaki büyülü okul, üç genç, Lili, lacivert zemin ve beş renkli kategori gerçek HTML/CSS bileşenleriyle uygulamaya entegre edildi. Slogan, navigasyon, açıklama ve düğmeler görselin içine gömülü değildir. Menü ve beş kart aynı yatay ekrana sığar. Ana sayfada yatay/dikey scroll yoktur. Diğer mevcut ekranlar ana panel içinde kayar; iç tasarımları korunmuştur.

Hemen Başla hikâye kataloğuna gider. Hikâyeler, Şarkılar ve Oyunlar mevcut katalogları açar. Kelimeler gerçek hikâye/şarkı ifadelerini ve açılır Türkçe anlamlarını gösterir. Profil, var olan depolama verilerinden toplam XP, öğrenilen soru ve tamamlanan etkinlikleri hesaplar. Sahte seviye veya kazanılmış rozet gösterilmez. Menüdeki aktif sekme güncellenir. Yardım, ses ve öğretmen paneli sağ üst ayarlardadır.

## Dosyalar
- index.html: yeni navigasyon, ana sahne, beş kart, yönlendirme ekranı, Kelimeler ve Profil panelleri.
- app.js: mevcut öğrenme motorunu değiştirmeden navigasyon ve gerçek ilerleme bağlantıları.
- landscape.css: viewport tabanlı kaydırmasız ana sayfa; eski CSS özellikleri için fallback; azaltılmış hareket ve dokunma desteği.
- landscape.js: ayarlar menüsü ve yön değişimi; dikey ekranda oynayan medya duraklatılır.
- app.webmanifest: landscape, standalone, Türkçe isim ve Lili ikonları. Mevcut manifest.json dosya bütünlüğü listesi korunur.
- assets/home/: referans PNG, yedi ayrı görselin optimize WebP ve PNG sürümleri, iki PWA ikonu ve PROMPTS.json.
- tests/landscape.test.cjs: yerleşim, navigasyon, yön geçişi ve oyun entegrasyonu doğrulaması. discovery.test.cjs bu teste yönlendirilir. Mevcut öğrenci/öğretmen/şarkı testlerinin seçicileri yeni menüye uyarlandı.

## Görseller
Built-in image_gen aracı kullanıldı. Referans projeye design-reference.png olarak eklendi. Yedi ayrı varlık bu referansa göre üretildi: hero, stories, songs, games, words, profile, lili. İlgili istemlerin tamamı assets/home/PROMPTS.json dosyasındadır. PNG fallback bulunur. WebP toplamı yaklaşık 500 KB; harici CDN, font veya ağ bağımlılığı eklenmedi.

## Doğrulama
Chrome üzerinde 1920×1080, 1366×768, 1280×720, 1024×768 ve 844×390 yatay görünümde document, ana panel ve ana sayfada iki yönde taşma kontrolü geçti. Beş kartın sınırları, metinlerin kart içinde kalması ve görsellerin yüklenmesi doğrulandı. 390×844 dikeyde Lili yönlendirmesi görülür, yataya dönünce ana sayfa geri gelir. Ekran görüntüleri tests/landscape-*.png içindedir.

16 motor testi, 16 öğrenci tarayıcı kontrolü, 8 öğretmen kontrolü ve şarkı akışı geçti. Gerçek videolar sonuna kadar oynatıldı; izleme kilidi, soru tekrarları, XP, yenilemede kayıt ve içerikler arasındaki bağımsız ilerleme korundu. Mevcut Mystery Box ve Battle Arena katalog kartlarına erişim doğrulandı; oyun motorlarının içi değiştirilmedi. Klavye Enter navigasyonu, aktif sekme, PNG fallback ve tam ekran API'sinin yalnızca düğme tıklamasında çağrılması ayrıca doğrulandı.

## Sınırlamalar
Fiziksel Pardus akıllı tahta veya eski Firefox üzerinde test yapılmadı; 1920×1080 hedef görünümü Chrome ile doğrulandı. dvh için vh fallback, clamp desteklemeyen tarayıcılar için temel yerleşim ve SVG xlink fallback eklendi. Screen Orientation API ile zorunlu kilit uygulanmaz; doğal yön değişimi ve CSS öneri ekranı kullanılır. Mobil PWA kurulumu localhost/HTTPS ve tarayıcı desteği gerektirir; file:// üzerinden kurulum beklenmez. Mevcut Battle Arena için yerel HTTP başlatıcısı gerekliliği korunur. Yeni servis çalışanı veya video önbellekleme davranışı eklenmedi.
