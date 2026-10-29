# Modüler eğitim oyunları — uygulama ve doğrulama raporu

## Durum

Mevcut LinguCat ve LinguAdmin içine uygulanmıştır; ayrı uygulama veya framework kurulmadı. Çalışan motorlar: Memory, Word Search, Hangman, OpenGames Labyrinth. H5P runtime gerektirdiği, HEG Phaser lisans/asset/localhost bağımlılıkları çözülmediği için hazır motor olarak gösterilmez. OpenGames'in diğer arcade oyunları pedagojik cevap adaptörü olmadan XP veren etkinlik olarak sunulmaz.

Başlangıç içerikleri iki ayrı pakette tutulur. Beş yapılandırılmış oyun örneği ilkokul, ortaokul ve lise hedeflerini gösterir; lise örneğinde kelime tahmini bağlamsal İngilizce ipuçlarından yapılır. Mevcut LinguCat assetleri kullanıldı; ZIP'lerden Mario grafikleri, GIF, font veya ses dosyaları taşınmadı. Mevcut LinguCat görsellerinin önceki asset/provenans kayıtları geçerlidir; bu çalışma bu görsellere yeni bir lisans sağlamaz.

## Yönetici akışı

LinguAdmin → Oyun Stüdyosu. Motor kütüphanesinde hazır, bağımlılık/lisans nedeniyle engelli ve yalnız referans durumları ayrılır. Yönetici tablo alanlarıyla yeni içerik paketi oluşturabilir, öğe ekleyebilir/silebilir; oyun örneğinde paketi seçebilir, sınıfları, CEFR'yi, zorluğu, kuralları, başlığı ve kapağı değiştirebilir. Müfredat eşlemeleri form alanlarıyla eklenir; kod düzenlemek gerekmez. Taslak/yayın/arşiv ve optimistic revision kontrolü mevcut CMS API'sidir. Paket yayınlanmadan onu kullanan özel oyun yayınlanamaz. Kullanımdaki paket doğrudan yayından kaldırılamaz.

Önizleme ikinci bir taklit ekran değildir: mevcut index.html, GameManager ve aynı motor iframe'i açılır. Önizleme ilerleme veya XP kaydetmez. Başlangıç paketlerini taslak olarak içe alma seçeneği otomatik yayın yapmaz.

## Öğrenci akışı

Oyunlar kataloğuna mevcut oyunlar korunarak yeni oyun kartları eklenir. Sınıf, konu, CEFR, oyun türü, tamamlanma ve doğrulanmış müfredat eşlemesi filtreleri vardır. Sınıf hesabın sınıfıyla başlar; öğrenci başka sınıfı seçebilir. Oyun zorluk filtresi gerçek difficulty alanına uygulanır; CEFR'den zorluk türetilmez.

Motor CSS'i ayrı iframe belgesinde kalır. Yeni motorun kodu oyun açılana kadar yüklenmez. Kapanınca iframe ve parent listener'ları kaldırılır; motorun timer/klavye/ses kaynakları temizlenir. İlk kez açılan motor önbelleğe alınır; daha önce açılmamış bir motorun ilk çevrimdışı kullanımda çalışacağı iddia edilmez. Motor byte değişimleri PWA sürüm hash'ine katılır; eski engine cache yeni sürüme taşınmaz.

## Firebase ve kapasite

Yeni action mevcut cloudApi içindeki modularGame dalıdır. Ayrı XP koleksiyonu veya ödül formülü yoktur. Bir oturum sonucu bir kuyruk girdisi ve bir transaction üretir; cevap başına bulut çağrısı eklenmez. Ham kanıt mevcut ortak motorun 100/50/20 hesabına dönüştürülür. Tekrar oyun, farklı motor ve aynı hedefin başka oyun örneği tekrar XP vermez.

CMS toplam kayıt sınırı 200'den 500'e yükseltildi; yayın kataloğunun 800 KB üst sınırı korunur. Gerçek kapasite içerik boyutlarına bağlıdır. Dashboard ve öğretmen raporu en çok 1000 etkinlik/paket ilerleme belgesi alır; bu sürüm binlerce kayıt için sınırsız bir katalog iddiasında değildir. Oyun sonuç istekleri en çok 150 KB, kanıt en çok 512 olaydır. Canlı güvenlik kuralları gevşetilmedi; CMS mutation ve XP işlemleri yetkili callable üzerinden kalır.

