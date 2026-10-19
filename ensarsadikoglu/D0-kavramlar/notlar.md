# D0 — Kavramlar ve Kurulum Notları

- **Kullanıcı:** ensarsadikoglu
- **Tarih:** 18 Ekim 2026
- **Araç:** Google Antigravity (Google AI Pro)

---

## Araç ve Kota Bilgileri
- **Mevcut Kullanım:** %2 (Saat 15:26 itibarıyla sıfırlanır)
- **Haftalık Sınır:** %2 (22 Ekim saat 15:26 itibarıyla sıfırlanır)
- **Güvenlik Ayarı:** AI Credit Overages = Never

---

## 1. Raster ve vektör
- **Raster:** Piksel ızgarasından oluşan veri (görüntü, yükseklik haritası). Her piksel bir değer taşır.
  Örnek: Mars Trek'in karo (tile) olarak sunduğu MDIM21 renkli mozaik haritası.
- **Vektör:** Nokta, çizgi ve çokgenlerden oluşan veri. Örnek: iniş noktası pinleri (nokta), gezgin rotası (çizgi).
- Bu hafta: **D2'de raster** (Trek karoları), **D3'te vektör** (iniş noktaları, GeoJSON) kullanacağım.
- Raster büyüdükçe dosya/indirme boyutu artar; vektör sadece koordinatları tuttuğu için küçüktür.

## 2. Koordinat sistemleri ve projeksiyonlar
- **Koordinat sistemi (CRS):** Bir konumun sayılarla nasıl tarif edildiği (enlem/boylam gibi).
- **Projeksiyon:** Küre yüzeyini düz ekrana çevirme yöntemi. Her projeksiyon mesafe, alan veya şekilden birini bozar.
- **Dünya'nın varsayılan web haritası** (EPSG:3857) Dünya'nın şekline göre hesaplanır. Mars'ın şekli ve boyutu farklı
  olduğu için Mars haritasını bu projeksiyonda bırakırsam konumlar **kayar** (README'deki uyarı).
- Mars Trek karoları **`EPSG::104905`** (Mars, enlem/boylam) kullanıyor. OpenLayers'a **`proj4`** ile tanıtıp
  `register(proj4)` ile kaydetmem gerekiyor.
- **Enlem türü:** Mars'ta *planetocentric* ve *planetographic* enlem farklıdır. Kullandığım verinin hangisini
  kullandığına bakmam gerekir (kaynağın metadata'sında yazar).
- **Doğrulama yöntemi:** Haritayı kurduktan sonra bilinen bir noktayla (ör. Perseverance iniş yeri) kontrol et.
- Mesafe hesabında Dünya yarıçapı değil **Mars yarıçapı** kullanılmalı (Turf.js varsayılanı Dünya'dır).
  Mars'ın ortalama yarıçapı yaklaşık 3389,5 km; ihtiyaç olduğunda veri kartına kaynağıyla yazmak için **kaynağı doğrulanacak**.

## 3. Boylam kuralları
- Mars boylamı iki biçimde gelebilir: **doğuya pozitif 0–360°** veya **−180…+180°**.
- Dönüşüm: `lon > 180 ? lon - 360 : lon`
- **GeoJSON ve OpenLayers sırası `[boylam, enlem]`** (günlük konuşmadaki "enlem, boylam" sırasının tersi).
  Sırayı karıştırırsam pinler yanlış yere düşer.

## 4. Çözünürlük
- Çözünürlük = bir pikselin yeryüzünde kapladığı mesafe.
- README'deki Trek katman adına göre D2'de kullanacağım `Mars_Viking_MDIM21_ClrMosaic_global_232m`
  katmanı **232 m/piksel** (katman adından okunuyor; veri kartında Trek'in kendi sayfasından **doğrulanacak**).
- Düşük çözünürlük = küçük ölçekte iyi, yakında bulanık. Küçük bir iniş alanını (metrelerce) bu haritada
  ayrıntılı göremem.
- Aynı bölge için farklı çözünürlükte veri olabilir (ör. küresel kaba MOLA / bölgesel yüksek çözünürlük HiRISE).

## 5. Metadata ve veri kartı
Her veri seti için `sablonlar/veri-karti.md` şablonunu dolduracağım. Her alanın nedeni:

| Alan | Neden gerekli |
|---|---|
| Kaynak, görev/alet, ürün kimliği, URL | Jüri veya takım arkadaşı veriyi tekrar bulabilsin |
| Tarih | Verinin ne kadar güncel olduğu (Validity) |
| Lisans | Projede kullanım hakkı, proje sayfasında belirtilmesi zorunlu |
| Koordinat sistemi | Yanlış CRS = kayan harita |
| Birimler | Metre mi kilometre mi, derece mi |
| Çözünürlük, kapsam | Veri ne kadar ayrıntılı, nereyi kapsıyor |
| Sınırlamalar | Verinin **ne söylemediğini** dürüstçe yazmak (10 dakikalık anlatımda istenen) |

## 6. Emin olmadıklarım / yapılacaklar
- 232 m çözünürlüğün Trek'in resmi açıklamasında doğrulanması.
- Mars yarıçapı değerinin kaynağı.
- İniş noktası koordinatlarının doğrulanmış kaynağı (README'de yok, D3 öncesi bulunacak; uydurmayacağım).
- Trek'in kullandığı enlem türü (planetocentric / planetographic).
