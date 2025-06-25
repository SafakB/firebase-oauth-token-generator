/**
 * Configuration Manager
 * Uygulama konfigürasyonunu yönetir
 */

const path = require('path');
const { readJsonFile } = require('./fileUtils');

class ConfigManager {
    constructor() {
        this.config = null;
        this.configPath = path.join(__dirname, '../../config/config.json');
    }

    /**
     * Konfigürasyonu yükler
     * @returns {Object} Konfigürasyon objesi
     */
    loadConfig() {
        if (!this.config) {
            this.config = readJsonFile(this.configPath);
        }
        return this.config;
    }

    /**
     * Belirli bir konfigürasyon değerini getirir
     * @param {string} key - Nokta notasyonlu anahtar (örn: 'firebase.defaultScopes')
     * @returns {*} Konfigürasyon değeri
     */
    get(key) {
        const config = this.loadConfig();
        return key.split('.').reduce((obj, k) => obj && obj[k], config);
    }

    /**
     * Service account dosyasının tam yolunu döner
     * @returns {string} Service account dosya yolu
     */
    getServiceAccountPath() {
        const relativePath = this.get('paths.serviceAccount');
        return path.resolve(__dirname, '../../', relativePath);
    }

    /**
     * Output klasörünün tam yolunu döner
     * @returns {string} Output klasör yolu
     */
    getOutputPath() {
        const relativePath = this.get('paths.outputDir');
        return path.resolve(__dirname, '../../', relativePath);
    }

    /**
     * Token dosyasının tam yolunu döner
     * @returns {string} Token dosya yolu
     */
    getTokenFilePath() {
        const outputDir = this.getOutputPath();
        const tokenFile = this.get('paths.tokenFile');
        return path.join(outputDir, tokenFile);
    }

    /**
     * Varsayılan Firebase scope'larını döner
     * @returns {Array<string>} Scope listesi
     */
    getDefaultScopes() {
        return this.get('firebase.defaultScopes');
    }

    /**
     * Mevcut tüm Firebase scope'larını döner
     * @returns {Array<string>} Scope listesi
     */
    getAvailableScopes() {
        return this.get('firebase.availableScopes');
    }
}

// Singleton instance
const configManager = new ConfigManager();

module.exports = configManager;
