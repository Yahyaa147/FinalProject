# Finance - Kişisel Portföy Yöneticisi

Kişisel yatırım portföylerini yönetmek, finansal haberleri takip etmek, finansal araçları kullanmak ve finans topluluğu ile etkileşim kurmak için kapsamlı, etkileşimli, veri odaklı bir web uygulaması.

## 🚀 Özellikler

### 📈 Portföy Yönetimi
- **Varlıklarım**: Gerçek zamanlı hesaplamalarla yatırım portföyünüzü görüntüleyin ve takip edin
- **İşlem Ekle**: Form doğrulaması ile alım/satım işlemlerini kaydedin
- **İşlem Geçmişi**: Tüm portföy işlemlerinin tam geçmişi
- **Portföy Analizi**: Toplam değer, maliyet esası ve kazanç/kayıp hesaplamaları

### 📰 Finansal Haberler
- **Son Haberler**: Filtreleme ve arama ile seçilmiş finansal haberleri inceleyin
- **Kategori Sayfaları**: Piyasa, Teknoloji, Kripto ve Ekonomi kategorilerine göre düzenlenmiş haberler
- **Arama Fonksiyonu**: Belirli makaleleri ve konuları bulun

### 🛠️ Finansal Araçlar
- **Bileşik Faiz Hesaplayıcısı**: Zaman içinde yatırım büyümesini hesaplayın
- **Emeklilik Planlayıcısı**: Emeklilik hedeflerinizi planlayın
- **Portföy Analizörü**: Detaylı portföy analizi araçları

### 👥 Topluluk
- **Forum Kategorileri**: Hisse senetleri, kripto, gayrimenkul ve genel finans tartışmaları
- **Tartışma Konuları**: Finansal tartışmalara göz atın ve katılın
- **Kullanıcı Gönderileri**: Topluluk odaklı içerik ve görüşler

### 🎨 Kullanıcı Deneyimi
- **Responsive Tasarım**: Tüm cihaz boyutlarında tam responsive
- **Modern UI**: Tailwind CSS ile oluşturulmuş temiz, profesyonel arayüz
- **Hızlı Navigasyon**: İç içe routing ve breadcrumb'lar ile React Router
- **Tip Güvenliği**: Uygulama genelinde tam TypeScript entegrasyonu

## 🛠️ Teknoloji Yığını

- **Frontend Framework**: TypeScript ile React 18
- **Build Aracı**: Hızlı geliştirme ve optimize edilmiş build'ler için Vite
- **Routing**: İç içe route'lar ile React Router v6
- **State Yönetimi**: Global state yönetimi için Zustand
- **Formlar**: Doğrulama ile React Hook Form
- **Styling**: Özel componentler ile Tailwind CSS
- **İkonlar**: Modern ikonografi için Lucide React
- **HTTP Client**: API çağrıları için Axios
- **Geliştirme**: ESLint, TypeScript strict mode

## 📦 Kurulum

1. **Repository'yi klonlayın**:
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
├── components/          # Yeniden kullanılabilir UI componentleri
│   ├── Layout.tsx      # Ana uygulama layout wrapper'ı
│   └── Navigation.tsx  # Navigasyon componenti
├── pages/              # Ana uygulama sayfaları
│   ├── Dashboard.tsx   # Ana dashboard
│   ├── PortfolioPage.tsx # Portföy yönetimi
│   ├── NewsPage.tsx    # Finansal haberler
│   ├── ToolsPage.tsx   # Finansal hesaplayıcılar
│   ├── DiscoverPage.tsx # Keşfet sayfası
│   ├── CommunityPage.tsx # Topluluk forumu
│   └── tools/          # Alt araç sayfaları
│       ├── PortfolioAnalyzer.tsx
│       └── RetirementPlanner.tsx
├── store/              # Zustand state yönetimi
│   └── portfolioStore.ts # Portföy state ve actions
├── services/           # API ve harici servisler
│   └── apiService.ts   # HTTP client ve API çağrıları
├── types/              # TypeScript tip tanımlamaları
│   └── index.ts        # Tüm uygulama tipleri
├── data/               # Mock veri ve sabitler
│   └── mockData.ts     # Geliştirme için örnek veri
└── utils/              # Yardımcı fonksiyonlar
    └── helpers.ts      # Formatlama ve hesaplama yardımcıları
