# AGENTS.md — mars-drills (bireysel Mars alıştırmaları)

Bu repoda çalışan **tüm yapay zekâ ajanları** (Google Antigravity, Claude Code, Copilot, Cline, …) için kurallar.
Önce `README.md`'yi oku.

## Dil
- Kullanıcı hangi dilde yazıyorsa (genelde **Türkçe**) o dilde cevap ver.
- Kod, değişken/fonksiyon adları ve commit mesajları **İngilizce**; kod yorumları Türkçe olabilir.

## Bu repo ne?
- NASA Space Apps 2026 (görev: "Interplanetary Survival Guide: Martian Map") için **bireysel araç alıştırmaları**.
  Yarışma projesi **değil**. Plan ve kararlar özel planlama reposunda (`nasa-space-apps-2026`).
- Teknoloji: **React + Vite + Leaflet** (web), veri işleme için küçük **Python** betikleri.
- Her kişi kendi klasöründe (`<github-kullanici-adi>/Dx-.../`) çalışır.

## Kurallar
1. **Önce plan göster**, onay al, sonra değiştir. Küçük, anlaşılır adımlarla ilerle.
2. Sadece kullanıcının **kendi klasöründeki** dosyaları değiştir; başkasının klasörüne dokunma.
3. **Veri uydurma.** URL, uç nokta (endpoint), veri seti adı veya sonuç uydurma; emin değilsen "doğrulanmadı" de.
   README'deki doğrulanmış kaynakları kullan.
4. Mars koordinatları: GeoJSON **[boylam, enlem]**; Mars Trek karoları için Leaflet'te `crs: L.CRS.EPSG4326`.
5. Her veri seti için bir **veri kartı** doldurulmasına yardım et (kaynak, görev/alet, ürün kimliği, URL, tarih,
   lisans, koordinat sistemi, birimler, çözünürlük, kapsam, sınırlamalar).
6. **Git:** commit/push sadece kullanıcı isteyince. Force-push, `reset --hard`, dal silme yok. **Asla** gizli bilgi
   (API anahtarı, token, şifre) veya kişisel e-posta commit etme. Büyük veri dosyaları `data/` içine (git'e girmez).
7. Bu alıştırmalarda yazılan **Mars'a özgü mantık, veri işleme ve rota kodu** yarışma reposuna kopyalanmaz (NASA'nın
   "14 Kasım 09:00'dan önce projeye başlama" kuralı). Genel kurulum kodu kaynak gösterilerek kullanılabilir.
8. İşin sonunda kısaca özetle: hangi dosyalar değişti, hangi komutlar çalıştı, sonuç ne, eksik ne.
