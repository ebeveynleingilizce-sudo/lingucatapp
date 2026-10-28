# LinguCat PWA — uygulama ve kabul raporu

Tarih: 27 Ekim 2026. Mevcut `LinguCat_Interactive_Stories_V3` üzerinde çalışıldı; uygulama yeniden yazılmadı. Hikâyeler, Şarkılar, Oyunlar, Kelimeler, Profil, etkinlik motoru, XP ve rozet kayıtları korunur.

## Yapılanlar

- `app.webmanifest`: LinguCat adı, sabit kapsam/kimlik, standalone, landscape, #10172F renkleri; mevcut 192/512 ikonları ve güvenli iç boşluklu ayrı 512 maskable ikon.
- Apple ana ekran ikonu ve web uygulaması meta etiketleri; Lili açılış ekranı, telefon dikken mevcut Lili yönlendirmesi; CSS ile döndürme yapılmaz.
- Mevcut sekmeler ve sayfalama korunur. Ana uygulama kökünde sayfa kaydırması kapalıdır; ayarlar ve uzun yardım metni kendi panelinde kaydırılabilir.
- History API ile uygulama ekranları, içerik kategorisi ve hikâye/şarkı modülü geri/ileri tuşlarına bağlandı. Geri dönüşte etkinlik ekranı güvenli etkinlik seçimine döner; yarım kalan soruların kayıtları korunur. Oyun içi diyaloglar ve sekme altındaki sayfa numaraları ayrı tarayıcı geçmişi girdileri oluşturmaz.
- Kullanıcı kontrollü tam ekran; WebKit çıkış fallback'i. Yön kilidi yalnızca desteklenen API varsa ve kullanıcı tam ekranı açtıktan sonra denenir; reddedilmesi uygulamayı engellemez.
- Kurulum düğmesi yalnızca gerçek `beforeinstallprompt` olayı alındığında görünür. iOS Safari ve Firefox için dürüst, ayrı kullanım talimatları ayarlarda bulunur.
- Service worker uygulama kabuğunu ve küçük etkinlik varlıklarını sürümlü, atomik önbelleğe alır. Kurulumun bir dosyası bile başarısızsa eksik önbellek etkinleşmez. Yaklaşık 11.2 MB / 145 dosya; kesin değer `pwa-release.json` içindedir.
- Videolar ve 3D oyunun `.wasm` / `.pck` dosyaları otomatik indirilmez. Mystery Box'ın büyük komik sesi dahil değildir. Önceden izlenmemiş videoların kilitleri çevrimdışı açılmaz; kelimeler, uygun küçük oyunlar ve daha önce açılmış etkinlikler kullanılabilir.
- Yeni sürüm bekler; ayarlarda “Yeni sürüm hazır · Yenile” seçildiğinde ilerleme kaydedilir ve sürüm değiştirilir. Güncelleme localStorage kayıtlarını silmez. Önceki kabuk önbellekleri açık oturumları korumak için tutulur; uzun süreli kullanımda depolama alanı büyüyebilir. İlerleme ayrı localStorage alanındadır.
- `pagehide` ve arka plana geçişte kayıt eklenmiştir. Mevcut `lingucat.v4.*` anahtarları ve içerik revizyon kontrolleri korunur.

## Veri ve senkronizasyon sınırları

Projede Firebase veya başka bir öğrenci hesabı/senkronizasyon sunucusu bulunmuyor. Gereksiz Firebase trafiği oluşturulmadı; yeni bir uzak senkronizasyon uydurulmadı. İnternet geri geldiğinde içerik erişimi ve sürüm kontrolü devam eder; ilerleme cihazda kalır. Cihazlar arası senkronizasyon için kimlik, sunucu şeması ve çakışma politikası ayrı entegrasyon gerektirir.

Site verileri kullanıcı tarafından silinirse, gizli oturum kapanırsa veya tarayıcı depolamayı tahliye ederse yerel kayıtlar kaybolabilir. Uygulama güncellemesi bunları silmez. Aynı HTTPS origin ve klasör kapsamı korunmalıdır; başka alan adı/port ayrı depolama demektir. Öğretmenin içerik revizyonunu değiştirmesi mevcut motorun ilgili etkinlik ilerlemesini sıfırlama kuralına tabidir.

## Doğrulama

`tests/pwa-results.json` HTTP localhost güvenli bağlamında Windows Chrome ve Windows Edge otomatik test sonuçlarıdır. `tests/pwa-https-results.json`, mevcutsa, yerel HTTPS testinin sonuçlarıdır; yerel test sertifikası istisnası kullanır, gerçek yayın sertifikası doğrulaması değildir.

- Chrome ile mevcut yatay ekran testi: 1920×1080, 1366×768, 1280×720, 1024×768, 844×390 ve 390×844; beş kart, navigasyon, kelimeler, profil, yardım, mevcut oyun bağlantıları; sıfır JavaScript hatası.
- PWA testi: altı bölümde 1366×768, 844×390, 667×375 ölçülerinde belge taşması; geri/ileri navigasyonu; portrait/landscape geçişi; gerçek service worker ve önbellekle çevrimdışı yeniden açılış; kelime ilerlemesinin korunması; bekleyen yeni sürüme kullanıcı geçişinde veya uygulama tamamen kapatılıp açıldığında kayıtların korunması. Oturum içi aktivasyon testte bazen bekledi; 15 saniye sonra arayüz yeniden deneme/kapatıp açma talimatını verir. Kesintisiz oturum içi güncelleme tüm koşullarda doğrulanmış değildir.
- `engine.test.cjs`: 16 test geçti; doğru/yanlış cevaplar, tekrar deneme, kayıttan devam, mükerrer XP engeli, video izleme kapısı.
- `reward-engine.test.cjs`: 10 test geçti; kalıcı rozetler, tekrarlanan ödül engeli ve ilerleme geçişi.
- `reward-flows.test.cjs`: gerçek etkinlikte 450→650 XP, kalıcı seviye/rozet, altıncı kelime rozeti, Mystery Box sonuçları; tekrar ödüllendirme yok.
- Değiştirilen JavaScript ve üretilen SW için `node --check` geçti.

