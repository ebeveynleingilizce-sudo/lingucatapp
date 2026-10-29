# LinguAdmin doğrulama raporu

- Paylaşılan şema: altı soru tipi, cevap aralığı, güvenli URL, tema alanları ve medya sınırları geçti.
- Auth / Firestore / Functions emülatörleri: admin girişi, normal kullanıcı reddi, taslak izolasyonu, yayın, sürüm geri yükleme, eşzamanlı düzenleme çatışması, bağlantılı içerikte arşiv engeli ve bağımsız içerik XP doğrulaması geçti.
- Öğrenci/öğretmen bulut yaşam döngüsü: sınıf oluşturma, güvenli katılım, ödev, rapor, doğru kullanıcı izolasyonu, tekrar XP engeli, ikinci cihaz eşitleme ve emülatör hesabı silme geçti.
- Chrome UI: yönetici girişi; video taslağı oluşturma; soru düzenleme; gerçek LinguCat oynatıcı/soru/banner önizlemesi; normal kullanıcıda admin ekranı reddi; 1920, 1366, 768 ve 390 genişliklerinde yatay taşma kontrolü geçti.
- Chrome + Firefox: yayınlanmış yeni içerik kataloğu, gerçek oynatıcı, tekrarlanan gezinmede varsayılan içerik kimliğinin korunması ve Studio araçlarının yokluğu geçti.
- Firestore kuralları: admin dahil doğrudan CMS/rol/yayın yazımı reddedildi; eski öğrenci veri kuralları değişmedi ve testleri geçti.
- Storage kuralları emülatörü: normal kullanıcı yükleyemiyor; admin desteklenmeyen tür yükleyemiyor; özel taslak okunamıyor; yalnız tam yayınlanan dosya yolu anonim okunuyor; aynı kaydın altındaki diğer taslak kapalı; dosya üzerine yazılamıyor.
- Önceki misafir/paylaş davranışları Chrome + Firefox’ta geçti. İçe aktarılan oyunların dört ekranda tam ekran/geri dönüş testi geçti (Godot motoru bu testte taklit edildi).

## Canlıya geçişte kalan koşullar
Storage kuralları 29.10.2026 tarihinde kullanıcı onayıyla canlıya uygulandı. Varsayılan bucket EUROPE-WEST1 bölgesinde oluşturuldu. Medya yükleme arayüzü etkinleştirildi. Storage servisinin çapraz Firestore kuralı için yalnız `roles/firebaserules.firestoreServiceAgent` rolü kendi servis hesabına eklendi. Canlı geçici dosyalarla taslak reddi, tam yayın yolu okuması, kardeş taslağın reddi ve anonim yükleme reddi doğrulandı; test dosyaları ve yayın kaydı temizlendi. `ebeveynleingilizce@gmail.com` hesabına kullanıcı talebiyle admin custom claim atandı ve Firebase Auth üzerinden doğrulandı. Diğer claim alanları korundu.

## LinguAdmin PWA
Chrome ve Edge normal tarayıcı profillerinde manifest ve kurulabilirlik kontrolleri hatasız geçti. Ayrı uygulama kimliği/kapsamı, kurulum istemi, vazgeçme, yardım penceresi, kurulum sonrası düğmenin gizlenmesi, dört ekran boyutu ve çevrimdışı sabit kabuk açılışı doğrulandı. Önbellekte Firebase/API/taslak verisi bulunmadığı kontrol edildi. Firefox kurulum yönergesi geçti.
