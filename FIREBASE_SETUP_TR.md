# LinguCat hesap ve ilerleme sistemi

## Şu anki durum

Hesap arayüzü, Firebase modüler SDK paketi, korumalı Cloud Functions, Firestore kuralları ve emülatör testleri hazırdır. Kullanıcının açık onayı sonrasında Authentication (Google ve e-posta/şifre), GitHub Pages alan adı, en az 8 karakter parola ilkesi, Firestore kuralları ve `europe-west1` bölgesindeki `cloudApi` etkinleştirilmiştir. Geçici sistem hesabıyla üretimde kayıt/giriş, profil, sunucu XP doğrulaması, işlem tekilleştirme ve ikinci oturum senkronizasyonu test edilip yalnızca test verileri temizlenmiştir. `backendReady: true` bu doğrulamanın ardından açılmıştır.

Proje: `lingucat-app`. Mevcut proje ücretli plana bağlıdır. API etkinleştirme ve sunucu dağıtımı için açık onay alınmıştır; mevcut plan ve ödeme hesabı değiştirilmemiştir.

## Onay sonrası kurulum

1. Firebase Console'da Authentication'ı başlatın. E-posta/şifre ve Google sağlayıcılarını açın. Google için proje destek e-postasını ve OAuth yapılandırmasını doğrulayın. OAuth istemci sırrını asla bu depoya veya istemci koduna eklemeyin.
2. Authorized domains listesine `ebeveynleingilizce-sudo.github.io` ekleyin. `tinyurl.com` eklenmez; kısa bağlantı gerçek siteye yönlenir. Test için localhost gerekirse ayrıca eklenir.
3. E-posta doğrulama ve şifre sıfırlama şablonlarının Türkçesini, gönderen/support adresini ve yönlendirme alan adlarını doğrulayın. Password policy için en az 8 karakter uygulayın.
4. Firestore API'yi etkinleştirin; mevcut `(default)` veritabanı `nam5` bölgesindedir ve korunmuştur. Yeni kurulumda veri yerleşim bölgesini kurum politikasına göre seçin. Bölge seçiminin sonradan değiştirilemediğini dikkate alın. Var olan veritabanı varsa silmeyin veya yeniden oluşturmayın.
5. `npm ci` ve `npm --prefix functions ci` çalıştırın. `npm run build` istemci paketini ve sunucunun kanonik soru kataloğunu oluşturur.
6. `firebase deploy --only firestore:rules,firestore:indexes,functions --project lingucat-app` ile güvenlik kurallarını ve `europe-west1` bölgesindeki `cloudApi` fonksiyonunu dağıtın. Gerekli Google Cloud API'leri için verilen değişiklikleri inceleyin. Fonksiyon `maxInstances: 3`, 256 MiB bellek, 120 saniye zaman aşımı ve sıfır minimum örnek kullanır; bunlar kesin harcama tavanı değildir. Cloud Billing bütçe uyarıları ayrıca kurulmalıdır.
7. Gerçek test hesabıyla kayıt, doğrulama e-postası, Google girişi, şifre sıfırlama, rol onayı, sınıf katılımı ve farklı cihazdan ilerleme testlerini gerçekleştirin.
8. Yalnızca bunlar başarılıysa `backendReady: true` yapın, `npm run build` çalıştırın ve GitHub'a yükleyin. GitHub Pages `main` dalını yayınlamaya devam eder.

## Öğretmen onayı

Öğretmenim seçimi `users/{uid}.requestedRole = teacher` ve `teacherStatus = pending` oluşturur; yetki vermez. Yetkili proje yöneticisi kimliği doğruladıktan sonra Firebase Console'da **`userRoles/{uid}`** belgesine **`role: "teacher"`** yazar. Bu koleksiyona tarayıcıdan yazmak tamamen yasaktır. Yanlış kişiye yetki vermemek için UID ve kurum/öğretmen kimliği bağımsız olarak doğrulanmalıdır. Onay kaldırılırsa sınıf işlemleri bir sonraki sunucu isteğinde reddedilir.

Öğretmen raporları, fonksiyonda hem öğretmen rolü hem sınıf sahipliği kontrol edilerek döner. Öğrenci e-postaları rapora dahil değildir. Öğretmen doğrudan başka bir kullanıcının profilini okuyamaz. Ayrıntılı öğrenci raporu yalnızca istenildiğinde yüklenir ve mevcut üyelik tekrar doğrulanır.

## Veri modeli

| Yol | İçerik / erişim |
|---|---|
| `users/{uid}` | Ad-soyad, avatar, sınıf seviyesi, rol başvurusu, bilgilendirme sürümü. Kendi hesabı okuyabilir; sunucu yazar. |
| `userRoles/{uid}` | Yönetici tarafından onaylı yetki. İstemci yazamaz. |
| `userStats/{uid}` | Sunucunun hesapladığı XP, seviye, yıldız, doğru/yanlış, tamamlanan etkinlik sayısı ve son etkinlik. |
| `progress/{uid}/activities/{id}` | Her etkinlik için ayrı ve kanonik soru sayısıyla sınırlı ilerleme. |
| `progress/{uid}/media/{kind}` | İzleme konumu; XP veya yetki kaynağı değildir. |
| `progress/{uid}/words/{key}` | Bilinen katalog kelimeleri için öğrenildi işareti. XP kazandırmaz. |
| `users/{uid}/events/{eventId}` | İşlem tekilleştirme kayıtları. İstenirse `expiresAt` için 30 günlük TTL politikası ayrıca etkinleştirilebilir. |
| `users/{uid}/badges/{id}` | Sunucunun doğruladığı rozetler. |
| `users/{uid}/history/{id}` | Etkinlik bazında son tamamlanma; tek büyüyen profil belgesi kullanılmaz. |
| `classes/{id}/members/{uid}` | Hesaptan bağımsız sınıf üyeliği. |
| `users/{uid}/classes/{classId}` | Öğrencinin sınıf listesi. |
| `classes/{id}/assignments/{id}` | Sınıfa atanan mevcut LinguCat içeriği. |
| `classInvites/{sha256}` | Rastgele davet kodunun sunucuda doğrulanan özeti; herkese açık okunamaz. |

