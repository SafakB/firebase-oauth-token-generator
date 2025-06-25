/**
 * Firebase Token Generator Utility Functions
 * Dosya işlemleri ve validation fonksiyonları
 */

const fs = require('fs');
const path = require('path');

/**
 * Dosyanın varlığını kontrol eder
 * @param {string} filePath - Kontrol edilecek dosya yolu
 * @returns {boolean} Dosya var mı?
 */
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

/**
 * JSON dosyasını güvenli şekilde okur
 * @param {string} filePath - Okunacak JSON dosyasının yolu
 * @returns {Object} JSON verisi
 * @throws {Error} Dosya okunamadığında veya JSON parse edilemediğinde
 */
function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`JSON dosyası okunamadı (${filePath}): ${error.message}`);
    }
}

/**
 * JSON dosyasını güvenli şekilde yazar
 * @param {string} filePath - Yazılacak dosya yolu
 * @param {Object} data - Yazılacak veri
 * @param {boolean} prettyPrint - Güzel format mı?
 */
function writeJsonFile(filePath, data, prettyPrint = true) {
    try {
        const jsonString = prettyPrint ? JSON.stringify(data, null, 2) : JSON.stringify(data);
        fs.writeFileSync(filePath, jsonString, 'utf8');
    } catch (error) {
        throw new Error(`JSON dosyası yazılamadı (${filePath}): ${error.message}`);
    }
}

/**
 * Service account dosyasını validate eder
 * @param {Object} serviceAccount - Service account verisi
 * @returns {boolean} Geçerli mi?
 */
function validateServiceAccount(serviceAccount) {
    const requiredFields = [
        'type',
        'project_id',
        'private_key_id',
        'private_key',
        'client_email',
        'client_id',
        'auth_uri',
        'token_uri'
    ];

    return requiredFields.every(field => serviceAccount.hasOwnProperty(field));
}

/**
 * Token'ın geçerli olup olmadığını kontrol eder
 * @param {Object} tokenData - Token verisi
 * @returns {boolean} Token geçerli mi?
 */
function isTokenValid(tokenData) {
    if (!tokenData || !tokenData.expires_at) {
        return false;
    }
    
    return Date.now() < tokenData.expires_at;
}

/**
 * Timestamp'i okunabilir formata çevirir
 * @param {number} timestamp - Unix timestamp
 * @param {string} locale - Locale kodu (default: 'tr-TR')
 * @returns {string} Formatlanmış tarih
 */
function formatTimestamp(timestamp, locale = 'tr-TR') {
    return new Date(timestamp).toLocaleString(locale);
}

/**
 * Klasör yoksa oluşturur
 * @param {string} dirPath - Oluşturulacak klasör yolu
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

module.exports = {
    fileExists,
    readJsonFile,
    writeJsonFile,
    validateServiceAccount,
    isTokenValid,
    formatTimestamp,
    ensureDirectoryExists
};
