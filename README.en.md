# Firebase OAuth 2.0 Token Generator

Professional Node.js application for generating OAuth 2.0 Access Tokens using Firebase Service Account.

## 🚀 Features

- ✅ **Service Account Based Authentication**
- ✅ **Secure Token Generation with JWT**
- ✅ **Postman and cURL Format Support**
- ✅ **Automatic Token Validation**
- ✅ **Configuration Management**
- ✅ **Professional Folder Structure**
- ✅ **Comprehensive Error Handling**

## 📁 Project Structure

```
firebase-oauth-token-generator/
├── src/
│   ├── classes/
│   │   └── FirebaseTokenManager.js    # Main token management class
│   ├── utils/
│   │   ├── fileUtils.js               # File operations
│   │   └── configManager.js           # Configuration management
│   └── app.js                         # Main application
├── config/
│   ├── config.json                    # Application configuration
│   └── firebase-service-account.json  # Firebase service account
├── output/
│   └── firebase-access-token.json     # Generated token output
├── docs/
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/SafakB/firebase-oauth-token-generator.git
cd firebase-oauth-token-generator
```

2. **Install dependencies:**
```bash
npm install
```

3. **Add Firebase Service Account file:**
   - Download service account key from Firebase Console
   - **IMPORTANT:** Save as `config/firebase-service-account.json`
   - See detailed steps in "How to Get Firebase Service Account?" section below

## 🔑 How to Get Firebase Service Account?

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one

### Step 2: Create Service Account
1. Click on **"Project Settings"** (⚙️) icon in the left menu
2. Switch to **"Service accounts"** tab
3. Click **"Generate new private key"** button
4. In the popup window, click **"Generate key"** button
5. JSON file will be downloaded automatically

### Step 3: Add File to Project
1. Copy the downloaded JSON file to your project's `config/` folder
2. Rename the file to **`firebase-service-account.json`**
3. **IMPORTANT:** This file contains sensitive information, it's already protected in `.gitignore`

### File Structure Example
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### ⚠️ Security Warnings
- **Never** share service account keys in public repositories
- File is protected by `.gitignore`
- Use environment variables in production
- Regularly rotate your keys

## 🎯 Usage

### Basic Commands

```bash
# Generate token
npm start
# or
npm run token

# Development mode
npm run dev

# Check existing token status
npm run check
```

### Programmatic Usage

```javascript
const FirebaseTokenManager = require('./src/classes/FirebaseTokenManager');

const tokenManager = new FirebaseTokenManager('./config/firebase-service-account.json');
const tokenData = await tokenManager.getAccessToken();

console.log('Access Token:', tokenData.access_token);
```

## ⚙️ Configuration

You can modify settings from `config/config.json` file:

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

### Available Scopes

- `https://www.googleapis.com/auth/firebase.messaging` - For FCM
- `https://www.googleapis.com/auth/firebase.database` - For Realtime Database
- `https://www.googleapis.com/auth/firebase.readonly` - For read-only access
- `https://www.googleapis.com/auth/userinfo.email` - For email information

## 📤 Output Formats

### JSON Output
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

### Postman Usage
Use the generated token in Postman as follows:
- **Authorization Type:** Bearer Token
- **Token:** Generated access_token value

### cURL Usage
```bash
curl -X POST "https://fcm.googleapis.com/v1/projects/YOUR_PROJECT/messages:send" \
  -H "Authorization: Bearer ya29.c.c0ASRK0GY..." \
  -H "Content-Type: application/json" \
  -d '{"message": {...}}'
```

## 🔒 Security

- Service account keys should be stored securely
- Tokens are valid for approximately 1 hour
- Use minimum required scopes
- Use environment variables in production

## 🐛 Troubleshooting

### Common Errors

1. **Service account file not found**
   - Check that the file exists at `config/firebase-service-account.json`

2. **Token generation error**
   - Verify that the service account key is valid
   - Check your internet connection

3. **Scope error**
   - Ensure the used scopes are supported by the service account

## 📝 Development

### Adding New Scope
1. Add to `availableScopes` list in `config/config.json`
2. Update `FirebaseTokenManager` class if necessary

### Adding New Output Format
1. Add new format method to `FirebaseTokenManager` class
2. Add format usage in `app.js`

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions:
- Open an issue
- Submit a pull request
- Check the documentation

## 🌍 Languages

- [English](README.en.md)
- [Türkçe](README.md)
