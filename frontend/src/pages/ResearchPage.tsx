import React, { useEffect } from 'react';
import { useResearch } from '../hooks/useResearch';
import { ResearchInput } from '../components/research/ResearchInput';
import { TimelineProgress } from '../components/research/TimelineProgress';
import { RecentInquiries } from '../components/research/RecentInquiries';
import { ResearchDossier } from '../components/dossier/ResearchDossier';
import { ErrorState } from '../components/common/ErrorState';
import { FiveAgentPipeline } from '../components/workflow/FiveAgentPipeline';

interface ResearchPageProps {
  initialQuestion?: string;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({
  initialQuestion = '',
}) => {
  const {
    workspaceState,
    question,
    setQuestion,
    result,
    error,
    secondsElapsed,
    isLongRunning,
    startInvestigation,
    cancelInvestigation,
    continueWaiting,
    retryInvestigation,
    resetToInput,
  } = useResearch();

  // If navigated from landing page with a prefilled question, populate it
  useEffect(() => {
    if (initialQuestion && workspaceState === 'input') {
      setQuestion(initialQuestion);
    }
  }, [initialQuestion, workspaceState, setQuestion]);

  const pipelineStage =
    workspaceState === 'researching'
      ? 'researching'
      : workspaceState === 'results'
      ? 'results'
      : 'idle';

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main Content Area: 8 or 9 columns */}
        <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
          {workspaceState === 'input' && (
            <>
              <ResearchInput
                initialQuestion={question || initialQuestion}
                onSubmit={startInvestigation}
                isLoading={false}
              />
              <RecentInquiries
                onSelectQuestion={(q) => {
                  setQuestion(q);
                  startInvestigation(q);
                }}
              />
            </>
          )}

          {workspaceState === 'researching' && (
            <TimelineProgress
              question={question}
              secondsElapsed={secondsElapsed}
              isLongRunning={isLongRunning}
              onCancel={cancelInvestigation}
              onContinueWaiting={continueWaiting}
            />
          )}

          {workspaceState === 'results' && result && (
            <ResearchDossier
              data={result}
              onNewInvestigation={resetToInput}
            />
          )}

          {workspaceState === 'error' && error && (
            <ErrorState
              error={error}
              onRetry={retryInvestigation}
              onBackToQuestion={resetToInput}
            />
          )}
        </div>

        {/* Persistent 5-Agent Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2 sticky top-24">
          <FiveAgentPipeline
            currentStage={pipelineStage}
            className="border border-rule shadow-paper-sm"
          />
        </div>
      </div>
    </div>
  );
};
