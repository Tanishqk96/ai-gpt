const aiService = require("../services/ai.service");

module.exports.getResponse = async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService.generateContent(prompt);
        res.send(response);
    } catch (error) {
        res.status(500).send("Error generating response");
    }
};
