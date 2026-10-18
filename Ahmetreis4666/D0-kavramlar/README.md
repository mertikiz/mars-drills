# D0: Temel Kavramlar — Ahmetreis4666

Bu notlar, NASA Space Apps Challenge 2026 ("Interplanetary Survival Guide: Martian Map") hazırlığı kapsamında Mars haritalama, coğrafi bilgi sistemleri (CBS) ve veri işleme temellerini özetlemektedir.

---

## 1. Raster ve Vektör Veri Farkı

| Özellik | Raster Veri (Piksel Tabanlı) | Vektör Veri (Geometri Tabanlı) |
|---|---|---|
| **Yapı** | Piksel/hücre matrisi (ızgara). Her hücre bir değer taşır (renk, yükseklik, sıcaklık vb.). | Nokta (Point), Çizgi (LineString), Çokgen (Polygon) geometrileri ve bunlara bağlı öznitelikler. |
| **Mars Örnekleri** | - **Mars Trek Karoları (WMTS):** Mars yüzeyinin optik mozaik haritası (Viking MDIM21).<br>- **MOLA / HiRISE DTM (GeoTIFF):** Piksel değerlerinin yükseklik (metre) olduğu raster veriler. | - **İniş Noktaları (Landing Sites):** Perseverance, Curiosity koordinat noktaları.<br>- **Gezgin Rotaları (Traverse):** Çizgi biçiminde Mars rover hareket izleri.<br>- **Krater Sınırları:** Çokgen alanlar. |
| **Kullanım Amacı** | Arka plan haritası (altlık/basemap), eğim analizi, yükseklik profili. | İşaretçiler (pin/marker), tıklanabilir katmanlar, rota çizimleri ve mesafe ölçümleri. |
| **Formatlar** | PNG, JPEG, Cloud-Optimized GeoTIFF (COG), WMTS karoları. | GeoJSON, TopoJSON, Shapefile, KML. |

---

## 2. Gezegen Koordinat Sistemleri (CRS) ve Mars

### Neden Dünya Projeksiyonu (Web Mercator / EPSG:3857) Kullanılamaz?
* Web haritalarının varsayılan projeksiyonu olan `EPSG:3857` (Web Mercator), Dünya'nın yarıçapı (~6.378 km) ve elipsoidi üzerine kuruludur.
* Mars'ın ekvatoral yarıçapı yaklaşık **3.396 km**'dir (Dünya'nın yaklaşık yarısı).
* Dünya projeksiyonu kullanıldığında Mars yüzeyindeki mesafe, alan ve eğim hesaplamaları tamamen hatalı çıkar; harita karoları bozulur ve kutuplara doğru aşırı genişler.

### Mars Koordinat Sistemi (`EPSG::104905` / IAU 2000 Mars Sphere)
* Mars Trek'in kullandığı resmi eşit dikdörtgen (equirectangular) koordinat sistemi:
  ```
  EPSG::104905 (GCS_Mars_2000_Sphere)
  ```
* **proj4 Tanımı:**
  ```javascript
  import proj4 from 'proj4';
  import { register } from 'ol/proj/proj4';

  // Mars küresi yarıçapı: 3396190 m
  proj4.defs(
    'EPSG:104905',
    '+proj=longlat +a=3396190 +b=3396190 +no_defs'
  );
  register(proj4);
  ```
* Bu sayede OpenLayers, Mars karolarını ve GeoJSON katmanlarını gerçek Mars elipsoidine göre tam olarak doğru konumlandırır.

---

## 3. Boylam Dönüşümü: 0–360° vs. ±180°

* **Gezegen Bilimindeki Durum:** NASA ve PDS (Planetary Data System) verilerinde Mars boylamı genellikle **Doğuya doğru 0° ile 360°** arasında pozitif artan formatta verilir (East-positive).
* **Web Haritalarındaki Durum:** OpenLayers, Leaflet ve modern CBS kütüphaneleri boylamı **$[-180^\circ, +180^\circ]$** aralığında bekler ($0^\circ$ başlangıç meridyenidir; batı negatif, doğu pozitiftir).
* **Dönüşüm Kuralı:**
  ```javascript
  // 0-360 dereceden -180/+180 dereceye dönüştürme
  function normalizeLongitude(lon) {
    return lon > 180 ? lon - 360 : lon;
  }

  // Örnek: Jezero Krateri (Perseverance iniş noktası) ~77.45° Doğu
  // Eğer veri kaynağında 77.45° gelirse aynen kalır.
  // Eğer 282.55° şeklinde gelirse: 282.55 - 360 = -77.45° Batı olur.
  ```

---

## 4. GeoJSON Koordinat Sırası: `[boylam, enlem]`

* En sık yapılan hata: `[latitude, longitude]` (enlem, boylam) sırasını kullanmaktır.
* **RFC 7946 Standardı ve OpenLayers Kuralı:**
  GeoJSON koordinatları her zaman **`[boylam, enlem]`** (İngilizce: `[longitude, latitude]` yani `[X, Y]`) sırasındadır!
  ```json
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [77.4562, 18.4447] // [Boylam, Enlem] - Jezero Krateri
    },
    "properties": {
      "name": "Perseverance İniş Alanı (Octavia E. Butler Landing)",
      "date": "2021-02-18"
    }
  }
  ```

---

## 5. Çözünürlük ve Metadata (Üst Veri)

* **Uzaysal Çözünürlük (Spatial Resolution):** Bir pikselin Mars yüzeyinde kaç metreyi temsil ettiği.
  * *Viking MDIM21 Mozaik:* Piksel başına ~232 metre (küresel genel bakış için ideal).
  * *CTX (Context Camera):* Piksel başına ~6 metre (orta ölçekli topoğrafya).
  * *HiRISE:* Piksel başına ~25–50 santimetre (kaya ve krater detayları).
* **Yarışmada Dikkat Edilecek Kural:** Tüm Mars'ı HiRISE çözünürlüğünde göstermek veri boyutu (yüzlerce Gigabyte) nedeniyle imkansızdır. Küresel görünümde düşük çözünürlüklü Viking mozaik karoları, iniş bölgesinde ise yüksek çözünürlüklü CTX/HiRISE katmanları kullanılmalıdır.

---

## 6. 10 Dakikalık Ekip Anlatımı (Teach-Back Özeti)

> **"Bu veriler bize ne söyler, ne söylemez?"**

1. **Ne söyler?**
   * Mars'ın genel topoğrafyasını, krater ve kanyonların konumlarını ve geçmiş NASA misyonlarının nereye indiğini kesin olarak söyler.
   * Yükseklik verileriyle bir rota üzerinde ne kadarlık bir eğim ve yükseklik farkı olduğunu gösterir.

2. **Ne söylemez?**
   * Yüzeydeki anlık hava durumunu, kum fırtınalarını veya güncel radyasyon seviyesini statik karo verisinden anlayamayız (bunun için MEDA/REMS sensör verisi gerekir).
   * 232 metre çözünürlüklü bir harita, bir astronotun veya gezginin takılabileceği 1 metrelik kayaları ya da gizli yarıkları göstermez. "Pürüzsüz" görünen bir piksel aslında devasa kayalarla dolu olabilir.
