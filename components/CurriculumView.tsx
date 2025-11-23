import React, { useState } from 'react';
import { Level } from '../types';
import { Lock, Play, Book, ChevronDown, ChevronUp } from 'lucide-react';

interface CurriculumViewProps {
  levels: Level[];
  onSelectLesson: (lessonId: string) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ levels, onSelectLesson }) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-cairo">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">خريطة العمليات الأكاديمية</h2>
        <p className="text-slate-400">أكمل المهام لتفتح مستويات تصريح أمني أعلى.</p>
      </div>

      {levels.map((level, levelIndex) => (
        <div key={level.id} className={`relative pr-8 pb-10 border-r-2 ${levelIndex === levels.length - 1 ? 'border-transparent' : 'border-slate-700'}`}>
          {/* Timeline Node */}
          <div className={`absolute -right-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 ${
            level.isLocked ? 'bg-slate-800 border-slate-600' : 'bg-emerald-900 border-emerald-500'
          }`}>
            <span className={`font-bold ${level.isLocked ? 'text-slate-500' : 'text-emerald-400'}`}>
              {level.id}
            </span>
          </div>

          <div className="mb-6 mr-4">
            <h3 className={`text-xl font-bold ${level.isLocked ? 'text-slate-500' : 'text-white'}`}>
              {level.title}
            </h3>
            <p className="text-slate-400 text-sm">{level.description}</p>
          </div>

          <div className="grid gap-4 mr-4">
            {level.courses.map((course) => (
              <div key={course.id} className={`bg-slate-800 border ${level.isLocked || course.isLocked ? 'border-slate-700 opacity-70' : 'border-slate-600 hover:border-emerald-500/50'} rounded-xl overflow-hidden transition-all`}>
                
                <button 
                  onClick={() => !level.isLocked && !course.isLocked && setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="w-full p-5 flex items-center justify-between text-right"
                  disabled={level.isLocked || course.isLocked}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${course.isLocked || level.isLocked ? 'bg-slate-700' : 'bg-blue-500/10 text-blue-400'}`}>
                      {course.isLocked || level.isLocked ? <Lock className="w-6 h-6" /> : <Book className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className={`font-bold ${course.isLocked || level.isLocked ? 'text-slate-400' : 'text-slate-100'}`}>{course.title}</h4>
                      <p className="text-xs text-slate-500">{course.description}</p>
                    </div>
                  </div>
                  {!(level.isLocked || course.isLocked) && (
                     expandedCourse === course.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />
                  )}
                </button>

                {/* Modules Expansion */}
                {expandedCourse === course.id && (
                  <div className="bg-slate-900/50 border-t border-slate-700 p-4 space-y-4">
                    {course.modules.length === 0 && <p className="text-slate-500 text-center text-sm">لا توجد وحدات متاحة حالياً في هذا المساق.</p>}
                    
                    {course.modules.map(module => (
                      <div key={module.id} className="space-y-2">
                        <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">{module.title}</h5>
                        <div className="space-y-2">
                          {module.lessons.map(lesson => (
                            <button 
                              key={lesson.id}
                              onClick={() => onSelectLesson(lesson.id)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-slate-300 group-hover:text-white font-medium">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                                <Play className="w-3 h-3" />
                                <span>ابـدأ</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurriculumView;