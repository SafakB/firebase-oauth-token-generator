# Firebase OAuth 2.0 Token Generator

Firebase Service Account kullanarak OAuth 2.0 Access Token oluşturan profesyonel Node.js uygulaması.

## 🚀 Özellikler

- ✅ **Service Account Tabanlı Authentication**
- ✅ **JWT ile Güvenli Token Üretimi**
- ✅ **Postman ve cURL Format Desteği**
- ✅ **Otomatik Token Validasyonu**
- ✅ **Konfigürasyon Yönetimi**
- ✅ **Profesyonel Klasör Yapısı**
- ✅ **Kapsamlı Error Handling**

## 📁 Proje Yapısı

```
firebase-oauth-token-generator/
├── src/
│   ├── classes/
│   │   └── FirebaseTokenManager.js    # Ana token yönetim sınıfı
│   ├── utils/
│   │   ├── fileUtils.js               # Dosya işlemleri
│   │   └── configManager.js           # Konfigürasyon yönetimi
│   └── app.js                         # Ana uygulama
├── config/
│   ├── config.json                    # Uygulama konfigürasyonu
│   └── firebase-service-account.json  # Firebase service account
├── output/
│   └── firebase-access-token.json     # Üretilen token çıktısı
├── docs/
├── package.json
└── README.md
```

## 🛠️ Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone <repository-url>
cd firebase-oauth-token-generator
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Firebase Service Account dosyasını ekleyin:**
   - Firebase Console'dan service account anahtarını indirin
   - `config/firebase-service-account.json` olarak kaydedin

## 🎯 Kullanım

### Temel Komutlar

```bash
# Token üret
npm start
# veya
npm run token

# Development mode
npm run dev

# Mevcut token durumunu kontrol et
npm run check
```

### Programatik Kullanım

```javascript
const FirebaseTokenManager = require('./src/classes/FirebaseTokenManager');

const tokenManager = new FirebaseTokenManager('./config/firebase-service-account.json');
const tokenData = await tokenManager.getAccessToken();

console.log('Access Token:', tokenData.access_token);
```

## ⚙️ Konfigürasyon

`config/config.json` dosyasından ayarları değiştirebilirsiniz:

```json
{
  "firebase": {
    "defaultScopes": [
      "https://www.googleapis.com/auth/firebase.messaging"
    ]
  },
  "paths": {
    "serviceAccount": "./config/firebase-service-account.json",
    "outputDir": "./output"
  }
}
```

### Mevcut Scope'lar

- `https://www.googleapis.com/auth/firebase.messaging` - FCM için
- `https://www.googleapis.com/auth/firebase.database` - Realtime Database için
- `https://www.googleapis.com/auth/firebase.readonly` - Sadece okuma için
- `https://www.googleapis.com/auth/userinfo.email` - Email bilgisi için

## 📤 Çıktı Formatları

### JSON Çıktısı
```json
{
  "access_token": "ya29.c.c0ASRK0GY...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "expires_at": 1750775672000,
  "scope": "https://www.googleapis.com/auth/firebase.messaging",
  "formats": {
    "postman_headers": {
      "Authorization": "Bearer ya29.c.c0ASRK0GY...",
      "Content-Type": "application/json"
    }
  }
}
```

### Postman Kullanımı
Üretilen token'ı Postman'de şu şekilde kullanın:
- **Authorization Type:** Bearer Token
- **Token:** Üretilen access_token değeri

### cURL Kullanımı
```bash
curl -X POST "https://fcm.googleapis.com/v1/projects/YOUR_PROJECT/messages:send" \
  -H "Authorization: Bearer ya29.c.c0ASRK0GY..." \
  -H "Content-Type: application/json" \
  -d '{"message": {...}}'
```

## 🔒 Güvenlik

- Service account anahtarları güvenli saklanmalıdır
- Token'lar yaklaşık 1 saat geçerlidir
- Minimum gerekli scope'lar kullanılmalıdır
- Production ortamında environment variables kullanın

## 🐛 Hata Ayıklama

### Yaygın Hatalar

1. **Service account dosyası bulunamadı**
   - Dosyanın `config/firebase-service-account.json` yolunda olduğunu kontrol edin

2. **Token alma hatası**
   - Service account anahtarının geçerli olduğunu kontrol edin
   - İnternet bağlantınızı kontrol edin

3. **Scope hatası**
   - Kullanılan scope'ların service account tarafından desteklendiğini kontrol edin

## 📝 Geliştirme

### Yeni Scope Ekleme
1. `config/config.json` dosyasında `availableScopes` listesine ekleyin
2. Gerekirse `FirebaseTokenManager` sınıfını güncelleyin

### Yeni Çıktı Formatı Ekleme
1. `FirebaseTokenManager` sınıfına yeni format methodu ekleyin
2. `app.js` dosyasında format kullanımını ekleyin

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 Destek

Sorularınız için:
- Issue açın
- Pull request gönderin
- Dokümantasyonu kontrol edin
