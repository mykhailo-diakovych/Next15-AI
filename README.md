# VoltQuant UI
The application leverages AI to allow users to ask questions about documents stored in blob storage. Built with Next.js, Radix UI, Tailwind CSS, and TypeScript, VoltQuant UI offers a suite of reusable and customizable UI components, ensuring a seamless and intuitive experience for users when interacting with document-based queries.


## Project Structure

```bash
/
├── public/                    # Static assets such as SVG icons
├── src/                       # Source code of the application
│   ├── app/                   # Core Next.js application logic (pages, API routes, app router)
│   │   ├── page.tsx           # Default entry point for the app page (root)
│   │   ├── layout.tsx         # Shared layout component for consistent UI structure
│   │   ├── api/               # API routes to handle data processing and interactions
│   │   ├── [dynamic-route]/   # Dynamic routing for pages requiring data fetching
│   ├── components/            # UI components using Radix UI and Tailwind CSS
│   ├── hooks/                 # Custom React hooks for reusability
│   ├── lib/                   # Utility libraries and core functions
│   ├── utils/                 # Helper functions and utilities
├── .editorconfig              # Editor configuration for consistent formatting
├── .prettierrc                # Prettier configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration (TypeScript)
├── package.json               # Project dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
```

---

## Dependencies

### Core Dependencies

- **Radix UI**: A collection of unstyled, accessible, and customizable UI components, such as dialogs, avatars, tooltips, dropdowns, and more. These components are built to be flexible and provide low-level functionality that can be easily customized using your own styles and themes. Radix UI ensures that your UI is fully accessible out of the box, providing users with a great experience.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid design of custom user interfaces. It provides low-level utility classes to construct complex designs without the need to write custom CSS. With Tailwind, you can style elements directly in your markup, making the process faster and more flexible. Tailwind also integrates smoothly with CSS preprocessors like PostCSS.
- **Lucide React**: A collection of high-quality, customizable SVG icons designed to be easily integrated into React projects. Lucide React provides a wide range of icons that can be styled and scaled according to the needs of the UI. It is particularly useful for enhancing user interactions with visual elements such as buttons, menus, and tooltips.
- **class-variance-authority**: A utility for managing and validating className variants based on predefined rules. This package simplifies the conditional application of Tailwind classes and makes it easy to dynamically generate class names for components. It allows you to define the variants (e.g., sizes, colors) of components in a central place and apply them consistently across the app.
- **tailwind-merge**: A utility that intelligently merges conflicting Tailwind CSS class names. It ensures that the final list of classes applied to an element is valid and prevents duplicates or conflicting styles from being applied. This is particularly useful when combining dynamic or conditional classes, helping to avoid issues related to class precedence in Tailwind.

### Development Dependencies

- ESLint: A static code analysis tool that identifies and fixes problems in JavaScript/TypeScript code, ensuring consistent code quality and adherence to best practices. The ESLint configuration is tailored for the project, with rules integrated for React, TypeScript, and Prettier.

- TypeScript: A superset of JavaScript that introduces static typing to the language, helping to catch type-related errors during development. TypeScript improves code reliability and maintainability by enforcing type checking.

- EditorConfig: A configuration file that helps maintain consistent coding styles (such as indentation, line endings, etc.) across various editors and IDEs. It ensures that developers working in different environments adhere to the same conventions.

- Next.js Configuration: Custom configuration for Next.js, including server-side settings, file handling, and optimizations for the project. It helps streamline the development and build process with features like TypeScript support and performance improvements.


## How to add new SVG icons?

To manage SVG icons and generate a sprite file, follow these steps:

1. **Add Icons to the Project**:
   Place your `.svg` files in the `public/svg-icons/` directory.

2. **Build the Sprite**:
   After adding the icons, run the following command to generate the `sprite.svg` file:

   ```bash
   npx tsx src/utils/buildIcons.ts
   ```

3. **Using Icons in Components**:
   Use the `Icon` component and pass the name of the SVG file (without the `.svg` extension) as the `name` prop to display the icon.

   Example usage:

   ```jsx
   <Icon name="check" />
   ```

4. **Running the Sprite Generator in Watch Mode**:
   It's recommended to run the sprite generator as a watcher so that the sprite is updated whenever an SVG file is added or modified. Use the following command to start the watcher:

   ```bash
   npx tsx --watch src/utils/buildIcons.ts
   ```

---

## Development Scripts

The following scripts are available in the `package.json` for development and production processes:

- `npm run dev`: Starts the development server with Next.js and Turbopack for fast hot module reloading.
- `npm run build`: Builds the application for production deployment.
- `npm run start`: Starts the production server after building the application.
- `npm run lint`: Runs ESLint to check for code style issues and potential bugs.

