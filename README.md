# ReliefConnect Frontend

_Built for Illinois Institute of Technology CSP-584 Enterprise Web Applications Final Project_

I built this frontend for a disaster relief platform that connects people in crisis with the resources they need most. Working with my teammate on the backend, we're creating a system that uses AI to match people with appropriate relief supplies during emergencies.

## What I Built

### 🤖 AI-Powered Recommendation System

The heart of the application is an interactive chat interface (`RecommendChat.jsx`) that lets users describe their needs in natural language. I implemented quick-select buttons for common emergency needs like food, shelter, and medical supplies, making it easy for people in stressful situations to get help fast.

### 🛒 Smart Relief Package Builder

I created a shopping cart-style system (`ReliefPackageBuilder.jsx`) that lets users build custom relief packages. The floating cart component tracks selected resources with real-time quantity updates and pricing. Users can add items from recommendations or browse the catalog directly.

### 📊 Order Management Dashboard

Built a clean dashboard (`Dashboard.jsx`) for order tracking where users can enter their order ID to check status. The system handles both online and offline scenarios with graceful fallbacks to mock data when the backend isn't available.

### 📦 Relief Kits Catalog

Designed a comprehensive catalog (`AidKits.jsx`) with pre-made relief kits organized by urgency and category. Users can filter between urgent needs and preparedness supplies, with each kit showing availability status and detailed descriptions.

### 🎨 Responsive Design System

Used Material-UI v5 with a custom theme focused on calming colors (blues and greens) instead of alarming reds. The design prioritizes accessibility with proper contrast ratios and mobile-first responsive layouts. I chose Context API over Redux for state management since the app's state needs were relatively straightforward.

## Tech Stack

I built this using React 19 with Material-UI v5 for the component library. The routing is handled by React Router v6, and I used React Hook Form for form management. For API calls, I integrated Axios with proper error handling and offline fallbacks.

**Key Dependencies:**

- React 19 with concurrent features
- Material-UI v5 with custom theming
- React Router v6 for navigation
- React Hook Form for form validation
- Axios for API communication
- React Slick for carousel components

**State Management:**
I used React Context API with multiple providers (`AppContext`, `ReliefPackageContext`, `CustomKitsContext`) to manage global state. This approach worked well for the scope of this project and kept the codebase simpler than introducing Redux.

## Getting Started

### Prerequisites

- Node.js 16+
- npm package manager

### Installation

```bash
# Clone the repository and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`. The frontend is configured to proxy API calls to `localhost:5000` where the backend should be running.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

### Development Notes

- The app includes offline fallbacks using mock data when the backend isn't available
- All components are fully functional with mock data for testing
- The build process is optimized with Vite for fast development and production builds

## What's Next (Phase 2)

This frontend is just the beginning. My teammate and I are planning to integrate AI agents for:

- **🤖 Product Recommendation Agent**: Enhanced AI that learns from user patterns to suggest more personalized relief packages
- **📦 Order/Shipping Status Agent**: Real-time tracking with automated updates and delivery predictions
- **🛡️ Fraud Detection Agent**: AI-powered system to identify and prevent fraudulent relief requests

We're also planning to expand the community features and add more comprehensive emergency preparedness tools.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── RecommendChat.jsx      # AI chat interface
│   ├── ReliefPackageBuilder.jsx # Shopping cart system
│   ├── KitCard.jsx            # Relief kit display
│   └── Navbar.jsx             # Navigation component
├── pages/              # Route components
│   ├── Home.jsx               # Landing page
│   ├── Recommend.jsx          # AI recommendations
│   ├── AidKits.jsx            # Kit catalog
│   ├── Dashboard.jsx          # Order tracking
│   └── Order.jsx              # Order placement
├── context/            # State management
│   ├── AppContext.jsx         # Global app state
│   ├── ReliefPackageContext.jsx # Cart state
│   └── CustomKitsContext.jsx  # Kit customization
├── services/           # API integration
│   └── api.js                 # Axios configuration
└── data/               # Mock data
    └── mockKits.js            # Sample relief kits
```

## Course Context

This project was developed for **Illinois Institute of Technology CSP-584 Enterprise Web Applications** as our final project. I focused on the frontend development while my teammate handled the backend API and database integration. The project demonstrates modern React patterns, responsive design, and integration with REST APIs.
