import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Explains why an answer was wrong and provides the correct context.
 */
export const explainWrongAnswer = async (question: string, userAnswer: string, correctAnswer: string, topic: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      السياق: تطبيق تعليمي للأمن السيبراني باللغة العربية.
      الموضوع: ${topic}
      السؤال: "${question}"
      إجابة المستخدم الخاطئة: "${userAnswer}"
      الإجابة الصحيحة: "${correctAnswer}"

      المهمة: اشرح بإيجاز (جملتين كحد أقصى) باللغة العربية لماذا إجابة المستخدم خاطئة ولماذا الإجابة الصحيحة هي الصواب. كن مشجعاً ومفيداً كأنك معلم جامعي.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "الإجابة غير صحيحة. يرجى مراجعة الدرس.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `خطأ. الإجابة الصحيحة هي ${correctAnswer}. (تعذر الاتصال بالمعلم الذكي)`;
  }
};

/**
 * Generates a simplified summary or alternative explanation if the user didn't understand the lesson.
 */
export const simplifyLesson = async (lessonContent: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      أنت معلم خصوصي للأمن السيبراني تتحدث العربية. الطالب لم يفهم محتوى الدرس التالي.
      
      المحتوى الأصلي:
      """
      ${lessonContent}
      """

      المهمة: أعد صياغة وتبسيط هذا المفهوم بكلمات سهلة جداً، واستخدم مثالاً من الحياة الواقعية (مثل المنزل، البريد، قفل الباب) لتوضيح الفكرة. اجعل الشرح أقل من 150 كلمة.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "الملخص غير متاح حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "لا يمكن توليد شرح مبسط في الوقت الحالي.";
  }
};

/**
 * Chatbot function for general tutoring
 */
export const askTutor = async (query: string, history: string[]): Promise<string> => {
  try {
    // Using Pro model with thinking for complex tutoring
    const model = "gemini-3-pro-preview"; 
    
    const prompt = `
      النظام: أنت "سايبر بوت"، معلم خبير في الأمن السيبراني في أكاديمية "سايبر كويست". تتحدث اللغة العربية بطلاقة.
      هدفك هو مساعدة الطلاب في فهم مفاهيم الأمن السيبراني والبرمجة والشبكات.
      
      سجل المحادثة:
      ${history.join('\n')}
      
      سؤال الطالب: ${query}
      
      أجب بدقة واختصار. إذا كان السؤال يتطلب كود برمجي، قدم أمثلة بلغة Python.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for better reasoning
      }
    });

    return response.text || "أواجه مشكلة في الاتصال بالسيرفر الرئيسي. حاول مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "خطأ في الاتصال بالمعلم الذكي.";
  }
};