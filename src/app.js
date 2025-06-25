#!/usr/bin/env node

/**
 * Firebase OAuth 2.0 Access Token Generator
 * Ana uygulama dosyası
 * 
 * Kullanım:
 * node src/app.js
 * npm start
 * npm run token
 */

const FirebaseTokenManager = require('./classes/FirebaseTokenManager');
const configManager = require('./utils/configManager');
const { fileExists, writeJsonFile, ensureDirectoryExists, isTokenValid } = require('./utils/fileUtils');

/**
 * Ana uygulama sınıfı
 */
class FirebaseTokenApp {
    constructor() {
        this.config = configManager.loadConfig();
        this.serviceAccountPath = configManager.getServiceAccountPath();
        this.outputPath = configManager.getOutputPath();
        this.tokenFilePath = configManager.getTokenFilePath();
        this.scopes = configManager.getDefaultScopes();
    }

    /**
     * Uygulamayı başlatır
     */
    async run() {
        try {
            console.log(`🚀 ${this.config.app.name} v${this.config.app.version}`);
            console.log('================================================');

            await this.validateEnvironment();
            await this.generateToken();

        } catch (error) {
            console.error('❌ Hata:', error.message);
            process.exit(1);
        }
    }

    /**
     * Çevre koşullarını kontrol eder
     */
    async validateEnvironment() {
        console.log('🔍 Çevre kontrolleri yapılıyor...');

        // Service account dosyası kontrolü
        if (!fileExists(this.serviceAccountPath)) {
            throw new Error(`Service account dosyası bulunamadı: ${this.serviceAccountPath}`);
        }

        // Output klasörünü oluştur
        ensureDirectoryExists(this.outputPath);

        console.log('✅ Çevre kontrolleri tamamlandı.');
    }

    /**
     * Token üretir ve kaydeder
     */
    async generateToken() {
        console.log('🔑 Firebase OAuth token üretiliyor...');

        const tokenManager = new FirebaseTokenManager(this.serviceAccountPath, this.scopes);
        const tokenData = await tokenManager.getAccessToken();

        // Token bilgilerini göster
        tokenManager.displayTokenInfo(tokenData);

        // Postman format
        const postmanHeaders = tokenManager.getPostmanFormat(tokenData);
        console.log('📮 Postman için Header bilgileri:');
        console.log(JSON.stringify(postmanHeaders, null, 2));

        // cURL format
        const curlHeaders = tokenManager.getCurlFormat(tokenData);
        console.log('\n🌐 cURL için Header bilgileri:');
        console.log(curlHeaders);

        // Token'ı dosyaya kaydet
        await this.saveTokenData(tokenData, postmanHeaders, curlHeaders);

        return tokenData;
    }

    /**
     * Token verilerini dosyaya kaydeder
     * @param {Object} tokenData - Token verileri
     * @param {Object} postmanHeaders - Postman header'ları
     * @param {string} curlHeaders - cURL header'ları
     */
    async saveTokenData(tokenData, postmanHeaders, curlHeaders) {
        const outputData = {
            ...tokenData,
            generated_at: new Date().toISOString(),
            config: {
                scopes: this.scopes,
                service_account_path: this.serviceAccountPath
            },
            formats: {
                postman_headers: postmanHeaders,
                curl_headers: curlHeaders
            },
            metadata: {
                app_name: this.config.app.name,
                app_version: this.config.app.version,
                is_valid: isTokenValid(tokenData)
            }
        };

        writeJsonFile(this.tokenFilePath, outputData, this.config.output.prettyPrint);

        console.log(`\n💾 Token bilgileri kaydedildi:`);
        console.log(`   📁 ${this.tokenFilePath}`);
    }

    /**
     * Mevcut token'ın durumunu kontrol eder
     */
    checkExistingToken() {
        if (fileExists(this.tokenFilePath)) {
            const { readJsonFile } = require('./utils/fileUtils');
            const tokenData = readJsonFile(this.tokenFilePath);

            console.log('\n📋 Mevcut Token Durumu:');
            console.log('========================');

            if (isTokenValid(tokenData)) {
                const remainingTime = Math.floor((tokenData.expires_at - Date.now()) / 1000);
                console.log(`✅ Token geçerli (${remainingTime} saniye kalan)`);
            } else {
                console.log('❌ Token süresi dolmuş');
            }
        }
    }
}

/**
 * Ana fonksiyon
 */
async function main() {
    const app = new FirebaseTokenApp();

    // Mevcut token durumunu kontrol et
    app.checkExistingToken();

    // Yeni token üret
    await app.run();
}

// Programı çalıştır
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Beklenmeyen hata:', error);
        process.exit(1);
    });
}

module.exports = FirebaseTokenApp;
