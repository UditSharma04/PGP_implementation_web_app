# PGP Demonstration

## Overview

This project is an interactive web application that demonstrates the principles and functionality of Pretty Good Privacy (PGP) encryption. It provides a hands-on learning experience for understanding how PGP works to secure communications through public-key cryptography.

## Features

- **Educational Content**: Detailed explanation of PGP concepts, history, and importance
- **Key Generation**: Generate RSA key pairs with customizable key sizes (1024, 2048, or 4096 bits)
- **Encryption**: Encrypt messages using a recipient's public key
- **Decryption**: Decrypt messages using your private key and passphrase
- **Interactive UI**: Animated visualizations that illustrate the encryption and decryption processes
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React**: Frontend UI library (v19.0.0)
- **Vite**: Build tool and development server
- **OpenPGP.js**: JavaScript implementation of the OpenPGP standard (v6.1.0)
- **React Router**: For navigation between different sections (v7.5.0)
- **Framer Motion**: For animations and transitions (v12.6.3)
- **TailwindCSS**: For styling (v4.1.3)

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage

### Key Generation
Generate a PGP key pair by providing your name, email, and a strong passphrase. You can select different key sizes based on your security needs.

### Encryption
Encrypt a message using someone's public key. Only the person with the corresponding private key will be able to decrypt and read your message.

### Decryption
Decrypt messages that were encrypted with your public key by using your private key and passphrase.

## Educational Purpose

This application is designed for educational purposes to help users understand the concepts of public-key cryptography and PGP encryption. It demonstrates:

- How public and private keys work together
- The process of encrypting and decrypting messages
- The importance of key management and passphrases
- The role of PGP in securing digital communications

## Security Note

While this application uses actual PGP encryption through the OpenPGP.js library, it is primarily intended as a learning tool. For sensitive communications, consider using established PGP software solutions.

## License

This project is available for educational use.

---

© 2024 - PGP Demonstration Project
