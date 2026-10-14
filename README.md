# mars-drills — Mars araç alıştırmaları (bireysel)

NASA Space Apps 2026 hazırlığımızın **bireysel alıştırma** reposu. Her takım üyesi kendi klasöründe, gerçek Mars
verisiyle küçük alıştırmalar yapar. Amaç araçları öğrenmek; **bu repo yarışma projesi değildir.**

> **İlk kez mi geliyorsun?** Önce [`KURULUM.md`](KURULUM.md) (bir kerelik kurulum, ~1 saat).
>
> Ajanlar ve takım: kurallar [`AGENTS.md`](AGENTS.md) içinde. Planın tamamı ve karar listesi özel takım
> reposunda (`space-apps-2026-team`): `README.md` → `docs/notes/plan-current.md` → `docs/notes/prep-plan.md`.

## Klasör düzeni
```
<github-kullanici-adin>/
  D0-kavramlar/        notlar (raster/vektör, koordinat sistemleri, çözünürlük)
  D1-mars-trek/        Mars Trek turu: ekran görüntüsü + "Trek'in yapamadığı 3 şey"
  D3-inis-noktalari/   iniş noktaları haritada (pin)
  D2-mars-haritasi/    React + Vite + TypeScript + OpenLayers ile Mars Trek haritası (yayında)
  D4-gezgin-rotasi/    VEYA  D6-kosul-verisi/   (ikisinden birini sen yaparsın)
  D5-yukseklik/        (isteğe bağlı)
  calisma-gunlugu.md   her oturum sonunda bir satır (sablonlar/calisma-gunlugu.md'den kopyala)
sablonlar/veri-karti.md   her veri seti için doldurulacak "veri kartı" şablonu
sablonlar/calisma-gunlugu.md   çalışma günlüğü şablonu (öğrenme + kota + yapay zekâ beyanı)
```

## Alıştırmalar ve doğrulanmış veri kaynakları
| # | Ne yapıyorsun | Kaynak / ipucu |
|---|---|---|
| D0 | Kavramları oku (1 saat) | — |
| D1 | [JPL "Map a Mars Rover Driving Route"](https://www.jpl.nasa.gov/edu/resources/project/map-a-mars-rover-driving-route/) etkinliğini [Mars Trek](https://trek.nasa.gov/mars/)'te yap (kod yok) | Mesafe ve "Elevation Profile" araçlarını dene |
| D3 | Geçmiş Mars iniş noktalarını haritaya pin olarak koy | **GeoJSON sırası [boylam, enlem]** (OpenLayers da bu sırayı kullanır). 0–360° boylamı: `lon > 180 ? lon - 360 : lon` |
| D2 | Mars Trek karolarını React + Vite + TypeScript + **OpenLayers**'ta göster, **Cloudflare Pages**'e yayınla | Trek'in ızgara bilgisi: `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/WMTSCapabilities.xml` → OpenLayers'ta `WMTSCapabilities` ile oku, katmanı `optionsFromCapabilities` ile kur. Trek'in koordinat sistemi `EPSG::104905` (Mars, enlem/boylam); **proj4** ile tanımlayıp OpenLayers'a kaydet (`register(proj4)`). Doğru yere oturduğunu bilinen bir noktayla kontrol et (ör. Perseverance iniş yeri). ⚠️ Haritayı Dünya'nın varsayılan web projeksiyonunda bırakma |
| D4 | Perseverance'ın gerçek rotasını çizgi olarak çiz, uzunluğunu hesapla | NASA'nın resmî dosyası: `https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_traverse.json` (1,7 MB; büyük olduğu için sadeleştir) |
| D6 | Gezgin hava verisini grafik yap | [MEDA (Perseverance)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html) CSV dizinleri · [REMS (Curiosity)](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/curiosity/rems.html). Alternatif: uzay havası API'si `https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=…&endDate=…` (anahtar gerekmez); **bu Mars yüzey havası değildir** |
| D5 | (isteğe bağlı) Yükseklik profili: MOLA vs. HiRISE | [USGS HiRISE DTM'leri](https://stac.astrogeology.usgs.gov/docs/data/mars/hirise_dtms/) (Cloud-Optimized GeoTIFF), Python |

## Her alıştırmada
1. **Veri kartı** doldur (`sablonlar/veri-karti.md` dosyasını kendi klasörüne kopyala).
2. **Durma kuralı:** planlanan sürenin 1,5 katını geçersen dur, neye takıldığını yaz, devam et.
3. **10 dakikalık anlatım:** ekibe verinin ne söylediğini **ve ne söylemediğini** anlat.
4. Her oturum sonunda **commit + push**.
5. **Çalışma günlüğüne** bir satır ekle (2–3 dk; `sablonlar/calisma-gunlugu.md`).

## Ajanla (Antigravity vb.) çalışırken
- **Önce plan:** ajandan önce plan iste; plan ilgisiz dosyalara dokunuyor, yeni paket ekliyor ya da işi büyütüyorsa
  onaylama. İşi küçük parçalara böl: beklenen değişikliği birkaç cümleyle anlatamıyorsan iş fazla büyüktür.
- **Diff kontrolü:** commit'ten önce değişikliklere bak (Antigravity'nin inceleme paneli ya da `git status` →
  `git diff`). Sorular: Ben bunu mu istedim? İlgisiz dosya değişmiş mi? Gerekli bir kod silinmiş mi?
- **İki deneme kuralı:** ajan aynı hatayı iki denemede çözemezse durdur; ne denediğini özetletip hatayı kendin oku.
- **Kendin çalıştır:** "testler geçti" mesajına güvenme; uygulamayı kendin aç, haritada konumu bilinen bir noktayı kontrol et.
- **Anlatamadığını birleştirme:** kodun ne yaptığını anlatamıyorsan önce ajana açıklat, sonra kendin anla.
- **Git ile geri dönme alıştırması (bir kere, 30–45 dk):** bir deneme branch'inde bilerek bir şey boz ve geri al:
  tek dosyayı geri alma (`git restore <dosya>`), commit'i geri alma (`git revert <commit>`), branch'i bırakıp
  `main`'e dönme. `git reset --hard` ve `git clean` komutlarını refleks olarak kullanma; kaydedilmemiş işi siler.

## Kurallar
- Sadece **kendi klasörünü** değiştir. Büyük veri dosyalarını commit etme (`data/` klasörü git'e girmez).
- Asıl yarışma projesine buradan **yalnızca genel kurulum kodu** alınabilir (kaynak göstererek). Mars'a özgü mantık,
  veri işleme ve rota kodu alınamaz.
- Yapay zekâ ajanı kullanıyorsan (Antigravity vb.), `AGENTS.md`'deki kurallar geçerli.

Lisans: [MIT](LICENSE).
