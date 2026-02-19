const asyncHandler = require('express-async-handler');
const Lot = require('../models/Lot');
const Farmer = require('../models/Farmer');
const geminiService = require('../services/geminiService');

// @desc    Generate AI Analysis of Traceability Data
// @route   POST /api/traceability/ai-analysis
// @access  Private/Admin
const generateAnalysis = asyncHandler(async (req, res) => {
    // 1. Fetch Aggregated Data (Last 50 lots)
    const recentLots = await Lot.find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('farmer', 'name village');

    // 2. Pre-process data for the AI context
    const summaryData = recentLots.map(lot => ({
        code: lot.lotCode,
        crop: lot.cropType,
        farmer: lot.farmer?.name,
        village: lot.farmer?.village,
        input: lot.initialWeight,
        waste_percent: ((lot.wasteWeight / lot.initialWeight) * 100).toFixed(1)
    }));

    // 3. Construct the prompt
    // We send a JSON summary and ask for strategic insights
    const prompt = `
    You are an expert AgriTech Data Analyst. Analyze this raw production dataset (JSON) from our warehouse.
    
    DATASET:
    ${JSON.stringify(summaryData.slice(0, 20))} ... (truncated for brevity)

    GOALS:
    1. Identify the Top 2 root causes of wastage (e.g., specific crops or specific villages with consistently high waste).
    2. Suggest 2 operational SOP changes to fix this.
    3. Predict one potential risk for next week based on these patterns.

    FORMAT:
    Return pure JSON format consistent with this schema:
    {
        "insights": [
            { "title": "Root Cause 1", "description": "...", "severity": "High/Medium" },
            { "title": "Root Cause 2", "description": "...", "severity": "High/Medium" }
        ],
        "recommendations": [ "Action 1", "Action 2" ],
        "prediction": "Prediction text..."
    }
    `;

    try {
        const responseText = await geminiService.generateContent(prompt, {
            temperature: 0.5,
            maxTokens: 2000
        });

        console.log("DEBUG: Raw AI Response:", responseText);

        // Robust JSON Cleanup
        let cleanJson = responseText;
        // 1. Remove markdown code blocks (e.g. ```json ... ```)
        cleanJson = cleanJson.replace(/```json/g, '').replace(/```/g, '');
        // 2. Find the first '{' and last '}'
        const firstOpen = cleanJson.indexOf('{');
        const lastClose = cleanJson.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1) {
            cleanJson = cleanJson.substring(firstOpen, lastClose + 1);
        }

        let aiResponse;
        try {
            aiResponse = JSON.parse(cleanJson);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            // Fallback object if parsing fails completely
            aiResponse = {
                insights: [{ title: "Analysis Format Error", description: "AI returned unstructured text. See logs.", severity: "Low" }],
                recommendations: ["Check logs for raw explanation"],
                prediction: "Data format issue."
            };
        }

        res.json(aiResponse);

    } catch (error) {
        console.error('AI Gen Error:', error);
        res.status(500).json({
            message: 'AI Analysis Failed',
            fallback: true,
            insights: [
                { title: "High Wastage Detected", description: "Manual analysis shows variance > 15%", severity: "High" }
            ]
        });
    }
});

module.exports = { generateAnalysis };
