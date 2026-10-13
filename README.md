# mars-drills — Mars araç alıştırmaları (bireysel)

NASA Space Apps 2026 hazırlığımızın **bireysel alıştırma** reposu. Her takım üyesi kendi klasöründe, gerçek Mars
verisiyle küçük alıştırmalar yapar. Amaç araçları öğrenmek; **bu repo yarışma projesi değildir.**

> **İlk kez mi geliyorsun?** Önce [`KURULUM.md`](KURULUM.md) (bir kerelik kurulum, ~1 saat).
>
> Ajanlar ve takım: kurallar [`AGENTS.md`](AGENTS.md) içinde. Planın tamamı ve karar listesi özel planlama
> reposunda (`nasa-space-apps-2026`): `README.md` → `docs/notes/plan-current.md` → `docs/notes/prep-plan.md`.

## Klasör düzeni
```
<github-kullanici-adin>/
  D0-kavramlar/        notlar (raster/vektör, koordinat sistemleri, çözünürlük)
  D1-mars-trek/        Mars Trek turu: ekran görüntüsü + "Trek'in yapamadığı 3 şey"
  D3-inis-noktalari/   iniş noktaları haritada (pin)
  D2-mars-haritasi/    React + Vite + Leaflet ile Mars Trek haritası (yayında)
  D4-gezgin-rotasi/    VEYA  D6-kosul-verisi/   (ikisinden birini sen yaparsın)
  D5-yukseklik/        (isteğe bağlı)
sablonlar/veri-karti.md   her veri seti için doldurulacak "veri kartı" şablonu
```

## Alıştırmalar ve doğrulanmış veri kaynakları
| # | Ne yapıyorsun | Kaynak / ipucu |
|---|---|---|
| D0 | Kavramları oku (1 saat) | — |
| D1 | [JPL "Map a Mars Rover Driving Route"](https://www.jpl.nasa.gov/edu/resources/project/map-a-mars-rover-driving-route/) etkinliğini [Mars Trek](https://trek.nasa.gov/mars/)'te yap (kod yok) | Mesafe ve "Elevation Profile" araçlarını dene |
| D3 | Geçmiş Mars iniş noktalarını haritaya pin olarak koy | **GeoJSON sırası [boylam, enlem]**; Leaflet `L.marker` ise [enlem, boylam] ister. 0–360° boylamı: `lon > 180 ? lon - 360 : lon` |
| D2 | Mars Trek karolarını React + Vite + Leaflet'te göster, yayına al | Karo adresi: `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg` · ⚠️ Leaflet'te **`crs: L.CRS.EPSG4326`** kullan (varsayılan ayar Mars'ı yanlış yere koyar) |
| D4 | Perseverance'ın gerçek rotasını çizgi olarak çiz, uzunluğunu hesapla | NASA'nın resmî dosyası: `https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_traverse.json` (1,7 MB; büyük olduğu için sadeleştir) |
| D6 | Gezgin hava verisini grafik yap | [MEDA (Perseverance)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html) CSV dizinleri · [REMS (Curiosity)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/curiosity/rems.html). Alternatif: uzay havası API'si `https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=…&endDate=…` (anahtar gerekmez); **bu Mars yüzey havası değildir** |
| D5 | (isteğe bağlı) Yükseklik profili: MOLA vs. HiRISE | [USGS HiRISE DTM'leri](https://stac.astrogeology.usgs.gov/docs/data/mars/hirise_dtms/) (Cloud-Optimized GeoTIFF), Python |

## Her alıştırmada
1. **Veri kartı** doldur (`sablonlar/veri-karti.md` dosyasını kendi klasörüne kopyala).
2. **Durma kuralı:** planlanan sürenin 1,5 katını geçersen dur, neye takıldığını yaz, devam et.
3. **10 dakikalık anlatım:** ekibe verinin ne söylediğini **ve ne söylemediğini** anlat.
4. Her oturum sonunda **commit + push**.

## Kurallar
- Sadece **kendi klasörünü** değiştir. Büyük veri dosyalarını commit etme (`data/` klasörü git'e girmez).
- Asıl yarışma projesine buradan **yalnızca genel kurulum kodu** alınabilir (kaynak göstererek). Mars'a özgü mantık,
  veri işleme ve rota kodu alınamaz.
- Yapay zekâ ajanı kullanıyorsan (Antigravity vb.), `AGENTS.md`'deki kurallar geçerli.

Lisans: [MIT](LICENSE).
