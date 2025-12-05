# E-commerce Product Page

A solution for the **Frontend Mentor – E-commerce product page** challenge.

This project recreates a fully responsive product page for a fictional sneaker company. It includes an image gallery with a lightbox, a shopping cart with full interactivity, a mobile navigation menu, and quantity controls—all built with accessibility and clean UI/UX in mind using **HTML, TypeScript**, and a custom **Tailwind CSS configuration** with components defined in `@layer components`.

## 🚀 Features

### 🖼️ Product Image Gallery

- Main product image with animated transitions
- Carousel navigation (prev/next buttons).
- Click-to-open lightbox with full-screen images.
- Thumbnail selection with active state.
- Keyboard support (Escape to close).

### 🛒 Shopping Cart

- Add/remove items with dynamic price calculation.
- Styled container with responsive layout.
- Cart badge updates in real time.
- “Empty cart” fallback state.

### 📱 Mobile Navigation

- Hamburger menu with slide-in animation.
- Smooth transitions and accessible ARIA attributes.
- Click outside to close.
- Overlay lock for scroll prevention.
- Responsive desktop nav with hover underline animation.

### ↕️ Quantity Selector

- Increase/decrease product count with safeguards (no negative values).

### 🎨 Styled with Tailwind CSS

Tailwind layer structure is fully used:

- **@layer base** → CSS variables, typography.
- **@layer components** → reusable UI elements (buttons, thumbnails, cart, menu, lightbox…).
- **@layer utilities** → helpers (transition, icons, sizes).

This makes the project maintainable and scalable.

### 🧠 Simple Global Store in TypeScript

Simple global state store that tracks:

- Current image index
- Cart quantity
- Counter value
- UI states (menu, cart, lightbox)

  All logic is fully typed.

## 🛠️ Tech Stack

- **HTML5**
- **TypeScript**
- **Tailwind CSS**
- **Vite** (or your chosen bundler)
- Modular JavaScript functions for clean structure

## 📂 Project Structure

```
/
├── images/
├── src/
│   ├── main.ts
│   ├── store.ts
│   ├── functions.ts
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## 🧪 What I Practiced

This challenge helped me strengthen:

- DOM manipulation with TypeScript
- Managing UI state without frameworks
- Building reusable functions for interactivity
- Responsive layout with Tailwind utility classes
- Keyboard accessibility (Escape, Arrow keys)
- Lightbox logic with shared thumbnail state

## 🌐 Live Demo

Add your deployed project link here:
➡️ https://wgalik.github.io/ecommerce-product-page-main_TailwindCSS_TypeScript/

## 📝 Frontend Mentor

This project is a solution to:
https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6

## 🙌 Acknowledgements

Thanks to Frontend Mentor for providing realistic UI challenges that help improve real-world frontend skills.
