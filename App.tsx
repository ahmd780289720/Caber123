
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CurriculumView from './components/CurriculumView';
import LessonReader from './components/LessonReader';
import QuizGame from './components/QuizGame';
import ChatTutor from './components/ChatTutor';
import { INITIAL_USER_STATE, LEVELS_DATA } from './constants';
import { Level, Lesson, UnderstandingLevel } from './types';
import { Download, X, Share2, Smartphone, Globe, ExternalLink, Copy, Check } from 'lucide-react';

// Flatten lessons for easy lookup
const getAllLessons = (levels: Level[]) => {
  const lessons: Record<string, Lesson> = {};
  levels.forEach(l => l.courses.forEach(c => c.modules.forEach(m => m.lessons.forEach(les => {
    lessons[les.id] = les;
  }))));
  return lessons;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'none' | 'quiz'>('none');
  const [userState, setUserState] = useState(INITIAL_USER_STATE);
  
  // PWA State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const allLessons = getAllLessons(LEVELS_DATA);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const handleStartChallenge = () => {
    setGameMode('quiz');
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  const handleLessonComplete = (understanding: UnderstandingLevel) => {
    // Logic to update stats would go here
    setUserState(prev => ({
      ...prev,
      xp: prev.xp + 50, // generic reward
      completedLessons: [...prev.completedLessons, activeLessonId || '']
    }));
    
    // Start a quick quiz after lesson
    setGameMode('quiz');
  };

  const handleExitGame = () => {
    setGameMode('none');
    setCurrentView('dashboard');
    setActiveLessonId(null);
  };
  
  const handleOpenInBrowser = () => {
    // Use noopener to prevent some security restrictions
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCurrentLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const renderView = () => {
    if (gameMode === 'quiz') {
      // Determine questions based on context (active lesson or daily challenge)
      // For demo, we pick random questions from the first lesson if no active lesson
      let questions = activeLessonId && allLessons[activeLessonId] 
        ? allLessons[activeLessonId].questions 
        : allLessons['l1-cia-triad'].questions; // Fallback

      return <QuizGame questions={questions} onComplete={(score) => {
        setUserState(prev => ({ ...prev, xp: prev.xp + score }));
        handleExitGame();
      }} onExit={handleExitGame} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userState={userState} onStartChallenge={handleStartChallenge} onInstallClick={handleInstallClick} />;
      case 'curriculum':
        return <CurriculumView levels={LEVELS_DATA} onSelectLesson={handleSelectLesson} />;
      case 'lesson':
        if (!activeLessonId || !allLessons[activeLessonId]) return <div>Loading...</div>;
        return <LessonReader lesson={allLessons[activeLessonId]} onComplete={handleLessonComplete} />;
      case 'tutor':
        return <ChatTutor />;
      default:
        return <Dashboard userState={userState} onStartChallenge={handleStartChallenge} onInstallClick={handleInstallClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-cairo text-slate-100" dir="rtl">
      {/* Install Instructions Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-6 text-emerald-500">
              <Download className="w-6 h-6" />
              <h3 className="text-xl font-bold">تحميل وتثبيت التطبيق</h3>
            </div>

            <div className="space-y-6">
              
              {/* Direct Link Section */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <label className="text-xs text-slate-400 font-bold mb-2 block">
                  1. انسخ رابط التطبيق المستقل (بدون محادثة):
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={window.location.href}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                  <button 
                    onClick={handleCopyCurrentLink}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors"
                    title="نسخ الرابط"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  هذا هو الرابط الذي يجب عليك فتحه في المتصفح (Chrome/Safari) لتتمكن من التثبيت، وليس الرابط الموجود في شريط العنوان حالياً.
                </p>
              </div>

              {/* Open Button Section */}
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
                 <button 
                   onClick={handleOpenInBrowser}
                   className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/20"
                 >
                   <ExternalLink className="w-4 h-4" />
                   2. أو اضغط هنا للفتح في المتصفح
                 </button>
              </div>

              {/* Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
                    <Smartphone className="w-4 h-4" /> الآيفون (Safari):
                  </h4>
                  <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside marker:text-emerald-500">
                    <li>اضغط زر <span className="bg-slate-700 px-1 rounded text-white">مشاركة</span> بالأسفل.</li>
                    <li>اختر <span className="bg-slate-700 px-1 rounded text-white">إضافة إلى الصفحة الرئيسية</span>.</li>
                  </ol>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4" /> الأندرويد (Chrome):
                  </h4>
                  <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside marker:text-emerald-500">
                    <li>اضغط <span className="bg-slate-700 px-1 rounded text-white">القائمة ⋮</span> بالأعلى.</li>
                    <li>اختر <span className="bg-slate-700 px-1 rounded text-white">Install App</span>.</li>
                  </ol>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowInstallModal(false)}
              className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      <Sidebar currentView={currentView} setView={setCurrentView} onInstallClick={handleInstallClick} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
        <div className="max-w-6xl mx-auto">
           {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
