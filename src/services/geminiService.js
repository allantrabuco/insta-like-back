import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateDescriptionWithGemini = async (imageBuffer, fileExtension) => {
  const prompt = "Generate a description in Brazilian Portuguese for the following image";
  // const prompt = "Gere uma descricao em portugues do brasil para a seguinte image";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: `image/${fileExtension}`
      }
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text unavailable";
  } catch (error) {
    console.error("An error occurred while trying to get alt-text\n", error)
    throw new Error("An error occurred while trying to get Gemini alt-text\n")
  }
}

export default generateDescriptionWithGemini;
