import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.API_KEY);

/**
 * Explains why an answer was wrong and provides the correct context.
 */
export const explainWrongAnswer = async (question: string, userAnswer: string, correctAnswer: string, topic: string): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      السياق: تطبيق تعليمي للأمن السيبراني باللغة العربية.
      الموضوع: ${topic}
      السؤال: "${question}"
      إجابة المستخدم الخاطئة: "${userAnswer}"
      الإجابة الصحيحة: "${correctAnswer}"

      المهمة: اشرح بإيجاز (جملتين كحد أقصى) باللغة العربية لماذا إجابة المستخدم خاطئة ولماذا الإجابة الصحيحة هي الصواب. كن مشجعاً ومفيداً كأنك معلم جامعي.
    `;

    const response = await model.generateContent(prompt);
    return response.response.text() || "الإجابة غير صحيحة. يرجى مراجعة الدرس.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `خطأ. الإجابة الصحيحة هي ${correctAnswer}. (تعذر الاتصال بالمعلم الذكي)`;
  }
};

export const simplifyLesson = async (lessonContent: string): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      أنت معلم خصوصي للأمن السيبراني تتحدث العربية. الطالب لم يفهم محتوى الدرس التالي:

      "${lessonContent}"

      المهمة: أعد صياغة وتبسيط هذا المفهوم بكلمات سهلة جداً، واستخدم مثالاً واقعياً. اجعل الشرح أقل من 150 كلمة.
    `;

    const response = await model.generateContent(prompt);
    return response.response.text() || "الملخص غير متاح حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "لا يمكن توليد شرح مبسط في الوقت الحالي.";
  }
};

export const askTutor = async (query: string, history: string[]): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-3-pro-preview" });

    const prompt = `
      النظام: أنت "سايبر بوت"، معلم خبير في الأمن السيبراني في أكاديمية "سايبر كويست". تتحدث العربية بطلاقة.
      سجل المحادثة:
      ${history.join('\n')}
      سؤال الطالب: ${query}
    `;

    const response = await model.generateContent(prompt);
    return response.response.text() || "أواجه مشكلة في الاتصال بالسيرفر الرئيسي. حاول مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "خطأ في الاتصال بالمعلم الذكي.";
  }
};
