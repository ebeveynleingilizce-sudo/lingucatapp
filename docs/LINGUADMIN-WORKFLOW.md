# LinguAdmin — birleşik içerik hazırlama akışı

Bu çalışma canlıya yayınlanmadı. Önizleme ve bulut testleri yalnız `demo-lingucat` emülatöründe yapıldı.

## Akış

- Başlangıç → İçerik yükle → Şarkı / Hikâye / Oyun.
- Dört adım: Tür seç → Temel bilgiler ve medya → Etkinlikler → Önizle ve yayınla.
- Oyun seçeneğinde mevcut Oyun Stüdyosu (hazır motor/ortak paket) ile altı soru tipini kullanan soru temelli akış arasında seçim yapılır. Bu çalışma Godot/ZIP yükleme ya da yeni motor üretme özelliği eklemez.
- İçerikler; arama, tür, sınıf ve yayın durumu filtreleriyle mevcut kayıtları düzenler. Soru bankası bu listenin bir türüdür; soru düzenlerken bankaya kopyalama ve bankadan bağımsız kopya alma vardır.
- Medya kütüphanesi ve Görünüm Düzenleyici bağımsız işler olarak korunur.

## Alan incelemesi

| Alan | Gerçek kullanım / karar |
|---|---|
| Başlık | Öğrenci kartı ve içerik ekranı. Medya/soru bankası/görünüm kayıtlarının başlığı yalnız yönetim içindir; farklı açıklama gösterilir. |
| Açıklama | `app.js` içinde `storyDescription` alanına atanıyor ancak gerçek CMS öğrenci önizlemesinde görünmüyor. Yeni editörden kaldırıldı; eski kayıtların metni ve şema uyumluluğu korunuyor. |
| Konu ve etiketler | Yönetim ve öğrenci katalog aramasına aktarılır; öğrenci kartında ayrıca etiket satırı değildir. |
| Kapak | Öğrencinin içerik kartı. Dosya, kütüphane veya bağlantıyla seçilir; videodan kare alınabilir. |
| Kaynak ve süre | Öğrenci oynatıcısı ve soru sahnesi sınırları. Dosya yüklemede süre otomatik okunur; okunamazsa eksik yayın kontrolünde istenir. |
| Sınıf / CEFR | Mevcut LinguAudience görünürlük ve seviye etiketleri korunur. |
| Hedef ifadeler | Mevcut ortak içerik modelinde korunur; tek başına kelime kartı/etkinlik oluşturmadığı açıkça yazılır. |
| Şarkı sözleri | `renderCMSExtras` oynatıcı altındaki “Sözler ve bağlı içerikler” bölümünde gösterir. Şarkının etkinlik adımında düzenlenir. |
| Bağlı içerikler | Aynı açılır bölümde içeriklere geçiş düğmeleri olur. Yönetici kimlik yazmak yerine adlarıyla seçer. Medya bağımlılıkları otomatik yönetilir. |
| Kimlik, MIME, boyut | Kimlik otomatik; dosya yüklemede MIME/boyut otomatik. Medya dış bağlantılarındaki teknik bilgi ihtiyacı gelişmiş bölümdedir. |

## Taslak ve yayın güvenliği

- Yeni içerik sahte örnek soruyla veya uydurma video süresiyle başlamaz.
- Sorusu olmayan taslak kaydedilebilir; böyle bir içerik yayınlanamaz. Ortak şema ve fonksiyon kopyası birlikte güncellendi.
- Yayın kontrolünde eksikler ilgili adım/alanlara götürür; kapak, medya, süre, geçerli soru ve referanslar denetlenir.
- Dosya önce ayrı özel medya taslağıdır. İçerik yayın onayında yeni dosyaların da erişime açılacağı belirtilir; ardından gerekli medya kayıtları ve içerik yayınlanır. Tek atomik çoklu yayın değildir: medya yayını başarılı olup içerik yayını başarısız olursa dosya yayınlanmış kalabilir; mevcut backend işlem sınırı korunur.
- Yükleme sırasında kayıt/yayın/kopyalama engellenir; hata ve yüzde bilgisi gösterilir.
- Yetki, revizyon çakışması, sınıf/öğrenci kayıtları, XP motoru, Storage kuralları ve arşivleme korumaları değiştirilmedi.

## Kontroller

- `npm run build:admin`, `npm run build`
- Birim: cms-schema, audience, cms-workflow-model.
- Demo bulut: `tests/cms-cloud.test.cjs`.
- Yönetim tarayıcı: `tests/cms-ui.test.cjs`, `tests/cms-workflow-ui.test.cjs`.
- Gerçek küçük MP4 ile `tests/cms-workflow-media.test.cjs`: yükleme, süre, kapak karesi. Test FFmpeg kullanır (`FFMPEG` ortam değişkeni veya yerel paket / PATH).
- Öğrenci geriye uyumluluk: `tests/cms-runtime.test.cjs` Chrome ve Firefox.
- Görsel kontrol: 1920×1080, 1366×768, 768×1024, 390×844.

Otomatik transkript, video kırpma ve Godot paket editörü eklenmedi. Uzak medya URL'lerinde oynatma / kare alma CORS iznine bağlıdır; arayüz alternatif kapak yüklemesini açıklar.

Canlıya geçiş ayrı işlemdir: `adminApi` için güncellenmiş taslak şeması ve LinguAdmin Hosting paketi birlikte yayınlanmalıdır. Görünüm veya içerik yayını test amaçlı üretimde yapılmadı.
