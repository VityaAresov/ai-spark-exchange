
export const agents = [
  {
    id: '1',
    name: 'Content Creator Pro',
    description: 'AI-powered tool for generating blog posts, social media content, and marketing copy. Includes SEO optimization and brand voice customization.',
    price: '$29/month',
    category: 'content',
    views: 2341,
    purchases: 156,
    rating: 4.8,
    reviewCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Webhooks', 'Zapier'],
    isReadyToLaunch: true
  },
  {
    id: '2',
    name: 'Data Analytics Bot',
    description: 'Advanced analytics agent that processes CSV files, generates reports, and creates visualizations automatically.',
    price: '$45/month',
    category: 'analytics',
    views: 1876,
    purchases: 234,
    rating: 4.6,
    reviewCount: 127,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Webhooks'],
    isReadyToLaunch: true
  },
  {
    id: '3',
    name: 'Customer Support Assistant',
    description: 'Intelligent chatbot for handling customer inquiries, ticket routing, and automated responses.',
    price: '$19/month',
    category: 'customer-service',
    views: 3421,
    purchases: 389,
    rating: 4.9,
    reviewCount: 203,
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Slack', 'Discord', 'Email'],
    isReadyToLaunch: true
  },
  {
    id: '4',
    name: 'Code Review Helper',
    description: 'Automated code analysis tool that identifies bugs, suggests improvements, and enforces coding standards.',
    price: '$35/month',
    category: 'productivity',
    views: 1234,
    purchases: 78,
    rating: 4.5,
    reviewCount: 45,
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=225',
    hasFreeTrial: false,
    integrations: ['API', 'Webhooks', 'Slack'],
    isReadyToLaunch: false
  },
  {
    id: '5',
    name: 'Social Media Manager',
    description: 'Comprehensive social media management tool with content scheduling, hashtag optimization, and analytics.',
    price: '$25/month',
    category: 'content',
    views: 2890,
    purchases: 167,
    rating: 4.7,
    reviewCount: 98,
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Zapier'],
    isReadyToLaunch: true
  },
  {
    id: '6',
    name: 'Email Marketing Optimizer',
    description: 'AI agent that optimizes email campaigns, personalizes content, and improves open rates.',
    price: '$39/month',
    category: 'writing',
    views: 1567,
    purchases: 89,
    rating: 4.4,
    reviewCount: 67,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Email', 'Webhooks'],
    isReadyToLaunch: true
  }
];

export const mockUser = {
  id: '1',
  email: 'user@example.com',
  role: 'user',
  purchasedAgents: ['1', '3'],
  paymentHistory: [
    { date: '2024-01-15', agent: 'Content Creator Pro', amount: '$29.00' },
    { date: '2024-01-10', agent: 'Customer Support Assistant', amount: '$19.00' }
  ]
};

export const mockDeveloper = {
  id: '2',
  email: 'dev@example.com',
  role: 'developer',
  publishedAgents: ['1', '2'],
  totalEarnings: '$2,840',
  monthlyEarnings: '$420'
};
