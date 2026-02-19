const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Gemini AI Service
 * Handles all interactions with Google's Gemini API
 * Uses official @google/generative-ai SDK for stability and forward compatibility
 */

class GeminiService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.genAI = null;
        this.model = null;
        this.isInitialized = false;

        // Model configuration
        this.modelName = 'gemini-2.5-flash'; // User requested model

        // Alternative models (in order of preference)
        this.fallbackModels = [
            'gemini-2.0-flash-exp',
            'gemini-2.5-flash',
            'gemini-2.5-pro'
        ];

        this.initialize();
    }

    /**
     * Initialize the Gemini AI client
     */
    initialize() {
        if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
            console.warn('⚠️  Gemini API key not configured. AI features will use fallback responses.');
            this.isInitialized = false;
            return;
        }

        try {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ model: this.modelName });
            this.isInitialized = true;
            console.log(`✅ Gemini AI initialized successfully with model: ${this.modelName}`);
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error.message);
            this.isInitialized = false;
        }
    }

    /**
     * Generate AI content with automatic retry and fallback
     * @param {string} prompt - The prompt to send to the AI
     * @param {object} options - Generation options (temperature, maxTokens, etc.)
     * @param {number} retryCount - Internal retry counter (default: 0)
     * @returns {Promise<string>} - Generated text response
     */
    async generateContent(prompt, options = {}, retryCount = 0) {
        if (!this.isInitialized) {
            throw new Error('Gemini AI is not initialized. Check your API key.');
        }

        try {
            // Generation configuration
            const generationConfig = {
                temperature: options.temperature || 0.7,
                topK: options.topK || 40,
                topP: options.topP || 0.95,
                maxOutputTokens: options.maxTokens || 1024,
            };

            // Generate content
            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig,
            });

            const response = result.response;
            const text = response.text();

            if (!text) {
                throw new Error('Empty response from Gemini API');
            }

            return text;

        } catch (error) {
            console.error('AI Generation Error:', error.message);

            // Handle quota/rate limit errors (429)
            if (error.message.includes('429') ||
                error.message.includes('quota') ||
                error.message.includes('Too Many Requests') ||
                error.message.includes('Quota exceeded')) {

                // Extract retry delay from error if available
                let retryDelay = 5000; // Default 5 seconds
                try {
                    const retryMatch = error.message.match(/retry in ([\d.]+)s/i);
                    if (retryMatch) {
                        retryDelay = Math.ceil(parseFloat(retryMatch[1]) * 1000);
                    }
                } catch (e) {
                    // Use default delay
                }

                // If we haven't retried too many times, wait and retry
                if (retryCount < 2) {
                    console.log(`⏳ Quota exceeded. Retrying in ${retryDelay / 1000}s... (Attempt ${retryCount + 1}/2)`);
                    await this.sleep(retryDelay);
                    return await this.generateContent(prompt, options, retryCount + 1);
                }

                // If retries exhausted, try fallback models
                console.log('🔄 Quota exceeded on primary model. Trying fallback models...');
                return await this.tryFallbackModels(prompt, options);
            }

            // If it's a model not found error, try fallback models
            if (error.message.includes('not found') || error.message.includes('404')) {
                return await this.tryFallbackModels(prompt, options);
            }

            throw error;
        }
    }

    /**
     * Sleep utility for retry delays
     * @param {number} ms - Milliseconds to sleep
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Try alternative models if primary model fails
     */
    async tryFallbackModels(prompt, options) {
        for (const modelName of this.fallbackModels) {
            if (modelName === this.modelName) continue; // Skip already tried model

            try {
                console.log(`🔄 Trying fallback model: ${modelName}`);
                const fallbackModel = this.genAI.getGenerativeModel({ model: modelName });

                const generationConfig = {
                    temperature: options.temperature || 0.7,
                    topK: options.topK || 40,
                    topP: options.topP || 0.95,
                    maxOutputTokens: options.maxTokens || 1024,
                };

                const result = await fallbackModel.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig,
                });

                const text = result.response.text();

                if (text) {
                    console.log(`✅ Fallback model ${modelName} succeeded`);
                    // Update primary model for future requests
                    this.model = fallbackModel;
                    this.modelName = modelName;
                    return text;
                }
            } catch (error) {
                // If quota exceeded on fallback, continue to next model
                if (error.message.includes('429') ||
                    error.message.includes('quota') ||
                    error.message.includes('Too Many Requests')) {
                    console.warn(`⚠️  Fallback model ${modelName} also has quota issues. Trying next model...`);
                } else {
                    console.error(`❌ Fallback model ${modelName} failed:`, error.message);
                }
                continue;
            }
        }

        // If all models failed due to quota, provide helpful error message
        throw new Error('All Gemini models have exceeded quota limits. Please wait a few minutes or check your API billing plan. The system will use fallback responses.');
    }

    /**
     * Generate agricultural recommendation
     * Specialized method for crop/farming advice
     */
    async generateAgriRecommendation({ crop, soil, season, problem, language = 'en' }) {
        const languageMap = {
            hi: 'Hindi',
            mr: 'Marathi',
            en: 'English'
        };

        const targetLanguage = languageMap[language] || 'English';

        const prompt = `You are an agricultural expert helping Indian farmers.

Based on the following details:
- Crop: ${crop}
- Soil Type: ${soil}
- Season: ${season}
- Problem: ${problem || 'None reported'}

Provide a practical, farmer-friendly recommendation in SIMPLE ${targetLanguage} language.

Guidelines:
1. Explain the recommended approach (fertilizers, pesticides, irrigation, services)
2. Keep it concise (3-4 sentences maximum)
3. Use simple, easy-to-understand language
4. Focus on actionable advice
5. Consider local Indian farming practices

Response:`;

        try {
            return await this.generateContent(prompt, {
                temperature: 0.7,
                maxTokens: 500
            });
        } catch (error) {
            console.error('Agricultural recommendation generation failed:', error.message);
            throw error;
        }
    }

    /**
     * Check if AI service is ready
     */
    isReady() {
        return this.isInitialized;
    }

    /**
     * Get current model information
     */
    getModelInfo() {
        return {
            isInitialized: this.isInitialized,
            currentModel: this.modelName,
            fallbackModels: this.fallbackModels
        };
    }
}

// Export singleton instance
module.exports = new GeminiService();
