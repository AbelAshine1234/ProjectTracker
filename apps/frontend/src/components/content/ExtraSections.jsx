'use client';
import { useState } from 'react';

/* ============================================================
   Shared UI Helpers
   ============================================================ */
function Breadcrumb({ items, onSelect }) {
  return (
    <div className="doc-breadcrumb">
      <button className="doc-breadcrumb__home" onClick={() => onSelect && onSelect('overview')}>
        🏠
      </button>
      {items.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label;
        const id = typeof item === 'string' ? null : item.id;
        return (
          <span key={i}>
            <span className="doc-breadcrumb__sep">›</span>
            {i === items.length - 1 ? (
              <span className="doc-breadcrumb__current">{label}</span>
            ) : id && onSelect ? (
              <button className="doc-breadcrumb__link" onClick={() => onSelect(id)}>{label}</button>
            ) : (
              <span>{label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function Callout({ header, items }) {
  return (
    <div className="doc-callout">
      <div className="doc-callout__header">{header}</div>
      <ul className="doc-callout__list">
        {items.map((item, i) => <li key={i}>{typeof item === 'string' ? item : item}</li>)}
      </ul>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    done: { label: 'Done', cls: 'badge--done' },
    'in-progress': { label: 'In Progress', cls: 'badge--in-progress' },
    review: { label: 'Review', cls: 'badge--review' },
    pending: { label: 'Pending', cls: 'badge--pending' },
    archived: { label: 'Archived', cls: 'badge--archived' },
    open: { label: 'Open', cls: 'badge--open' },
    resolved: { label: 'Resolved', cls: 'badge--done' },
    passed: { label: 'Passed', cls: 'badge--passed' },
  };
  const s = map[status] || { label: status, cls: '' };
  return <span className={`doc-badge ${s.cls}`}>{s.label}</span>;
}

function FeatureBar({ color }) {
  return <span className="feature-bar" style={{ background: color }} />;
}

/* ============================================================
   CSS Mockup Screens (Browser / Phone)
   ============================================================ */
export function BrowserMockup({ title, url, children }) {
  return (
    <div className="css-mockup css-mockup--browser">
      <div className="css-mockup__header">
        <div className="css-mockup__dots">
          <span className="css-mockup__dot css-mockup__dot--red" />
          <span className="css-mockup__dot css-mockup__dot--yellow" />
          <span className="css-mockup__dot css-mockup__dot--green" />
        </div>
        <div className="css-mockup__address-bar">{url || 'https://bm-ecosystem.com/admin'}</div>
      </div>
      <div className="css-mockup__viewport">
        {children}
      </div>
    </div>
  );
}

export function PhoneMockup({ children }) {
  return (
    <div className="css-mockup css-mockup--phone">
      <div className="css-mockup__bezel">
        <div className="css-mockup__speaker" />
        <div className="css-mockup__screen">
          <div className="css-mockup__phone-header">
            <span className="css-mockup__phone-time">9:41</span>
            <div className="css-mockup__phone-icons">📶 🔋</div>
          </div>
          <div className="css-mockup__phone-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Documentation Sequence (Prev/Next Navigation)
   ============================================================ */
export const docSequence = [
  { id: 'overview', label: 'Overview' },
  { id: 'intro', label: 'Introduction' },
  { id: 'links', label: 'External Links & API Collections' },
  { id: 'git-repos', label: 'Git Repositories' },
  
  { id: 'granular-docs', label: 'Platform Documentation' },
  
  { id: 'granular-admin', label: 'Admin Panel Overview' },
  { id: 'feat-admin-login', label: 'Admin Panel Login' },
  { id: 'feat-admin-analytics', label: 'Admin Panel Dashboard Analytics' },
  { id: 'feat-admin-logs', label: 'Admin Panel Global System Audit Logs' },
  
  { id: 'granular-callcenter', label: 'Call Center Overview' },
  { id: 'feat-cc-agent', label: 'Call Center Agent Dashboard' },
  { id: 'feat-cc-escalation', label: 'Call Center Escalation Management' },
  
  { id: 'granular-merchant-panel', label: 'Merchant Panel Overview' },
  { id: 'feat-mp-products', label: 'Merchant Panel Product Management' },
  { id: 'feat-mp-payout', label: 'Merchant Panel Payout Dashboard' },
  
  { id: 'granular-corporate', label: 'Corporate Panel Overview' },
  { id: 'feat-corp-orders', label: 'Corporate Panel Bulk Order Management' },
  { id: 'feat-corp-role', label: 'Corporate Panel Role Permission Matrix' },
  
  { id: 'granular-customer', label: 'BM-Customer-ET Overview' },
  { id: 'feat-cust-reg', label: 'BM-Customer-ET User Registration & OTP Auth' },
  { id: 'feat-cust-tracking', label: 'BM-Customer-ET Order Real-time Tracking' },
  
  { id: 'granular-driver', label: 'BM-Driver-ET Overview' },
  { id: 'feat-drv-dispatch', label: 'BM-Driver-ET Dispatch Accept/Reject' },
  { id: 'feat-drv-proof', label: 'BM-Driver-ET Delivery Proof Logging' },
  
  { id: 'granular-merchant-app', label: 'Merchant App Overview' },
  { id: 'feat-ma-dispatch', label: 'Merchant App Instant Order Dispatches' },
  { id: 'feat-ma-alerts', label: 'Merchant App Order Fulfillment Alerts' },
  
  { id: 'feature-requests', label: 'Feature Requests Overview' },
  { id: 'fr-admin', label: 'Admin Panel Feature Requests' },
  { id: 'freq-admin-corp', label: 'Feature Request: Bulk Import' },
  { id: 'freq-admin-lang', label: 'Feature Request: Multi-Language' },
  { id: 'fr-merchant-app', label: 'Merchant App Feature Requests' },
  { id: 'freq-ma-offline', label: 'Feature Request: Offline Queue' },
  { id: 'freq-ma-forecast', label: 'Feature Request: Revenue Forecast' },
  { id: 'fr-customer', label: 'Client App Feature Requests' },
  { id: 'freq-cust-addresses', label: 'Feature Request: Saved Addresses' },
  { id: 'freq-cust-dark', label: 'Feature Request: Dark Mode' },
  
  { id: 'active-work-bugs', label: 'Active Work & Bug Reporting' },
  { id: 'active-bugs', label: 'Active Bugs' },
  { id: 'bug-admin-loop', label: 'Bug: Auth Loop Critical' },
  { id: 'bug-drv-socket', label: 'Bug: Driver Socket Timeout' },
  { id: 'bug-mp-upload', label: 'Bug: Image Compress Failure' },
  { id: 'bug-cust-sms', label: 'Bug: OTP SMS Delivery Delay' },
  { id: 'active-work', label: 'Active Work' },

  { id: 'qa', label: 'QA Overview' },
  { id: 'qa-admin', label: 'Admin Panel QA' },
  { id: 'qa-admin-us1', label: 'QA: Admin Login Auth' },
  { id: 'qa-admin-us2', label: 'QA: Dashboard Analytics Data' },
  { id: 'qa-callcenter', label: 'Call Center QA' },
  { id: 'qa-cc-us1', label: 'QA: Agent Call Queue' },
  { id: 'qa-merchant-panel', label: 'Merchant Panel QA' },
  { id: 'qa-mp-us1', label: 'QA: Product CRUD Validation' },
  { id: 'qa-corporate', label: 'Corporate Panel QA' },
  { id: 'qa-corp-us1', label: 'QA: Bulk Order Upload' },
  { id: 'qa-customer', label: 'BM-Customer-ET QA' },
  { id: 'qa-cust-us1', label: 'QA: OTP Auth Flow' },
  { id: 'qa-driver', label: 'BM-Driver-ET QA' },
  { id: 'qa-drv-us1', label: 'QA: Dispatch Accept Flow' },
  { id: 'qa-merchant-app', label: 'Merchant App QA' },
  { id: 'qa-ma-us1', label: 'QA: Order Dispatch Alert' },

  { id: 'all-other-docs', label: 'All Other Docs' },
];

export function PrevNextNav({ activeSection, onSelect }) {
  const index = docSequence.findIndex(item => item.id === activeSection);
  if (index === -1) return null;

  const prev = index > 0 ? docSequence[index - 1] : null;
  const next = index < docSequence.length - 1 ? docSequence[index + 1] : null;

  return (
    <div className="doc-prev-next">
      {prev ? (
        <button className="doc-prev-next__btn doc-prev-next__btn--prev" onClick={() => onSelect(prev.id)}>
          <span className="doc-prev-next__label">« Previous</span>
          <span className="doc-prev-next__title">{prev.label}</span>
        </button>
      ) : <div />}
      
      {next ? (
        <button className="doc-prev-next__btn doc-prev-next__btn--next" onClick={() => onSelect(next.id)}>
          <span className="doc-prev-next__label">Next »</span>
          <span className="doc-prev-next__title">{next.label}</span>
        </button>
      ) : <div />}
    </div>
  );
}

/* ============================================================
   2. PLATFORM DOCUMENTATION DATA
   ============================================================ */

const granularData = {
  'granular-admin': {
    name: 'Admin Panel',
    clientReqDoc: 'admin-requirements.doc',
    figmaLink: 'Figma (Master Design) – Admin',
    githubRepo: 'github.com/bm-ecosystem/admin-panel',
    postmanCollection: 'admin-postman-collection.json',
    features: [
      {
        id: 'feat-admin-login',
        name: 'Login',
        color: '#4CAF50',
        description: 'Provides secure, multi-layered administration access controls. Features JWT session validation, role assignment redirection, and integration with authentication audit logging.',
        subItems: [
          { name: 'Admin Panel Login Flow', requestedBy: 'Bethlehem T.', doneBy: 'Bethlehem T.', devPy: '2026-05-15', status: 'done' },
          { name: 'Client Details View', requestedBy: 'Sara G.', doneBy: 'Yohannes K.', devPy: '2026-06-01', status: 'in-progress' },
        ],
      },
      {
        id: 'feat-admin-analytics',
        name: 'Dashboard Analytics',
        color: '#2196F3',
        description: 'Aggregates and visualizes business critical metrics in real-time. Displays key performance indicators, live transaction charts, and system usage trends.',
        subItems: [
          { name: 'KPI Stat Cards', requestedBy: 'Bethlehem T.', doneBy: 'Bethlehem T.', devPy: '2026-05-20', status: 'done' },
          { name: 'Revenue Charts Integration', requestedBy: 'Dawit M.', doneBy: '', devPy: '2026-06-10', status: 'in-progress' },
        ],
      },
      {
        id: 'feat-admin-logs',
        name: 'Global System Audit Logs',
        color: '#F44336',
        description: 'Captures and monitors administrative interactions across the ecosystem for security and audit compliance.',
        subItems: [
          { name: 'Audit Trail UI', requestedBy: 'Yohannes K.', doneBy: '', devPy: '2026-07-01', status: 'pending' },
        ],
      },
    ],
  },
  'granular-callcenter': {
    name: 'Call Center',
    clientReqDoc: 'callcenter-requirements.doc',
    figmaLink: 'Figma (Master Design) – Call Center',
    githubRepo: 'github.com/bm-ecosystem/call-center',
    postmanCollection: 'callcenter-postman-collection.json',
    features: [
      {
        id: 'feat-cc-agent',
        name: 'Agent Dashboard',
        color: '#4CAF50',
        description: 'Enables customer support agents to handle ticket bookings, client queries, and dispatch adjustments in a centralized space.',
        subItems: [
          { name: 'Real-time Call Queue', requestedBy: 'Sara G.', doneBy: '', devPy: '2026-06-15', status: 'in-progress' },
        ],
      },
      {
        id: 'feat-cc-escalation',
        name: 'Escalation Management',
        color: '#F44336',
        description: 'Standardizes critical delivery disputes and operational failures with clear handler routing.',
        subItems: [
          { name: 'Priority Escalation Workflow', requestedBy: 'Bethlehem T.', doneBy: '', devPy: '2026-07-10', status: 'pending' },
        ],
      },
    ],
  },
  'granular-merchant-panel': {
    name: 'Merchant Panel',
    clientReqDoc: 'merchant-panel-requirements.doc',
    figmaLink: 'Figma (Master Design) – Merchant',
    githubRepo: 'github.com/bm-ecosystem/merchant-panel',
    postmanCollection: 'merchant-panel-postman-collection.json',
    features: [
      {
        id: 'feat-mp-products',
        name: 'Product Management',
        color: '#4CAF50',
        description: 'Allows merchant owners to configure items, inventories, pricing schemas, and sync descriptions instantly.',
        subItems: [
          { name: 'Product CRUD', requestedBy: 'Dawit M.', doneBy: 'Dawit M.', devPy: '2026-05-10', status: 'done' },
          { name: 'Bulk Image Upload', requestedBy: 'Dawit M.', doneBy: '', devPy: '2026-06-05', status: 'review' },
        ],
      },
      {
        id: 'feat-mp-payout',
        name: 'Payout Dashboard',
        color: '#2196F3',
        description: 'Provides merchant account logs, cash-out triggers, and monthly financial statement generators.',
        subItems: [
          { name: 'Monthly Payout Reports', requestedBy: 'Bethlehem T.', doneBy: '', devPy: '2026-07-01', status: 'pending' },
        ],
      },
    ],
  },
  'granular-corporate': {
    name: 'Corporate Panel',
    clientReqDoc: 'corporate-requirements.doc',
    figmaLink: 'Figma (Master Design) – Corporate',
    githubRepo: 'github.com/bm-ecosystem/corporate-panel',
    postmanCollection: 'corporate-panel-postman-collection.json',
    features: [
      {
        id: 'feat-corp-orders',
        name: 'Bulk Order Management',
        color: '#2196F3',
        description: 'Supports high-volume logistics requests via automated batch uploads and schedule integrations.',
        subItems: [
          { name: 'Order Batch Upload', requestedBy: 'Sara G.', doneBy: '', devPy: '2026-06-20', status: 'in-progress' },
        ],
      },
      {
        id: 'feat-corp-role',
        name: 'Role Permission Matrix',
        color: '#F44336',
        description: 'Configures client department operators with read/write access hierarchies.',
        subItems: [
          { name: 'Multi-user Access Controls', requestedBy: 'Yohannes K.', doneBy: '', devPy: '2026-07-15', status: 'pending' },
        ],
      },
    ],
  },
  'granular-customer': {
    name: 'BM-Customer-ET',
    clientReqDoc: 'customer-app-requirements.doc',
    figmaLink: 'Figma (Master Design) – Customer',
    githubRepo: 'github.com/bm-ecosystem/customer-app-et',
    postmanCollection: 'customer-app-postman-collection.json',
    features: [
      {
        id: 'feat-cust-reg',
        name: 'User Registration & OTP Auth',
        color: '#4CAF50',
        description: 'Handles customer onboarding, SMS OTP validations, and profile setup workflows.',
        subItems: [
          { name: 'Phone Verification View', requestedBy: 'Sara G.', doneBy: 'Sara G.', devPy: '2026-05-01', status: 'done' },
        ],
      },
      {
        id: 'feat-cust-tracking',
        name: 'Order Real-time Tracking',
        color: '#2196F3',
        description: 'Provides live map updates of assignments from pickup coordinates to delivery completion.',
        subItems: [
          { name: 'Client App UI Integration', requestedBy: 'Yohannes K.', doneBy: '', devPy: '2026-06-12', status: 'in-progress' },
        ],
      },
    ],
  },
  'granular-driver': {
    name: 'BM-Driver-ET',
    clientReqDoc: 'driver-app-requirements.doc',
    figmaLink: 'Figma (Master Design) – Driver',
    githubRepo: 'github.com/bm-ecosystem/driver-app-et',
    postmanCollection: 'driver-app-postman-collection.json',
    features: [
      {
        id: 'feat-drv-dispatch',
        name: 'Dispatch Accept/Reject',
        color: '#4CAF50',
        description: 'Manages driver matching queues, proximity calculations, and action timeout states.',
        subItems: [
          { name: 'Push Notification Flow', requestedBy: 'Yohannes K.', doneBy: 'Yohannes K.', devPy: '2026-04-28', status: 'done' },
        ],
      },
      {
        id: 'feat-drv-proof',
        name: 'Delivery Proof Logging',
        color: '#F44336',
        description: 'Enforces completion audits using signatures and picture updates.',
        subItems: [
          { name: 'Photo Upload + Signature', requestedBy: 'Yohannes K.', doneBy: '', devPy: '2026-06-18', status: 'review' },
        ],
      },
    ],
  },
  'granular-merchant-app': {
    name: 'Merchant App',
    clientReqDoc: 'merchant-app-requirements.doc',
    figmaLink: 'Figma (Master Design) – Merchant App',
    githubRepo: 'github.com/bm-ecosystem/merchant-app',
    postmanCollection: 'merchant-app-postman-collection.json',
    features: [
      {
        id: 'feat-ma-dispatch',
        name: 'Instant Order Dispatches',
        color: '#2196F3',
        description: 'Syncs vendor order statuses with delivery dispatch partners automatically.',
        subItems: [
          { name: 'Merchant Panel Sync Workflow', requestedBy: 'Dawit M.', doneBy: '', devPy: '2026-06-22', status: 'in-progress' },
        ],
      },
      {
        id: 'feat-ma-alerts',
        name: 'Order Fulfillment Alerts',
        color: '#F44336',
        description: 'Broadcasts dispatch arrivals and order cancellations with sound/haptic alarms.',
        subItems: [
          { name: 'Real-time Push Notifications', requestedBy: 'Dawit M.', doneBy: '', devPy: '2026-07-05', status: 'pending' },
        ],
      },
    ],
  },
};

export function GranularPlatformSection({ platformKey, onSelect }) {
  const data = granularData[platformKey];
  if (!data) return null;

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Platform Documentation', id: 'granular-docs' },
        data.name
      ]} onSelect={onSelect} />
      <h1 className="doc-section__title">{data.name}</h1>
      
      <Callout header={`📄 ${data.name.toUpperCase()}`} items={[
        <><strong>Client Req Doc:</strong> {data.clientReqDoc}</>,
        <><strong>Figma:</strong> {data.figmaLink}</>,
        <><strong>GitHub:</strong> <a className="doc-link" href={`https://${data.githubRepo}`} target="_blank" rel="noopener noreferrer">{data.githubRepo}</a></>,
        <><strong>Postman Collection:</strong> <a className="doc-link" href={`/${data.postmanCollection}`} target="_blank" rel="noopener noreferrer">{data.postmanCollection}</a></>,
      ]} />

      <h2 className="doc-section__heading">Platform Features</h2>
      <p className="doc-section__text">
        Click a feature below to view its granular specifications, developer assignments, and workflow statuses.
      </p>

      <ul className="doc-section__list">
        {data.features.map((feat, idx) => (
          <li key={idx} style={{ marginBottom: '14px' }}>
            <button 
              className="doc-link" 
              style={{ fontSize: '16px', textAlign: 'left', display: 'inline-block' }}
              onClick={() => onSelect(feat.id)}
            >
              🚀 {feat.name}
            </button>
            <p className="doc-section__text" style={{ margin: '4px 0 0 24px', fontSize: '14px', color: '#555' }}>
              {feat.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GranularFeatureSection({ activeSection, onSelect }) {
  // Find which platform contains this feature
  let matchedPlatform = null;
  let matchedFeature = null;
  let matchedPlatformKey = null;

  for (const pKey in granularData) {
    const feat = granularData[pKey].features.find(f => f.id === activeSection);
    if (feat) {
      matchedPlatform = granularData[pKey];
      matchedFeature = feat;
      matchedPlatformKey = pKey;
      break;
    }
  }

  if (!matchedPlatform || !matchedFeature) return null;

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Platform Documentation', id: 'granular-docs' },
        { label: matchedPlatform.name, id: matchedPlatformKey },
        matchedFeature.name
      ]} onSelect={onSelect} />
      
      <div className="feature-block__header" style={{ marginBottom: '20px', background: 'none', border: 'none', padding: 0 }}>
        <FeatureBar color={matchedFeature.color} />
        <h1 className="doc-section__title" style={{ margin: 0 }}>FEATURE: {matchedFeature.name}</h1>
      </div>

      <p className="doc-section__text" style={{ fontSize: '16px', lineHeight: '1.8' }}>
        {matchedFeature.description}
      </p>

      <h2 className="doc-section__heading">Sub-Tasks & Status Tracking</h2>
      <div className="feature-block">
        <div className="feature-block__table">
          <table>
            <thead>
              <tr>
                <th>Sub-Task</th>
                <th>Requested By</th>
                <th>Done By</th>
                <th>Dev Py</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {matchedFeature.subItems.map((sub, si) => (
                <tr key={si}>
                  <td><strong>{sub.name}</strong></td>
                  <td>{sub.requestedBy || '—'}</td>
                  <td>{sub.doneBy || '—'}</td>
                  <td>{sub.devPy}</td>
                  <td><StatusBadge status={sub.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="doc-section__text" style={{ marginTop: '20px' }}>
        <em>* Detailed narrative descriptions and logic for all features are in the separate Markdown Docs Panel.</em>
      </p>
    </section>
  );
}

/* ============================================================
   3. FEATURE REQUESTS DATA & VIEWS
   ============================================================ */

const featureRequests = {
  'freq-admin-corp': {
    id: 'freq-admin-corp',
    name: 'Corporate Account Bulk Import',
    platform: 'Admin Panel',
    requestedBy: 'Sara G. (Logistics Manager)',
    createdDate: '2026-06-10',
    targetDate: '2026-07-20',
    status: 'pending',
    description: 'Allows corporate partners to import thousands of delivery orders at once via Excel/CSV uploads. Integrates automatic address geocoding and batch price estimation.',
    details: [
      'File format support: XLSX, XLS, CSV.',
      'Auto-mapping interface to match client columns to system parameters.',
      'Real-time verification report for failed rows (e.g. wrong phone format).',
      'Geocoding cache to save API usage costs during massive batches.'
    ],
    mockupType: 'browser',
    mockupUrl: 'https://bm-ecosystem.com/admin/corporate/bulk-import'
  },
  'freq-admin-lang': {
    id: 'freq-admin-lang',
    name: 'Multi-language Dashboard Support',
    platform: 'Admin Panel',
    requestedBy: 'Bethlehem T. (Regional Director)',
    createdDate: '2026-06-15',
    targetDate: '2026-08-05',
    status: 'pending',
    description: 'Provides full translation of the Admin Dashboard UI into Amharic, Oromiffa, and Tigrinya for regional operations teams.',
    details: [
      'Localization keys extraction for all labels, placeholders, and charts.',
      'System settings switch toggling language instantly without page reloads.',
      'Amharic Gez fonts loading and rendering performance optimization.',
      'Database translations storage for dynamic content (e.g. category names).'
    ],
    mockupType: 'browser',
    mockupUrl: 'https://bm-ecosystem.com/admin/settings/localization'
  },
  'freq-ma-offline': {
    id: 'freq-ma-offline',
    name: 'Offline Order Queue Sync',
    platform: 'Merchant App',
    requestedBy: 'Dawit M. (Merchant Support Lead)',
    createdDate: '2026-06-08',
    targetDate: '2026-07-15',
    status: 'in-progress',
    description: 'Caches pending orders in local SQLite when cellular connection is lost and syncs them automatically with the backend when connection is restored.',
    details: [
      'Network status listener (NetInfo) triggering local database caching.',
      'Persistent storage holding order payloads, image blobs, and timestamps.',
      'Retry background scheduler with exponential backoff on reconnect.',
      'Visual status indicator (Syncing / Cached / Connected) on header bar.'
    ],
    mockupType: 'phone'
  },
  'freq-ma-forecast': {
    id: 'freq-ma-forecast',
    name: 'Revenue Forecast Widget',
    platform: 'Merchant App',
    requestedBy: 'Dawit M. (Merchant Support Lead)',
    createdDate: '2026-06-18',
    targetDate: '2026-08-10',
    status: 'pending',
    description: 'Calculates weekly sales predictions using historic merchant data to aid inventory planning.',
    details: [
      'Weekly aggregate sales queries computed asynchronously.',
      'Visual widget on the landing screen displaying simple trend charts.',
      'High/Low margin predictions based on product categories.',
      'PDF Export command for merchant owners to print statements.'
    ],
    mockupType: 'phone'
  },
  'freq-cust-addresses': {
    id: 'freq-cust-addresses',
    name: 'Saved Addresses Management',
    platform: 'Client App',
    requestedBy: 'Yohannes K. (Core UX)',
    createdDate: '2026-06-05',
    targetDate: '2026-06-25',
    status: 'done',
    description: 'Enables customers to save home, work, and custom addresses with specific delivery instructions.',
    details: [
      'Saved locations list item design in Profile Screen.',
      'Map selector PIN tool allowing exact latitude/longitude coordinates saving.',
      'Custom text fields for entry gate codes, building names, or landmarks.',
      'Auto-complete location suggest bar powered by Google Places API.'
    ],
    mockupType: 'phone'
  },
  'freq-cust-dark': {
    id: 'freq-cust-dark',
    name: 'Dark Mode Support',
    platform: 'Client App',
    requestedBy: 'Sara G. (Logistics Manager)',
    createdDate: '2026-06-20',
    targetDate: '2026-08-25',
    status: 'pending',
    description: 'Introduces full system-wide Dark Mode support for energy saving and night usage.',
    details: [
      'Color scheme design system tokens setup (dark-100 to dark-900).',
      'System preference reader styling app automatically.',
      'Map styling themes switching to dark mode coordinates vectors.',
      'Contrast ratio checking for WCAG AA compliance.'
    ],
    mockupType: 'phone'
  }
};

const featureRequestData = {
  'fr-admin': {
    platform: 'Admin Panel',
    requests: [
      { id: 'freq-admin-corp', name: 'Corporate Account Bulk Import', requestedBy: 'Sara G.', createdDate: '2026-06-10', status: 'pending' },
      { id: 'freq-admin-lang', name: 'Multi-language Dashboard Support', requestedBy: 'Bethlehem T.', createdDate: '2026-06-15', status: 'pending' },
    ],
  },
  'fr-merchant-app': {
    platform: 'Merchant App',
    requests: [
      { id: 'freq-ma-offline', name: 'Offline Order Queue Sync', requestedBy: 'Dawit M.', createdDate: '2026-06-08', status: 'in-progress' },
      { id: 'freq-ma-forecast', name: 'Revenue Forecast Widget', requestedBy: 'Dawit M.', createdDate: '2026-06-18', status: 'pending' },
    ],
  },
  'fr-customer': {
    platform: 'Client App',
    requests: [
      { id: 'freq-cust-addresses', name: 'Saved Addresses Management', requestedBy: 'Yohannes K.', createdDate: '2026-06-05', status: 'done' },
      { id: 'freq-cust-dark', name: 'Dark Mode Support', requestedBy: 'Sara G.', createdDate: '2026-06-20', status: 'pending' },
    ],
  },
};

export function FeatureRequestsLanding({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={['Feature Requests']} onSelect={onSelect} />
      <h1 className="doc-section__title">Feature Requests</h1>
      <Callout header="📝 FEATURE REQUESTS" items={[
        'Active work tracking is managed in the separate Active Work & Bug Reporting Panel.',
        'Completed requests are archived here.',
      ]} />
      <p className="doc-section__text">
        Select a platform from the sidebar to view its feature requests. Each request includes the requester, creation date, and current status.
      </p>
    </section>
  );
}

export function FeatureRequestSection({ requestKey, onSelect }) {
  const data = featureRequestData[requestKey];
  if (!data) return null;

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Feature Requests', id: 'feature-requests' },
        { label: data.platform, id: requestKey }
      ]} onSelect={onSelect} />
      <h1 className="doc-section__title">{data.platform} — Feature Requests</h1>
      <Callout header={`📝 ${data.platform.toUpperCase()}`} items={[
        'Completed requests are archived here.',
        'Active work is tracked in the Active Work & Bug Reporting panel.',
      ]} />

      <h2 className="doc-section__heading">Submitted Requests</h2>
      <p className="doc-section__text">
        Click any request title below to view its deep specification details, target timelines, and visual UI mockup schemes.
      </p>

      <div className="feature-block__table">
        <table>
          <thead>
            <tr>
              <th>Request Title</th>
              <th>Requested By</th>
              <th>Created Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.requests.map((req, i) => (
              <tr key={i} className="clickable-row" onClick={() => onSelect(req.id)}>
                <td><strong className="doc-link">🚀 {req.name}</strong></td>
                <td>{req.requestedBy}</td>
                <td>{req.createdDate}</td>
                <td><StatusBadge status={req.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FeatureRequestDetailView({ requestId, onSelect }) {
  const req = featureRequests[requestId];
  if (!req) return null;

  const renderMockupContent = () => {
    switch (requestId) {
      case 'freq-admin-corp':
        return (
          <div className="mock-view mock-view--upload">
            <div className="mock-upload-box">
              <span className="mock-upload-icon">📂</span>
              <span className="mock-upload-text">Select Excel or CSV File</span>
              <span className="mock-upload-sub text--muted">Drag and drop file here</span>
            </div>
            <div className="mock-progress-bar">
              <div className="mock-progress-fill" style={{ width: '65%' }}>65% Complete</div>
            </div>
            <div className="mock-log-output">
              <p className="success-line">✓ Row 1-285 Address resolved successfully.</p>
              <p className="warning-line">⚠️ Row 286 Phone number incorrect format, using fallback.</p>
            </div>
          </div>
        );
      case 'freq-admin-lang':
        return (
          <div className="mock-view mock-view--lang">
            <div className="mock-lang-selector">
              <strong>Select System Language:</strong>
              <div className="mock-lang-buttons">
                <button className="mock-btn btn--active">English</button>
                <button className="mock-btn">አማርኛ (Amharic)</button>
                <button className="mock-btn">Oromoo</button>
                <button className="mock-btn">ትግርኛ</button>
              </div>
            </div>
            <div className="mock-sample-panel">
              <h4>ቅንብሮች (Settings)</h4>
              <p>የእርስዎን መገለጫ እና ምርጫዎች እዚህ ያስተዳድሩ።</p>
            </div>
          </div>
        );
      case 'freq-ma-offline':
        return (
          <div className="mock-phone-view">
            <div className="mock-phone-status mock-phone-status--offline">
              ⚠️ NETWORK DISCONNECTED (OFFLINE MODE)
            </div>
            <div className="mock-phone-content">
              <h4>Pending Orders Queue</h4>
              <div className="mock-phone-card">
                <span>Order #48529 — Pending Sync</span>
                <span className="badge--pending">Cached</span>
              </div>
              <div className="mock-phone-card">
                <span>Order #48530 — Pending Sync</span>
                <span className="badge--pending">Cached</span>
              </div>
              <button className="mock-phone-btn">Force Sync (2 Items)</button>
            </div>
          </div>
        );
      case 'freq-ma-forecast':
        return (
          <div className="mock-phone-view">
            <div className="mock-phone-status mock-phone-status--online">
              📶 CONNECTED
            </div>
            <div className="mock-phone-content">
              <h4>Weekly Sales Forecast</h4>
              <div className="mock-chart-container">
                <div className="mock-chart-bar" style={{ height: '40%' }}>M</div>
                <div className="mock-chart-bar" style={{ height: '55%' }}>T</div>
                <div className="mock-chart-bar" style={{ height: '70%' }}>W</div>
                <div className="mock-chart-bar" style={{ height: '85%' }}>T</div>
                <div className="mock-chart-bar highlight" style={{ height: '95%' }}>F</div>
              </div>
              <div className="mock-forecast-summary">
                <p>Expected revenue: <strong>+18% increase</strong></p>
                <span className="text--muted">Based on 30-day inventory data</span>
              </div>
            </div>
          </div>
        );
      case 'freq-cust-addresses':
        return (
          <div className="mock-phone-view">
            <div className="mock-phone-content">
              <h4>📍 My Saved Places</h4>
              <div className="mock-addr-item">
                <strong>🏠 Home</strong>
                <p>Bole, Behind Edna Mall, Apt 4B</p>
                <span className="addr-instructions">"Call when at the front gate."</span>
              </div>
              <div className="mock-addr-item">
                <strong>💼 Office</strong>
                <p>Kazanchis, UNECA Road, Block 2</p>
              </div>
              <button className="mock-phone-btn btn--primary">+ Add New Address</button>
            </div>
          </div>
        );
      case 'freq-cust-dark':
        return (
          <div className="mock-phone-view mock-phone-view--dark">
            <div className="mock-phone-content">
              <h4>🌙 Dark Settings</h4>
              <div className="mock-toggle-row">
                <span>Enable Dark Theme</span>
                <span className="mock-switch active" />
              </div>
              <div className="mock-addr-item addr-item--dark">
                <strong>Current Trip</strong>
                <p>ETA: 12 mins • Driver: Alula H.</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Mockup interface spec details not specified.</div>;
    }
  };

  const platformFRKey = {
    'Admin Panel': 'fr-admin',
    'Merchant App': 'fr-merchant-app',
    'Client App': 'fr-customer',
  }[req.platform] || 'feature-requests';

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Feature Requests', id: 'feature-requests' },
        { label: req.platform, id: platformFRKey },
        req.name
      ]} onSelect={onSelect} />

      <div className="feature-block__header" style={{ marginBottom: '20px', background: 'none', border: 'none', padding: 0 }}>
        <FeatureBar color="#764ABC" />
        <h1 className="doc-section__title" style={{ margin: 0 }}>REQUEST: {req.name}</h1>
      </div>

      <Callout header="📋 REQUEST INFO" items={[
        <><strong>Platform:</strong> {req.platform}</>,
        <><strong>Requested By:</strong> {req.requestedBy}</>,
        <><strong>Created Date:</strong> {req.createdDate}</>,
        <><strong>Target Date:</strong> {req.targetDate}</>,
        <><strong>Status:</strong> <StatusBadge status={req.status} /></>,
      ]} />

      <h2 className="doc-section__heading">Description & Objective</h2>
      <p className="doc-section__text" style={{ fontSize: '16px', lineHeight: '1.8' }}>
        {req.description}
      </p>

      <h2 className="doc-section__heading">Key Implementation Criteria</h2>
      <ul className="doc-section__list">
        {req.details.map((item, idx) => (
          <li key={idx}>🔹 {item}</li>
        ))}
      </ul>

      <h2 className="doc-section__heading">Visual Mockup & Layout Preview</h2>
      <div className="mockup-container" style={{ margin: '24px 0 32px' }}>
        {req.mockupType === 'browser' ? (
          <BrowserMockup url={req.mockupUrl}>
            {renderMockupContent()}
          </BrowserMockup>
        ) : (
          <PhoneMockup>
            {renderMockupContent()}
          </PhoneMockup>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   4. ACTIVE WORK & BUG REPORTING DATA & VIEWS
   ============================================================ */

const bugsDetails = {
  'bug-admin-loop': {
    id: 'bug-admin-loop',
    platform: 'Admin Panel',
    bugTitle: 'Auth Loop Critical',
    doneBy: 'Bethlehem T.',
    createdDate: '2026-06-20',
    priority: 'CRITICAL',
    status: 'open',
    description: 'Admins are stuck in a redirect loop between /login and /dashboard when their JWT expires, causing high API request counts and client crash logs.',
    steps: [
      'Login as admin and open dashboard.',
      'Manually clear authorization cookies or wait for 15-minute token expiry.',
      'Refresh dashboard page.',
      'Observe browser looping repeatedly between /dashboard and /login redirect routes.'
    ],
    logs: `Error: TokenExpiredError: jwt expired
  at JWT.verify (/auth/jwt.js:14)
  at AuthMiddleware (/middlewares/auth.js:28)
  at Next.js RouteHandler (/app/api/dashboard/route.js:9)
Redirecting to /login...
Redirecting to /dashboard...
[API Server] Warning: 450 duplicate requests from IP 197.156.98.24 in 15 seconds.`,
    suggestedFix: 'Update the AuthMiddleware to check if the route is /login before triggering redirects. Clear local storage states immediately upon verifying token invalidity rather than waiting for next fetch catch.',
    mockupType: 'browser',
    mockupUrl: 'https://bm-ecosystem.com/admin/login?error=loop'
  },
  'bug-drv-socket': {
    id: 'bug-drv-socket',
    platform: 'BM-Driver-ET',
    bugTitle: 'Driver Disconnect Socket Timeout',
    doneBy: 'Yohannes K. (Assigned)',
    createdDate: '2026-06-20',
    priority: 'HIGH',
    status: 'in-progress',
    description: 'Driver location updates timeout on Socket.IO when the app goes to the background on iOS, marking drivers as offline.',
    steps: [
      'Open Driver app on iOS device.',
      'Accept active delivery dispatch.',
      'Lock screen or press Home button to send app to background.',
      'Observe location tracking dashboard showing status: DISCONNECTED after exactly 20 seconds.'
    ],
    logs: `[Socket.io] connection closed: transport close
[PingTimeout] no ping received within 20000ms
Driver status marked: OFFLINE
Warning: Order #48529 tracking lost while active.`,
    suggestedFix: 'Implement iOS Background Tasks API to acquire background execution tokens. Keep Socket connections alive by switching to long polling mode when backgrounded.',
    mockupType: 'phone'
  },
  'bug-mp-upload': {
    id: 'bug-mp-upload',
    platform: 'Merchant Panel',
    bugTitle: 'Image Compress Failure on Product Upload',
    doneBy: 'Dawit M. (Assigned)',
    createdDate: '2026-06-21',
    priority: 'MEDIUM',
    status: 'review',
    description: 'Uploading high-resolution PNG product photos (over 10MB) crashes the server sharp instance due to memory limits.',
    steps: [
      'Open Merchant product CRUD dashboard.',
      'Click upload photo and select 12MB PNG image.',
      'Submit form.',
      'Observe 502 Bad Gateway response on UI and Node server crashes.'
    ],
    logs: `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
sharp.metadata() failed trying to compress buffer size 12582912
[PM2] Server restarted due to memory failure.`,
    suggestedFix: 'Validate upload size on client-side (reject > 5MB). Use stream-based parsing instead of loading buffers completely into Node heap memory.',
    mockupType: 'browser',
    mockupUrl: 'https://bm-ecosystem.com/merchant/products/new'
  },
  'bug-cust-sms': {
    id: 'bug-cust-sms',
    platform: 'BM-Customer-ET',
    bugTitle: 'OTP SMS Delivery Delay',
    doneBy: 'Sara G. (Assigned)',
    createdDate: '2026-06-22',
    priority: 'HIGH',
    status: 'pending',
    description: 'SMS verification codes take over 5 minutes to arrive on Ethio Telecom numbers due to SMS gateway network timeouts.',
    steps: [
      'Open Customer app, enter mobile number.',
      'Submit request OTP.',
      'Observe countdown timer expiring without receiving SMS.',
      'Receive verification message 5 to 10 minutes later.'
    ],
    logs: `[SMS Gateway] Timeout after 30000ms trying to resolve sms.ethio.net
Retrying connection (1/3)...
Connection resolved but packet latency is 450000ms.`,
    suggestedFix: 'Add secondary backup SMS gateway provider (Twilio or local backup node) to trigger automatically if primary gateway fails to return 200 within 4 seconds.',
    mockupType: 'phone'
  }
};

const activeBugsData = [
  { id: 'bug-admin-loop', platform: 'Admin Panel', bugTitle: 'Auth Loop Critical', doneBy: 'Bethlehem T.', createdDate: '2026-06-20', logsAttached: true, status: 'open' },
  { id: 'bug-drv-socket', platform: 'BM-Driver-ET', bugTitle: 'Driver Disconnect Socket Timeout', doneBy: '', createdDate: '2026-06-20', logsAttached: true, status: 'in-progress' },
  { id: 'bug-mp-upload', platform: 'Merchant Panel', bugTitle: 'Image Compress Failure on Product Upload', doneBy: '', createdDate: '2026-06-21', logsAttached: true, status: 'review' },
  { id: 'bug-cust-sms', platform: 'BM-Customer-ET', bugTitle: 'OTP SMS Delivery Delay', doneBy: '', createdDate: '2026-06-22', logsAttached: false, status: 'pending' },
];

const activeWorkData = [
  { appName: 'Admin Panel', featureTitle: 'Revenue Charts Integration', doneBy: '', deadline: '2026-06-30', status: 'in-progress' },
  { appName: 'BM-Customer-ET', featureTitle: 'Client App UI Integration', doneBy: '', deadline: '2026-07-05', status: 'in-progress' },
  { appName: 'Merchant App', featureTitle: 'Merchant Panel Sync Workflow', doneBy: '', deadline: '2026-07-10', status: 'in-progress' },
  { appName: 'Call Center', featureTitle: 'Real-time Call Queue', doneBy: '', deadline: '2026-06-28', status: 'in-progress' },
];

export function ActiveBugsSection({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Active Work & Bug Reporting', id: 'active-work-bugs' },
        'Active Bugs'
      ]} onSelect={onSelect} />
      <h1 className="doc-section__title">Active Bugs</h1>
      <Callout header="🐛 BUG REPORTS" items={[
        'All active bugs across platforms',
        'Click any bug row below to view logs, steps to reproduce, and preview pictures.',
      ]} />

      <div className="feature-block__table">
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Bug Title</th>
              <th>Done By</th>
              <th>Created</th>
              <th>Logs</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeBugsData.map((bug, i) => (
              <tr key={i} className="clickable-row" onClick={() => onSelect(bug.id)}>
                <td><strong>{bug.platform}</strong></td>
                <td><strong className="doc-link">🐛 {bug.bugTitle}</strong></td>
                <td>{bug.doneBy || '—'}</td>
                <td>{bug.createdDate}</td>
                <td>{bug.logsAttached ? '📎 Yes' : 'No'}</td>
                <td><StatusBadge status={bug.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function BugReportDetailView({ bugId, onSelect }) {
  const bug = bugsDetails[bugId];
  if (!bug) return null;

  const renderMockupContent = () => {
    switch (bugId) {
      case 'bug-admin-loop':
        return (
          <div className="mock-view mock-view--error">
            <div className="mock-error-page">
              <span className="mock-error-icon">🔂</span>
              <h4>Too Many Redirects Detected</h4>
              <p className="text--muted">The browser has redirected too many times trying to authorize your credentials.</p>
              <button className="mock-btn btn--error">Reset Cookie Store</button>
            </div>
            <div className="mock-console-overlay">
              <span className="console-header">DevTools Console Output:</span>
              <pre className="console-log">
                [WARN] 11:34:02.129 Redirect to /dashboard triggered by token.
                [WARN] 11:34:02.158 Redirect to /login triggered by check.
                [ERROR] Auth token expired, redirect loop threshold breached!
              </pre>
            </div>
          </div>
        );
      case 'bug-drv-socket':
        return (
          <div className="mock-phone-view">
            <div className="mock-phone-status mock-phone-status--error">
              ⚠️ LOCATION SYNC FAILED
            </div>
            <div className="mock-phone-content">
              <h4>Tracking status: Off</h4>
              <div className="mock-phone-map">
                <span className="map-pin">📍</span>
                <span className="map-path-lost">------------- Lost connection</span>
              </div>
              <p className="text--muted" style={{ fontSize: '11px', marginTop: '12px' }}>
                Reason: Ping response timed out while application backgrounded.
              </p>
            </div>
          </div>
        );
      case 'bug-mp-upload':
        return (
          <div className="mock-view mock-view--upload">
            <div className="mock-upload-failed">
              <span className="mock-alert-icon">⚠️</span>
              <h4>Upload Failed: 502 Bad Gateway</h4>
              <p className="text--muted">The image compress service failed to parse the file buffer within the designated memory heap size.</p>
            </div>
          </div>
        );
      case 'bug-cust-sms':
        return (
          <div className="mock-phone-view">
            <div className="mock-phone-content">
              <h4>OTP Authorization</h4>
              <p className="text--muted" style={{ fontSize: '12px' }}>We sent a 4-digit code to +251 911 **** **</p>
              <div className="mock-otp-input">
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </div>
              <div className="mock-timer text--red">Resend Code in 0:00 (Gateway Timeout)</div>
            </div>
          </div>
        );
      default:
        return <div>Bug screen mockup details not specified.</div>;
    }
  };

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Active Work & Bug Reporting', id: 'active-work-bugs' },
        { label: 'Active Bugs', id: 'active-bugs' },
        bug.bugTitle
      ]} onSelect={onSelect} />

      <div className="feature-block__header" style={{ marginBottom: '20px', background: 'none', border: 'none', padding: 0 }}>
        <FeatureBar color="#C53030" />
        <h1 className="doc-section__title" style={{ margin: 0 }}>BUG: {bug.bugTitle}</h1>
      </div>

      <Callout header="🐛 BUG DETAILS" items={[
        <><strong>Platform:</strong> {bug.platform}</>,
        <><strong>Assigned / Done By:</strong> {bug.doneBy || '—'}</>,
        <><strong>Reported Date:</strong> {bug.createdDate}</>,
        <><strong>Priority:</strong> <span className={`text--${bug.priority.toLowerCase()}`} style={{ fontWeight: 700 }}>{bug.priority}</span></>,
        <><strong>Status:</strong> <StatusBadge status={bug.status} /></>,
      ]} />

      <h2 className="doc-section__heading">Issue Description</h2>
      <p className="doc-section__text" style={{ fontSize: '16px', lineHeight: '1.8' }}>
        {bug.description}
      </p>

      <h2 className="doc-section__heading">Steps to Reproduce</h2>
      <ul className="doc-section__list">
        {bug.steps.map((step, idx) => (
          <li key={idx}><strong>{idx + 1}.</strong> {step}</li>
        ))}
      </ul>

      <h2 className="doc-section__heading">Error Log / Trace Output</h2>
      <div className="console-log-box" style={{ background: '#1e1e1e', color: '#f8f8f2', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre-wrap', margin: '14px 0' }}>
        {bug.logs}
      </div>

      <h2 className="doc-section__heading">Suggested Core Fix</h2>
      <p className="doc-section__text">
        {bug.suggestedFix}
      </p>

      <h2 className="doc-section__heading">Visual Error / State Preview</h2>
      <div className="mockup-container" style={{ margin: '24px 0 32px' }}>
        {bug.mockupType === 'browser' ? (
          <BrowserMockup url={bug.mockupUrl}>
            {renderMockupContent()}
          </BrowserMockup>
        ) : (
          <PhoneMockup>
            {renderMockupContent()}
          </PhoneMockup>
        )}
      </div>
    </section>
  );
}

export function ActiveWorkSection({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'Active Work & Bug Reporting', id: 'active-work-bugs' },
        'Active Work'
      ]} onSelect={onSelect} />
      <h1 className="doc-section__title">Active Work</h1>
      <Callout header="🔨 IN-PROGRESS FEATURE REQUESTS" items={[
        'Currently active feature development across all platforms',
      ]} />

      <div className="feature-block__table">
        <table>
          <thead>
            <tr>
              <th>App Name</th>
              <th>Feature Title</th>
              <th>Done By</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeWorkData.map((work, i) => (
              <tr key={i}>
                <td><strong>{work.appName}</strong></td>
                <td>{work.featureTitle}</td>
                <td>{work.doneBy || '—'}</td>
                <td>{work.deadline}</td>
                <td><StatusBadge status={work.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ActiveWorkBugsLanding({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={['Active Work & Bug Reporting']} onSelect={onSelect} />
      <h1 className="doc-section__title">Active Work & Bug Reporting Panel</h1>
      <Callout header="📊 TRACKING PANEL" items={[
        'Active bugs and in-progress feature requests across all platforms',
        'Select a sub-section from the sidebar to view details',
      ]} />
      <p className="doc-section__text">
        This panel consolidates all active development work and bug reports. Use the sidebar to navigate between <strong>Active Bugs</strong> and <strong>Active Work</strong> (in-progress feature requests).
      </p>
    </section>
  );
}

/* ============================================================
   5. ALL OTHER DOCS
   ============================================================ */

export function AllOtherDocsSection({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={['All Other Docs']} onSelect={onSelect} />
      <h1 className="doc-section__title">All Other Docs</h1>
      <Callout header="📚 SUPPLEMENTARY DOCUMENTATION" items={[
        'Supplementary Specs, API references, external service docs, deployment guides',
      ]} />

      <h2 className="doc-section__heading">Supplementary Specs</h2>
      <ul className="doc-section__list">
        <li><strong>Payment Gateway Integration Spec</strong> — Detailed integration requirements for mobile money and card payment processors.</li>
        <li><strong>Notification Service Spec</strong> — Push notification delivery architecture for iOS, Android, and web platforms.</li>
        <li><strong>Geofencing & Zone Configuration</strong> — Delivery zone setup, pricing tiers, and coverage area management.</li>
      </ul>

      <h2 className="doc-section__heading">API References</h2>
      <ul className="doc-section__list">
        <li><strong>REST API v2 Reference</strong> — Complete endpoint documentation with request/response schemas.</li>
        <li><strong>WebSocket Events Reference</strong> — Real-time event catalog for Socket.IO connections.</li>
        <li><strong>Postman Collection</strong> — Pre-configured API testing collection with environment variables.</li>
      </ul>

      <h2 className="doc-section__heading">External Service Docs</h2>
      <ul className="doc-section__list">
        <li><strong>Google Maps Platform</strong> — Directions API, Geocoding, and Places API integration guides.</li>
        <li><strong>Twilio / SMS Gateway</strong> — OTP delivery and SMS notification service configuration.</li>
        <li><strong>Firebase Cloud Messaging</strong> — Push notification setup for mobile applications.</li>
      </ul>

      <h2 className="doc-section__heading">Deployment Guides</h2>
      <ul className="doc-section__list">
        <li><strong>Docker Compose Setup</strong> — Local development environment configuration and service orchestration.</li>
        <li><strong>CI/CD Pipeline</strong> — GitHub Actions workflow for automated testing and deployment.</li>
        <li><strong>Production Deployment</strong> — Server provisioning, SSL, Nginx, and monitoring setup.</li>
      </ul>

      <p className="doc-section__text">
        <em>* Code = Dev; Rev = Reviewed; Status = Workflow state (Soft Pill badges UI).</em>
      </p>
    </section>
  );
}

/* ============================================================
   6. QA (Quality Assurance) DATA & VIEWS
   ============================================================ */

const qaStoriesData = {
  'qa-admin': {
    platform: 'Admin Panel',
    stories: [
      { id: 'qa-admin-us1', title: 'US-001: Admin Login Authentication Validation', tester: 'QA Team', lastTested: '2026-06-22', status: 'passed' },
      { id: 'qa-admin-us2', title: 'US-002: Dashboard Analytics Data Accuracy', tester: 'QA Team', lastTested: '2026-06-21', status: 'in-progress' },
    ],
  },
  'qa-callcenter': {
    platform: 'Call Center',
    stories: [
      { id: 'qa-cc-us1', title: 'US-003: Agent Call Queue Display', tester: '', lastTested: '', status: 'pending' },
    ],
  },
  'qa-merchant-panel': {
    platform: 'Merchant Panel',
    stories: [
      { id: 'qa-mp-us1', title: 'US-004: Product CRUD Validation', tester: '', lastTested: '', status: 'pending' },
    ],
  },
  'qa-corporate': {
    platform: 'Corporate Panel',
    stories: [
      { id: 'qa-corp-us1', title: 'US-005: Bulk Order Upload Flow', tester: '', lastTested: '', status: 'pending' },
    ],
  },
  'qa-customer': {
    platform: 'BM-Customer-ET',
    stories: [
      { id: 'qa-cust-us1', title: 'US-006: OTP Auth Flow Validation', tester: '', lastTested: '', status: 'pending' },
    ],
  },
  'qa-driver': {
    platform: 'BM-Driver-ET',
    stories: [
      { id: 'qa-drv-us1', title: 'US-007: Dispatch Accept/Reject Flow', tester: '', lastTested: '', status: 'pending' },
    ],
  },
  'qa-merchant-app': {
    platform: 'Merchant App',
    stories: [
      { id: 'qa-ma-us1', title: 'US-008: Order Dispatch Alert Delivery', tester: '', lastTested: '', status: 'pending' },
    ],
  },
};

const qaStoryDetails = {
  'qa-admin-us1': {
    id: 'qa-admin-us1',
    platform: 'Admin Panel',
    title: 'US-001: Admin Login Authentication Validation',
    description: 'Validate that the admin login flow properly authenticates users with valid credentials and gracefully rejects invalid logins with appropriate error messages.',
    precondition: 'Admin user must have valid credentials. Login page must be accessible.',
    testSteps: [
      'Navigate to /admin/login page',
      'Enter valid username and password',
      'Click Sign In button',
      'Verify redirect to dashboard',
      'Log out and attempt login with invalid credentials',
      'Verify error message displayed without redirect',
    ],
    expectedResult: 'Valid credentials redirect to dashboard. Invalid credentials show error message on login page.',
    status: 'passed',
    tester: 'QA Team',
    lastTested: '2026-06-22',
  },
  'qa-admin-us2': {
    id: 'qa-admin-us2',
    platform: 'Admin Panel',
    title: 'US-002: Dashboard Analytics Data Accuracy',
    description: 'Verify that dashboard analytics widgets display accurate data matching the backend database aggregations.',
    precondition: 'Admin user must be logged in with dashboard access.',
    testSteps: [
      'Log in as admin and navigate to Dashboard',
      'Verify KPI stat cards show correct counts',
      'Cross-reference revenue chart data with database query results',
      'Verify real-time metrics update within expected latency',
    ],
    expectedResult: 'All dashboard metrics match backend data within acceptable tolerance.',
    status: 'in-progress',
    tester: 'QA Team',
    lastTested: '2026-06-21',
  },
  'qa-cc-us1': {
    id: 'qa-cc-us1',
    platform: 'Call Center',
    title: 'US-003: Agent Call Queue Display',
    description: 'Ensure the call center agent dashboard displays the real-time call queue with correct priority ordering and agent assignment status.',
    precondition: 'Agent must be logged in with active call queue permissions.',
    testSteps: [
      'Log in as call center agent',
      'Verify call queue loads within 2 seconds',
      'Verify calls are ordered by priority and wait time',
      'Test reassigning a call to another agent',
    ],
    expectedResult: 'Call queue displays correctly sorted by priority. Reassignment updates queue in real-time.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
  'qa-mp-us1': {
    id: 'qa-mp-us1',
    platform: 'Merchant Panel',
    title: 'US-004: Product CRUD Validation',
    description: 'Validate all CRUD operations on merchant products including image upload, pricing, and inventory updates.',
    precondition: 'Merchant user must be logged in with product management permissions.',
    testSteps: [
      'Create a new product with name, price, and image',
      'Verify product appears in product list',
      'Edit product price and verify update persists',
      'Delete product and verify removal from list',
    ],
    expectedResult: 'All CRUD operations complete successfully with data persisting correctly.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
  'qa-corp-us1': {
    id: 'qa-corp-us1',
    platform: 'Corporate Panel',
    title: 'US-005: Bulk Order Upload Flow',
    description: 'Verify that corporate users can upload bulk order files and receive proper validation feedback.',
    precondition: 'Corporate user must be logged in with bulk order permissions.',
    testSteps: [
      'Navigate to Bulk Order Upload page',
      'Upload a valid CSV file with 50 orders',
      'Verify file parsing and validation results',
      'Upload a file with invalid data and verify error reporting',
    ],
    expectedResult: 'Valid files process successfully. Invalid files show descriptive error messages per row.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
  'qa-cust-us1': {
    id: 'qa-cust-us1',
    platform: 'BM-Customer-ET',
    title: 'US-006: OTP Auth Flow Validation',
    description: 'Verify the OTP-based authentication flow works correctly for customer registration and login.',
    precondition: 'Customer must have a registered phone number.',
    testSteps: [
      'Open customer app and enter registered phone number',
      'Request OTP and verify SMS delivery within 30 seconds',
      'Enter correct OTP and verify successful login',
      'Request new OTP and verify old OTP is invalidated',
    ],
    expectedResult: 'OTP delivered within 30s. Correct OTP logs in. Old OTP invalidated on re-request.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
  'qa-drv-us1': {
    id: 'qa-drv-us1',
    platform: 'BM-Driver-ET',
    title: 'US-007: Dispatch Accept/Reject Flow',
    description: 'Ensure drivers can accept or reject dispatch offers with proper state updates.',
    precondition: 'Driver must be online and eligible for dispatches.',
    testSteps: [
      'Set driver to online status',
      'Trigger a dispatch offer to the driver',
      'Accept the offer and verify state change',
      'Reject next offer and verify driver remains available',
    ],
    expectedResult: 'Accepted offers move to assigned state. Rejected offers return to dispatch pool.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
  'qa-ma-us1': {
    id: 'qa-ma-us1',
    platform: 'Merchant App',
    title: 'US-008: Order Dispatch Alert Delivery',
    description: 'Verify that merchants receive push notifications for new orders and order status changes.',
    precondition: 'Merchant app must have notification permissions enabled.',
    testSteps: [
      'Place a test order through customer app for this merchant',
      'Verify push notification received on merchant app within 5 seconds',
      'Open notification and verify order detail screen loads',
      'Verify notification badge count increments correctly',
    ],
    expectedResult: 'Push notifications delivered within 5s. Tapping notification opens correct order.',
    status: 'pending',
    tester: '',
    lastTested: '',
  },
};

export function QALanding({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={['QA']} onSelect={onSelect} />
      <h1 className="doc-section__title">Quality Assurance</h1>
      <Callout header="✅ QA TESTING DASHBOARD" items={[
        'User story validation and test case tracking across all platforms',
        'Select a platform from the sidebar to view its QA user stories',
      ]} />
      <p className="doc-section__text">
        This section tracks QA validation for all platform user stories. Each story includes preconditions, test steps, expected results, and pass/fail status. Select a platform from the sidebar to view its test cases.
      </p>
    </section>
  );
}

export function QAPlatformSection({ qaKey, onSelect }) {
  const data = qaStoriesData[qaKey];
  if (!data) return null;

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'QA', id: 'qa' },
        { label: data.platform, id: qaKey }
      ]} onSelect={onSelect} />
      <h1 className="doc-section__title">{data.platform} — QA User Stories</h1>
      <Callout header={`✅ ${data.platform.toUpperCase()} QA`} items={[
        'Test cases and validation results for user stories',
        'Click any story below to view detailed test steps and results',
      ]} />

      <div className="feature-block__table">
        <table>
          <thead>
            <tr>
              <th>Story ID</th>
              <th>Test Title</th>
              <th>Tester</th>
              <th>Last Tested</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.stories.map((story, i) => (
              <tr key={i} className="clickable-row" onClick={() => onSelect(story.id)}>
                <td><strong>{story.id.split('-').pop().toUpperCase()}</strong></td>
                <td><strong className="doc-link">🧪 {story.title}</strong></td>
                <td>{story.tester || '—'}</td>
                <td>{story.lastTested || '—'}</td>
                <td><StatusBadge status={story.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function QAStoryDetailView({ storyId, onSelect }) {
  const story = qaStoryDetails[storyId];
  if (!story) return null;

  const qaPlatformKey = {
    'Admin Panel': 'qa-admin',
    'Call Center': 'qa-callcenter',
    'Merchant Panel': 'qa-merchant-panel',
    'Corporate Panel': 'qa-corporate',
    'BM-Customer-ET': 'qa-customer',
    'BM-Driver-ET': 'qa-driver',
    'Merchant App': 'qa-merchant-app',
  }[story.platform] || 'qa';

  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={[
        { label: 'QA', id: 'qa' },
        { label: story.platform, id: qaPlatformKey },
        story.title
      ]} onSelect={onSelect} />

      <div className="feature-block__header" style={{ marginBottom: '20px', background: 'none', border: 'none', padding: 0 }}>
        <FeatureBar color="#38A169" />
        <h1 className="doc-section__title" style={{ margin: 0 }}>{story.title}</h1>
      </div>

      <Callout header="🧪 QA TEST DETAILS" items={[
        <><strong>Platform:</strong> {story.platform}</>,
        <><strong>Tester:</strong> {story.tester || '—'}</>,
        <><strong>Last Tested:</strong> {story.lastTested || '—'}</>,
        <><strong>Status:</strong> <StatusBadge status={story.status} /></>,
      ]} />

      <h2 className="doc-section__heading">Description</h2>
      <p className="doc-section__text" style={{ fontSize: '16px', lineHeight: '1.8' }}>
        {story.description}
      </p>

      <h2 className="doc-section__heading">Preconditions</h2>
      <p className="doc-section__text">{story.precondition}</p>

      <h2 className="doc-section__heading">Test Steps</h2>
      <ul className="doc-section__list">
        {story.testSteps.map((step, idx) => (
          <li key={idx}><strong>{idx + 1}.</strong> {step}</li>
        ))}
      </ul>

      <h2 className="doc-section__heading">Expected Result</h2>
      <p className="doc-section__text">{story.expectedResult}</p>
    </section>
  );
}

/* ============================================================
   2. GRANULAR DOCS LANDING
   ============================================================ */

export function GranularDocsLanding({ onSelect }) {
  return (
    <section className="doc-section doc-section--animate">
      <Breadcrumb items={['Platform Documentation']} />
      <h1 className="doc-section__title">Platform Documentation</h1>
      <Callout header="🔍 PLATFORM DETAILS" items={[
        'Per-platform feature breakdown with developer assignments and status tracking',
        'Each platform includes: Client Req Doc, Figma link, and feature sub-tasks',
      ]} />
      <p className="doc-section__text">
        Select a platform from the sidebar to view its detailed feature documentation. Each feature includes sub-tasks with <strong>Done By</strong>, <strong>Dev Priority date</strong>, and <strong>Status</strong> (workflow state shown as soft pill badges).
      </p>
      <p className="doc-section__text">
        <em>* Detailed narrative descriptions and logic for all features are in the separate Markdown Docs Panel.</em>
      </p>
    </section>
  );
}
