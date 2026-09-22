import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FiveAgentVisual } from '../components/landing/FiveAgentVisual';
import { FeaturedInquiries } from '../components/landing/FeaturedInquiries';

interface LandingPageProps {
  onBeginInvestigation: (prefilledQuestion?: string) => void;
  onNavigateToWorkflow: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onBeginInvestigation,
  onNavigateToWorkflow,
}) => {
  const handleExploreWorkflow = () => {
    const el = document.getElementById('workflow-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigateToWorkflow();
    }
  };

  return (
    <div className="w-full">
      <HeroSection
        onBegin={() => onBeginInvestigation()}
        onExploreWorkflow={handleExploreWorkflow}
      />

      <FiveAgentVisual />

      <FeaturedInquiries
        onSelectInquiry={(q) => onBeginInvestigation(q)}
      />
    </div>
  );
};
