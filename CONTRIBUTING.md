# Contributing to Complete Guide to Client-Server Communication

Thank you for your interest in contributing to this project! This guide will help you get started.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/yourusername/complete-guide-to-client-server-communication.git
   cd complete-guide-to-client-server-communication
   ```

3. **Install dependencies**:

   ```bash
   npm run install:all
   ```

## 🛠️ Development

### Running Examples

Each example can be run independently:

```bash
npm run start:xhr        # XMLHttpRequest demo
npm run start:sse        # Server-Sent Events demo
npm run start:websocket  # WebSocket demo
npm run start:tcp        # Raw TCP sockets demo
npm run start:http2      # HTTP/2 demo
```

### Development Tools

- **Check for outdated packages**: `npm run check:outdated`
- **Update all dependencies**: `npm run update:deps`
- **Install all dependencies**: `npm run install:all`

## 📝 Contributing Guidelines

### What to Contribute

- **Bug fixes**: Fix issues in existing examples
- **New examples**: Add new communication protocols
- **Documentation**: Improve README files and code comments
- **Modernization**: Update code to use modern JavaScript features
- **Testing**: Add tests for examples

### Code Style

- Use **ES6+** features (const/let, arrow functions, template literals)
- Follow **consistent formatting** (2 spaces for indentation)
- Add **meaningful comments** explaining complex concepts
- Use **descriptive variable names**

### Pull Request Process

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes** following the guidelines above
3. **Test your changes** by running the relevant examples
4. **Update documentation** if needed
5. **Commit your changes**: `git commit -m "Add: brief description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request** on GitHub

### Commit Message Format

Use clear, descriptive commit messages:

- `Add: new WebSocket example with authentication`
- `Fix: HTTP/2 server push implementation`
- `Update: modernize XHR example with async/await`
- `Docs: improve SSE documentation`

## 🧪 Testing

Before submitting a pull request, please:

1. **Test all examples** to ensure they work correctly
2. **Check for linting errors** (if configured)
3. **Verify documentation** is accurate and up-to-date
4. **Test on different browsers** (for web examples)

## 📋 Issue Reporting

When reporting issues, please include:

- **Node.js version**: `node --version`
- **Operating system**: OS and version
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Error messages**: Any console errors or logs

## 🤝 Code of Conduct

- Be **respectful** and **inclusive**
- **Help others** learn and grow
- **Provide constructive feedback**
- **Follow the golden rule**: treat others as you want to be treated

## 📚 Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [HTTP/2 Specification](https://tools.ietf.org/html/rfc7540)
- [WebSocket RFC](https://tools.ietf.org/html/rfc6455)

## 🎯 Project Goals

This project aims to:

- **Educate developers** about different communication protocols
- **Provide working examples** for each protocol
- **Stay up-to-date** with modern web standards
- **Be accessible** to developers of all skill levels

Thank you for contributing! 🎉
