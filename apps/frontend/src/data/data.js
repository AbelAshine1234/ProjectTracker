export const initialPlatforms = [
  {
    id: 1, name: 'BM Admin Panel', type: 'web', status: 'active',
    description: 'Main control hub for platform management, configurations, and super-admin controls.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f1', name: 'Dashboard Analytics', subTasks: [
        { id: 's1', name: 'KPI Stat Cards', doneBy: '', status: 'done', addedToDocs: true },
        { id: 's2', name: 'Revenue Charts Integration', doneBy: '', status: 'in-progress', addedToDocs: false },
      ]},
      { id: 'f2', name: 'User Registration & OTP Auth', subTasks: [
        { id: 's3', name: 'BM Admin Panel Verification View', doneBy: '', status: 'review', addedToDocs: false },
      ]},
      { id: 'f3', name: 'Global System Audit Logs', subTasks: [
        { id: 's4', name: 'Audit Trail UI', doneBy: '', status: 'pending', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 2, name: 'Call Center', type: 'web', status: 'active',
    description: 'Operational hub for customer support, real-time agent booking assistance, and escalation resolution.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f4', name: 'Agent Dashboard', subTasks: [
        { id: 's5', name: 'Real-time Call Queue', doneBy: '', status: 'in-progress', addedToDocs: false },
      ]},
      { id: 'f5', name: 'Escalation Management', subTasks: [
        { id: 's6', name: 'Priority Escalation Workflow', doneBy: '', status: 'pending', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 3, name: 'Merchant Panel', type: 'web', status: 'active',
    description: 'Web interface for e-commerce merchants to manage products, view sales payouts, and process storefront updates.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f6', name: 'Product Management', subTasks: [
        { id: 's7', name: 'Product CRUD', doneBy: '', status: 'done', addedToDocs: true },
        { id: 's8', name: 'Bulk Image Upload', doneBy: '', status: 'review', addedToDocs: false },
      ]},
      { id: 'f7', name: 'Payout Dashboard', subTasks: [
        { id: 's9', name: 'Monthly Payout Reports', doneBy: '', status: 'pending', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 4, name: 'Corporate Panel', type: 'web', status: 'active',
    description: 'Dedicated portal for business clients, companies, and cooperatives to manage bulk orders, logistics corporate billing, and member access.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f8', name: 'Bulk Order Management', subTasks: [
        { id: 's10', name: 'Order Batch Upload', doneBy: '', status: 'in-progress', addedToDocs: false },
      ]},
      { id: 'f9', name: 'Role Permission Matrix', subTasks: [
        { id: 's11', name: 'Multi-user Access Controls', doneBy: '', status: 'pending', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 5, name: 'BM-Customer-ET', type: 'mobile', status: 'active',
    description: 'End-user facing mobile client for ordering, deliveries, tracking, and payments.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f10', name: 'User Registration & OTP Auth', subTasks: [
        { id: 's12', name: 'BM Admin Panel Verification View', doneBy: '', status: 'done', addedToDocs: true },
      ]},
      { id: 'f11', name: 'Order Real-time Tracking', subTasks: [
        { id: 's13', name: 'Client App UI Integration', doneBy: '', status: 'in-progress', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 6, name: 'BM-Driver-ET', type: 'mobile', status: 'active',
    description: 'Mobile tool for delivery riders to accept dispatch offers, optimize routing paths, and log delivery proof.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f12', name: 'Dispatch Accept/Reject', subTasks: [
        { id: 's14', name: 'Push Notification Flow', doneBy: '', status: 'done', addedToDocs: true },
      ]},
      { id: 'f13', name: 'Delivery Proof Logging', subTasks: [
        { id: 's15', name: 'Photo Upload + Signature', doneBy: '', status: 'review', addedToDocs: false },
      ]},
    ],
  },
  {
    id: 7, name: 'Merchant App', type: 'mobile', status: 'active',
    description: 'Fast, mobile-optimized counterpart for e-commerce store operations and order fulfillment alerts.',
    gitRepo: '', figmaLink: '', documentation: '',
    features: [
      { id: 'f14', name: 'Instant Order Dispatches', subTasks: [
        { id: 's16', name: 'Merchant Panel Sync Workflow', doneBy: '', status: 'in-progress', addedToDocs: false },
      ]},
      { id: 'f15', name: 'Order Fulfillment Alerts', subTasks: [
        { id: 's17', name: 'Real-time Push Notifications', doneBy: '', status: 'pending', addedToDocs: false },
      ]},
    ],
  },
];

export const initialBugs = [
  { id: 1, title: 'Driver Disconnect Socket Timeout', platform: 'BM-Driver-ET', platformId: 6, doneBy: '', status: 'in-progress', createdAt: '2026-06-20', attachments: [ { type: 'image', name: 'Screenshot of location glitch' }, { type: 'video', name: 'Screen recording of driver map canvas refresh error' } ] },
  { id: 2, title: 'Image Compress Failure on Product Upload', platform: 'Merchant Panel', platformId: 3, doneBy: '', status: 'review', createdAt: '2026-06-21', attachments: [ { type: 'file', name: 'Error_Log_NextJS_API.txt' } ] },
  { id: 3, title: 'OTP SMS Delivery Delay', platform: 'BM-Customer-ET', platformId: 5, doneBy: '', status: 'pending', createdAt: '2026-06-22', attachments: [] },
];

export const initialUsers = [
  { id: 1, username: 'Bethlehem T.', password: 'beth123', role: 'Admin-Master', accountStatus: 'active' },
  { id: 2, username: 'Yohannes K.', password: 'yohannes123', role: 'Call-Center-Agent', accountStatus: 'active' },
  { id: 3, username: 'Dawit M.', password: 'dawit123', role: 'Merchant-Owner', accountStatus: 'active' },
  { id: 4, username: 'External Merchant X', password: 'merchant123', role: 'Merchant-Owner', accountStatus: 'suspended' },
  { id: 5, username: 'Sara G.', password: 'sara123', role: 'Corporate-Manager', accountStatus: 'active' },
];

export const barData = [
  { label: 'Mon', value: 12 }, { label: 'Tue', value: 19 }, { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 }, { label: 'Fri', value: 30 }, { label: 'Sat', value: 18 }, { label: 'Sun', value: 10 }
];

export const lineData = [
  { label: 'Week 1', value: 45 }, { label: 'Week 2', value: 52 },
  { label: 'Week 3', value: 48 }, { label: 'Week 4', value: 70 }
];

export const recentOperations = [
  { id: 1, title: 'Merchant App Sync', description: 'Dawit M. pushed a new release', timestamp: '10 min ago', color: '#1A5C32' },
  { id: 2, title: 'Bug Reported', description: 'Driver Disconnect Socket Timeout', timestamp: '1 hr ago', color: '#DC2626' },
  { id: 3, title: 'Feature Approved', description: 'Global System Audit Logs', timestamp: '3 hr ago', color: '#3B82F6' },
  { id: 4, title: 'User Suspended', description: 'External Merchant X account disabled', timestamp: 'Yesterday', color: '#F59E0B' },
];
