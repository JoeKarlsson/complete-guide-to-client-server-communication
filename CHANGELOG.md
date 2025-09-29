# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024-09-29

### Added

- Comprehensive testing suite for all examples
- Modern development tools (`nodemon`, `npm-check-updates`)
- `.nvmrc` file for Node.js version management
- `.gitignore` file with comprehensive patterns
- `CONTRIBUTING.md` with contribution guidelines
- Interactive HTTP/2 demo with multiplexing demonstration

### Changed

- **BREAKING**: Updated HTTP/2 example to use native Node.js `http2` module instead of deprecated `spdy`
- Modernized all JavaScript code to use ES6+ features
- Enhanced UI/UX for all web examples with better styling and error handling
- Updated all dependencies to latest stable versions
- Improved error handling and logging across all examples

### Fixed

- Fixed deprecated `util.puts` usage in Server-Sent Events example
- Created missing `client.js` file for WebSocket example
- Fixed HTTP/2 server push implementation (replaced with multiplexing demo)
- Updated SSL certificate generation to be non-interactive
- Fixed all package.json files with proper metadata and scripts

### Removed

- Removed deprecated `spdy` dependency
- Removed unused `util` import from Server-Sent Events

## [2.0.0] - 2024-09-29

### Added

- Comprehensive documentation for all communication protocols
- Cross-linking between examples for easy navigation
- Modern UI/UX for all web examples
- Detailed README files for each protocol
- Learning path from beginner to advanced

### Changed

- Completely rewrote all documentation
- Modernized code examples
- Enhanced project structure and organization

## [1.0.0] - Original Release

### Added

- Basic examples for XMLHttpRequest, Server-Sent Events, WebSockets, TCP Sockets, and HTTP/2
- Simple server implementations
- Basic client examples
