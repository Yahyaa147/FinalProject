# Finance Hub & Kişisel Portföy Yöneticisi

Kişisel yatırım portföylerini yönetmek, finansal haberleri takip etmek, finansal araçları kullanmak ve finans topluluğu ile etkileşim kurmak için kapsamlı, etkileşimli ve veri odaklı bir web uygulaması.

## 🚀 Özellikler

### 📈 Portföy Yönetimi
- **Varlıklarım**: Gerçek zamanlı hesaplamalarla yatırım portföyünüzü görüntüleyin ve takip edin
- **İşlem Ekle**: Form doğrulaması ile alış/satış işlemlerini kaydedin
- **İşlem Geçmişi**: Tüm portföy işlemlerinin tam geçmişi
- **Portföy Analitiği**: Toplam değer, maliyet esası ve kar/zarar hesaplamaları

### 📰 Finansal Haberler
- **Son Haberler**: Filtreleme ve arama ile özenle seçilmiş finansal haberleri görüntüleyin
- **Kategori Sayfaları**: Piyasa, Teknoloji, Kripto ve Ekonomi kategorilerine göre düzenlenmiş haberler
- **Arama İşlevi**: Belirli makaleleri ve konuları bulun

### 🛠️ Finansal Araçlar
- **Bileşik Faiz Hesaplayıcısı**: Zamanla yatırım büyümesini hesaplayın
- **Daha Fazla Araç**: Ek finansal hesaplayıcılar için genişletilebilir çerçeve

### 👥 Topluluk
- **Forum Kategorileri**: Hisse senetleri, kripto, gayrimenkul ve genel finans konularını tartışın
- **Tartışma Konuları**: Finansal tartışmalara göz atın ve katılın
- **Kullanıcı Gönderileri**: Topluluk odaklı içerik ve görüşler

### 🎨 Kullanıcı Deneyimi
- **Duyarlı Tasarım**: Tüm cihaz boyutlarında tam duyarlı
- **Modern UI**: Tailwind CSS ile oluşturulmuş temiz, profesyonel arayüz
- **Hızlı Navigasyon**: İç içe yönlendirme ve breadcrumb'lar ile React Router
- **Tip Güvenliği**: Uygulama boyunca tam TypeScript entegrasyonu

### 📊 Gerçek Zamanlı Veri Entegrasyonu
- **Alpha Vantage API**: Gerçek zamanlı hisse senedi fiyatları ve piyasa verileri
- **Hisse Senedi Arama**: Anlık hisse senedi sembolü arama ve fiyat sorgulaması
- **Canlı Fiyat Güncellemeleri**: Otomatik yenileme ile güncel piyasa verileri
- **Oran Sınırı Yönetimi**: API çağrı limitlerinin akıllı yönetimi
- **Önbellek Sistemi**: Performans optimizasyonu için 1 dakikalık veri önbelleği

## 🛠️ Teknoloji Yığını

- **Frontend Framework**: TypeScript ile React 18
- **Build Aracı**: Hızlı geliştirme ve optimize edilmiş derlemeler için Vite
- **Yönlendirme**: İç içe rotalar ile React Router v6
- **Durum Yönetimi**: Global durum yönetimi için Zustand
- **Formlar**: Doğrulama ile React Hook Form
- **Stil**: Özel bileşenler ile Tailwind CSS
- **İkonlar**: Modern ikonografi için Lucide React
- **HTTP İstemcisi**: API çağrıları için Axios
- **Geliştirme**: ESLint, TypeScript strict mode

## 📦 Kurulum

1. **Depoyu klonlayın**:
   ```bash
   git clone <repository-url>
   cd finance-hub
   ```

2. **Bağımlılıkları yükleyin**:
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**:
   ```bash
   npm run dev
   ```

