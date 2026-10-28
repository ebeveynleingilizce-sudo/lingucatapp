## Kurulabilir LinguCat (PWA)

PWA, çevrimdışı kapsam, platform kurulumu, sürüm oluşturma ve doğrulama sınırları için [PWA_REPORT_TR.md](PWA_REPORT_TR.md) dosyasına bakın. Her yayından önce `python tools/build-pwa.py` çalıştırın. Yayın adresi HTTPS olmalıdır.

## XP ve başarı rozetleri

Kenney madalyalarıyla altı kalıcı rozet, sıralı kutlama, Lili ve seviye animasyonu eklendi. Mevcut XP kuralları korunur. Ayrıntılar, koşullar ve sınırlamalar [REWARDS_REPORT_TR.md](REWARDS_REPORT_TR.md) dosyasında.

## Etkileşim ve ses efektleri

Yerel asset paketlerinden seçilen 12 ses ve iki yıldız efekti uygulamaya bağlandı. Sağ üst ayarlardan efekt düzeyini ayarlayabilir veya sesi kapatabilirsiniz. Kaynaklar ve testler [INTERACTION_REPORT_TR.md](INTERACTION_REPORT_TR.md) dosyasında.

## Görsel sekmeler — güncel sürüm

Onaylanan ana sayfa aynen korunmuştur. Sekmeler, öğrenme ekranları ve öğretmen düzenleyicisi kaydırmasızdır; listeler sayfalanır. Ayrıntılar ve görsel istemler [TABS_REPORT_TR.md](TABS_REPORT_TR.md) dosyasındadır.

## Yeni yatay ana sayfa

Referansa dayalı tek ekran görünümü ve testler için [LANDSCAPE_REPORT_TR.md](LANDSCAPE_REPORT_TR.md) dosyasına bakın. Dikey telefonda Lili yataya çevirme ekranı gösterilir. Yardım, ses ve öğretmen paneli sağ üst ayarlar düğmesindedir.

# LinguCat Interactive Stories — Türkçe öğrenci deneyimi

İlk modül: **The Mysterious Student**. Arayüz Türkçe; soru kökleri, seçenekler, hikâye tanıtımı ve hedef ifadeler İngilizcedir.

## Öğrenci için

1. Klasörü olduğu gibi tutun ve **index.html** dosyasını açın. Kurulum ve internet gerekmez. İlk kullanım rehberi atlanabilir; **Nasıl Kullanılır?** ile yeniden açılır.
2. **Hikâyeler → The Mysterious Student** yolunu izleyin. Tanıtımda dört etkinliği görebilirsiniz. **Hikâyeyi İzle** videoyu başlatır.
3. Hikâyeyi baştan sona izleyin. Duraklatabilir ve izlediğiniz bölümlere dönebilirsiniz. İleri sarma etkinlikleri açmaz.
4. Video bitince **Hikâye Testi**, **Kim Söyledi?**, **Olayları Sırala** ve **Dil Bilgisi Oyunları** arasından seçim yapın. Her etkinliğin yönergesi, ilerlemesi ve puanı ayrıdır.
5. **Sahneyi Tekrar İzle** ilgili bölümü oynatıp sonunda durur. Yanlış cevapta doğru yanıt açıklanmaz; başka sorulardan sonra yeniden denersiniz. Tek sorulu etkinlikte başka bir gerçek hikâye sorusu puansız hatırlatma olarak araya girer. Bütün hikâyede yalnızca tek soru varsa düşünme molası kullanılır.
6. İlk doğru cevap ilk denemede **100 XP**, ikinci denemede **50 XP**, sonraki denemelerde **20 XP** kazandırır. Yanlış cevap 0 XP getirir. Bir soru yalnızca bir kez puan kazandırır. İlk deneme başarısı ve öğrenilen soru sayısı ayrı gösterilir.
7. Sonuçtan başka etkinliğe geçin. **Baştan Başla**, onayınızla hikâyenin bütün ilerlemesini sıfırlar. **Etkinlikleri Dene** bağımsız önizlemedir; gerçek ilerlemeye puan eklemez.

## Şarkılar: Every Day, Every Way

**Şarkılar → Every Day, Every Way → Şarkıyı Dinle** yolunu izleyin. Önceden hazırlanan sözlü 1080p video pakete dahildir; dosya seçmek veya internet gerekmez. Bu, 73,7 saniyelik kesittir. Sonraki kıtalara ait soru yoktur.

Şarkının tamamı ilk kez dinlenince dört etkinlik açılır:

