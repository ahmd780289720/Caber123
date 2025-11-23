
import React, { useState } from 'react';
import { Shield, LayoutDashboard, BookOpen, Swords, MessageSquare, Award, Download, Share2, ExternalLink, Check, Link as LinkIcon } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  onInstallClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onInstallClick }) => {
  const [copied, setCopied] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'curriculum', label: 'الخطة الدراسية', icon: BookOpen },
    { id: 'practice', label: 'التحديات', icon: Swords },
    { id: 'tutor', label: 'المعلم الذكي', icon: MessageSquare },
    { id: 'profile', label: 'السجل الأكاديمي', icon: Award },
  ];

  const handleOpenStandalone = () => {
    // Opens the current page (iframe content) in a new tab
    window.open(window.location.href, '_blank');
  };

  const handleCopyLink = () => {
    // Copy the current window location (which is the iframe src in preview mode)
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-20 md:w-64 bg-slate-900 border-l border-slate-800 text-slate-100 z-40 shadow-2xl font-cairo transition-all duration-300 relative">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800 justify-center md:justify-start bg-slate-900 z-20">
        <Shield className="w-8 h-8 text-emerald-500" />
        <span className="text-xl font-bold tracking-wider hidden md:block text-emerald-400">سايبر كويست</span>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/5' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-emerald-400' : 'group-hover:text-slate-100'}`} />
              <span className="font-bold hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900 z-20">
        {/* Install Button */}
        <button
            onClick={onInstallClick}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-300 border bg-emerald-600 text-white hover:bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-900/20"
            title="تحميل التطبيق"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:block">تحميل التطبيق</span>
        </button>

        {/* Share / Open Standalone Buttons */}
        <div className="grid grid-cols-1 gap-2">
            <div className="flex gap-2">
                <button
                    onClick={handleOpenStandalone}
                    className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title="فتح في نافذة مستقلة"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs font-bold hidden md:block">فتح</span>
                </button>
                
                <button
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title="نسخ رابط التطبيق فقط"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <LinkIcon className="w-4 h-4" />}
                    <span className="text-xs font-bold hidden md:block">{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center px-1 hidden md:block">
                استخدم زر "نسخ الرابط" لمشاركة التطبيق بدون المحادثة.
            </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 hidden md:block text-center">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">نوع العضوية</p>
          <p className="text-sm font-medium text-slate-300">طالب جامعي</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
