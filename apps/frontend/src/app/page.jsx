'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import DocSidebar from '@/components/layout/DocSidebar';
import RightComments from '@/components/layout/RightComments';
import {
  OverviewSection,
  IntroSection,
  LinksSection,
  GitReposSection,
} from '@/components/content/DocSections';
import {
  GranularDocsLanding,
  GranularPlatformSection,
  GranularFeatureSection,
  FeatureRequestsLanding,
  FeatureRequestSection,
  FeatureRequestDetailView,
  ActiveWorkBugsLanding,
  ActiveBugsSection,
  BugReportDetailView,
  ActiveWorkSection,
  AllOtherDocsSection,
  QALanding,
  QAPlatformSection,
  QAStoryDetailView,
  PrevNextNav,
} from '@/components/content/ExtraSections';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarWide, setIsSidebarWide] = useState(false);
  const currentUser = useSelector(s => s.ui.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.replace('/login');
  }, [currentUser, router]);

  if (!currentUser) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection key="overview" onSelect={setActiveSection} />;
      case 'intro':
        return <IntroSection key="intro" onSelect={setActiveSection} />;
      case 'links':
        return <LinksSection key="links" onSelect={setActiveSection} />;
      case 'git-repos':
        return <GitReposSection key="git-repos" onSelect={setActiveSection} />;
      
      // Section 2: Platform Documentation
      case 'granular-docs':
        return <GranularDocsLanding key="granular-docs" onSelect={setActiveSection} />;
      case 'granular-admin':
      case 'granular-callcenter':
      case 'granular-merchant-panel':
      case 'granular-corporate':
      case 'granular-customer':
      case 'granular-driver':
      case 'granular-merchant-app':
        return <GranularPlatformSection key={activeSection} platformKey={activeSection} onSelect={setActiveSection} />;
      
      // Platform Features
      case 'feat-admin-login':
      case 'feat-admin-analytics':
      case 'feat-admin-logs':
      case 'feat-cc-agent':
      case 'feat-cc-escalation':
      case 'feat-mp-products':
      case 'feat-mp-payout':
      case 'feat-corp-orders':
      case 'feat-corp-role':
      case 'feat-cust-reg':
      case 'feat-cust-tracking':
      case 'feat-drv-dispatch':
      case 'feat-drv-proof':
      case 'feat-ma-dispatch':
      case 'feat-ma-alerts':
        return <GranularFeatureSection key={activeSection} activeSection={activeSection} onSelect={setActiveSection} />;

      // Section 3: Feature Requests
      case 'feature-requests':
        return <FeatureRequestsLanding key="feature-requests" onSelect={setActiveSection} />;
      case 'fr-admin':
      case 'fr-merchant-app':
      case 'fr-customer':
        return <FeatureRequestSection key={activeSection} requestKey={activeSection} onSelect={setActiveSection} />;

      // Feature Request Detail Views
      case 'freq-admin-corp':
      case 'freq-admin-lang':
      case 'freq-ma-offline':
      case 'freq-ma-forecast':
      case 'freq-cust-addresses':
      case 'freq-cust-dark':
        return <FeatureRequestDetailView key={activeSection} requestId={activeSection} onSelect={setActiveSection} />;

      // Section 4: Active Work & Bug Reporting
      case 'active-work-bugs':
        return <ActiveWorkBugsLanding key="active-work-bugs" onSelect={setActiveSection} />;
      case 'active-bugs':
        return <ActiveBugsSection key="active-bugs" onSelect={setActiveSection} />;
      case 'active-work':
        return <ActiveWorkSection key="active-work" onSelect={setActiveSection} />;

      // Bug Detail Views
      case 'bug-admin-loop':
      case 'bug-drv-socket':
      case 'bug-mp-upload':
      case 'bug-cust-sms':
        return <BugReportDetailView key={activeSection} bugId={activeSection} onSelect={setActiveSection} />;

      // Section 5: QA
      case 'qa':
      case 'qa-landing':
        return <QALanding key="qa" onSelect={setActiveSection} />;
      case 'qa-admin':
      case 'qa-callcenter':
      case 'qa-merchant-panel':
      case 'qa-corporate':
      case 'qa-customer':
      case 'qa-driver':
      case 'qa-merchant-app':
        return <QAPlatformSection key={activeSection} qaKey={activeSection} onSelect={setActiveSection} />;

      // QA Story Detail Views
      case 'qa-admin-us1':
      case 'qa-admin-us2':
      case 'qa-cc-us1':
      case 'qa-mp-us1':
      case 'qa-corp-us1':
      case 'qa-cust-us1':
      case 'qa-drv-us1':
      case 'qa-ma-us1':
        return <QAStoryDetailView key={activeSection} storyId={activeSection} onSelect={setActiveSection} />;

      // Section 6: All Other Docs
      case 'all-other-docs':
        return <AllOtherDocsSection key="all-other-docs" onSelect={setActiveSection} />;

      default:
        return <OverviewSection key="overview-default" />;
    }
  };

  return (
    <div className="doc-layout" style={{ '--sidebar-width': isSidebarWide ? '360px' : '260px' }}>
      <DocSidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
        isWide={isSidebarWide}
        onToggleWide={() => setIsSidebarWide(!isSidebarWide)}
      />
      <main className="doc-main">
        <div className="doc-content-area">
          {renderContent()}
          <PrevNextNav activeSection={activeSection} onSelect={setActiveSection} />
        </div>
        <RightComments activeSection={activeSection} />
      </main>
    </div>
  );
}
