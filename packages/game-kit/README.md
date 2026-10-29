# LinguCat ortak oyun altyapısı

Motorlar yalnız `games/modular/engines/` altında oyun mantığı içerir; öğrenci kimliği, Firebase, XP, içerik düzenleme ve yayın işlemleri motorlara ait değildir. Büyük framework veya yeni npm bağımlılığı eklenmedi.

## Sözleşme

```js
const manager = new LinguGameManager();
manager.initialize(config, contentPack, { preview: false });
const unsubscribe = manager.onProgress(progress => { /* yalnız UI; Firebase yazılmaz */ });
manager.onComplete(result => { /* doğrulanmış, standart sonuç */ });
manager.start();
manager.pause();
manager.resume();
manager.restart();
unsubscribe();
manager.destroy();
```

Her fabrika `LinguGameRuntime.create(setup)` ile aynı initialize/start/pause/resume/restart/destroy/onProgress/onComplete yüzeyini sağlar. `GameManager` iframe yaşam döngüsünü ve aynı origin + doğru iframe kaynağı + rastgele oturum belirteci kontrollerini yönetir. Destroy iframe'i kaldırır, üst pencere listener'larını temizler; runtime timer, klavye listener ve medya kaynaklarını bırakır. Pause bekleyen kart çevirme süresini dondurur ve etkileşimi kapatır. Sayfa gizlenince oyun duraklar; açıkça devam edilmelidir.

## Yapılandırma

`schema.js` hem tarayıcıda hem Cloud Functions'da aynı doğrulamadır. Game alanları: gameId, engineId, title, description, cover, contentPackId, topicIds, grammarTags, gradeLevels, cefrLevel, difficulty, curriculumMappings, rules, rewards, publicationStatus, version.

GradeLevels 1–12 veya boş (tümü), CEFR A1–C2, difficulty easy/normal/hard bağımsızdır. Kademe sadece sunum için sınıftan belirlenir; zorluktan CEFR türetilmez. Öğrenci bilgisi olarak iframe'e sadece sınıf gönderilir; UID, e-posta ve Firebase erişimi gönderilmez.

`pack()` içerik paketi: contentPackId, title, version, items[]. Her öğe id, english, turkish, hint, image, audio, topicIds, grammarTags alanlarını taşır. Paket en çok 48 öğe, oturum en çok 12 hedef alır. Motorların içine eğitim sözcüğü yazılmaz. Word Search/Hangman bu sürümde boşluksuz A–Z kelimeleri kabul eder; Memory ve bağlam ipuçları daha uzun metin gösterebilir.

Kurallar: itemCount, gridSize, maxMistakes, directions, pairMode. Memory text/image/audio kipleri vardır. Görsel/ses kipinde kullanılan her öğede gerekli medya bulunmalıdır. Word Search yerleştirmesi sınırlı deneme ve satır fallback'i kullanır; kilitlenebilecek sınırsız döngü yoktur. Labirentte geçilen hücre cevap sayılmaz; öğrenci ilgili kelimeye gelip seçim yapar.

Müfredat eşlemesinde framework, year, code, description, sourceUrl, verified bulunur. Yayın için HTTPS MEB kaynağı ve yöneticinin açık doğrulaması aranır. Bu otomatik resmî akreditasyon değildir; kod ve kaynak aynı öğrenme çıktısıyla yönetici tarafından karşılaştırılmalıdır. Başlangıç örneklerinde liste boştur ve uydurma kazanım kodu yoktur.

## Sonuç ve XP

Sonuç alanları: score, accuracy, correctAnswers, wrongAnswers, duration (saniye, pause hariç), completed, contentPackId, gameId. Ek `evidence` yalnız cevap doğrulaması içindir; motor XP göndermez.

`results.verify` özet yerine gerçek yayın paketiyle cevap geçmişini değerlendirir, puan ve doğruluğu yeniden hesaplar. Sonuç günlüğü en çok 512 olaydır. Bu, çevrimdışı bir tarayıcı oyununun sınırlı cevap günlüğü doğrulamasıdır; kriptografik anti-hile garantisi değildir.

`results.apply` mevcut LinguEngine.answer/next/restore kullanır. 100/50/20 kuralı yeniden yazılmaz. Aynı paket + öğe kimliğinin ustalığı farklı oyun örneği, motor veya sürümde tekrar XP vermez. Yeni bir öğrenme hedefi gerçekten farklıysa yeni öğe kimliği verilir; sadece sıralama/kapak değişiminde kimlik korunur. Paket düzenlenip öğe çıkarılsa da daha önce kazanılmış XP silinmez.

Yerel kayıtlar mevcut kullanıcı kapsamındaki LinguTabAPI.read/write katmanına gider: game.pack.<id>, game.result.<id>, game.packIds. Sonuç, mevcut account-progress kuyruğuna tamamlanma/başarısız bitiş anında **tek** modularGame olayı olarak eklenir. Her harfte/eşte/hamlede Firestore çağrısı yoktur. Bitmeden kapatılan oturumda henüz ödüllendirilmiş bir sonuç oluşmaz; pause/resume açık oturumu korur, kapatılmış yarım tahtayı yeniden kurma bu sürümün özelliği değildir.

Sunucuda aynı transaction: event idempotency, paket hedefleri, oyun özeti, mevcut userStats XP/seviye/yıldızları, mevcut Kelime Avcısı/Mükemmel Tur rozetleri ve geçmiş. Öğrencinin gönderdiği score/accuracy/gain yetkili kabul edilmez. Oyunun ve paketin yayın sürümü doğrulanır; arşivlenen oyun yeni sonuç kabul etmez. Eski sürümde çevrimdışı oluşmuş ve artık doğrulanamayan kayıt mevcut kuyruğun rejected alanında korunur.

## Genişletme

1. Registry'ye motor metadata'sı ekle; hukuk/bağımlılık belirsizse blocked/reference durumunda tut.
2. Üçüncü taraf kod lisansını vendor yanında koru, assetleri bağımsız denetle.
3. Motor factory ve kanıt doğrulamasını ekle; içerik veya Firebase'i motora gömme.
4. Başarı/yanlış/restart/pause/destroy testleri ve dokunma/klavye/ekran kontrollerini ekle.
5. Yeni içerik için kod değişikliği gerekmez: LinguAdmin Oyun Stüdyosu'ndan paket ve oyun örneği oluştur.
