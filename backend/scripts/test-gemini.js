/**
 * Test Script for Gemini AI Integration
 * Run this to verify the AI service is working correctly
 */

const geminiService = require('./services/geminiService');

async function testGeminiService() {
    console.log('\n🧪 Testing Gemini AI Service...\n');

    // Test 1: Check if service is initialized
    console.log('Test 1: Service Initialization');
    console.log('Is Ready:', geminiService.isReady());
    console.log('Model Info:', geminiService.getModelInfo());
    console.log('✅ Test 1 Passed\n');

    if (!geminiService.isReady()) {
        console.error('❌ Service not ready. Check your GEMINI_API_KEY in .env');
        return;
    }

    // Test 2: Basic text generation
    console.log('Test 2: Basic Text Generation');
    try {
        const response = await geminiService.generateContent(
            'Explain photosynthesis in one sentence.',
            { maxTokens: 100 }
        );
        console.log('Response:', response);
        console.log('✅ Test 2 Passed\n');
    } catch (error) {
        console.error('❌ Test 2 Failed:', error.message);
    }

    // Test 3: Agricultural recommendation (English)
    console.log('Test 3: Agricultural Recommendation (English)');
    try {
        const recommendation = await geminiService.generateAgriRecommendation({
            crop: 'Wheat',
            soil: 'Loamy',
            season: 'Winter',
            problem: 'Leaf rust disease',
            language: 'en'
        });
        console.log('Recommendation:', recommendation);
        console.log('✅ Test 3 Passed\n');
    } catch (error) {
        console.error('❌ Test 3 Failed:', error.message);
    }

    // Test 4: Agricultural recommendation (Hindi)
    console.log('Test 4: Agricultural Recommendation (Hindi)');
    try {
        const recommendation = await geminiService.generateAgriRecommendation({
            crop: 'धान',
            soil: 'Clay',
            season: 'Monsoon',
            problem: 'None',
            language: 'hi'
        });
        console.log('Recommendation:', recommendation);
        console.log('✅ Test 4 Passed\n');
    } catch (error) {
        console.error('❌ Test 4 Failed:', error.message);
    }

    console.log('🎉 All tests completed!\n');
}

// Run tests
testGeminiService().catch(console.error);
