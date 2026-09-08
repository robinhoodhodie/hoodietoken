# 🏹 Hoodie ($HOODIE) — Lansman Kılavuzu

Bu belge iki şey içerir: **(1)** Pons launchpad formuna gireceğin veriler, **(2)** lansman
sonrası siteyi canlı token'a bağlamak için yapılacaklar.

> **Lansmanı sen yaparsın.** Cüzdan bağlama, launch fee ödemesi, developer buy gibi
> finansal işlemleri bu klasördeki hiçbir araç senin yerine yapmaz.

---

## 1. Pons Launchpad Form Verileri

Aşağıdaki alan listesi `https://www.ponsfamily.com/launchpad/create` sayfasından
**8 Eylül 2026'da doğrudan okunarak doğrulandı** (cüzdan bağlanmadan, salt okunur).

| Form Alanı | Değer |
| :--- | :--- |
| **Launchpad sürümü** | Sayfanın üstünde `v2` / `v1` sekmesi var; varsayılan `v2` |
| **Name** | `Hoodie` |
| **Ticker** | `HOODIE` |
| **Description** | `Independent community meme token on Robinhood Chain. Not affiliated with Robinhood Markets, Inc. Fair launch on Pons, no pre-sale. High risk — you can lose everything.` |
| **Token image** | `assets/logo.jpg` (dosya seçici) |
| **X profile** | Açacağın hesabın kullanıcı adı (sistem `x.com/` önekini ekler) |
| **Telegram** | Açacağın kanalın adı (sistem `t.me/` önekini ekler) |
| **Paired asset** | `ETH` |
| **Developer buy** | Senin kararın — aşağıdaki nota bak |
| **Creator tax** *(Advanced)* | `2` |
| **Holder fee sharing** *(Advanced)* | Kapalı bırak (varsayılan: ücretler yaratıcı cüzdanına) |
| **Creator wallet** *(Advanced)* | Boş bırak — bağlı cüzdanın otomatik yaratıcı cüzdanı olur |
| **Snipe tax exemptions** *(Advanced)* | **Boş bırak** — aşağıdaki nota bak |
| **Launch fee** | `0.0005 ETH` (sayfada yazıyor) + ağ gazı |

### Sayfadan doğrulanan / doğrulanamayan noktalar

- **Launch fee 0.0005 ETH** doğru.
- **Likidite "Locked"** yazıyor — sitedeki LP kilidi anlatımı bu bilgiye dayanıyor.
- **Creator tax üst sınırı %10.** Sayfa şunu gösteriyor:
  *"Traders pay X% in total, up to 10% of it yours."* Yani **trader'ın ödediği toplam,
  senin creator tax'inden fazladır** — Pons'un kendi işlem ücreti üstüne biniyor. Formu
  doldururken bu satırdaki gerçek toplam yüzdeyi oku ve sitedeki `creatorTaxPercent`
  ile uyumlu olduğundan emin ol.
- **Graduation eşiği okunamadı.** Sayfa "Reading the graduation threshold." diyordu.
  Sitede bilinçli olarak hiçbir eşik sayısı yazmıyoruz; formu doldururken bu satırda
  çıkan gerçek değeri not et.
- **Toplam arz sayısı formda görünmüyor.** Pons "fixed-supply" diyor ama rakamı
  lansmandan sonra sözleşmeden doğrula.

### ⚠️ Sitenin kendi uyarısı: backend bakımda

Create sayfasının tepesinde şu duyuru vardı:

> *"Degraded performance — We are upgrading the backend ahead of a new rollout.
> Launches and market data may load slowly or read stale."*

Yani Pons şu anda lansmanların ve piyasa verisinin yavaş çalışabileceğini / eski veri
gösterebileceğini kendisi söylüyor. **Bu duyuru kalkana kadar lansmanı bekletmek
mantıklı** — 0.0005 ETH + gaz ödeyip yarım yamalak oluşmuş bir token ile uğraşmak
istemezsin.

### Snipe tax exemptions hakkında

Bu alan, belirli cüzdanları snipe vergisinden muaf tutmanı sağlıyor. **Boş bırak.**
Kendi cüzdanını veya arkadaşlarının cüzdanını muaf listeye koymak, diğer alıcılara göre
gizli bir ayrıcalık yaratır; bunu açıklamadan yapmak sitedeki "everyone buys from the
same curve at the same price" ifadesini yalan hale getirir.

### Lansmandan önce oku

Pons'un [Terms of Use](https://www.ponsfamily.com/terms) sayfasını lansmandan önce
oku — özellikle yasaklı içerik ve marka/isim maddelerini. Platformu işleten tüzel kişi
Pons Labs, LLC.

### Description hakkında

Yukarıdaki metin (161 karakter, 256 sınırının altında) bilinçli olarak "moon", "ramping",
"stealing liquidity" gibi ifadeler içermiyor. İki nedeni var:

1. **"Robinhood'un resmî maskotu" iddiası hukuki risk.** Robinhood Markets gerçek bir şirket
   ve markası korumalı. Token'ı onların ürünüymüş gibi sunmak — ismini ve kurumsal yeşilini
   kullanmakla birleşince — marka ihlali iddiasına açık hale gelir. Description'da ve sitede
   "independent / not affiliated" ifadesi bu yüzden var; kaldırma.
2. **Getiri vaadi içeren tanıtım metni** birçok ülkede izinsiz finansal tanıtım sayılır.
   "Fiyat yükselecek" anlamına gelen hiçbir ifade kullanma.

### Creator Tax (%2) hakkında — gerçekçi beklenti

%2 creator tax, **gerçekleşen hacmin** %2'sidir. Gelir garantisi değildir:

- Hacim olmazsa gelir sıfırdır. Çoğu launchpad token'ında hacim ilk birkaç saatten sonra
  neredeyse tamamen durur.
