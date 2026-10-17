# Kurulum rehberi (bir kerelik, ~1 saat)

Bu rehber bilgisayarını NASA Space Apps hazırlığı için hazırlar. Sırayla git; takıldığın yeri ekibe yaz.
Ekran üzerindeki buton/menü adları **İngilizce** yazıldı, çünkü arayüzde öyle görünüyor.

> Not: Yapay zekâ kodlama aracı olarak şu an **Google Antigravity** seçili (bölüm 5). Araçları ekipçe daha ayrıntılı
> konuşacağız; değişirse bu bölüm güncellenir. Bölüm 1–4 her durumda geçerli.

## 1. GitHub hesabı ve e-posta gizliliği
1. GitHub hesabın yoksa github.com'da oluştur. **Kullanıcı adını (username)** takıma gönder: davetler bununla yapılır
   (e-posta değil).
2. GitHub'da sağ üstte profil resmin → **Settings → Emails**:
   - **"Keep my email addresses private"** → aç.
   - **"Block command line pushes that expose my email"** → aç.
   - Sayfada görünen `…@users.noreply.github.com` adresini kopyala (senin **noreply** adresin). Bunu kimseye
     göndermene gerek yok; sadece 2. bölümde kendi bilgisayarında kullanacaksın.
3. Davetleri kabul et: GitHub e-posta ve bildirim gönderir. Ya da GitHub'a giriş yapmışken şu sayfaları aç
   (sadece davet edilen hesapta çalışır):
   - `https://github.com/mertikiz/mars-drills/invitations`
   - `https://github.com/mertikiz/moon-practice/invitations`
   - `https://github.com/mertikiz/space-apps-2026-team/invitations` (özel takım reposu: plan ve kararlar)
   Davetler **7 gün** içinde kabul edilmezse süresi dolar; yenisi gönderilir.
