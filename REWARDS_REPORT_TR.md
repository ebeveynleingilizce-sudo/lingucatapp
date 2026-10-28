# LinguCat — animasyonlu XP, rozet ve ödül sistemi

## Kapsam
Onaylanan ana sayfa ve mevcut eğitim içerikleri korunmuştur. Soru motoru ve XP kuralları değiştirilmedi: ilk doğru 100, ikinci denemede doğru 50, sonraki denemelerde 20 XP. Rozet/animasyon katmanı XP yazmaz veya ek bonus vermez; mevcut ilerleme verilerini okur. `engine.js` değişmedi.

## Rozetler
Her rozetin sabit ID'si, Türkçe adı/açıklaması, yerel SVG ve PNG ikonu, koşulu, kilit durumu ve ilk kazanım tarihi vardır.

| ID | Ad | Koşul |
|---|---|---|
| story-explorer | Hikâye Kaşifi | Bir hikâye etkinliğini tamamla. |
| rhythm-star | Ritim Yıldızı | Bir şarkı etkinliğini tamamla. |
| word-hunter | Kelime Avcısı | Kelime Avı'nı bitir, 6 farklı kelime/ifadeyi Öğrendim olarak işaretle veya Mystery Box'ta 10 nesneyi en az 0 oyun puanıyla tamamla. |
| listening-master | Dinleme Ustası | Kim Söyledi? veya Sözleri Sırala etkinliğini bitir. |
| grammar-hero | Gramer Kahramanı | Bir Dil Bilgisi Oyunları etkinliğini bitir. |
| perfect-round | Mükemmel Tur | Bir etkinlikte tüm soruları ilk denemede doğru cevapla. |

Kazanılan rozet tekrar verilmez. Koşul sonradan yeniden sağlansa veya kelime işareti kaldırılıp eklense de kazanım tarihi değişmez. Daha önce başarısız denemelerle bitirilen bir etkinlik daha sonra gerçekten kusursuz tamamlanırsa henüz kazanılmamış Mükemmel Tur açılabilir; XP'ye dokunulmaz.

## Kutlama
0–0.3 s arka plan kararır; 0.3–0.8 s madalya büyüyüp hafif döner; 0.8–1.4 s yıldızlar ve konfetiler yayılır; 1.4–2 s madalya parlar ve başlık belirir; 2–2.8 s rozet adı, etkinlik XP'si ve toplam XP sayacı görünür. Rozet kazanımında Lili ayrı köşede zıplar ve konuşur. XP barı, etkinlikte mevcut motordan kazanılan değerleri gösterir. Birden çok rozet ve seviye atlama, tek pencerede sırayla gösterilir. Yeni rozet yoksa Etkinlik Tamamlandı kutlaması kullanılır.

Devam Et animasyon sonunda açılır. Atla/Escape tüm bekleyen görsel kutlamaları kapatır; kaydedilmiş başarıları geri almaz. Arka plan kontrolleri modal sırasında etkileşim alamaz. Yenileme veya aynı tamamlanma olayının tekrarı ikinci XP/rozet oluşturmaz. Önizlemeler kalıcı rozet vermez ve mevcut hafif önizleme geri bildirimi sürer.

## Profil ve kayıt
Profilde altı rozet sayfalanır (masaüstünde dört, küçük yatay ekranda üç). Açılanlar renkli/parlak, kilitliler soluk ve kilit simgelidir. Dokunma/klavyeyle ad, açıklama, koşul ve tarih açılır. Önceki kayıtlı başarılar sessizce aktarılır; geçmişte gerçek kazanılma tarihi tutulmadığından aktarım tarihi açıkça belirtilir.

Mevcut A.read/A.write depolama katmanı kullanılır. Sabit yerel profil ID'si ui.learnerId altında, rozet defteri rewards.v1.<profil-id> anahtarında saklanır; profil adı değişikliği rozetleri sıfırlamaz. Tamamlanma fişi içerik kimliği + revizyon + etkinlik kimliğiyle ayrılır. Kazanım, animasyon başlamadan senkron olarak kaydedilir. Tarayıcı depolamayı engellerse uygulamanın mevcut oturum içi bellek/uyarı davranışı geçerlidir.

