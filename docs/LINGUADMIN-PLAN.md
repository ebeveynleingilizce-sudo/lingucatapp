# LinguAdmin – ayrıştırma ve geçiş

## İnceleme
LinguCat framework kullanmayan HTML/CSS/JavaScript uygulamasıdır. app.js içindeki Studio yerel taslak, JSON içe/dışa aktarma, altı soru tipi ve sahne önizlemesi sağlar. İki sabit içerik, engine.js doğrulama/oyun motoru, ayrı oyun iframe’leri, Firebase Auth ve sunucuda doğrulanan ilerleme API’si mevcuttur. Studio’nun eski yayınla işlemi yerel içeriği ve o içeriğin ilerlemesini değiştirir; ortak bir CMS değildir.

## En düşük riskli mimari
- Mevcut kök LinguCat uygulaması taşınmaz; GitHub Pages bağlantıları, medya ve PWA korunur.
- apps/linguadmin bağımsız yönetim girişi ve build/dev komutlarına sahiptir.
- packages/shared-content aynı engine.js ile içerik ve görünüm şemasını doğrular.
- packages/shared-ui görünüm uygulayıcısı gerçek LinguCat DOM’una uygulanır; ikinci bir öğrenci ekranı çizilmez.
- packages/shared-types veri sözleşmesini belgeler.
- CMS taslakları ve sürümleri cmsItems altında sunucu erişimlidir. Yalnız yayınlanmış anlık görüntü publicCms/catalog üzerinden kamu API’sine çıkar.
- Admin custom claim yalnız güvenilir yönetim aracıyla atanır. Öğretmen rolü admin değildir.

## Geçiş ve veri koruma
Mevcut kullanıcılar, sınıflar, ilerleme ve medya silinmez/taşınmaz. İlk aktarım varsayılan iki içeriğin kopyalarını taslak olarak oluşturur. Eski tarayıcı Studio JSON’ları içe aktarılabilir. Soru kimlikleri ve içerik kimlikleri korunur. İçerik revizyonu değişince motorun mevcut revizyon doğrulaması kullanılır; XP sunucuda hesaplanır. Gömülü Studio ancak eşdeğer editör ve gerçek önizleme testleri geçtikten sonra kullanıcı girişinden kaldırılır; kaynak geçmişte korunur.

## Sınırlar
Godot Mystery Box ve English Battle Arena oyunlarının soru paketleri HTML motorundan ayrıdır. Bu uygulamalar için yeni oyun motoru/yeni soru paketi icat edilmez; yönetim ekranı bu sınırı açıkça gösterir. HTML motorunun altı soru tipi ve sabit 100/50/20 XP algoritması korunur; puan/süreyi değiştiren yeni algoritma bu geçiş kapsamında değildir. Medya URL’leri doğrudan oynatılabilir HTTPS dosyaları olmalıdır; YouTube sayfası veya keyfi HTML gömme desteklenmez.

## Yayın
npm run dev:admin → yerel kök sunucu ve /apps/linguadmin/.
npm run build:admin → bağımsız admin bundle. npm run build → öğrenci bundle/PWA.
GitHub Pages kökünde LinguCat, /apps/linguadmin/ adresinde LinguAdmin çalışır. Yönetici kaynakları öğrenci PWA önbelleğine alınmaz. Firebase işlevleri ve kuralları ayrı dağıtılır. Storage kuralları için kullanıcı onayı beklenir.