Sorgular tek alanlıdır; şu an ilave bileşik indeks gerektirmez. Sınıf başına 200 öğrenci, öğretmen başına 30 sınıf, kullanıcı başına 20 üyelik, sınıf başına 30 aktif atama sınırı vardır. Kayıt kuyruğu kullanıcıya özel ve 1000 işlemle sınırlıdır. Sürekli Firestore dinleyicisi yoktur; kayıt sonrası ve panel açılışında sınırlı sorgular yapılır.

## XP ve senkronizasyon

Sunucu yanıtı kanonik soru/kelime bankasıyla karşılaştırır. İlk doğru 100, ikinci deneme 50, sonraki doğru 20 XP; öğrenilmiş soruyu tekrar yanıtlamak 0 XP. İstemcinin gönderdiği `xp` alanı kullanılmaz. Firestore transaction ve işlem kimliği, ağ tekrarlarında çifte ödülü engeller. Geçmiş yerel/misafir puanları otomatik olarak doğrulanmış bulut XP'sine aktarılmaz.

Kullanıcıya ait ayrı tarayıcı depolama alanları kullanılır. Misafir verisi ve başka hesap verisi birbirine aktarılmaz. Sunucu ilerlemesi oturum açılışında mevcut oyun motorunun durumuna çevrilir. Çevrimdışıyken olaylar yalnızca aynı UID'ye ait kuyrukta bekler. Hesap silme sunucudan yakın zamanda doğrulanmış oturum ister; sınıf üyelikleri, sahip olunan sınıflar, Firestore verileri ve Auth hesabı temizlenir. Bu cihazdaki aynı UID önbelleği de silinir.

Mystery Box mevcut puan sistemi korunur; tur günlüğü nesne kataloğu, tur sayısı ve puan sınırlarıyla doğrulanır. Bu, sunucunun her turu yönettiği hileye dayanıklı bir oyun oturumu değildir; bu oyun bulut XP'si vermez. Battle Arena'nın derlenmiş Godot dosyalarında güvenilir sonuç köprüsü yoktur; onun için bulutta tamamlandı/XP uydurulmaz. Özel öğretmen JSON içerikleri kanonik sunucu kataloğuna ayrıca eklenmedikçe doğrulanmış XP üretmez. Üretimde yüksek riskli rekabet/ödül kullanımından önce App Check ve sunucu oturumları eklenmelidir.

## Gizlilik ve isteğe bağlı servisler

Firebase yapılandırması web uygulamasına ait herkese açık proje tanımlayıcısıdır. Yönetici anahtarı veya servis hesabı istemciye eklenmemiştir. Storage'a ihtiyaç olmadığı için kullanıcı dosyası yükleme ve Storage kuralları eklenmedi. Analytics yalnızca ayarlardan açık onay verildiğinde başlatılır; isim, e-posta ve UID analitik olayına eklenmez. Çocuklara sunulacak nihai gizlilik metni, veli/okul bilgilendirmesi, izin ve veri saklama süresi işletmeci tarafından tamamlanmalıdır; arayüzdeki kutu doğrulanmış veli onayı olarak sunulmaz.

App Check desteği `appCheckSiteKey` ile hazırdır, varsayılan olarak kapalıdır. reCAPTCHA Enterprise sitesini GitHub Pages alan adıyla tanımlayıp önce ölçüm yapın; site anahtarını yapılandırıp istemciyi dağıttıktan sonra sunucuda `ENFORCE_APP_CHECK=true` ile zorunlu hale getirin. Anahtar hazırlanmadan zorunlu kılmak gerçek kullanıcıları engeller.

## Yerel testler

`firebase emulators:start --only auth,firestore,functions --project demo-lingucat` komutu yalnızca demo projesini kullanır. Gerçek kullanıcı veya gerçek e-posta oluşturmaz. Ayrı terminalde:

```sh
npm run test:account
node --test tests/firestore-rules.test.cjs
node --test tests/account-cloud.test.cjs
node tests/account-ui.test.cjs
```

Arayüz testi, bu geliştirme ortamındaki Playwright/Chrome yolunu kullanır. Başka ortamda bu yolu yerel Playwright kurulumuna göre düzenleyin. `?account-emulator=1` yalnızca localhost/127.0.0.1 üzerinde çalışır; canlı sitede demo sunucusuna geçiş yapmaz. Chrome ve Firefox 153 motorunda kayıt/giriş/oturum, dört ekran boyutu ve mevcut oyun navigasyonu emülatöre bağlı test edildi. Gerçek Google hesabıyla OAuth onayının tamamlanması, üretim e-postasının alıcının gelen kutusuna teslimi ve fiziksel Pardus cihazı bu testlerle doğrulanmış sayılmaz.
