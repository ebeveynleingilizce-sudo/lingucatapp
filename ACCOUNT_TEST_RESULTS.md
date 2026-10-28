# Hesap sistemi — 28 Ekim 2026

## Doğrulananlar

- Saf motor testleri: mevcut 16 öğrenme motoru ve 10 ödül kontrolü geçti.
- Hesap çekirdeği: profil doğrulama, sahte rol/XP girdilerini yok sayma, 100/50/20 ödül kuralı, tekrar oynama ve rastgele sınıf kodları geçti.
- Gerçek Firestore emülatörü: öğrenci kendi verisini okuyabiliyor; başka öğrencinin profilini/istatistiğini okuyamıyor. İstemciden rol yükseltme, XP yazma, üyelik/ödev uydurma ve kimliksiz okuma reddediliyor.
- Auth + Firestore + Functions emülatörü: öğrenci kayıt/giriş, öğretmen başvurusu ve yönetici onayı, sınıf oluşturma/katılma, içerik atama, yetkili öğretmen raporu, yetkisiz öğretmeni reddetme, işlem kimliği tekilleştirme, 100 XP'den sonra aynı soruya 0 XP, yanlış sonrasında 50 XP, ikinci oturumda aynı ilerleme, sınıftan çıkarılınca ilerlemenin korunması ve yalnızca sentetik emülatör hesabının silinmesi geçti.
- Windows/Chrome ve Firefox 153 motorunda arayüz: tek rol paneli, şifre göster/gizle, kayıt/giriş/çıkış, oturumun yeniden yüklemede korunması, öğrenci profili, dört ekran boyutu ve mevcut Match Rush/ana sayfa navigasyonu geçti.
- Arayüzden emülatörde doğrulama ve şifre sıfırlama e-posta isteği üretildiği kontrol edildi. Hiçbir gerçek alıcıya test e-postası gönderilmedi.
- Üretimde `lingucat-app`: e-posta/şifre ve Google sağlayıcısı etkin, GitHub Pages alan adı yetkili, en az 8 karakter parola ilkesi ve e-posta hesap varlığı gizliliği açık. Kimliksiz backend isteği 401 ile reddedildi.
- Üretimde geçici sentetik hesap: Auth kayıt/giriş, profil, sunucu XP hesabı, işlem/cevap tekrarı koruması ve ikinci oturumdan ilerleme okuma geçti. Test hesabı ve oluşturduğu Firestore verileri sonrasında temizlendi.

## Sınırlar

Gerçek Google hesabıyla kullanıcının OAuth onay ekranını tamamlaması ve doğrulama/sıfırlama mesajının gerçek gelen kutusuna ulaşması ayrıca denenmelidir. Fiziksel Pardus/akıllı tahta donanımı kullanılmadı; Firefox motorunda tarayıcı kontrolleri yapıldı. App Check isteğe bağlı hazırdır, üretimde zorunlu kılınmadı. Mystery Box'un istemci tur günlüğü sınırlı olarak doğrulanır ve XP üretmez; derlenmiş Battle Arena için sonuç köprüsü yoktur. Bunlar çalışıyormuş gibi gösterilmez.

Artifact Registry için isteğe bağlı yedi günlük imaj silme politikası otomatik onay incelemesi tarafından reddedildiği için uygulanmadı. Fonksiyonun dağıtımı bundan bağımsızdır; mevcut imajlar korunmaktadır. Aktif Firebase planı ve ödeme hesabı değiştirilmedi.