4. **Takvim:** [Space Apps 2026 - Takvim](https://github.com/users/mertikiz/projects/1) (GitHub Projects). Ayrı bir
   davet yok; takım reposunun davetini kabul edince görünür. Her iş bir issue: bitirince kendi issue'nu kapat.

## 2. Programları kur (Windows)
| Program | Nereden | Dikkat |
|---|---|---|
| **Git** | git-scm.com → Download for Windows | Varsayılan ayarlar uygun |
| **Node.js (LTS)** | nodejs.org → LTS sürümü | React/Vite için gerekli |
| **VS Code** | code.visualstudio.com | Editör (yedek araç Cline için de) |
| **Python 3** | python.org → Downloads | Kurulumun ilk ekranında **"Add python.exe to PATH"** kutusunu işaretle |

Kurulumdan sonra **yeni bir terminal** aç (PowerShell) ve kontrol et:
```powershell
git --version
node --version
npm --version
python --version
```
Bir komut "tanınmıyor" derse: terminali kapatıp yeniden aç; olmazsa o programı yeniden kur (PATH seçeneğine dikkat).

Git'e adını ve **noreply** adresini tanıt (kendi bilgilerinle):
```powershell
git config --global user.name "github-kullanici-adin"
git config --global user.email "12345678+github-kullanici-adin@users.noreply.github.com"
```
Böylece commit'lerinde gerçek e-postan görünmez. (Antigravity commit atarken de bu ayarı kullanır.)

## 3. Repoları bilgisayarına indir (clone)
Projeler için bir klasör seç, orada terminal aç:
```powershell
git clone https://github.com/mertikiz/mars-drills.git
git clone https://github.com/mertikiz/moon-practice.git
git clone https://github.com/mertikiz/space-apps-2026-team.git
```
İlk seferde GitHub girişi için bir pencere açılabilir; GitHub hesabınla giriş yap. (Takım reposu özeldir: daveti
kabul etmeden indiremezsin.)

## 4. Çalışma kuralları (kısa)
- Her repoda **`AGENTS.md`** var: kurallar orada; yapay zekâ ajanları da onu okur. Önce `README.md`'yi oku.
- `mars-drills`: sadece **kendi klasörüne** (`<github-kullanici-adin>/`) yaz, push'tan önce `git pull`.
- `moon-practice`: `main` korumalı → **yeni dal + pull request**.
- **Asla** şifre, API anahtarı veya `.env` dosyası commit etme.

## 5. Yapay zekâ kodlama aracı: Google Antigravity (şu anki seçim)
1. **İndir:** antigravity.google/download → **Antigravity 2.0** (Windows 10 64-bit gerekir). Kurulum "Keep Both /
   Replace" sorarsa **Replace** seç.
2. **Giriş:** Google AI Pro olan Google hesabınla giriş yap.
3. **Para harcamasını kapat:** ayarlarda **AI Credit Overages** → **Never**. (Kota bitince ücretli kredi kullanmasın.)
4. **Kota ve modeller:** **Settings** sayfasında kotanın yanındaki geri sayımı ("Refreshes in …") Mert'e yaz.
   (Pro: 5 saatte bir yenilenir, haftalık üst sınırı var.) Model seçicide **Claude Sonnet 5.5 / Opus 5.5** görünüyor mu,
   onu da yaz.
5. **Güvenli izinler:** Windows'ta terminal komutları varsayılan olarak **onay ister**; böyle kalsın. **"Turbo"**
   gibi her şeye izin veren ayarları açma.
6. **Proje oluştur:** yeni bir proje aç ve `mars-drills` klasörünü ekle.
   Görev başlatırken **"New worktree"** modu daha güvenlidir (ana klasörünü bozmaz).
7. **İlk deneme (Türkçe yazabilirsin):**
   - "Bu repodaki README ve AGENTS.md'yi oku ve hangi kurallara uyacağını özetle." (hiçbir şey değiştirmemeli)
   - "Kendi klasörümde (`<kullanici-adin>/D0-kavramlar/`) boş bir notlar.md dosyası oluştur." → önce **plan**
     göstermeli; sen **Proceed** dersin. Sonra şunlara bak: commit'ten önce **değişiklik özetini** gösterdi mi, işi
     **Türkçe anlattı mı**? (Bunlar `AGENTS.md`'deki kurallar.) Göstermediyse veya Türkçeyi yanlış anladıysa Mert'e söyle.
   - `/plan` komutu her zaman önce plan yaptırır.
8. Ajanın yaptığı her değişikliği **oku**, çalıştırıp dene, sonra commit et.

## 6. Yedek araç: VS Code + Cline
Antigravity'nin kotası biterse:
1. VS Code → **Extensions** → "Cline" ara → kur.
2. Cline ayarlarında bir sağlayıcı seç. Örn. **Google Gemini**: aistudio.google.com'dan bir **API anahtarı** al
   (ücretsiz katmanın hız sınırları var).
3. API anahtarını **sadece Cline ayarlarına** gir. **Asla** bir dosyaya yazma, commit etme, mesajla paylaşma.
4. Varsa harcama limiti koy; ücretli kullanımı açma.

## 7. Sık sorunlar
| Sorun | Çözüm |
|---|---|
| `git`/`node`/`python` tanınmıyor | Yeni terminal aç; olmazsa yeniden kur ("Add to PATH") |
| `git push` reddedildi | Önce `git pull`; `moon-practice`'te `main`'e doğrudan push edilemez → dal + PR |
| GitHub e-postan yüzünden push'u engelledi | 2. bölümdeki `user.email` ayarını noreply adresinle yap |
| Ajan kotası bitti | Yedek araç (Cline) veya elle devam et; kotayı ekibe yaz |
| İnternet yavaş/yok | Kurulumları evde yap; hackathonda telefonu hotspot olarak yedekle |

Takıldığın her şeyi not al: provada ve hackathonda çok işimize yarar.
