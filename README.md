# LinguCat

İngilizce hikâyeler, şarkılar, etkinlikler ve eğitsel mini oyunlar.

## Çalıştırma

- **Windows:** Python 3 kuruluysa `LinguCat-Baslat.cmd` dosyasını açın.
- **Pardus / Linux:** Proje klasöründe `python3 serve-lingucat.py` çalıştırın.
- Tarayıcı adresi: `http://127.0.0.1:8765/`.

Yerel sunucu internet gerektirmez. Battle Arena'nın 3D dosyalarını yükleyebilmesi için uygulamayı bu yöntemle açın. Diğer içerikler `index.html` üzerinden de kullanılabilir.

## İçerikler

- Hikâyeler ve şarkılar, video ve soru bankaları
- Test, kelime, sıralama ve dil bilgisi etkinlikleri
- Match Rush, Mystery Box ve English Battle Arena
- Cihazda saklanan öğrenme ilerlemesi, XP ve rozetler

Öğrenci/öğretmen kullanımı için [Türkçe kılavuz](README_TR.md), 3D oyun için [Battle Arena notları](BATTLE_ARENA_TR.md).

## Yayınlama

Statik dosyaları klasör yapısını koruyarak bir web sunucusunda yayınlayın. PWA için HTTPS kullanın. Uygulama dosyalarını değiştirdikten sonra `python tools/build-pwa.py` ile önbellek sürümünü güncelleyin.

Video ve 3D oyun dosyaları depoya dahildir. Geçici çıktılar, ekran görüntüleri ve eski yedekler dahil edilmez.

## Kullanıcı hesapları ve sınıflar

Google veya e-posta ile giriş, öğrenci profili, onaylı öğretmen sınıfları ve Firebase üzerinde doğrulanan ilerleme eklendi. [Kurulum, güvenlik modeli ve testler](FIREBASE_SETUP_TR.md). Misafir modu yalnızca bu tarayıcıda saklanır; hesaba ait kayıtlar kullanıcıya göre ayrılır.