Projede kimlik doğrulama, çoklu öğrenci hesabı veya Firebase bağlantısı bulunmuyor; bu çalışma bunları varmış gibi göstermiyor. Mevcut tek yerel profile bağlanır. `lingucat:rewards-saved` olayı profil ID'si ve sürümlü kayıtla yayımlanır; ileride kurulacak senkronizasyon katmanı için bağlantı noktasıdır. Otomatik bulut senkronizasyonu yapılmaz.

## Oyun bağlantısı
Mystery Box'ın gerçek 10-nesne bitiş yolu, doğrulanan iframe mesajıyla rozet katmanına bağlandı. Başka pencere/kaynaklardan gelen mesajlar kabul edilmez. İç oyunun skorları XP'ye çevrilmez. Battle Arena'nın derlenmiş web oyununda kazanma olayı üst uygulamaya bildirilmediğinden bu oyun için başarı uydurulmaz; bu oyun ayrı bir kaynak/export entegrasyonu gerektirir.

## Varlıklar ve ses
Kullanıcının assets/kenney_medals.zip paketi kullanıldı. Kaynak https://kenney.nl/assets/medals (CC0). İlgili SVG türevleri/PNG fallbacks, özgün lisans ve kaynak listesi assets/rewards/ içindedir. Kenney Game Icons ve FreeGameUI incelendi; gereksiz paket eklemek yerine mevcut yerel ikonlar yeniden kullanıldı. Harici CDN bağımlılığı yoktur.

Rozet açılışı ve yıldız/parlama için mevcut sesler kullanılır; level-up.ogg/mp3 (Fantasy UI SFX Free, CC BY 4.0) eklendi. Hepsi mevcut Ses Kapalı ve efekt düzeyi ayarlarına uyar. `prefers-reduced-motion` durumunda hareket/parçacıklar kaldırılır, XP anında doğru değeri gösterir ve Devam Et beklemez.

## Dosyalar
- reward-engine.js: saf, XP'yi değiştirmeyen koşul/tekrar önleme mantığı.
- rewards.js / rewards.css: kayıt, sıralı modal, animasyon, Lili, ayrıntılar ve profil sayfalaması.
- app.js / tabs.js / interaction.js: mevcut olay bağlantıları ve eski bitiş efektinin çift çalışmasının önlenmesi.
- mystery-box.js / games/mystery-box/index.html: gerçek oyun bitiş mesajı; oyun kuralları korunur.
- index.html, assets/rewards/, assets/interaction/audio/level-up.* ve kaynak/lisans dosyaları.

## Testler
- 10 saf rozet motoru kontrolü: koşullar, ilk kazanım/tarih, tekrar olayları, önizleme, revizyon, içeriğin tamamlanması, profil ayrımı, eski ilerleme ve yeni kusursuz tekrar.
- Tarayıcı: ilk gerçek etkinlikte 3 rozet, animasyon başlamadan kalıcı kayıt, animasyon sırasında yeni sayfadan geri okuma, birden çok ödül sırası, Atla/Devam Et/Escape, toplam 200 XP'nin korunması, yenilemede kayıt, tarih/koşul ayrıntıları, yeni rozet yokken genel kutlama ve gerçek toplam 700 XP.
- Seviye: 450→650 XP ile seviye 1→2, sessiz mod, azaltılmış hareket, native dialog bulunmadığında fallback, klavye/odak.
- Kelime: altıncı kelimede bir rozet, kaldırıp yeniden işaretlemede yeni ödül yok.
- Mystery Box gerçek bitiş callback'i, iç içe modal üstünde ödül, sahte üst-pencere mesajının reddi; oyun puanı XP'ye eklenmez.
- 1920×1080, 1366×768, 1280×720 ve 844×390 üzerinde ekran sınırları ve scroll kontrolü. İlgili görüntüler tests/reward-*.png içindedir.
- Mevcut öğrenci (16), öğretmen (8), şarkı, sekme, etkileşim ve sahne tekrarı testleri geçti. 16 ana soru motoru testi de geçti.

Fiziksel Pardus/Firefox ortamı bu makinede yok; bu cihazlarda test yapılmış gibi raporlanmaz. Temel CSS animasyonları ve eski dialog API'si olmayan durumda çalışan fallback Chrome'da doğrulanmıştır.
