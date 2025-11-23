import React, { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/geminiService';
import { Send, Bot, AlertTriangle } from 'lucide-react';

const ChatTutor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "أهلاً بك أيها العميل. أنا 'سايبر بوت'، مساعدك الذكي. اسألني عن أي شيء في أمن الشبكات، لغة بايثون، أو الاختراق الأخلاقي." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for context
    const history = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`);
    const response = await askTutor(userMsg, history);

    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden font-cairo">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
        <div className="bg-violet-500/20 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-violet-400" />
        </div>
        <div>
          <h3 className="font-bold text-white">المعلم الذكي (تصريح مستوى 4)</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            متصل
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tl-none' 
                : 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700'
            }`}>
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mb-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
                  <Bot className="w-3 h-3" /> CyberBot
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-slate-800 p-4 rounded-2xl rounded-tr-none border border-slate-700 flex items-center gap-2">
               <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-150"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل عن الجدران النارية، التشفير، أو البروتوكولات..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5 transform rotate-180" /> {/* Rotated for RTL feel if needed, though icon is generic */}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1 justify-center text-[10px] text-slate-500">
          <AlertTriangle className="w-3 h-3" />
          <span>الذكاء الاصطناعي قد يخطئ. تحقق دائماً من الأوامر الحساسة قبل تنفيذها.</span>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;