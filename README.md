# mars-drills — Mars araç alıştırmaları (bireysel)

NASA Space Apps 2026 hazırlığımızın **bireysel alıştırma** reposu. Her takım üyesi kendi klasöründe, gerçek Mars
verisiyle küçük alıştırmalar yapar. Amaç araçları öğrenmek; **bu repo yarışma projesi değildir.**

> **İlk kez mi geliyorsun?** Önce [`KURULUM.md`](KURULUM.md) (bir kerelik kurulum, ~1 saat).
>
> Ajanlar ve takım: kurallar [`AGENTS.md`](AGENTS.md) içinde. Planın tamamı ve karar listesi özel takım
> reposunda (`space-apps-2026-team`): `README.md` → `docs/notes/plan-current.md` → `docs/notes/prep-plan.md`.
>
> **Güncel sıra ve tarihler:** [takvim (GitHub Projects)](https://github.com/users/mertikiz/projects/1). Her drill için
> herkesin kendi alt issue'su var; bitirince kendininkini kapat.

## Şu anki plan (17 Ekim, vizelere göre sıkıştırıldı)
| Ne zaman | Drill | Durum |
|---|---|---|
| 18–23 Ekim | **D0** kavramlar (yarım saat) + **D2 + D3 birlikte**: yayında bir Mars haritası, iniş noktaları üstünde pin | Herkes yapar |
| 24 Ekim–6 Kasım | — | Vize dönemi, drill yok |
| İstersen | **D1** Mars Trek turu | İsteğe bağlı |
| Çıkarıldı | D4, D5, D6 | Kaynakları aşağıda duruyor; merak eden yapabilir |

## Klasör düzeni
```
<github-kullanici-adin>/
  D0-kavramlar/        notlar (raster/vektör, koordinat sistemleri, çözünürlük)
  D2-mars-haritasi/    D2 + D3: React + Vite + TypeScript + OpenLayers ile Mars Trek haritası (yayında),
                       iniş noktaları üstünde pin
  D1-mars-trek/        (isteğe bağlı) Mars Trek turu: ekran görüntüsü + "Trek'in yapamadığı 3 şey"
  D4-gezgin-rotasi/ · D6-kosul-verisi/ · D5-yukseklik/   (artık plan dışı, isteğe bağlı)
sablonlar/veri-karti.md   her veri seti için doldurulacak "veri kartı" şablonu
```

## Alıştırmalar ve doğrulanmış veri kaynakları
| # | Ne yapıyorsun | Kaynak / ipucu |
|---|---|---|
| D0 | Kavramları oku (yarım saat) | — |
| D1 *(isteğe bağlı)* | [JPL "Map a Mars Rover Driving Route"](https://www.jpl.nasa.gov/edu/resources/project/map-a-mars-rover-driving-route/) etkinliğini [Mars Trek](https://trek.nasa.gov/mars/)'te yap (kod yok) | Mesafe ve "Elevation Profile" araçlarını dene |
| D3 *(D2 ile birlikte)* | Geçmiş Mars iniş noktalarını D2 haritasına pin olarak koy | **GeoJSON sırası [boylam, enlem]** (OpenLayers da bu sırayı kullanır). 0–360° boylamı: `lon > 180 ? lon - 360 : lon` |
| D2 | Mars Trek karolarını React + Vite + TypeScript + **OpenLayers**'ta göster, **Cloudflare Pages**'e yayınla | Trek'in ızgara bilgisi: `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/WMTSCapabilities.xml` → OpenLayers'ta `WMTSCapabilities` ile oku, katmanı `optionsFromCapabilities` ile kur. Trek'in koordinat sistemi `EPSG::104905` (Mars, enlem/boylam); **proj4** ile tanımlayıp OpenLayers'a kaydet (`register(proj4)`). Doğru yere oturduğunu bilinen bir noktayla kontrol et (ör. Perseverance iniş yeri). ⚠️ Haritayı Dünya'nın varsayılan web projeksiyonunda bırakma |
| D4 *(plan dışı)* | Perseverance'ın gerçek rotasını çizgi olarak çiz, uzunluğunu hesapla | NASA'nın resmî dosyası: `https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_traverse.json` (1,7 MB; büyük olduğu için sadeleştir) |
| D6 *(plan dışı)* | Gezgin hava verisini grafik yap | [MEDA (Perseverance)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html) CSV dizinleri · [REMS (Curiosity)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/curiosity/rems.html). Alternatif: uzay havası API'si `https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=…&endDate=…` (anahtar gerekmez); **bu Mars yüzey havası değildir** |
| D5 *(plan dışı)* | Yükseklik profili: MOLA vs. HiRISE | [USGS HiRISE DTM'leri](https://stac.astrogeology.usgs.gov/docs/data/mars/hirise_dtms/) (Cloud-Optimized GeoTIFF), Python |

## Her alıştırmada
1. **Veri kartı** doldur (`sablonlar/veri-karti.md` dosyasını kendi klasörüne kopyala).
2. **Durma kuralı:** planlanan sürenin 1,5 katını geçersen dur, neye takıldığını yaz, devam et.
3. **10 dakikalık anlatım:** ekibe verinin ne söylediğini **ve ne söylemediğini** anlat.
4. Her oturum sonunda **commit + push**.

## Ajanla (Antigravity vb.) çalışırken
Ajan, `AGENTS.md`'deki kuralları kendisi okur: önce plan sunar, commit'ten önce değişiklik özetini gösterir, iki
denemede çözemediği hatada durur ve iş bitince kodu Türkçe anlatır. Senin işin: **planı okuyup onaylamak** ve sonunda
**özeti kontrol etmek** (görevle ilgisiz bir dosya değişmiş mi?).

**Git ile geri dönme alıştırması (bir kere, 30–45 dk):** bir deneme branch'inde bilerek bir şey boz ve geri al:
tek dosyayı geri alma (`git restore <dosya>`), commit'i geri alma (`git revert <commit>`), branch'i bırakıp `main`'e
dönme. `git reset --hard` ve `git clean` komutlarını refleks olarak kullanma; kaydedilmemiş işi siler.

## Kurallar
- Sadece **kendi klasörünü** değiştir. Büyük veri dosyalarını commit etme (`data/` klasörü git'e girmez).
- Asıl yarışma projesine buradan **yalnızca genel kurulum kodu** alınabilir (kaynak göstererek). Mars'a özgü mantık,
  veri işleme ve rota kodu alınamaz.
- Yapay zekâ ajanı kullanıyorsan (Antigravity vb.), `AGENTS.md`'deki kurallar geçerli.

Lisans: [MIT](LICENSE).
