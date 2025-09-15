import { PortfolioContent } from './types';

export const portfolioContent: PortfolioContent = {
  hero: {
    mainHeadline: "AI-First Developer & Automation Builder",
    subheadline: "Transform manual processes into automated workflows. Turn static websites into intelligent applications. I help growing businesses leverage AI to work smarter, not harder - without the enterprise complexity or cost.",
    supportingPoints: [
      {
        icon: "⚡",
        title: "Fast Implementation",
        description: "Weeks not months to see results"
      },
      {
        icon: "💰",
        title: "Cost-Effective",
        description: "AI solutions that pay for themselves"
      },
      {
        icon: "🎯",
        title: "Business-Focused",
        description: "Technology that solves real problems"
      },
      {
        icon: "🚀",
        title: "Growth-Ready",
        description: "Systems that scale with your success"
      }
    ],
    primaryCTA: "Let's Discuss Your Project",
    secondaryCTA: "See How I Can Help",
    mobileVersion: {
      headline: "AI-Powered Solutions for Growing Businesses",
      description: "I build intelligent systems that automate your processes, capture more leads, and scale with your growth - without the enterprise complexity.",
      cta: "Start Your Project"
    }
  },
  about: {
    story: "After eight years in customer service and technical support, I learned something crucial: every business struggle comes down to connecting with customers and streamlining processes. Freelancing taught me the other side of the equation: how to find clients, build relationships, and deliver real value. I learned that successful projects aren't just about technical skills—they're about understanding business needs and solving actual problems. My creative background in video editing with Adobe Creative Suite developed my eye for design and storytelling—skills that now shape how I approach UI/UX and digital product design. I believe great software isn't just functional; it's intuitive and engaging.",
    mission: "Today, as an OFW working in a Korean factory by day, I code by night. While working full-time, I dedicate my evenings (9 PM - 1 AM) and weekends to mastering AI-powered development tools like Cursor IDE and Claude Code CLI, building real solutions for businesses. Working full-time and coding after long shifts means every hour counts — that's why I use cutting-edge AI development tools not just as assistants, but as development partners to build websites, mobile apps, and automation solutions faster and smarter than traditional methods. Every project I deliver comes from pure determination and the efficiency of AI-powered development. My goal is to transition to full-time software development when the right opportunity comes, but for now, I'm proving my skills one evening project at a time. My mission is clear: Transform the customer service and operational challenges I once solved manually into scalable, AI-powered solutions. Whether it's automating lead generation, streamlining customer workflows, or building intelligent systems that grow with your business—I bridge the gap between knowing what businesses need and building what actually works. Always learning. Always building. Always focused on results that matter to your bottom line.",
    currentAvailability: {
      weekdays: "9 PM - 1 AM (Korean Time)",
      weekends: "Mostly full days (Sundays always available)",
      communication: "Quick responses via email/chat during work breaks"
    },
    keyPoints: [
      {
        period: "Customer Service & Technical Support",
        description: "8 years understanding business challenges",
        skills: ["Customer Relations", "Problem Solving", "Process Optimization"]
      },
      {
        period: "Freelancing Experience",
        description: "Building client relationships and delivering value",
        skills: ["Project Management", "Client Communication", "Value Delivery"]
      },
      {
        period: "Creative Background",
        description: "Video editing and design expertise",
        skills: ["Adobe Creative Suite", "UI/UX Design", "Storytelling"]
      },
      {
        period: "AI-Powered Development",
        description: "Evening coding with cutting-edge AI tools",
        skills: ["Cursor IDE", "Claude Code CLI", "AI-Assisted Development"]
      }
    ]
  },
  services: {
    introduction: "I maximize every coding hour with cutting-edge AI development tools like Cursor IDE and Claude Code CLI to deliver professional results faster than traditional development. You get dedication, efficiency, and bleeding-edge technology.",
    offerings: [
      {
        id: "websites",
        icon: "🌐",
        title: "Modern Websites That Work for Your Business",
        whatIDo: "Build fast, professional websites using modern tech (Next.js, TypeScript, Tailwind)",
        yourEdge: "AI-assisted development means faster delivery without cutting corners",
        perfectFor: "Small businesses ready to upgrade from outdated sites",
        timeline: "1-2 weeks (evenings + weekend sprint)",
        description: "Time is precious when you're coding after factory shifts. I use AI tools to build better, faster — which means professional results for you at fair prices. No corporate overhead, just focused development."
      },
      {
        id: "mobile-apps",
        icon: "📱",
        title: "Mobile Apps That Connect You with Customers",
        whatIDo: "Cross-platform mobile apps for iOS and Android (React Native)",
        yourEdge: "One codebase, two platforms, AI-powered development speed",
        perfectFor: "Businesses wanting to reach customers on mobile",
        timeline: "2-4 weeks depending on complexity",
        description: "Your customers live on their phones. I build mobile apps that work on both iPhone and Android. Limited evening hours mean I focus on what matters most — apps that actually help your business grow."
      },
      {
        id: "automation",
        icon: "⚙️",
        title: "Smart Automation That Saves You Time",
        whatIDo: "Set up n8n workflows that handle repetitive tasks automatically",
        yourEdge: "Business process understanding from call center experience + technical skills",
        perfectFor: "Growing teams tired of manual work",
        timeline: "1-3 weeks for full workflow setup",
        description: "I've worked in customer service and manufacturing — I know where businesses waste time on tasks that could run automatically. Now I build smart workflows so you can focus on growth, not repetitive work."
      },
      {
        id: "ai-integration",
        icon: "🤖",
        title: "AI Integration That Makes Sense",
        whatIDo: "Add intelligent features to existing systems (chatbots, document processing)",
        yourEdge: "Practical AI implementation using cutting-edge tools, not flashy demos",
        perfectFor: "Businesses curious about AI but wanting simple, useful applications",
        timeline: "1-2 weeks for basic integrations",
        description: "AI doesn't have to be complicated or expensive. I use the same AI tools that help me code efficiently to build practical solutions for your business — chatbots that actually help customers, automation that actually saves time."
      }
    ],
    availability: {
      weekdays: "9 PM - 1 AM Korean Time (perfect for US morning meetings)",
      weekends: "Full days available (Sundays guaranteed)",
      communication: "Quick responses during work breaks, detailed updates in evenings",
      projectWork: "Focused evening sessions + weekend development sprints"
    },
    workingPhilosophy: "Working around a factory schedule means I'm incredibly focused during coding time. No distractions, no corporate meetings — just pure development work when we schedule it."
  },
  caseStudy: {
    title: "gracekimkor.com: Building a Professional Financial Platform After Factory Shifts",
    client: "Grace Kim, Licensed Samsung Financial Consultant",
    challenge: "Needed credible online presence for complex financial services",
    timeline: "7 days total (5 days planning, 2 days building)",
    reality: "Built entirely during evenings after 12-hour factory shifts",
    problem: {
      description: "Grace Kim needed more than a simple website. As a licensed Samsung financial consultant in South Korea, she needed an interactive platform that could:",
      requirements: [
        "Showcase multiple Samsung financial products (cards, insurance, investments)",
        "Guide different visa types to appropriate services",
        "Build trust and credibility in a regulated financial industry",
        "Convert visitors into consultation requests"
      ]
    },
    solution: {
      description: "Working with limited time meant I needed to be incredibly efficient. Here's how AI assistance made the impossible possible:",
      technologyStack: [
        "Next.js 15 with Turbopack (cutting-edge performance)",
        "TypeScript for reliability",
        "Tailwind CSS + ShadCN for rapid UI development",
        "Radix UI for accessible components",
        "Vercel for lightning-fast deployment"
      ],
      aiApproach: [
        "Planning: AI helped structure complex financial product information",
        "Code Development: Cursor IDE + Claude Code CLI for AI-assisted coding",
        "Problem Solving: Instant solutions for technical challenges with AI pair programming",
        "Quality Assurance: AI helped catch bugs and optimize performance during tired evening coding"
      ],
      features: [
        {
          title: "Visa Type Filtering",
          description: "Dynamic service recommendations based on user's visa status"
        },
        {
          title: "Service Matching",
          description: "Personalized insurance and financial product suggestions"
        },
        {
          title: "Multi-Channel Contact",
          description: "Integrated KakaoTalk, phone, email, and consultation forms"
        },
        {
          title: "Professional Credibility",
          description: "Clear licensing information and office details"
        },
        {
          title: "Testimonial Gallery",
          description: "Interactive showcase of client consultation screenshots with professional presentation"
        },
        {
          title: "Mobile Optimization",
          description: "Perfect experience across all Korean mobile carriers"
        }
      ]
    },
    designChallenge: {
      problem: "Grace wanted to show proof of her client consultations, but the raw screenshots had scribbles, annotations, and looked unprofessional. The challenge: How do you display authentic client proof while maintaining a polished, credible website?",
      solution: [
        "Frames rough screenshots in clean, professional containers",
        "Adds proper spacing and visual hierarchy",
        "Uses subtle shadows and borders to elevate the presentation",
        "Organizes multiple screenshots into an easy-to-browse gallery",
        "Maintains authenticity while ensuring professional appearance"
      ],
      result: "Grace can showcase genuine client interactions without compromising her professional image - turning a potential design weakness into a trust-building strength."
    },
    results: [
      {
        title: "Professional Credibility",
        description: "Grace reports clients are more confident in her services"
      },
      {
        title: "Better Client Feedback",
        description: "Website demonstrates her legitimacy and expertise"
      },
      {
        title: "Business Validation",
        description: "Interactive platform positions her above competitors"
      },
      {
        title: "Technical Success",
        description: "Fast loading, mobile-optimized, accessible to all users"
      },
      {
        title: "Personal Achievement",
        description: "Proved I could deliver enterprise-quality work as a solo evening developer"
      }
    ],
    proof: {
      description: "For other SMB clients: If I can build a professional financial services platform for a licensed consultant while working factory shifts, imagine what I can do for your business needs. AI-powered efficiency means: You get professional results without corporate overhead or traditional development timelines.",
      liveUrl: "https://gracekimkor.com"
    }
  },
  contact: {
    introduction: "When we work together, you get 100% focused development time and cutting-edge AI tools without corporate overhead.",
    consultation: {
      duration: "30-45 minutes via video call",
      bestTimes: "Weekends or weekday evenings (9 PM - 10 PM Korean Time)",
      discussionPoints: [
        "Your business needs, project scope, timeline expectations",
        "What problems are you trying to solve? What does success look like?",
        "My availability, development process, AI tools I use"
      ]
    },
    projectPhases: [
      {
        title: "Initial Consultation (Free)",
        description: "Understanding your needs and setting expectations",
        details: [
          "Duration: 30-45 minutes via video call",
          "Best Times: Weekends or weekday evenings (9 PM - 10 PM Korean Time)",
          "Discussion: Your business needs, project scope, timeline expectations"
        ]
      },
      {
        title: "Project Planning Phase (Week 1)",
        description: "Detailed requirements and technology planning",
        details: [
          "Requirements Gathering: I'll map out exactly what you need",
          "Timeline Planning: Realistic delivery dates based on my evening/weekend schedule",
          "Technology Recommendations: Best tools for your specific needs",
          "Communication Setup: How we'll stay in touch throughout the project"
        ]
      },
      {
        title: "Development Sprints",
        description: "Focused development with regular updates",
        details: [
          "Evening Sessions: 9 PM - 1 AM Korean Time (perfect for US morning check-ins)",
          "Weekend Builds: Focused development blocks with major progress",
          "Progress Updates: Regular screenshots, demo links, and status reports",
          "Your Involvement: Feedback sessions, testing, and approval checkpoints"
        ]
      },
      {
        title: "Launch & Support",
        description: "Final testing, launch, and ongoing support",
        details: [
          "Final Testing: We'll test everything together before launch",
          "Launch Support: I'll be available during your launch for any issues",
          "Documentation: Clear instructions for managing your new system",
          "Follow-up Support: 30 days of bug fixes and minor adjustments included"
        ]
      }
    ],
    workingSchedule: {
      weekdayComm: [
        "Quick responses during lunch breaks (12 PM - 1 PM Korean Time)",
        "Detailed discussions in evenings (9 PM - 10 PM Korean Time)",
        "Development work happens 9 PM - 1 AM when I'm most focused"
      ],
      weekendAvail: [
        "Full days available for meetings, development, and testing",
        "Sunday guaranteed - my dedicated project day",
        "Saturday flexible - sometimes factory work, but usually available"
      ],
      benefits: [
        "No distractions - When I'm coding, I'm 100% focused on your project",
        "Efficient development - AI tools help me build faster than traditional methods",
        "Fair pricing - No corporate overhead or office rent to pass on to you",
        "Dedicated time blocks - Your project gets focused attention, not scattered hours"
      ]
    },
    contactInfo: {
      email: "michaeljeffachumbre@gmail.com",
      subjectLine: "Project Inquiry - [Your Business Name]",
      includeInfo: [
        "Brief description of your business",
        "What you're looking to build or improve",
        "Your rough timeline and budget range",
        "Best times for a call (I'll convert to Korean Time)"
      ]
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/trixtazzz",
        label: "Professional profile and connections"
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/bboymj92",
        label: "Personal updates and project showcases"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/trixtazzz",
        label: "Behind-the-scenes development journey"
      },
      {
        platform: "Upwork",
        url: "https://www.upwork.com/freelancers/~015d8164bcc82f7b04",
        label: "Freelance profile and client reviews"
      },
      {
        platform: "GitHub",
        url: "https://github.com/darkmjeff92",
        label: "Code repositories and contribution activity"
      }
    ],
    whyChooseMe: [
      {
        title: "Authentic Story",
        description: "Factory worker building a better future through code"
      },
      {
        title: "AI Advantage",
        description: "Cutting-edge tools for faster, better development"
      },
      {
        title: "Business Understanding",
        description: "8 years of customer service experience"
      },
      {
        title: "Focused Work",
        description: "No corporate distractions, just dedicated development time"
      },
      {
        title: "Fair Pricing",
        description: "Professional results without corporate overhead"
      },
      {
        title: "Proven Results",
        description: "Live projects like gracekimkor.com demonstrate real capabilities"
      }
    ]
  }
};