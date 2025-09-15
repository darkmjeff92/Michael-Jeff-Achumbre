# Michael Jeff Achumbre - AI-Enhanced Portfolio Website

A cutting-edge portfolio website built with Next.js 15 and React 19, featuring comprehensive AI integration that demonstrates modern AI-powered development capabilities for SMB clients.

## 🤖 AI-Enhanced Features

This portfolio showcases real AI capabilities through:
- **AI-Enhanced Contact Form** - Real-time project analysis and budget estimation
- **Interactive Case Study Q&A** - AI explains technical decisions and business impact
- **Smart Service Recommendations** - AI matches client needs to appropriate services
- **Project Complexity Analyzer** - Detailed analysis with timeline and cost breakdown
- **AI Showcase Section** - Live analytics, timezone coordination, and workflow demos
- **Floating AI Chat Assistant** - 24/7 AI-powered visitor support

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Frontend:** React 19, TypeScript 5.9+
- **AI Integration:** Vercel AI SDK v5.0+ with OpenAI GPT-4o-mini
- **Styling:** Tailwind CSS v4 with Lightning Design System
- **Responsive Design:** Mobile-first with 6-breakpoint system (280px → 2560px+)
- **Animations:** Motion library 12.23+ with reduced-motion support
- **UI Components:** Shadcn UI + Radix UI
- **Development:** Turbopack for fast development builds

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
   # Add your OpenAI API key to .env.local
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

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/ai/            # AI API endpoints
│   │   ├── chat/          # AI chat functionality
│   │   ├── analyze-project/ # Project analysis
│   │   ├── estimate-budget/ # Budget estimation
│   │   └── recommend-services/ # Service recommendations
│   ├── layout.tsx         # Root layout with Lightning theme
│   ├── page.tsx          # Homepage with AI components
│   └── globals.css       # Global styles + Lightning design system
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── ai-enhanced-contact-form.tsx
│   ├── interactive-case-study.tsx
│   ├── smart-service-recommendations.tsx
│   ├── project-complexity-analyzer.tsx
│   ├── ai-showcase-section.tsx
│   └── simple-ai-chat.tsx
├── lib/                 # Shared utilities
│   ├── ai-config.ts    # AI provider configuration
│   ├── ai-service.ts   # AI service layer
│   ├── ai-types.ts     # TypeScript types for AI
│   ├── portfolio-content.ts # Content data
│   └── utils.ts        # Utility functions
```

## 🎨 Features

### Core Portfolio Features
- **Lightning Design System:** Custom dark theme with electric yellow/orange accents
- **Mobile-First Responsive Design:** Perfect scaling from fold phones (280px) to 4K displays (2560px+)
- **Modern Animations:** Smooth transitions using Motion library with reduced-motion support
- **Professional Profile:** High-quality headshot with floating animations
- **Server Components:** Leverages React 19 and Next.js 15 features
- **Type Safety:** Full TypeScript integration throughout
- **Performance:** Optimized with Turbopack for lightning-fast development

### AI-Powered Business Features
- **Real-time Project Analysis:** AI analyzes visitor requirements instantly
- **Smart Lead Qualification:** Automated assessment of project complexity and budget
- **Interactive Demonstrations:** Live showcase of AI capabilities for potential clients
- **24/7 Availability:** AI chat handles inquiries during factory work hours
- **Professional Positioning:** Demonstrates AI expertise through working examples

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