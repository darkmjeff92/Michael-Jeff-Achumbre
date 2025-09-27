# Michael Jeff Achumbre - AI-Enhanced Portfolio Website

A cutting-edge portfolio website built with Next.js 15 and React 19, featuring comprehensive AI integration that demonstrates modern AI-powered development capabilities for SMB clients.

## 🤖 AI Labs Interactive Playground

This portfolio features a comprehensive AI Labs section that demonstrates production-ready AI development capabilities:

### **🔬 AI Assistant Tab**
- Real-time GPT-5-nano streaming chat interface
- IP-based rate limiting (10 questions/week, resets Monday 12:00 AM KST)
- Session management with usage statistics
- Professional error handling and loading states

### **📚 RAG Demo Tab**
- Complete document processing system (PDF, DOCX, TXT support)
- Real-time vector embeddings with Supabase pgvector
- Document-aware chat with semantic search
- 6-step processing visualization with smooth animations
- Privacy-focused auto-deletion (2-hour expiration)

### **📊 Analytics Tab**
- Live system metrics dashboard with real-time data
- Rate limiting visualization with animated progress bars
- System health monitoring (AI Agent, RAG System, Database)
- Usage analytics with professional status indicators

### **📱 Mobile Experience**
- Touch-friendly swipe navigation between tabs
- Visual swipe indicators and dot navigation
- Responsive glass morphism design with lightning theme
- Production-ready mobile-first architecture

## 🚀 Tech Stack

### **Core Technologies**
- **Framework:** Next.js 15 with App Router
- **Frontend:** React 19, TypeScript 5.9+
- **Database:** Supabase PostgreSQL with pgvector extension
- **AI Integration:** Vercel AI SDK v5.0+ with OpenAI GPT-5-nano
- **Styling:** Tailwind CSS v4 with Lightning Design System
- **UI Components:** Shadcn UI + Radix UI with glass morphism effects

### **AI & Backend Infrastructure**
- **Vector Database:** Supabase pgvector for RAG document processing
- **Rate Limiting:** IP-based tracking with Korean timezone weekly resets
- **Document Storage:** Secure upload with automatic 2-hour expiration
- **Real-time Analytics:** Live usage metrics and system monitoring
- **Streaming Responses:** GPT-5-nano with real-time AI chat

### **Design & Performance**
- **Responsive Design:** Mobile-first with swipe navigation support
- **Animations:** Motion library 12.23+ with reduced-motion support
- **Performance:** Turbopack for fast development builds
- **Mobile Experience:** Touch-friendly interactions with visual feedback

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/darkmjeff92/Michael-Jeff-Achumbre.git
   cd Michael-Jeff-Achumbre
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Add the following to `.env.local`:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Supabase Configuration (for AI Labs)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Database Configuration
   DATABASE_URL=your_supabase_postgres_connection_string
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run pre-build` - Run type checking and linting before build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ AI Labs Architecture

### **API Endpoints**
```
src/app/api/ai/
├── chat/route.ts           # GPT-5-nano streaming chat with RAG integration
├── rate-limit/route.ts     # IP-based rate limiting and usage analytics
├── documents/upload/route.ts # Document upload and processing
└── cleanup/route.ts        # Automatic document expiration system
```

### **AI Labs Components**
```
src/components/
├── sections/
│   └── ai-lab-section.tsx  # Main AI Labs with swipe navigation
├── ai-labs/
│   ├── ai-assistant-tab.tsx # Chat interface with rate limiting
│   ├── rag-demo-tab.tsx    # Document upload and processing
│   └── analytics-tab.tsx   # System metrics dashboard
└── ui/                     # Shadcn UI components
```

### **Backend Integration**
```
src/lib/
├── ai-config.ts           # AI model configurations and settings
├── ai-service.ts          # AI service layer with streaming support
├── rate-limit.ts          # Supabase rate limiting implementation
├── document-processor.ts  # RAG document processing with pgvector
└── utils.ts              # Utility functions and helpers
```

### **Database Schema (Supabase)**
```sql
-- Rate limiting table
usage_tracking (
  id: uuid PRIMARY KEY,
  ip_address: text,
  action_type: text,
  created_at: timestamp,
  document_id: uuid,
  response_time_ms: integer
)

-- Document storage with pgvector
documents (
  id: uuid PRIMARY KEY,
  filename: text,
  content_chunks: text[],
  embeddings: vector(1536), -- OpenAI embedding vectors
  created_at: timestamp,
  expires_at: timestamp
)
```

## 🎨 Portfolio Features

### **AI Labs Interactive Playground**
- **Production-Ready RAG System:** Complete document processing with vector embeddings
- **Streaming AI Chat:** Real-time GPT-5-nano responses with context awareness
- **Advanced Rate Limiting:** IP-based tracking with Korean timezone weekly resets
- **Mobile Swipe Navigation:** Touch-friendly tab switching with visual feedback
- **System Analytics Dashboard:** Live metrics and health monitoring
- **Privacy-First Design:** Automatic document cleanup and secure processing

### **Core Portfolio Features**
- **Lightning Design System:** Custom dark theme with electric yellow/orange accents
- **Glass Morphism UI:** Modern backdrop blur effects with professional styling
- **Mobile-First Responsive:** Perfect scaling from 280px fold phones to 4K displays
- **Motion Animations:** Smooth transitions with reduced-motion accessibility support
- **TypeScript Safety:** Full type coverage with comprehensive error handling
- **Performance Optimized:** Next.js 15 with Turbopack for lightning-fast development

### **Technical Demonstrations**
- **Full-Stack AI Integration:** Backend infrastructure with Supabase and pgvector
- **Modern Development Workflow:** Showcases cutting-edge tools and practices
- **Production Architecture:** Enterprise-grade system design and implementation
- **Responsive Design Mastery:** Professional mobile experience with swipe gestures
- **Security Best Practices:** Rate limiting, data expiration, and privacy controls

## 📱 Responsive Design

Extended device support with additional breakpoints:

| Breakpoint | Screen Size | Target Devices |
|------------|-------------|----------------|
| **fold** | 280px+ | Fold phones, compact devices |
| **mobile** | 375px+ | Standard mobile devices |
| **tablet** | 900px+ | Tablet portrait mode |
| **tablet-lg** | 1200px+ | Large tablets, small laptops |
| **ultra** | 2560px+ | 4K displays, ultra-wide monitors |

Components now scale across all device types while maintaining the original Lightning Design System.

## 📱 Contact

- **Portfolio:** [michaeljeffachumbre.com](https://michaeljeffachumbre.com)
- **GitHub:** [@darkmjeff92](https://github.com/darkmjeff92)
- **Email:** [michaeljeffachumbre@gmail.com](mailto:michaeljeffachumbre@gmail.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 15 and React 19