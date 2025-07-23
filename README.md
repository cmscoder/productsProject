# 🚀 Products Project: Modern E-commerce Web Application

A modern e-commerce web application built with **Next.js 14 (App Router)**, **React**, and **TypeScript**. This project demonstrates best practices for scalable, maintainable, and high-performance web development. It features a responsive UI, robust state management, and comprehensive testing, making it a solid foundation for a production-ready e-commerce platform.

---

## ✨ Features

- **Product Catalog**: Dynamic display of products with detailed views, including color and storage selectors.
- **Performance Optimization**:
  - **Image Optimization**: Leverages Next.js `Image` component for automatic image optimization and lazy loading.
  - **Server Components**: Utilizes Next.js Server Components for improved performance and SEO.
- **Accessibility (A11y)**: Built with accessibility in mind, ensuring a great user experience for all. Includes semantic HTML, meaningful `alt` text for images, and keyboard navigability.
- **Responsive Design**: Adapts seamlessly to various screen sizes using **SCSS Modules** for scoped and maintainable styles.
- **State Management**: Efficient **Context API** for global state management, particularly for cart functionalities.
- **Testing**: Comprehensive testing suite covering various layers:
  - **Unit Tests**: Jest and React Testing Library for isolated component and logic testing.
  - **Integration Tests**: Verifying interactions between components and overall UI behavior.
  - **Accessibility Tests**: Automated accessibility checks using `jest-axe` to catch violations early.
- **Code Quality**: Enforced with **ESLint** for static code analysis and **Prettier** for consistent code formatting.
- **Custom Scrollbar**: Implements `simplebar-react` for a custom, cross-browser consistent scrollbar experience.

---

## 👨‍💻 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `v18.x` or later (LTS recommended)
- **npm**: `v9.x` or later (comes with Node.js) or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name # Replace with your project folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

## 🛠️ Scripts & Commands

A list of useful commands for development and maintenance.

| Command         | Description              |
| :-------------- | :----------------------- |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm test`      | Run tests                |

## 📁 Project Structure

The project follows a modular and scalable structure, primarily leveraging Next.js's App Router conventions:

````<-- Make sure these three backticks are on their own line with NO other characters or spaces.
.
├── __mocks__/              # 🎭 Jest mocks for files and modules
├── __tests__/              # 🧪 Global test setup or common test utilities
├── public/                 # 🖼️ Static assets
├── src/
│   ├── app/                # 🌐 Next.js App Router (pages, layouts, API routes)
│   │   ├── products/       # 🛍️ Dynamic routes for product details (e.g., /products/[id])
│   │   └── layout.tsx      # 📐 Root layout for the application
│   ├── components/         # 🧩 Reusable React components
│   │   ├── cart/           # 🛒 Components related to the shopping cart
│   │   ├── header/         # 🔝 Header component
│   │   └── carousel/       # 🎠 Carousel component with custom scrollbar
│   ├── context/            # 📦 React Context APIs for global state (e.g., CartContext)
│   ├── hooks/              # 🎣 Custom React hooks
│   ├── styles/             # 🎨 Global SCSS variables, mixins, and base styles
│   ├── utils/              # 🔧 Utility functions (e.g., API calls, helpers)
│   └── types/              # 📝 TypeScript custom type definitions
├── .eslintrc.json          # 📏 ESLint configuration
├── .prettierrc             # 🌟 Prettier configuration
├── jest.config.js          # 🚀 Jest test configuration
├── tsconfig.json           # ✍️ TypeScript configuration
└── package.json            # 📄 Project dependencies and scripts
```  <-- Make sure these three backticks are on their own line with NO other characters or spaces.

## ✨ Best Practices & Design Principles

- **Next.js `Image` Component**: Always use this component for optimized image delivery. 🖼️
- **Accessibility First**: Prioritize semantic HTML and provide meaningful `alt` text for all images to ensure an inclusive user experience. ♿
- **Robust Testing**: Maintain high code quality and prevent regressions with comprehensive unit, integration, and accessibility tests. ✅
- **SCSS Modules**: Utilize CSS Modules with SCSS for component-scoped styles, preventing global style conflicts. 💅
- **Separation of Concerns**: Keep business logic (state management, data fetching) in custom hooks or context providers, separate from presentational UI components. 🏗️
- **Code Consistency**: Enforce consistent code style and formatting using ESLint and Prettier. ✨
- **Error Handling**: Implement robust error handling for API calls and component rendering (e.g., `notFound()` for missing products). 🛑
- **Responsive Design**: Components are built with mobile-first and responsiveness in mind. 📱💻

---

## 🚀 Deployment

This Next.js application is designed for easy deployment. It can be deployed on platforms like **Vercel** (the creators of Next.js) or any other platform that supports Node.js applications and static site generation (if applicable). ☁️
````