## Kaynaklar

- Ayrıntılı paket/lisans değerlendirmesi: GAME_ARCHIVE_ANALYSIS_TR.md
- ZIP özetleri ve SHA-256: archive-audit.json
- Sözleşme, şema, veri/XP akışı: ../../packages/game-kit/README.md
- Örnek veri: ../../data/game-packs/starter.json
- Lisans metinleri: ../../games/modular/vendor/*-LICENSE.txt

## Doğrulama komutları

Yerel HTTP kökü: `python -m http.server 8792 --bind 127.0.0.1`. Firebase testleri **yalnız demo-lingucat** auth/firestore/functions/storage emülatörlerinde çalıştırılır; production hesabı veya sınıf verisi kullanılmaz.

- `node --test tests/game-system.test.cjs` — schema, dört motorun kanıtları, ortak XP, tekrar engeli, güvenli kimlik/medya/müfredat doğrulaması.
- `node --test tests/game-system-cloud.test.cjs` — admin yetkisi, paket yayın bağımlılığı, atomik sonuç, sahte özet, event tekrarları, XP tekrarları, archive.
- `node tests/game-system-ui.test.cjs` — beş oyun örneğini gerçekten oynayıp bitirir; Memory, Word Search, Hangman ve Labyrinth; pause, close, dokunma/klavye ve kaynak temizliği. GAME_BROWSER=firefox ile Firefox yolu.
- `node tests/game-system-responsive.test.cjs` — sınıf/CEFR/müfredat/tamamlanma filtreleri; 1920×1080, 1366×768, 844×390, 667×375, 390×844. Yalnız dış sayfa değil oyun alanı içinde de gereksiz scroll kontrolü.
- `node tests/game-studio-ui.test.cjs` — gerçek yönetici oturumu, kodsuz iki öğeli paket, taslak/yayın, gerçek LinguCat iframe önizlemesi, yayından kaldırma.
- `node tests/game-system-account.test.cjs` — gerçek öğrenci kayıt/oturum akışı, her turda tek modularGame çağrısı, cevap çağrısı yok, 400 XP'nin ikinci turda 0 ek XP olması, kalıcı kayıt.
- `node tests/game-system-offline.test.cjs` — başlangıçta motor yüklenmemesi, ilk kullanımda fetch, çevrimdışı yeniden açılış.
- `node tests/game-system-lifecycle.test.cjs` — bekleyen kart çevirme timer'ının pause sırasında donması, resume/restart, iframe ve parent listener temizliği, önizlemede kayıt olmaması.
- Mevcut account-core, cms-schema, cms-workflow-model ve reward-engine regresyon kontrolleri.

Windows üzerinde Chrome ve otomatik Firefox doğrulaması yapıldı. Pardus işletim sistemi, fiziksel akıllı tahta, Android/iOS cihazları ve eski Firefox sürümleri test edilmiş sayılmaz. Responsive boyut testleri fiziksel cihaz testi değildir.

## Dağıtım

Kaynaklar ve production bundle'lar yerelde hazırlandı. `tools/build-account.mjs`, `tools/build-admin.mjs`, `tools/build-pwa.py` ve `tools/package-admin-hosting.mjs` mevcut akışı sürdürür. Functions, LinguAdmin hosting ve GitHub Pages dosyaları birlikte güncellenmelidir; eski canlı backend yeni oyun kayıt türlerini kabul etmez. **29.10.2026 tarihinde canlı dağıtım tamamlandı.** Öğrenci sürümü `577893ebcb5293af`, LinguAdmin sürümü `8edc3df84495fd6c`; kaynak commit `7045b54`. Üç Firebase işlevi (cloudApi, adminApi, publicCatalog) güncellendi. Canlıda öğrenci oyunu ve aynı kaynaklı yönetici önizlemesi açılıp kapatıldı; katalog okuma ve oturumsuz sonuç yazma reddi doğrulandı. Gerçek kullanıcı hesabına test verisi yazılmadı. Yeni motor/paket dosyaları GitHub Pages yayınına dahil edilmelidir; yalnız bundle kopyalamak yeterli değildir.

