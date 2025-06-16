
export const agents = [
  {
    id: '1',
    name: 'GrammarBot',
    description: 'Corrects grammar mistakes in text instantly with AI-powered suggestions.',
    price: '$5/month',
    category: 'writing',
    views: 1547,
    purchases: 89,
    fullDescription: 'GrammarBot is an advanced AI-powered grammar correction tool that analyzes your text and provides instant, accurate corrections. It understands context, tone, and style to offer suggestions that improve your writing quality.',
    features: [
      'Real-time grammar checking',
      'Context-aware corrections',
      'Style suggestions',
      'Multi-language support',
      'API integration'
    ],
    demoMessage: 'Send me any text and I\'ll help you fix grammar mistakes!',
    sampleResponse: 'I\'ve analyzed your text and found 2 grammar improvements. Here\'s the corrected version: [Your text with corrections highlighted]'
  },
  {
    id: '2',
    name: 'DataAnalyzer Pro',
    description: 'Analyzes datasets and generates insights with visualizations and reports.',
    price: '$15/month',
    category: 'analytics',
    views: 892,
    purchases: 156,
    fullDescription: 'DataAnalyzer Pro transforms raw data into actionable insights through advanced statistical analysis and machine learning algorithms.',
    features: [
      'Statistical analysis',
      'Data visualization',
      'Predictive modeling',
      'Custom reports',
      'CSV/Excel integration'
    ],
    demoMessage: 'Upload your dataset or describe your data analysis needs!',
    sampleResponse: 'Based on your data, I\'ve identified 3 key trends and generated visualizations. The correlation analysis shows strong relationships between variables X and Y.'
  },
  {
    id: '3',
    name: 'ContentCreator AI',
    description: 'Generates blog posts, social media content, and marketing copy.',
    price: '$10/month',
    category: 'content',
    views: 2156,
    purchases: 234,
    fullDescription: 'ContentCreator AI helps you generate high-quality content for blogs, social media, marketing campaigns, and more using advanced natural language processing.',
    features: [
      'Blog post generation',
      'Social media content',
      'Marketing copy',
      'SEO optimization',
      'Multiple content formats'
    ],
    demoMessage: 'Tell me what kind of content you need and I\'ll create it for you!',
    sampleResponse: 'I\'ve created a compelling blog post outline for your topic. Here\'s a sample introduction and key points that will engage your audience...'
  },
  {
    id: '4',
    name: 'TaskMaster',
    description: 'Organizes tasks, schedules, and productivity workflows automatically.',
    price: '$8/month',
    category: 'productivity',
    views: 1234,
    purchases: 98,
    fullDescription: 'TaskMaster revolutionizes productivity by intelligently organizing your tasks, setting priorities, and creating optimal schedules based on your work patterns.',
    features: [
      'Smart task prioritization',
      'Calendar integration',
      'Deadline tracking',
      'Workflow automation',
      'Progress analytics'
    ],
    demoMessage: 'Share your tasks and deadlines, and I\'ll help you organize them efficiently!',
    sampleResponse: 'I\'ve analyzed your tasks and created an optimized schedule. Here\'s your priority matrix for today with time blocks for maximum productivity.'
  },
  {
    id: '5',
    name: 'CustomerCare Bot',
    description: 'Handles customer inquiries with intelligent responses and escalation.',
    price: '$20/month',
    category: 'customer-service',
    views: 987,
    purchases: 76,
    fullDescription: 'CustomerCare Bot provides 24/7 customer support with intelligent response generation, sentiment analysis, and smart escalation to human agents when needed.',
    features: [
      '24/7 availability',
      'Sentiment analysis',
      'Multi-language support',
      'Escalation management',
      'Integration ready'
    ],
    demoMessage: 'I\'m here to help with customer service inquiries. What can I assist you with?',
    sampleResponse: 'Thank you for contacting us! I understand your concern about the product issue. Let me provide you with a solution and connect you with our support team if needed.'
  },
  {
    id: '6',
    name: 'CodeReviewer',
    description: 'Reviews code quality, suggests improvements, and identifies bugs.',
    price: '$12/month',
    category: 'productivity',
    views: 756,
    purchases: 45,
    fullDescription: 'CodeReviewer uses AI to analyze your code for bugs, security issues, performance improvements, and coding best practices across multiple programming languages.',
    features: [
      'Multi-language support',
      'Security analysis',
      'Performance optimization',
      'Best practices',
      'Documentation generation'
    ],
    demoMessage: 'Share your code and I\'ll provide a comprehensive review with suggestions!',
    sampleResponse: 'I\'ve reviewed your code and found 3 potential improvements: 1) Optimize the loop in line 25 for better performance, 2) Add error handling for the API call, 3) Consider using const instead of let for immutable variables.'
  }
];

export const userPurchases = [
  {
    id: '1',
    name: 'GrammarBot',
    description: 'Corrects grammar mistakes in text',
    status: 'active',
    purchaseDate: '2024-01-15',
    usage: 145
  },
  {
    id: '3',
    name: 'ContentCreator AI',
    description: 'Generates blog posts and content',
    status: 'active',
    purchaseDate: '2024-01-20',
    usage: 67
  },
  {
    id: '4',
    name: 'TaskMaster',
    description: 'Organizes tasks and schedules',
    status: 'expired',
    purchaseDate: '2023-12-10',
    usage: 298
  }
];

export const paymentHistory = [
  {
    id: '1',
    date: '2024-01-20',
    agentName: 'ContentCreator AI',
    amount: '$10.00',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-15',
    agentName: 'GrammarBot',
    amount: '$5.00',
    status: 'completed'
  },
  {
    id: '3',
    date: '2023-12-10',
    agentName: 'TaskMaster',
    amount: '$8.00',
    status: 'completed'
  }
];

export const developerAgents = [
  {
    id: '1',
    name: 'GrammarBot',
    description: 'Corrects grammar mistakes in text',
    status: 'live',
    views: 1547,
    purchases: 89,
    revenue: '$445.00'
  },
  {
    id: '7',
    name: 'SEO Optimizer',
    description: 'Optimizes content for search engines',
    status: 'pending',
    views: 0,
    purchases: 0,
    revenue: '$0.00'
  },
  {
    id: '8',
    name: 'Email Assistant',
    description: 'Writes professional emails',
    status: 'live',
    views: 632,
    purchases: 23,
    revenue: '$138.00'
  }
];
