import { useState } from 'react';
import type { AppView } from './types/navigation';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { ResearchPage } from './pages/ResearchPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [prefilledQuestion, setPrefilledQuestion] = useState<string>('');

  const handleNavigateToResearch = (questionText?: string) => {
    if (questionText) {
      setPrefilledQuestion(questionText);
    }
    setCurrentView('research');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToWorkflow = () => {
    setCurrentView('workflow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-coral/15 selection:text-ink antialiased">
      {/* Masthead Navigation */}
      <Header
        activeView={currentView}
        onSelectView={handleSelectView}
      />

      {/* Main View Shell */}
      <main className="flex-1 w-full flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onBeginInvestigation={handleNavigateToResearch}
            onNavigateToWorkflow={handleNavigateToWorkflow}
          />
        )}

        {currentView === 'research' && (
          <ResearchPage
            initialQuestion={prefilledQuestion}
          />
        )}

        {currentView === 'workflow' && (
          <WorkflowPage
            onBeginInvestigation={() => handleNavigateToResearch()}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onBeginInvestigation={() => handleNavigateToResearch()}
          />
        )}
      </main>

      {/* Architectural Colophon & Footer */}
      <Footer />
    </div>
  );
}

export default App;
