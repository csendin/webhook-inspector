# Webhook Inspector

🚀 **The ultimate tool for webhook debugging and handler generation.** Inspect webhooks in real-time, generate TypeScript handlers with AI, and streamline your integration development.

## ✨ Why Webhook Inspector?

Tired of webhook debugging nightmares? Webhook Inspector captures every webhook request, stores them securely, and lets you inspect them through a beautiful web interface. Plus, it uses AI to generate production-ready TypeScript handlers automatically!

Perfect for developers building integrations with Stripe, GitHub, Slack, or any webhook-based service.

## 🚀 Quick Start

Get up and running in 5 minutes!

```bash
# Clone the repo
git clone https://github.com/csendin/webhook-inspector.git
cd webhook-inspector

# Install dependencies
pnpm install

# Start the database
cd api && docker-compose up -d

# Run migrations
pnpm db:migrate

# Set up environment (add your Google AI key)
cp .env.example .env  # Edit .env with your keys

# Start the app
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) and start capturing webhooks!

## 🔥 Key Features

- **🔍 Real-time Webhook Capture**: Catch any webhook from any source instantly
- **📊 Detailed Inspection**: View headers, body, timestamps, and more with syntax highlighting
- **🤖 AI Handler Generation**: Generate TypeScript handlers with Zod validation using Google Gemini
- **💾 Persistent Storage**: PostgreSQL database with type-safe queries
- **🌐 Modern Web UI**: React-based dashboard with infinite scroll and responsive design
- **📚 API Documentation**: Built-in Swagger docs at `/docs`
- **⚡ Fast & Lightweight**: Built with Fastify, Vite, and optimized for performance

## 🛠 Tech Stack

### Backend (API)
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.9+
- **Framework**: Fastify
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod
- **AI**: Google Generative AI SDK
- **Docs**: Swagger + Scalar

### Frontend (Web)
- **Framework**: React 19
- **Build**: Vite
- **Routing**: TanStack Router
- **State**: TanStack Query
- **Styling**: Tailwind CSS
- **UI**: Radix UI
- **Code**: Shiki (syntax highlighting)

### Tooling
- **Package Manager**: pnpm
- **Linting**: Biome
- **Container**: Docker Compose

## 🏗 Architecture

Webhook Inspector uses a modern monorepo architecture:

- **API Layer**: Fastify server handling webhook capture and AI processing
- **Database Layer**: PostgreSQL with Drizzle for type-safe operations
- **Web Layer**: React SPA for webhook inspection and management

## 📦 Installation and Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose

### Detailed Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/csendin/webhook-inspector.git
   cd webhook-inspector
   pnpm install
   ```

2. **Database Setup**
   ```bash
   cd api
   docker-compose up -d
   pnpm db:migrate
   pnpm db:seed  # Optional: add sample data
   ```

3. **Environment Configuration**
   Create `api/.env`:
   ```env
   PORT=3333
   DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

4. **Start Development**
   ```bash
   # API server
   cd api && pnpm dev

   # Web app (new terminal)
   cd web && pnpm dev
   ```

Visit:
- 🖥️ **Web App**: http://localhost:5173
- 🔌 **API**: http://localhost:3333
- 📖 **API Docs**: http://localhost:3333/docs

## 🎯 Usage

### Capturing Webhooks
Send any HTTP request to `/capture/*`:

```bash
curl -X POST http://localhost:3333/capture/user-events \
  -H "Content-Type: application/json" \
  -d '{"event": "user.signup", "user_id": 123}'
```

### Inspecting Webhooks
1. Open the web interface
2. Browse captured webhooks
3. Click to view full details with syntax-highlighted JSON

### AI Handler Generation
1. Select webhooks with checkboxes
2. Click "Generate Handler"
3. Get production-ready TypeScript code with Zod schemas!

```typescript
import { z } from 'zod'

const userSignupSchema = z.object({
  event: z.literal('user.signup'),
  user_id: z.number(),
})

export const handleWebhook = (payload: unknown) => {
  const result = userSignupSchema.safeParse(payload)
  if (result.success) {
    // Handle signup logic
    console.log('New user:', result.data.user_id)
  }
}
```

## ⚙️ Configuration

### Environment Variables
- `PORT`: Server port (default: 3333)
- `DATABASE_URL`: PostgreSQL connection string
- `GOOGLE_GENERATIVE_AI_API_KEY`: For AI handler generation

### Database
Schema in `api/src/db/schema/webhooks.ts`. Modify and run:
```bash
pnpm db:generate && pnpm db:migrate
```

## 📁 Project Structure

```
webhook-inspector/
├── api/                 # Backend API
│   ├── src/routes/      # API endpoints
│   ├── src/db/          # Database layer
│   └── docker-compose.yml
├── web/                 # React frontend
│   ├── src/components/  # UI components
│   └── src/routes/      # App routes
├── package.json         # Workspace config
└── biome.json           # Code quality
```

## 🧑‍💻 Development and Contribution

### Scripts
```bash
pnpm dev          # Start all services
pnpm format       # Lint & format code
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open database UI
```

### Code Quality
- ✅ **TypeScript**: Strict type checking
- ✅ **Biome**: Fast linting & formatting
- ✅ **Zod**: Runtime validation
- 🔄 **Testing**: Coming soon!