- Yüksek vergi (örn. %10) arbitraj ve market-making botlarının işlem yapmasını ekonomik
  olmaktan çıkarır, yani hacmi düşürür. %2 bu açıdan daha makul bir orandır — ama bu
  "botlar gelecek" demek değil, sadece "yüksek vergi kesinlikle kaçırır" demek.
- Bu vergiyi **işlem yapanlar** öder. Senin gelirin, alım satım yapan kişilerin cebinden
  çıkar. Sitede bunu açıkça yazdık; başka yerlerde de gizleme.

### Developer Buy hakkında

Dev buy meşru: herkesle aynı eğriden, aynı fiyattan alırsın. Ama:

- **Açıkla.** Ne kadar aldığını `script.js` içindeki `CONFIG.creatorOpeningBuy` alanına yaz;
  tokenomics bölümündeki "Creator's Opening Buy" kartı bunu gösterir.
- Amacı "grafiğe yeşil mum dikip sniper botları tetiklemek" olarak kurgulama. Bu, gerçek
  olmayan bir talep izlenimi yaratmaktır ve birçok yargı bölgesinde manipülasyon başlığına
  girer.
- Aldığın tokenları satarsan fiyat düşer ve senden sonra alanlar zarar eder. Satacaksan
  önceden duyur.

---

## 2. Lansman Sonrası: Siteyi Canlı Token'a Bağlama

Token oluştuğunda Pons sana bir sözleşme adresi (`0x...`) verir. Sonra `script.js`
dosyasının en üstündeki `CONFIG` bloğunu doldur:

```js
const CONFIG = {
  contractAddress: '0x....',                                      // Pons'un verdiği adres
  ponsTokenUrl: 'https://www.ponsfamily.com/launchpad/token/0x...',
  ponsLaunchpadUrl: 'https://www.ponsfamily.com/launchpad',
  totalSupply: 1000000000,        // sözleşmenin gerçek arzı — zincirden doğrula
  creatorTaxPercent: 2.0,         // launchpad'de gerçekten ne ayarladıysan
  creatorOpeningBuy: '0.02 ETH',  // yaptıysan yaz, yapmadıysan '' bırak
  xHandle: 'kullanici_adi',       // @ ve URL olmadan
  telegramHandle: 'kanal_adi'
};
```

Site bu tek bloktan beslenir:

- `contractAddress` geçerli bir adres olduğunda hero'daki alan "Not deployed yet" yerine
  adresi gösterir, kopyala butonu aktifleşir, rozet `LIVE ON PONS` olur ve tüm "View on Pons"
  butonları `Trade on Pons`'a dönüp token sayfasına gider.
- `totalSupply` girildiğinde hero ve tokenomics kartı gerçek arzı gösterir, hesap
  makinesinin arz alanı ön dolu gelir.
- Sosyal handle'lar boşken footer'da link yerine "Channels not open yet" yazar — açmadığın
  bir kanalın linkini vermiş olmazsın.

**Arzı zincirden doğrula.** Launchpad'in gösterdiği sayıya değil, sözleşmenin `totalSupply()`
değerine bak. Sitede yazan her sayı seni bağlar.

---

## 3. Siteyi Yayına Alma

Statik site, build adımı yok. Üç dosya + `assets/` klasörü yeterli.

GitHub Pages için:

```bash
git init && git add -A && git commit -m "Hoodie site"
```

Sonra GitHub'da boş bir repo açıp push et, repo ayarlarından Pages'i `main` / `root` olarak
aç. Alternatif: klasörü Netlify Drop'a sürükle-bırak.

**Domain:** bağımsız bir alan adı al. `robinhood-*` veya `rh-official-*` kalıbındaki alan
adları marka ihlali iddiasını davet eder — kullanma.

---

## 4. Yapma

Bunlar hem sitedeki dürüstlük katmanını çöpe atar hem de birçok ülkede hukuki sorumluluk
doğurur:

- **Sahte işlem akışı / sahte holder sayısı / sahte curve yüzdesi koyma.** Sitenin ilk
  sürümünde uydurma cüzdan adresleriyle ("0xRobin...Bot1" gibi) "canlı alımlar" tablosu ve
  kendi kendine artan %68'lik bir curve barı vardı; ikisi de kaldırıldı. Geri ekleme. Canlı
  veri istiyorsan zincirden oku.
- **Fiyat hedefi, ROI tablosu, "x kat" vaadi verme.** Sitedeki hesap makinesi bilinçli olarak
  sadece "piyasa değeri ÷ arz" yapıyor; giriş fiyatı, kâr ya da çarpan hesaplamıyor.
- **"Rug-pull imkansız", "%100 güvenli", "garanti" deme.** LP kilidi yalnızca o havuzun
  çekilmesini engeller; sen dahil herkes elindeki tokenı satabilir.
- **Robinhood'un logosunu, ekran görüntülerini veya "official" ifadesini kullanma.**
- **Wash trading / kendi botunla hacim üretme.** Hem creator fee'yi kendi cebinden ödersin
  hem de yapay hacim üretimi manipülasyondur.
- Sözleşme adresini paylaşırken her seferinde Pons token sayfasıyla karşılaştır; kopya
  token'lar yaygındır.

---

## 5. Dosya Yapısı

```
hoodie-token-website/
├── index.html        # Tek sayfa. Feragat ve risk bölümleri kaldırılmamalı.
├── style.css         # Tema + "honesty layer" stilleri (dosya sonunda)
├── script.js         # CONFIG bloğu burada. Sahte veri üretmez.
├── assets/logo.jpg   # Token görseli / favicon
├── LAUNCH_GUIDE.md   # Bu dosya
└── README.md         # Kısa özet
```
