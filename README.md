# Hoodie ($HOODIE) — tanıtım sitesi

Robinhood Chain üzerinde Pons Launchpad'de çıkarılacak bağımsız bir meme token'ın statik
tanıtım sitesi. Build adımı yok; `index.html` doğrudan açılır.

## Hızlı başlangıç

```bash
python -m http.server 8777
```

Sonra `http://127.0.0.1:8777` adresini aç. (Dosyayı çift tıklayıp `file://` ile de açabilirsin,
ama yerel sunucu daha temiz.)

## Lansman sonrası tek yapılacak şey

`script.js` dosyasının en üstündeki `CONFIG` bloğunu doldur. Sözleşme adresi, arz, sosyal
hesaplar ve Pons token linki oradan gelir; HTML'e dokunman gerekmez. Ayrıntı:
[LAUNCH_GUIDE.md](LAUNCH_GUIDE.md).

`CONFIG.contractAddress` boşken site "pre-launch" modunda görünür: adres alanı "Not deployed
yet" yazar, kopyala butonu pasiftir, sosyal linkler gizlenir.

## Bu sitedeki tasarım kuralları

Sayfanın bazı bölümleri dekoratif değil, işlevsel. Bunlar kaldırılırsa site yanıltıcı hale
gelir:

1. **Feragat şeridi (`.affiliation-bar`) ve footer'daki marka notu.** Proje Robinhood
   Markets, Inc. ile bağlantılı değil ve sayfa bunu her yerde açıkça söylemek zorunda.
2. **Risk şeridi ve Risk Disclosure bölümü (`#risks`).** Creator fee'nin yarattığı çıkar
   çatışması dahil, gerçek riskler listeleniyor.
3. **Sahte veri yok.** `script.js` hiçbir yerde uydurma işlem, holder, fiyat veya curve
   yüzdesi üretmez. Canlı sayılar için site Pons'a link verir. Statik bir sayfada "canlı"
   görünen her şey uydurmadır — o yüzden hiç yok.
4. **Hesap makinesi tahmin yapmaz.** `#calculator` yalnızca "piyasa değeri ÷ arz" bölmesini
   yapar; giriş fiyatı, kâr veya çarpan hesaplamaz.

Bir değişiklik bu dördünden birini zayıflatıyorsa, o değişiklik yanlıştır.

## Dosyalar

| Dosya | İçerik |
| :--- | :--- |
| `index.html` | Tek sayfa; tüm bölümler burada |
| `style.css` | Tema. Dosya sonundaki "honesty layer" bloğu yukarıdaki bölümlerin stilleri |
| `script.js` | `CONFIG`, mobil menü, kopyalama, hesap makinesi, SSS akordeonu |
| `assets/logo.jpg` | Token görseli ve favicon |