4. **Tarayıcınızı açın** ve `http://localhost:5173` adresine gidin

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir UI bileşenleri
│   ├── Layout.tsx      # Ana uygulama layout sarıcısı
│   └── Navigation.tsx  # Navigasyon bileşeni
├── pages/              # Ana uygulama sayfaları
│   ├── Dashboard.tsx   # Ana panel
│   ├── PortfolioPage.tsx # Portföy yönetimi
│   ├── NewsPage.tsx    # Finansal haberler
│   ├── ToolsPage.tsx   # Finansal hesaplayıcılar
│   └── CommunityPage.tsx # Topluluk forumu
├── store/              # Zustand durum yönetimi
│   └── portfolioStore.ts # Portföy durumu ve eylemleri
├── services/           # API ve harici servisler
│   └── apiService.ts   # HTTP istemcisi ve API çağrıları
├── types/              # TypeScript tip tanımları
│   └── index.ts        # Tüm uygulama tipleri
├── data/               # Mock veri ve sabitler
│   └── mockData.ts     # Geliştirme için örnek veri
├── utils/              # Yardımcı fonksiyonlar
│   └── helpers.ts      # Formatlama ve hesaplama yardımcıları
└── hooks/              # Özel React hook'ları (genişletilebilir)
```

## 🎯 Anahtar Özellik Uygulamaları

### Durum Yönetimi
- Portföy verileri için TypeScript ile Zustand store
- Varlık ve işlem ekleme/kaldırma eylemleri
- Portföy analitiği için hesaplanmış değerler

### Form İşleme
- Doğrulama ile React Hook Form entegrasyonu
- Tip güvenli form gönderileri
- Hata işleme ve kullanıcı geri bildirimi

### Duyarlı Tasarım
- Tailwind CSS ile mobil öncelikli yaklaşım
- Duyarlı navigasyon ve layout'lar
- Tüm ekran boyutları için optimize edilmiş

### Tip Güvenliği
- Tüm veri modelleri için kapsamlı TypeScript tipleri
- Uygulama boyunca sıkı tip kontrolü
- Gelişmiş geliştirici deneyimi için IntelliSense desteği

## 🚦 Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlat
- `npm run build` - Üretim için derle
- `npm run preview` - Üretim derlemesini önizle
- `npm run lint` - ESLint'i çalıştır

## 🧪 Uygulamayı Test Etme

Uygulama, gösteri için önceden yüklenmiş örnek verilerle gelir:

### Portföy Yönetimi
1. Örnek portföyü görüntülemek için **Portföy → Varlıklarım**'a gidin
2. Formu test etmek için **Portföy → İşlem Ekle**'ye gidin:
   - Yeni bir hisse senedi eklemeyi deneyin (örn. Sembol: "TSLA", İsim: "Tesla Inc.")
   - Alanları boş bırakarak form doğrulamasını test edin
   - Bir işlem gönderin ve İşlem Geçmişi'nde görün
3. Tüm işlemler için **Portföy → İşlem Geçmişi**'ni görüntüleyin

### Haberler & Bilgiler
1. Örnek finansal makaleleri görmek için **Haberler**'e göz atın
2. Arama ve kategori filtrelerini kullanın
3. Farklı ekran boyutlarında duyarlı tasarımı test edin

### Finansal Araçlar
1. **Araçlar → Bileşik Faiz Hesaplayıcısı**'nı ziyaret edin
2. Hesaplamaları görmek için örnek değerler girin
3. Detaylı yıllık dökümü görüntüleyin

### Topluluk Özellikleri
1. Forum yapısını görmek için **Topluluk**'u keşfedin
2. Kategorilere ve tartışma konularına göz atın
3. Mobil cihazlarda duyarlı navigasyon

## ✅ Proje Tamamlanma Durumu

- ✅ **Vite ile tamamlanmış React + TypeScript kurulumu**
- ✅ **Alt sayfalar ile 4+ ana bölüm** (Portföy, Haberler, Araçlar, Topluluk)
- ✅ **İç içe yönlendirme ile React Router**
- ✅ **TypeScript ile Zustand durum yönetimi**
- ✅ **Doğrulama ile React Hook Form**
- ✅ **Tailwind CSS duyarlı tasarım**
- ✅ **Gerçekçi demo için mock veri**
- ✅ **Uygulama boyunca tip güvenliği**
- ✅ **Yeniden kullanılabilir bileşenler** ve yardımcılar
- ✅ **Anlamlı commit'lerle Git versiyon kontrolü**
- ✅ **Kapsamlı dokümantasyon**

## 🏆 Teknik Başarılar

### Gelişmiş React Kalıpları
- **Özel Hook'lar**: Zustand store entegrasyonu
- **Bileşen Kompozisyonu**: Yeniden kullanılabilir layout ve navigasyon bileşenleri  
- **Form Yönetimi**: Kapsamlı doğrulama ile React Hook Form
- **Hata Sınırları**: Uygulama boyunca zarif hata işleme

### TypeScript Mükemmelliği
- **Sıkı Tip Güvenliği**: Sıfır `any` tipi, kapsamlı arayüzler
- **Sadece Tip İmportları**: Optimize edilmiş paket boyutu
- **Jenerik Tipler**: Doğru tipleme ile yeniden kullanılabilir yardımcı fonksiyonlar
- **Gelişmiş Tipler**: Union tipler, koşullu tipler ve eşlenmiş tipler

### Performans Optimizasyonları
- **Kod Bölme**: Rota tabanlı lazy loading hazır
- **Durum Yönetimi**: Persistence ile verimli Zustand store
- **Optimize Edilmiş Derlemeler**: Hızlı geliştirme ve üretim derlemeleri için Vite
- **Tree Shaking**: Kullanılmayan kod eliminasyonu ile minimal paket boyutu

### Profesyonel Geliştirme Uygulamaları
- **Temiz Mimari**: Organize edilmiş klasör yapısı ile endişelerin ayrılması
- **Yeniden Kullanılabilir Kod**: Yardımcı fonksiyonlar ve bileşenlerle DRY prensibi
- **Duyarlı Tasarım**: Tailwind CSS ile mobil öncelikli yaklaşım
- **Versiyon Kontrolü**: Semantik commit mesajları ve temiz Git geçmişi

## 🔮 Gelecek İyileştirmeler

- Gerçek zamanlı hisse senedi fiyat entegrasyonu
- Kullanıcı kimlik doğrulaması ve persistence
- Gelişmiş portföy analitiği ve grafikler
- Topluluk etkileşimi için sosyal özellikler
- Mobil uygulama geliştirme
- Gerçek finansal API'ler ile entegrasyon

## 📚 API Dokümantasyonu

Gerçek zamanlı hisse senedi verileri entegrasyonu hakkında detaylı bilgi için bakınız:
[Alpha Vantage API Entegrasyon Rehberi](./ALPHA_VANTAGE_INTEGRATION.md)

## 📄 Lisans

Bu proje bir yazılım mühendisliği dersinin parçasıdır ve eğitim amaçlıdır.

## 👨‍💻 Geliştirme

Modern web geliştirme en iyi uygulamaları ile oluşturulmuştur:
- Bileşen tabanlı mimari
- Endişelerin ayrılması
- Yeniden kullanılabilir yardımcılar ve hook'lar
- Kapsamlı tip güvenliği
- Temiz kod prensipleri
