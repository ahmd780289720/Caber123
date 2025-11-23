
import React from 'react';
import { UserState } from '../types';
import { Flame, Heart, Star, Target, Clock, Zap, Swords, Smartphone, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  userState: UserState;
  onStartChallenge: () => void;
  onInstallClick: () => void;
}

const data = [
  { name: 'سبت', xp: 400 },
  { name: 'أحد', xp: 300 },
  { name: 'اثنين', xp: 600 },
  { name: 'ثلاثاء', xp: 200 },
  { name: 'أربعاء', xp: 800 },
  { name: 'خميس', xp: 450 },
  { name: 'جمعة', xp: 1250 },
];

const Dashboard: React.FC<DashboardProps> = ({ userState, onStartChallenge, onInstallClick }) => {
  return (
    <div className="space-y-8 animate-fade-in font-cairo">
      
      {/* Mobile Install Banner - High Visibility */}
      <div className="bg-gradient-to-r from-emerald-900/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-emerald-900/20">
         <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-xl animate-pulse">
               <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
               <h3 className="font-bold text-white text-lg">تثبيت تطبيق الأكاديمية</h3>
               <p className="text-emerald-100/70 text-sm">احصل على تجربة كاملة، تنبيهات، وتشغيل بدون إنترنت.</p>
            </div>
         </div>
         <button 
           onClick={onInstallClick} 
           className="w-full md:w-auto bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-50 transition-transform hover:scale-105 flex items-center justify-center gap-2"
         >
            <Download className="w-5 h-5" />
            تثبيت الآن
         </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <Flame className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold">حماس يومي</p>
            <p className="text-2xl font-bold text-white">{userState.streak} أيام</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold">نقاط الخبرة</p>
            <p className="text-2xl font-bold text-white">{userState.xp}</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-rose-500/20 rounded-xl">
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold">المحاولات</p>
            <p className="text-2xl font-bold text-white">{userState.hearts}/5</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold">المستوى الدراسي</p>
            <p className="text-2xl font-bold text-white">{userState.level}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Progress Chart */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">تحليل النشاط الأكاديمي</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">أسبوعي</span>
            </div>
          </div>
          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', direction: 'rtl' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="xp" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-4 opacity-10">
            <Zap className="w-32 h-32 text-emerald-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 relative z-10">مهمة الاختراق اليومية</h3>
          <p className="text-emerald-200/70 text-sm mb-6 relative z-10">
            حل 5 ألغاز تشفير سريعة لتأمين الشبكة والحصول على +50 نقطة خبرة.
          </p>

          <div className="flex items-center gap-2 text-emerald-400 text-sm mb-6 relative z-10">
            <Clock className="w-4 h-4" />
            <span>يتجدد خلال 4 س 20 د</span>
          </div>

          <button 
            onClick={onStartChallenge}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 relative z-10 flex justify-center items-center gap-2"
          >
            <Swords className="w-5 h-5" />
            ابدأ المهمة
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