- **Şarkı Testi:** 4 çoktan seçmeli / doğru-yanlış soru.
- **Kelime Avı:** 3 bağlam içinde kelime sorusu.
- **Sözleri Sırala:** 2 sıralama sorusu; ok düğmeleriyle oynanır.
- **Dil Bilgisi Oyunları:** 5 geniş zaman sorusu.

Sorular ve seçenekler İngilizce, yönergeler ve geri bildirimler Türkçedir. **Bölümü Tekrar Dinle** her sorunun gerçek söz aralığına gider. İlk denemelerde tamamlanan şarkı en fazla 1400 XP verir. Yanlışlarda mevcut 100/50/20 XP ve gecikmeli tekrar kuralları uygulanır. Şarkının ilerlemesi, video kilidi ve puanı hikâyeden bağımsızdır. Her iki içeriğe Oyunlar bölümünden de ulaşılır.

Şarkıyı seçtikten sonra **Öğretmen Stüdyosu**, şarkının kendi soru bankasını açar. Şarkı düzenlemeleri ayrı kaydedilir; yayınlama yalnızca seçili içeriğin ilerlemesini sıfırlar. `data/every-day-every-way.json` soru seti, `song.js` çevrimdışı veri dosyası, `assets/everyday-song.mp4` sözlü video, `assets/everyday-song.srt` düzenlenebilir söz dosyasıdır. Kelime soruları için `vocabulary` türü eklenmiştir.

## Öğretmen için

**Öğretmen Stüdyosu** üzerinden video seçebilir, soru ekleyebilir/düzenleyebilir, sahne başlangıç ve bitişlerini ayarlayabilir, soru/sahne önizlemesi yapabilirsiniz. Öğrenci ekranında dosya veya içerik düzenleme kontrolleri bulunmaz.

- Soru ve seçenekleri İngilizce; sahne adlarını, ipuçlarını ve doğru cevap sonrası açıklamaları Türkçe yazın. Açıklamadaki İngilizce örnekler İngilizce kalabilir.
- Çoktan seçmeli ve Doğru/Yanlış soruları Hikâye Testi'ne; konuşmacı soruları Kim Söyledi'ye; sıralama ve dil bilgisi soruları kendi etkinliklerine bağlanır.
- Seçenekler satır satır yazılır. Doğru seçenek 1'den başlayan numaradır. Sıralama cevabında her olay numarasını bir kez kullanın; örnek: `2,3,1,4`.
- **Başlangıcı/Bitişi Oynatma Anından Al** oynatıcının konumunu kullanır. Sahne aralığı video süresinin içinde olmalıdır.
- Taslak, sayfa açıkken önizlemeler arasında korunur. **Öğrenciye Yayınla** içeriği kaydeder ve hikâyenin öğrenci ilerlemesini sıfırlar; önce yedek alın.
- **JSON Dışa Aktar / İçe Aktar** başka hikâyeler eklemeyi sağlar. İndirme engellenirse seçilebilir yedek metnini kopyalayıp UTF-8 `.json` dosyasına kaydedin. Video JSON'a dahil değildir.
- Seçilen büyük video tarayıcı depolamasına yazılmaz; yalnızca oturumda kullanılır. Sayfa yeniden açılınca öğretmen aynı videoyu yeniden seçmelidir. Paketle gelen `assets/story.mp4` doğrudan açılır.
- Uyumlu eski V3 ilerlemesi dört etkinliğe aktarılır. Eski kayıtlar ayrıca korunur. Depolama engelliyse sade bir uyarı gösterilir ve açık oturumda çalışmaya devam edilir. Aynı tarayıcı ve aynı dosya konumu kullanılmalıdır.

## Dosyalar ve uyumluluk

`index.html`, `styles.css`, `app.js`, `engine.js`, `story.js`, `song.js`, `data/` ve `assets/` birlikte tutulmalıdır. Harici font, API veya CDN yoktur. Ses efektleri cihazda üretilir ve kapatılabilir. Tam ekran düğmesi ve F11 kullanılabilir. Azaltılmış hareket tercihi desteklenir.

Testler: `node tests/engine.test.cjs`  , `node tests/student-tr.test.cjs` ve `node tests/teacher-tr.test.cjs`. Tarayıcı testi yerel Playwright ve Chrome kurulumu kullanır; uygulamanın kendisi bu araçlara ihtiyaç duymaz. Sonuçlar **TEST_RESULTS.md** dosyasındadır.

Eski tarayıcılar için ES5 sözdizimi ve CSS yedekleri korunmuştur. Gerçek Pardus/eski Firefox ve fiziksel akıllı tahta üzerinde ayrıca doğrulama gerekir; video desteği cihazın H.264/AAC çözümleyicilerine bağlıdır.
