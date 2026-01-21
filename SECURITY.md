# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **Do NOT** open a public issue
2. Email the maintainer directly with details
3. Include steps to reproduce if possible
4. Allow reasonable time for a fix before public disclosure

## Security Considerations

### Random Number Generation
- Uses cryptographically secure random number generation
- Provably fair algorithm ensures transparency
- Seed values are verifiable

### Client-Side Security
- No sensitive data stored in localStorage
- No external API calls with user data
- All game logic runs client-side

### Fair Play
- Deck shuffle uses crypto.getRandomValues()
- Game outcomes are deterministic from seed
- No server-side manipulation possible

### Best Practices
- Dependencies regularly updated
- No eval() or unsafe code execution
- Input validation on all user actions
- XSS prevention through React

## Responsible Disclosure

We appreciate security researchers who:
- Report vulnerabilities privately
- Provide detailed reproduction steps
- Allow time for fixes before disclosure
- Work with us on solutions

Thank you for helping keep this project secure!
