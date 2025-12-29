import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { MOCK_GOALS, USER_PROFILE } from '../data/mockData';
import { generateGeminiContent } from '../utils/geminiApi';

/**
 * Performance View Component with AI Integration
 */
export const PerformanceView = () => {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGoals, setGeneratedGoals] = useState(null);
  const [showAvatar] = useState(false);

  const handleGenerateOKRs = async () => {
    setIsGenerating(true);
    const prompt = `Generate 3 professional OKRs (Objectives and Key Results) for a ${USER_PROFILE.role} working in ${USER_PROFILE.department}. Format them as a simple list. Just return the goals, no intro text.`;
    const content = await generateGeminiContent(prompt);
    
    // Simple parsing for demo purposes - splitting by newlines or bullets
    const parsedGoals = content.split(/\n/).filter(line => line.length > 5).map((goal, idx) => ({
      id: Date.now() + idx,
      title: goal.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, ''),
      progress: 0,
      status: "Not Started"
    }));
    
    setGeneratedGoals(parsedGoals.slice(0, 3)); // Take top 3
    setIsGenerating(false);
  };

  const acceptGoal = (goal) => {
    setGoals([...goals, goal]);
    setGeneratedGoals(generatedGoals.filter(g => g.id !== goal.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Performance & Growth</h2>
          <p className="text-slate-500 text-sm">Track your career progress and objectives</p>
        </div>
        <Button variant="magic" onClick={handleGenerateOKRs} loading={isGenerating} icon={Sparkles}>
          Suggest OKRs with AI
        </Button>
      </div>

      {generatedGoals && generatedGoals.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 animate-in slide-in-from-top-4">
          <div className="flex items-center space-x-2 text-indigo-700 mb-4">
            <Sparkles size={18} />
            <h3 className="font-semibold">AI Suggested Goals for your Role</h3>
          </div>
          <div className="space-y-3">
            {generatedGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-100 shadow-sm">
                <p className="text-sm text-slate-700 font-medium">{goal.title}</p>
                <Button variant="secondary" className="h-8 px-3 text-xs" onClick={() => acceptGoal(goal)}>Add to Goals</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-6">Current Objectives (OKRs)</h3>
            <div className="space-y-6">
              {goals.map(goal => (
                <div key={goal.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-slate-800">{goal.title}</p>
                      <p className="text-xs text-slate-500">Due: Dec 31, 2023</p>
                    </div>
                    <Badge type={goal.status === 'On Track' ? 'success' : goal.status === 'At Risk' ? 'warning' : 'neutral'}>{goal.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${goal.progress >= 75 ? 'bg-emerald-500' : goal.progress >= 40 ? 'bg-amber-500' : 'bg-slate-400'}`} style={{ width: `${goal.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 w-8">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Feedback & Reviews</h3>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600 border border-slate-200 overflow-hidden text-xs`}>
                  {showAvatar ? <img src="" alt="Sarah Connor" className="h-full w-full object-cover" /> : "SC"}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Sarah Connor</p>
                  <p className="text-xs text-slate-500">Oct 15, 2023 • Mid-Quarter Check-in</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">&quot;Alex is doing a great job leading the design system migration. Need to focus more on mentoring junior team members in the coming weeks.&quot;</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-slate-800 text-white border-none">
            <h3 className="font-semibold mb-2">Overall Rating</h3>
            <div className="flex items-end space-x-2">
              <span className="text-5xl font-bold">4.8</span>
              <span className="text-slate-400 mb-1">/ 5.0</span>
            </div>
            <p className="text-sm text-slate-400 mt-2">Top 5% of department</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Skills Matrix</h3>
            <div className="flex flex-wrap gap-2">
              {['UI Design', 'User Research', 'Prototyping', 'React', 'Design Systems', 'Team Leadership'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