| Hedef ortam | Gerçek doğrulama kapsamı |
|---|---|
| Windows Chrome | Yüklü tarayıcıyla headless otomatik test; yerel güvenli bağlam |
| Windows Edge | Yüklü tarayıcıyla headless otomatik test; yerel güvenli bağlam |
| Pardus Chromium | Gerçek Pardus cihaz testi yapılmadı |
| Pardus Firefox | Gerçek Firefox/Pardus testi yapılmadı; özellik kontrolleri ve fallback'ler eklendi |
| Android Chrome | Gerçek cihaz testi yapılmadı; Windows Chromium'da küçük yatay/dik viewport denendi |
| iOS Safari | Gerçek cihaz testi yapılmadı; Apple meta etiketleri ve manuel kurulum rehberi eklendi |

Ayrı işletim sistemi penceresine kurulum, adres çubuğunun gerçekten gizlenmesi, mobil gerçek yön kilidi ve F11 fiziksel kullanımı otomatik headless testlerle doğrulanmış sayılmaz. Eski Firefox için minimum sürüm sertifikası verilmedi; mevcut uygulama kodu ve üçüncü taraf 3D motoru ayrıca gerçek hedef sürümde denenmelidir. Projede bir derleyici/transpiler zinciri yoktur; yeni PWA uygulama kodu klasik ES5 sözdizimi ve API özellik kontrolleri kullanır.

## Yayınlama ve sürüm prosedürü

1. Her sürümde uygulama klasöründe `python tools/build-pwa.py` çalıştırın. Dosya içeriklerinden ve SW üreticisinden sürüm hash'i hesaplanır. Üretilen `sw.js`, `app.webmanifest`, `pwa-release.json` ve uygulama dosyalarını birlikte yayımlayın; yedek HTML'ler, testler ve araçlar yayın için gerekli değildir.
2. Sabit HTTPS adresine yükleyin. `sw.js`, `index.html` ve manifest için `Cache-Control: no-cache` kullanın; doğru JavaScript / manifest MIME türlerini ve dosya yollarını koruyun. Service worker'ı klasör kapsamı dışına taşımayın.
3. Önce yeni assetleri, en son SW'yi yükleyin. İlk açılışta “Çevrimdışı hazır” bildirimini bekleyin; sonra ağ kapalıyken yeniden açın.
4. Gerçek Chrome/Edge/Android tarayıcı menüsünden kurup bağımsız pencereyi kontrol edin. iOS'ta Paylaş → Ana Ekrana Ekle. Firefox'ta kurulum zorlaması olmadan F11 deneyin.
5. Gerçek HTTPS yayın URL'si bu oturumda verilmedi. Üretim HTTPS güveni, kurulum ve platform matrisi bu URL ve hedef cihazlarla tamamlanmalıdır; dağıtım yapılmadı.

Yerel PWA testi: `node tests/pwa.test.cjs`. Sonuçlar ve ekran görüntüleri `tests/` içindedir. HTTPS test modu `PWA_HTTPS=1` ve test için üretilmiş `output/pwa-test-*.pem` dosyalarını kullanır; bunlar üretim sertifikası değildir, yayınlanmamalıdır.

Teknik referanslar: [MDN standalone](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Create_a_standalone_app), [kurulum olayı](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event), [kontrollü SW aktivasyonu](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting).

## Son HTTPS sonucu

Windows Chrome 156.0.8078.48 ve Edge 156.0.4314.42 ile yerel HTTPS testleri geçti. Her iki tarayıcıda manifest kurulabilirlik hata listesi boştu. Test sertifikası istisnası kullanıldı. Her iki son testte sürüm aktivasyonu için uygulamanın tamamen kapatılıp yeniden açılması gerekti (`updateMode: close-and-reopen`); kayıtlar korundu. Oturum içi kesintisiz aktivasyon için ek inceleme gerekir. Sonuç: `tests/pwa-https-results.json`. Gerçek kurulu uygulama penceresi veya üretim HTTPS sertifikası doğrulanmadı.

## Ses indirme pencereleri düzeltmesi

Açılışta indirme yöneticilerini tetikleyebilen MP3/OGG toplu önbellek indirmesi kaldırıldı. Sesler kullanıcı etkileşiminde gerektiğinde çalınır; çevrimdışı ses efektleri garanti edilmez. Güncel kabuk 113 dosya / 10,552,307 bayttır. Yerel sunucuda açık ses MIME türleri ve Content-Disposition: inline eklendi; dizin dosya listeleri kapatıldı, başlatıcı doğrudan index.html açar. Mevcut sunucu penceresi kapatılıp yeniden başlatılmalıdır. Chrome gerçek yerel Python sunucusuyla test edildi: açılışta sıfır ses isteği, sesler cache listesinde yok, kullanıcı tıklamasında ses çalıyor, sıfır tarayıcı indirmesi, doğru MIME/inline başlıkları. Sonuç: tests/audio-downloads-results.json. Harici IDM/benzeri yazılımın kendisi test edilmedi.
