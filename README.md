# Products Project

A modern e-commerce web application built with Next.js, React, and TypeScript. This project demonstrates best practices for scalable, maintainable, and high-performance web development.

## Features

- Product catalog with color and storage selectors
- Optimized images using Next.js `Image` component
- Accessibility best practices (alt text, semantic HTML)
- Responsive design with SCSS modules
- Context-based cart management
- Unit and integration tests with Jest and React Testing Library
- ESLint and Prettier for code quality

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Lint and format code

```bash
npm run lint   # Check code style and find issues
npm run format # Format code with Prettier (if configured)
```

### 4. Run tests

```bash
npm test       # Run all unit and integration tests
# or
npx jest       # Directly run Jest if you prefer
```

## Project Structure

```
public/                # Static assets
src/
  app/                 # Next.js app directory
  components/          # Reusable React components
  utils/               # TypeScript types and utilities
  ...
```

## Best Practices

- Use the Next.js `Image` component for all images
- Always provide meaningful `alt` text for accessibility
- Write unit tests for all components and logic
- Use SCSS modules for scoped, maintainable styles
- Keep business logic in hooks or context, not in UI components
- Use ESLint and Prettier to enforce code quality
- Avoid deprecated React APIs and Next.js warnings

## Common Commands

| Command       | Description              |
| ------------- | ------------------------ |
| npm run dev   | Start development server |
| npm run build | Build for production     |
| npm start     | Start production server  |
| npm run lint  | Run ESLint               |
| npm test      | Run tests                |

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Contributing

- Fork the repo and create a feature branch
- Write clear, tested code
- Submit a pull request with a detailed description

## License

MIT

---

For more details, see the Next.js documentation: https://nextjs.org/docs
