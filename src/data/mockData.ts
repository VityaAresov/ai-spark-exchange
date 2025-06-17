export const agents = [
  {
    id: '1',
    name: 'Content Creator Pro',
    description: 'AI-powered tool for generating blog posts, social media content, and marketing copy. Includes SEO optimization and brand voice customization.',
    fullDescription: 'Content Creator Pro is a comprehensive AI-powered content generation platform designed for marketers, bloggers, and content creators. It combines advanced natural language processing with SEO optimization to help you create engaging, search-friendly content that resonates with your audience.',
    price: '$29/month',
    category: 'content',
    views: 2341,
    purchases: 156,
    rating: 4.8,
    reviewCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Webhooks', 'Zapier'],
    isReadyToLaunch: true,
    demoMessage: 'Write a blog post about sustainable living',
    sampleResponse: 'Here\'s a comprehensive blog post about sustainable living that covers eco-friendly practices, renewable energy, and waste reduction strategies...',
    features: ['AI Content Generation', 'SEO Optimization', 'Multi-format Support', 'Brand Voice Customization'],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Ivan',
        rating: 5,
        comment: 'Great grammar corrections! Saves me hours of editing work.',
        date: '2025-06-12',
        verified: true
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Anna',
        rating: 4,
        comment: 'Very helpful for content creation, though sometimes the suggestions could be more creative.',
        date: '2025-06-10',
        verified: true
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Mike',
        rating: 5,
        comment: 'Excellent tool! The SEO optimization features are particularly impressive.',
        date: '2025-06-08',
        verified: false
      }
    ]
  },
  {
    id: '2',
    name: 'Data Analytics Bot',
    description: 'Advanced analytics agent that processes CSV files, generates reports, and creates visualizations automatically.',
    fullDescription: 'Data Analytics Bot transforms raw data into actionable insights through automated analysis, visualization, and reporting. Perfect for businesses looking to make data-driven decisions without requiring technical expertise.',
    price: '$45/month',
    category: 'analytics',
    views: 1876,
    purchases: 234,
    rating: 4.6,
    reviewCount: 127,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Webhooks'],
    isReadyToLaunch: true,
    demoMessage: 'Analyze sales data for trends',
    sampleResponse: 'Based on your sales data, I\'ve identified a 23% increase in revenue during Q3, with the highest performing product categories being...',
    features: ['CSV Processing', 'Automated Reports', 'Data Visualization', 'Trend Analysis'],
    reviews: [
      {
        id: '4',
        userId: 'user4',
        userName: 'Sarah',
        rating: 4,
        comment: 'Sometimes slow to respond, but the analysis quality is excellent.',
        date: '2025-06-11',
        verified: true
      },
      {
        id: '5',
        userId: 'user5',
        userName: 'David',
        rating: 5,
        comment: 'Perfect for our monthly reports. Saves the team countless hours.',
        date: '2025-06-09',
        verified: true
      }
    ]
  },
  {
    id: '3',
    name: 'Customer Support Assistant',
    description: 'Intelligent chatbot for handling customer inquiries, ticket routing, and automated responses.',
    fullDescription: 'Customer Support Assistant provides 24/7 automated customer service with intelligent ticket routing, sentiment analysis, and personalized responses. Reduce support costs while improving customer satisfaction.',
    price: '$19/month',
    category: 'customer-service',
    views: 3421,
    purchases: 389,
    rating: 4.9,
    reviewCount: 203,
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Slack', 'Discord', 'Email'],
    isReadyToLaunch: true,
    demoMessage: 'I need help with my order',
    sampleResponse: 'I\'d be happy to help you with your order! Could you please provide your order number so I can look up the details and assist you better?',
    features: ['24/7 Support', 'Ticket Routing', 'Multi-channel Integration', 'Sentiment Analysis'],
    reviews: [
      {
        id: '6',
        userId: 'user6',
        userName: 'Lisa',
        rating: 5,
        comment: 'Outstanding customer service automation. Our response time improved dramatically.',
        date: '2025-06-13',
        verified: true
      }
    ]
  },
  {
    id: '4',
    name: 'Code Review Helper',
    description: 'Automated code analysis tool that identifies bugs, suggests improvements, and enforces coding standards.',
    fullDescription: 'Code Review Helper streamlines the development process by automatically analyzing code quality, identifying potential bugs, and suggesting improvements based on industry best practices and coding standards.',
    price: '$35/month',
    category: 'productivity',
    views: 1234,
    purchases: 78,
    rating: 4.5,
    reviewCount: 45,
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=225',
    hasFreeTrial: false,
    integrations: ['API', 'Webhooks', 'Slack'],
    isReadyToLaunch: false,
    demoMessage: 'Review this JavaScript function',
    sampleResponse: 'I\'ve analyzed your code and found 3 potential improvements: 1) Add input validation, 2) Use const instead of let for immutable variables, 3) Consider error handling...',
    features: ['Automated Code Analysis', 'Bug Detection', 'Best Practices', 'Integration Support'],
    reviews: [
      {
        id: '7',
        userId: 'user7',
        userName: 'Tom',
        rating: 4,
        comment: 'Good for catching common issues, but needs improvement for complex patterns.',
        date: '2025-06-07',
        verified: true
      }
    ]
  },
  {
    id: '5',
    name: 'Social Media Manager',
    description: 'Comprehensive social media management tool with content scheduling, hashtag optimization, and analytics.',
    fullDescription: 'Social Media Manager automates your social media presence with intelligent content scheduling, hashtag optimization, and performance analytics across multiple platforms.',
    price: '$25/month',
    category: 'content',
    views: 2890,
    purchases: 167,
    rating: 4.7,
    reviewCount: 98,
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Zapier'],
    isReadyToLaunch: true,
    demoMessage: 'Create a social media post about productivity',
    sampleResponse: '🚀 Boost your productivity with these 5 simple tips: 1) Time-block your schedule, 2) Use the 2-minute rule, 3) Batch similar tasks... #ProductivityHacks #WorkSmart',
    features: ['Content Scheduling', 'Hashtag Optimization', 'Multi-platform Support', 'Analytics Dashboard'],
    reviews: []
  },
  {
    id: '6',
    name: 'Email Marketing Optimizer',
    description: 'AI agent that optimizes email campaigns, personalizes content, and improves open rates.',
    fullDescription: 'Email Marketing Optimizer uses advanced AI to personalize email campaigns, optimize send times, and improve engagement rates through intelligent content suggestions and A/B testing.',
    price: '$39/month',
    category: 'writing',
    views: 1567,
    purchases: 89,
    rating: 4.4,
    reviewCount: 67,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225',
    hasFreeTrial: true,
    integrations: ['API', 'Email', 'Webhooks'],
    isReadyToLaunch: true,
    demoMessage: 'Optimize this email subject line',
    sampleResponse: 'I\'ve analyzed your subject line and suggest these improvements: 1) Add urgency with "Limited Time", 2) Personalize with recipient name, 3) Include benefit-focused language...',
    features: ['Email Personalization', 'A/B Testing', 'Send Time Optimization', 'Performance Analytics'],
    reviews: []
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

export const userPurchases = [
  {
    id: '1',
    name: 'Content Creator Pro',
    description: 'AI-powered content generation tool',
    purchaseDate: '2024-01-15',
    status: 'active',
    usage: 1247
  },
  {
    id: '3',
    name: 'Customer Support Assistant',
    description: 'Intelligent chatbot for customer service',
    purchaseDate: '2024-01-10',
    status: 'active',
    usage: 856
  }
];

export const paymentHistory = [
  {
    id: '1',
    date: '2024-01-15',
    agentName: 'Content Creator Pro',
    amount: '$29.00',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-10',
    agentName: 'Customer Support Assistant',
    amount: '$19.00',
    status: 'completed'
  },
  {
    id: '3',
    date: '2023-12-28',
    agentName: 'Data Analytics Bot',
    amount: '$45.00',
    status: 'refunded'
  }
];