```

## 🎯 Temel Özellik Uygulamaları

### State Yönetimi
- Portfolio verileri için TypeScript ile Zustand store
- Varlık ve işlem ekleme/çıkarma için actions
- Portföy analitiği için hesaplanmış değerler

### Form İşleme
- Doğrulama ile React Hook Form entegrasyonu
- Type-safe form submissions
- Error handling and user feedback

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive navigation and layouts
- Optimized for all screen sizes

### Type Safety
- Comprehensive TypeScript types for all data models
- Strict type checking throughout the application
- IntelliSense support for improved developer experience

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Testing the Application

The application comes pre-loaded with sample data for demonstration:

### Portfolio Management
1. Navigate to **Portfolio → My Assets** to view sample portfolio
2. Go to **Portfolio → Add Transaction** to test the form:
   - Try adding a new stock (e.g., Symbol: "TSLA", Name: "Tesla Inc.")
   - Test form validation by leaving fields empty
   - Submit a transaction and see it in Transaction History
3. View **Portfolio → Transaction History** for all transactions

### News & Information
1. Browse **News** to see sample financial articles
2. Use search and category filters
3. Test responsive design on different screen sizes

### Financial Tools
1. Visit **Tools → Compound Interest Calculator**
2. Enter sample values to see calculations
3. View detailed yearly breakdown

### Community Features
1. Explore **Community** to see forum structure
2. Browse categories and discussion threads
3. Responsive navigation on mobile devices

## ✅ Project Completion Status

- ✅ **Complete React + TypeScript setup** with Vite
- ✅ **4+ main sections** with sub-pages (Portfolio, News, Tools, Community)
- ✅ **React Router** with nested routing
- ✅ **Zustand state management** with TypeScript
- ✅ **React Hook Form** with validation
- ✅ **Tailwind CSS** responsive design
- ✅ **Mock data** for realistic demo
- ✅ **Type safety** throughout application
- ✅ **Reusable components** and utilities
- ✅ **Git version control** with meaningful commits
- ✅ **Comprehensive documentation**

## 🏆 Technical Achievements

### Advanced React Patterns
- **Custom Hooks**: Zustand store integration
- **Component Composition**: Reusable layout and navigation components  
- **Form Management**: React Hook Form with comprehensive validation
- **Error Boundaries**: Graceful error handling throughout the app

### TypeScript Excellence
- **Strict Type Safety**: Zero `any` types, comprehensive interfaces
- **Type-Only Imports**: Optimized bundle size
- **Generic Types**: Reusable utility functions with proper typing
- **Advanced Types**: Union types, conditional types, and mapped types

### Performance Optimizations
- **Code Splitting**: Route-based lazy loading ready
- **State Management**: Efficient Zustand store with persistence
- **Optimized Builds**: Vite for fast development and production builds
- **Tree Shaking**: Minimal bundle size with unused code elimination

### Professional Development Practices
- **Clean Architecture**: Separation of concerns with organized folder structure
- **Reusable Code**: DRY principles with utility functions and components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Version Control**: Semantic commit messages and clean Git history

## 🔮 Future Enhancements

- Real-time stock price integration
- User authentication and persistence
- Advanced portfolio analytics and charts
- Social features for community engagement
- Mobile app development
- Integration with real financial APIs

## 📄 License

This project is part of a software engineering course and is for educational purposes.

## 👨‍💻 Development

Built with modern web development best practices:
- Component-based architecture
- Separation of concerns
- Reusable utilities and hooks
- Comprehensive type safety
- Clean code principles
    ...reactDom.configs.recommended.rules,
  },
})
```
