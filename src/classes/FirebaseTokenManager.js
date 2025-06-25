/**
 * Firebase OAuth 2.0 Access Token Manager
 * Firebase Service Account kullanarak OAuth 2.0 Access Token oluşturur
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

class FirebaseTokenManager {
    /**
     * FirebaseTokenManager constructor
     * @param {string} serviceAccountPath - Service account JSON dosyasının yolu
     * @param {Array<string>} scopes - OAuth 2.0 scope'ları
     */
    constructor(serviceAccountPath, scopes = ['https://www.googleapis.com/auth/firebase.messaging']) {
        this.serviceAccountPath = serviceAccountPath;
        this.scopes = scopes;
    }

    /**
     * Service Account dosyasını yükler
     * @returns {Object} Service account anahtarları
     * @throws {Error} Dosya okunamadığında hata fırlatır
     */
    loadServiceAccount() {
        try {
            const serviceAccountKey = JSON.parse(
                fs.readFileSync(this.serviceAccountPath, 'utf8')
            );
            return serviceAccountKey;
        } catch (error) {
            throw new Error(`Service account dosyası okunamadı: ${error.message}`);
        }
    }

    /**
     * OAuth 2.0 Access Token alır
     * @returns {Promise<Object>} Token bilgileri
     * @throws {Error} Token alınamadığında hata fırlatır
     */
    async getAccessToken() {
        try {
            const serviceAccount = this.loadServiceAccount();
            
            // JWT Auth client oluştur
            const jwtClient = new google.auth.JWT(
                serviceAccount.client_email,
                null,
                serviceAccount.private_key,
                this.scopes,
                null
            );

            // Token al
            const tokens = await jwtClient.authorize();
            
            return {
                access_token: tokens.access_token,
                token_type: tokens.token_type || 'Bearer',
                expires_in: tokens.expiry_date ? Math.floor((tokens.expiry_date - Date.now()) / 1000) : 3600,
                expires_at: tokens.expiry_date || (Date.now() + 3600000),
                scope: this.scopes.join(' ')
            };
        } catch (error) {
            throw new Error(`Token alınamadı: ${error.message}`);
        }
    }

    /**
     * Token bilgilerini konsola yazdırır
     * @param {Object} tokenData - Token verileri
     */
    displayTokenInfo(tokenData) {
        console.log('\n🔐 Firebase OAuth 2.0 Access Token Bilgileri:');
        console.log('================================================');
        console.log(`🎫 Access Token: ${tokenData.access_token.substring(0, 50)}...`);
        console.log(`📋 Token Type: ${tokenData.token_type}`);
        console.log(`⏱️  Expires In: ${tokenData.expires_in} saniye (${Math.floor(tokenData.expires_in / 60)} dakika)`);
        console.log(`📅 Expires At: ${new Date(tokenData.expires_at).toLocaleString('tr-TR')}`);
        console.log(`🔍 Scope: ${tokenData.scope}`);
        console.log('================================================\n');
    }

    /**
     * Postman için kullanıma hazır header formatı döner
     * @param {Object} tokenData - Token verileri
     * @returns {Object} Postman header objesi
     */
    getPostmanFormat(tokenData) {
        return {
            'Authorization': `${tokenData.token_type} ${tokenData.access_token}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * cURL için kullanıma hazır header formatı döner
     * @param {Object} tokenData - Token verileri
     * @returns {string} cURL header string'i
     */
    getCurlFormat(tokenData) {
        return `-H "Authorization: ${tokenData.token_type} ${tokenData.access_token}" -H "Content-Type: application/json"`;
    }
}

module.exports = FirebaseTokenManager;
