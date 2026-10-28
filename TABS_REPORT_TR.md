# LinguCat — görsel sekmeler ve kaydırmasız uygulama

## Korunan ana sayfa
Onaylanan ana sayfanın HTML'i ve landscape.css dosyası değiştirilmedi. 1366×768 çözünürlükte önceki sürüm ile yeni sürümün ana sayfa ekran görüntüleri piksel düzeyinde aynıdır. Doğrulama tests/home-unchanged-check.json ve tests/home-contract.sha256 içindedir.

## Sekmeler
- Hikâyeler / Şarkılar: sinematik üst görsel, tür rengine uygun filtreler, gerçek video ve ilgili etkinlikler için kapak kartları, kayıtlı izleme yüzdesi. Mevcut tek hikâye ve tek şarkı korunur; hayali içerikler eklenmez.
- Oyunlar: iki satırlı görsel kartlar, Hemen Oyna / Hikâyeyle Oyna / Şarkıyla Oyna filtreleri. Gerçek Mystery Box ve Battle Arena kartları ilk sayfada; izleme kilidine bağlı etkinlikler mevcut davranışı korur.
- Kelimeler: sekiz ünite, toplam 48 İngilizce–Türkçe kelime, içeriklerden gerçek ifadeler, çevirme ve Öğrendim işaretleme. Kartlar ve ifadeler sayfalıdır; işaretleme cihazda kaydedilir.
- Profil: düzenlenebilir takma ad, gerçek toplam XP, XP'ye dayalı seviye ve ilerleme çubuğu, içerik/etkinlik/kelime sayıları ve koşulları sağlandığında açılan rozetler. Örnek görseldeki uydurma sayılar veya öğrenci bilgileri kullanılmaz. Kelimelerdeki Öğrendim işaretleri öğrencinin kendi beyanıdır.

## Kaydırmasız akış
Sekmelerde, hikâye tanıtımında, video ve soru ekranlarında sayfa/panel kaydırması kaldırıldı. İçerikler CSS grid ile mevcut alana sığar. İçerik sayısı arttığında ileri/geri sayfa düğmeleri kullanılır. Soru çözerken sahne tekrarı geçici video penceresinde açılır ve bitince soruya dönülür. Sonuçtaki ifadeler sayfalıdır. Öğretmen düzenleyicisi değerleri/işlevleri korunan altı adıma ayrıldı; soru kitaplığı da sayfalıdır. Çok satırlı metin düzenleme alanları kendi doğal metin düzenleme davranışını korur.

## Dosyalar
- index.html, app.js: sekme bileşenleri ve mevcut içerik motoruna bağlantılar.
- tabs.css, tabs.js: yeni sekmeler, kartlar, filtreler, sayfalama, kelimeler ve profil.
- panel-layout.js: kaydırmasız tanıtım/etkinlik/sonuç/öğretmen düzeni.
- assets/tabs/: dört sinematik üst görsel, kullanıcı referansı, PROMPTS.json.
- assets/units/: sekiz ünite kapağı ve PROMPTS.json.
- tests/: yeni sekme testleri, ekran görüntüleri ve güncel menü/adım seçicilerine uyarlanmış mevcut testler.

## Görsel üretimi
Built-in image_gen aracı kullanıldı. Yeni sekme üst görselleri assets/tabs/, ünite kapakları assets/units/ altında optimize WebP ve JPEG fallback olarak kaydedildi. İstem setleri bu iki klasörün PROMPTS.json dosyasındadır. Ana sayfa görselleri değiştirilmedi. Görseller, fontlar ve içerikler için yeni bir harici ağ bağımlılığı eklenmedi.

## Testler
Chrome üzerinde 1920×1080, 1366×768, 1280×720 ve 844×390 boyutlarında beş sekmede iki yönde taşma ve kesilen içerik kontrolü geçti. Katalog sayfalama/filtreleme, kelime çevirme/işaretleme, yenilemede kayıt, tanıtım, etkinlik seçimi, yönerge, sıralama sorusu ve öğretmen adımlarında kesilme kontrolü geçti. 390×844 dikey telefonda önceki Lili yönlendirmesi korunur. Ekran görüntüleri tests/tabs-*.png dosyalarındadır.

16 motor testi, 16 öğrenci tarayıcı kontrolü, 8 öğretmen kontrolü ve şarkı testleri geçti. Gerçek videolar baştan sona oynatıldı; sahne tekrarı, izleme kilidi, yanlış tekrar kuyruğu, ayrı XP ve yenilemede kayıt korundu. Sekme testlerinde JavaScript hatası yok.

Fiziksel Pardus akıllı tahta / eski Firefox testi yapılmadı. 3D Battle Arena'nın yerel HTTP başlatıcısı gerekliliği korunur. Mevcut bağımsız oyun motorlarının içi değiştirilmedi.
