const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

// 🔑 API Key (Development only)
// ⚠️ Production-এ এই লাইনটি মুছে .env ব্যবহার করবে
const API_KEY = "AIzaSyCouy1lMsqkkpgvHCEbgx2BaKa4mNAe4rc";

class AIEngine {
  constructor() {
    this.model = new GoogleGenerativeAI(API_KEY).getGenerativeModel({ model: "gemini-pro" });
  }

  async generatePatch(prompt, currentCode, filePath) {
    const systemPrompt = `
You are a senior full-stack developer. Modify the file based on the prompt.
Return ONLY valid JSON with this exact structure:
{
  "operation": "create" | "update" | "delete",
  "newContent": "full file content here",
  "description": "brief description of changes"
}
Do NOT add markdown or explanations outside JSON.

File Path: ${filePath}
Current Code: ${currentCode || "// NEW FILE"}
Prompt: "${prompt}"
`;
    const result = await this.model.generateContent(systemPrompt);
    let json = result.response.text().trim();
    json = json.replace(/```json\n?|\n?```/g, "");
    return JSON.parse(json);
  }

  validatePath(filePath) {
    const normalized = path.normalize(filePath);
    if (!normalized.startsWith("client/") && !normalized.startsWith("server/")) {
      throw new Error("Unauthorized path: Must start with client/ or server/");
    }
  }
}

module.exports = AIEngine;
