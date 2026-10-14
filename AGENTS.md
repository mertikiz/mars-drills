# AGENTS.md — mars-drills (bireysel Mars alıştırmaları)

Bu repoda çalışan **tüm yapay zekâ ajanları** (Google Antigravity, Claude Code, Copilot, Cline, …) için kurallar.
Önce `README.md`'yi oku.

## Dil
- Kullanıcı hangi dilde yazıyorsa (genelde **Türkçe**) o dilde cevap ver.
- Kod, değişken/fonksiyon adları ve commit mesajları **İngilizce**; kod yorumları Türkçe olabilir.

## Bu repo ne?
- NASA Space Apps 2026 (görev: "Interplanetary Survival Guide: Martian Map") için **bireysel araç alıştırmaları**.
  Yarışma projesi **değil**. Plan ve kararlar özel takım reposunda (`space-apps-2026-team`).
- Teknoloji: **React + Vite + TypeScript**, harita **OpenLayers + proj4**, arayüz **Tailwind + shadcn/ui**, grafik
  **Recharts**, yayın **Cloudflare Pages**; veri işleme için küçük **Python** betikleri (rasterio, GeoPandas).
  Kullanılan paket sürümlerini kontrol et (`package.json`); eski OpenLayers sürümlerinin API'siyle karıştırma.
- Her kişi kendi klasöründe (`<github-kullanici-adi>/Dx-.../`) çalışır.

## Kurallar
1. **Önce plan göster**, onay al, sonra değiştir. Küçük, anlaşılır adımlarla ilerle.
2. Sadece kullanıcının **kendi klasöründeki** dosyaları değiştir; başkasının klasörüne dokunma.
3. **Veri uydurma.** URL, uç nokta (endpoint), veri seti adı veya sonuç uydurma; emin değilsen "doğrulanmadı" de.
   README'deki doğrulanmış kaynakları kullan.
4. Mars koordinatları: GeoJSON **[boylam, enlem]**. Mars Trek karoları için OpenLayers'ta katmanı Trek'in
   `WMTSCapabilities.xml` dosyasından kur (`optionsFromCapabilities`) ve Mars koordinat sistemini proj4 ile tanımla;
   haritayı Dünya'nın varsayılan web projeksiyonunda bırakma. Mesafeleri **Mars yarıçapıyla** hesapla (Turf.js varsayılan
   olarak Dünya yarıçapını kullanır).
5. Her veri seti için bir **veri kartı** doldurulmasına yardım et (kaynak, görev/alet, ürün kimliği, URL, tarih,
   lisans, koordinat sistemi, birimler, çözünürlük, kapsam, sınırlamalar).
6. **Git:** commit/push sadece kullanıcı isteyince. Force-push, `reset --hard`, dal silme yok. **Asla** gizli bilgi
   (API anahtarı, token, şifre) veya kişisel e-posta commit etme. Büyük veri dosyaları `data/` içine (git'e girmez).
7. Bu alıştırmalarda yazılan **Mars'a özgü mantık, veri işleme ve rota kodu** yarışma reposuna kopyalanmaz (NASA'nın
   "14 Kasım 09:00'dan önce projeye başlama" kuralı). Genel kurulum kodu kaynak gösterilerek kullanılabilir.
8. İşin sonunda kısaca özetle: hangi dosyalar değişti, hangi komutlar çalıştı, sonuç ne, eksik ne.
9. **Commit'ten önce değişiklik özeti:** `git status` ve `git diff --stat` sonucunu göster. Görevle ilgisiz bir dosya
   değiştiyse ya da mevcut bir kod silindiyse bunu açıkça söyle ve geri almayı öner.
10. **İki deneme kuralı:** aynı hatayı iki denemede çözemezsen dur. Ne denediğini, hatanın tam metnini ve bir sonraki
    küçük adımı yaz, kullanıcıdan yön iste; körlemesine denemeye devam etme.
11. **Anlat:** iş bitince yazdığın kodun ne yaptığını kısa ve Türkçe anlat (hangi dosya ne yapıyor, veri nereden gelip
    nereye gidiyor). Kullanıcı sorarsa satır satır açıkla. Amaç: kullanıcı kodu jüriye kendisi anlatabilsin.

## GitHub kuralları
- Bu repoda herkes `main`'e **doğrudan push** edebilir, ama **sadece kendi klasörünü** değiştirerek.
- Push'tan önce **pull** et (`git pull`); çakışma olursa başkasının dosyasını ezme, kullanıcıya sor.
- **Asla** force-push yapma, push edilmiş geçmişi yeniden yazma, başkasının dalını silme.
- **Repo ayarları, görünürlük (özel/açık), işbirlikçiler ve repo silme sahibine (Mert) aittir.** Ajanlar bunlara dokunmaz.
- Sadece çalıştırıp kontrol ettiğin işi push et.
