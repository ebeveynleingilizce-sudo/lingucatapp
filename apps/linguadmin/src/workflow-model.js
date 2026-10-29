export const contentTypes=[['song','♫','Şarkı','Şarkı videosu veya ses dosyası; dinleme ve dil etkinlikleri.'],['video','▣','Hikâye','Hikâye videosu, hedef ifadeler ve sahneye bağlı sorular.'],['activity','✦','Oyun','Hazır oyun motoru veya soru temelli oyun seç. Godot / ZIP paketi yüklemez.']];
export const contentKinds=['video','song','activity'];
export function publicationIssues(record,items,schema){
 const issues=[];const add=(step,path,text)=>issues.push({step,path,text});
 if(!record.title?.trim())add(1,'title','Öğrenciye görünecek başlığı yaz.');
 if(contentKinds.includes(record.kind)){
  if(record.kind!=='activity'&&!record.source)add(1,'source','Bir video veya ses dosyası ekle.');
  if(record.source&&!(record.payload?.videoDuration>0))add(1,'payload.videoDuration','Medya süresini dosyadan oku veya saniye olarak yaz.');
  if(!record.cover)add(1,'cover','Öğrencinin içerik kartında göreceği kapağı seç.');
  if(!record.cefrLevels?.length)add(1,'cefrLevels','En az bir İngilizce seviyesi seç.');
  if(!record.payload?.questions?.length)add(2,'questions','En az bir etkinlik sorusu hazırla.');
  for(const [i,q]of (record.payload?.questions||[]).entries()){try{schema.question(q);if(q.scene.end>record.payload.videoDuration+.05)throw Error('Sahne bitişi medya süresini aşıyor.');}catch(e){add(2,'questions',`${i+1}. soru: ${e.message}`);}}
 }
 for(const id of record.links||[]){if(['match-rush','mystery-box','battle-arena'].includes(id))continue;const item=items.find(x=>x.id===id);if(!item||item.status==='archived')add(1,'links','Bağlı içerik bulunamadı veya arşivli: '+(item?.draft.title||id));else if(!item.published&&item.draft.kind!=='media')add(1,'links',item.draft.title+' önce yayınlanmalı.');}
 if(!issues.length)try{schema.validate(record,true);}catch(e){add(1,'title',e.message);}
 return issues;
}
export const fieldHelp={
 'payload.banner.title':['Örn. İngilizceyi oynayarak keşfet!','LinguCat ana sayfasının tanıtım alanında görünen büyük başlık.'],
 'payload.banner.image':['https://…/hero.webp','Ana sayfanın tanıtım alanında kullanılan görsel.'],
 'payload.banner.target':['','Öğrenci ana sayfadaki tanıtım düğmesine bastığında açılacak bölüm.'],
 'payload.background':['https://…/background.webp','Öğrenci uygulamasının arka plan görseli. Boşsa mevcut varsayılan görünüm korunur.'],
 mime:['Örn. video/mp4','Dosya yüklendiğinde otomatik okunur. Öğrenciye gösterilmez.'],
 size:['Örn. 1048576','Dosya yüklendiğinde bayt olarak otomatik hesaplanır. Öğrenciye gösterilmez.'],
 lyrics:['I wake up in the morning…','Öğrenci oynatıcısının altındaki “Sözler ve bağlı içerikler” bölümünü açtığında bu metni görür.'],
 title:['Örn. The Mysterious Student','Öğrenci içerik kartında ve içerik ekranında bu başlığı görür.'],
 description:['Örn. Noah’ın ilk okul gününü izle; günlük rutin ifadelerini keşfet.','İçeriğin öğrenci tarafındaki tanıtım metnidir. Kartın altındaki seviye etiketi değildir.'],
 unit:['Örn. Daily Routines','İçeriği yönetimde aramayı ve öğrenci katalog aramasında bulmayı kolaylaştırır.'],
 tags:['Örn. school, friends, daily routines','Arama için kullanılır. Öğrenci kartında ayrıca etiket listesi gösterilmez.'],
 source:['https://…/story.mp4','Öğrencinin oynatıcısında açılacak medya. Aşağıdan yükleyebilir veya kütüphaneden seçebilirsin.'],
 cover:['https://…/cover.webp','Öğrencinin içerik kartında görünen kapak. Medya seçilmezse video içeriğinin yerini almaz.'],
 'payload.videoDuration':['Örn. 95','Saniye cinsinden süre; soru sahnelerinin sınırını belirler. Yerel dosya seçildiğinde otomatik okunur.'],
 'payload.expressions':['I draw pictures.\nDo you want to join us?','Ortak içerik modelinde saklanan hedef ifadeler. Bu alana yazmak tek başına yeni bir kelime kartı veya ayrı etkinlik oluşturmaz.'],
 order:['Örn. 0','Yalnız yönetim için: küçük sayılı içerikler katalogda önce sıralanır.'],
 'payload.level':['','Seviye İngilizce seviyeleri seçiminden belirlenir.']
};
