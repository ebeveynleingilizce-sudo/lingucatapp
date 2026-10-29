# LinguAdmin

LinguCat’i taşımadan ayrılmış yönetim uygulaması. Üretim yolu `/apps/linguadmin/`.

- Geliştirme: kökte `npm run dev:admin`, ardından http://localhost:8790/apps/linguadmin/
- Üretim derlemesi: `npm run build:admin`
- Öğrenci uygulaması derlemesi: `npm run build`
- Sunucu: `firebase deploy --only functions:lingucat --project lingucat-app`
- Storage kuralları: yalnız kullanıcı onayı sonrasında `firebase deploy --only storage --project lingucat-app`. Sonra `deployment.cmsStorageReady` açılıp admin derlenir.
- Yönetici atama: güvenilir bilgisayarda Firebase CLI oturumu ile `node tools/grant-admin.cjs email@example.com`. Var olan hesaba `admin: true` custom claim ekler, diğer claim’leri korur. Kullanıcı uygulaması/öğretmen rolü admin yetkisi sağlamaz.

İlk girişte “Mevcut içerikleri içe al” iki varsayılan içeriği taslağa kopyalar. “Yerel Studio içeriğini kurtar” bu tarayıcıda kaydedilmiş eski Studio JSON’larını bulur. Kaynak kayıtları ve öğrenci ilerlemesi silinmez.

Kaydet yalnız taslağı değiştirir. Yayınla ayrı onayla kamu kataloğunu değiştirir. Sürüm geçmişinden geri yükleme önce taslağa yapılır; yayına ayrıca uygulanır. Arşivleme bağlantılı içerikleri denetler; dosyaları kalıcı silmez. Medya dosyaları değiştirilemez; yeni dosya yeni medya kaydıyla yüklenir. Taslak URL’lerine indirme token’ı eklenmez.

Kök `engine.js`, ortak içerik şeması ve gerçek LinguCat sayfası önizlemede kullanılır. Önizleme ayrı bellek deposundadır ve hesap/XP köprüsünü başlatmaz. Öğrenci PWA’sı admin paketini önbelleğe almaz. Mevcut HTML motorunda sorusuz içerik yerine en az bir geçerli soru gerekir; Godot paketlerinin iç yapısı bu editörden değiştirilmez. XP 100/50/20 olarak korunur.

Yayın kataloğu 800 KB / 200 kayıtla sınırlıdır. Her açılış tek kamu kataloğu okuması yapar; canlı dinleyici yoktur. Medya talep üzerine yüklenir. Dış HTTPS bağlantısının CORS/oynatma izinleri kaynağa bağlıdır. Sınıf atama seçenekleri mevcut sekiz HTML etkinliği ve mini oyunları korur; yeni içerikler öğrenci kataloglarında kendi kimliğiyle açılır.

Testler: `tests/cms-*.test.cjs`. Emülatör testleri demo-lingucat projesini kullanır; gerçek kullanıcılarda test kaydı oluşturmaz.

## Kurulabilir uygulama
LinguAdmin kendi app.webmanifest, simgeleri ve /apps/linguadmin/ kapsamındaki service worker ile ayrı kurulabilir. Üst çubuktaki Uygulamayı İndir düğmesi kurulumu başlatır; tarayıcıda görünür kalır ve uygulama modunda gizlenir. Önceki kurulum kaydı tarayıcıdaki düğmeyi gizlemez. Firefox/iOS gibi ortamlarda uygun kurulum yönergesi gösterilir. Önbellek yalnız sabit giriş/arayüz dosyalarını içerir; oturum, taslak, API yanıtı veya medya dosyaları önbelleğe alınmaz. Çevrimdışı açılış yönetici yetkisi sağlamaz; giriş, kayıt ve yayınlama internet gerektirir. npm run build:admin paket ve PWA sürümünü birlikte üretir.

## Ayrı kurulum adresi
Üretim adresi: https://linguadmin-818758464845.web.app/ (yalnız LinguAdmin’e ait Hosting sitesi). GitHub Pages yönetim bağlantısı bu adrese yönlendirilir; LinguCat öğrenci adresi ve mevcut Firebase Hosting sitesi değişmez. Farklı origin, kurulu dış PWA’nın iç PWA kurulumunu bastırması sorununu önler. Google girişi için bu sitenin web.app ve firebaseapp.com alanları yetkilidir; yönetim API’si yalnız tanımlı origin’leri kabul eder.

`node tools/package-admin-hosting.mjs` gerçek LinguCat önizleme dosyalarını `.firebase/linguadmin-public` içine hazırlar; `firebase deploy --only hosting --project lingucat-app` yalnız `linguadmin-818758464845` sitesini günceller. Medya/oyun dosyaları mevcut GitHub kaynağından alınır. Önizleme sayfası ayrı öğrenci PWA’sı kurmaz. Eski GitHub origin’indeki yerel Studio içeriğini kurtarmak için eski admin adresine `?local-export=1` eklenerek yönlendirme atlanabilir; buradan buluta taslak aktarılabilir veya JSON dışa aktarılabilir.

## Sınıf ve İngilizce seviyesi
Video, şarkı, etkinlik ve sorular için 1–12 sınıftan birden fazlası seçilebilir; boş sınıf listesi tüm sınıfları ifade eder. A1/A2/B1/B2/C1/C2 çoklu seçim düğmeleri kullanılır. Öğrenci etiketleri A1–A2 için Kolay, B1–B2 için Orta, C1–C2 için Zor şeklindedir. Öğretmen kütüphanesi ve katalog filtreleri CEFR kodlarını gösterir. Hesaplı öğrenci kataloğu profilindeki sınıfa göre süzülür; misafir sınıf seçebilir. Bunlar yayınlanan eğitim içeriğinin görünüm filtreleridir; kullanıcı rolü/yetki alanı değildir. Eski tek grade değeri ve payload.level metni okunmaya devam eder. CEFR seçimleri ayrı metadata alanında saklandığından oyun revizyonu ve kazanılmış XP değiştirilmez.
