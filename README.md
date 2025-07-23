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
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name # Replace with your project folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
```
