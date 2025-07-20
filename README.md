# 🚀 JSON Schema Builder

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <h3>🎯 A powerful, intuitive tool for creating dynamic JSON schemas with real-time preview</h3>
  <p>Built with modern React, TypeScript, and Tailwind CSS for the best developer experience</p>
</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean Interface**: Intuitive design with clear visual hierarchy
- **Real-time Updates**: Live preview of JSON schema as you build
- **Smooth Animations**: Polished user experience with subtle transitions

### 🛠️ **Core Functionality**
- **Dynamic Field Creation**: Add unlimited fields with different data types
- **Nested Objects**: Create complex nested structures with ease
- **Multiple Data Types**: Support for strings, numbers, and nested objects
- **Live JSON Preview**: Real-time JSON generation with syntax highlighting
- **Form Validation**: Built-in validation using React Hook Form
- **Field Management**: Easy add, remove, and modify operations

### 🔧 **Developer Features**
- **TypeScript Support**: Full type safety and better development experience
- **Modern Build Tools**: Vite for lightning-fast development and builds
- **ESLint Integration**: Code quality and consistency enforcement
- **Hot Module Replacement**: Instant updates during development

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhey-afk/JSON-Schema-Maker-.git
   cd JSON-Schema-Maker-
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action!

---

## 📖 Usage Guide

### Creating Your First Schema

1. **Add Fields**: Click the "Add Field" button to create new schema fields
2. **Configure Properties**: 
   - Set field names
   - Choose data types (String, Number, Nested Object)
   - Set default values
3. **Create Nested Structures**: Use "Nested Object" type to create complex hierarchies
4. **Live Preview**: Watch your JSON schema update in real-time on the right panel

### Field Types

| Type | Description | Example |
|------|-------------|----------|
| **String** | Text values | `"Hello World"` |
| **Number** | Numeric values | `42`, `3.14` |
| **Nested Object** | Complex objects with child fields | `{ "user": { "name": "John" } }` |

### Advanced Features

- **Nested Fields**: Create unlimited levels of nesting
- **Field Removal**: Remove any field with a single click
- **Dynamic Updates**: All changes reflect immediately in the preview
- **Responsive Layout**: Optimized for all screen sizes

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SchemaBuilder.jsx    # Main schema building interface
│   ├── SchemaField.jsx      # Individual field component
│   ├── JsonPreview.jsx      # Live JSON preview panel
│   └── ui/                  # Reusable UI components
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Select.jsx
├── types/
│   └── schema.js           # Type definitions and utilities
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

---

## 🛠️ Built With

### Frontend Framework
- **[React 18.3.1](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Typed superset of JavaScript

### Build Tools
- **[Vite 5.4.2](https://vitejs.dev/)** - Next generation frontend tooling
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance

### Styling
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS transformation tool

### Form Management
- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Performant forms with easy validation

### Icons
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎯 Roadmap

- [ ] **Export Functionality**: Export schemas as JSON files
- [ ] **Import Support**: Import existing JSON schemas
- [ ] **Schema Validation**: Advanced validation rules
- [ ] **Templates**: Pre-built schema templates
- [ ] **Dark Mode**: Theme switching capability
- [ ] **Schema History**: Undo/redo functionality
- [ ] **API Integration**: Connect with external APIs

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">
  <img src="https://github.com/abhey-afk.png" width="100" height="100" style="border-radius: 50%;" alt="Abhey Mishra" />
  <h3>Abhey Mishra</h3>
  <p>Full Stack Developer</p>
  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhey-afk)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/abhey-mishra)
</div>

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the blazing fast build tool
- **Lucide** for the beautiful icons

---

<div align="center">
  <h3>⭐ Star this repository if you found it helpful!</h3>
  <p>Made with ❤️ by <a href="https://github.com/abhey-afk">Abhey Mishra</a></p>
</div>