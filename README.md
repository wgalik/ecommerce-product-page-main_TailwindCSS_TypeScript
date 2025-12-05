# E-commerce Product Page

A solution for the **Frontend Mentor – E-commerce product page** challenge.

This project recreates a fully responsive product page for a fictional sneaker company. It includes an image gallery with a lightbox, a shopping cart with full interactivity, a mobile navigation menu, and quantity controls—all built with accessibility and clean UI/UX in mind.

## 🚀 Features

### 🖼️ Product Image Gallery

- Carousel navigation (prev/next buttons).
- Click-to-open lightbox with full-screen images.
- Thumbnail selection with active state.

### 🛒 Shopping Cart

- Add/remove items.
- Dynamic calculation of price × quantity.
- Cart badge updates in real time.
- “Empty cart” fallback state.

### 📱 Mobile Navigation

- Hamburger menu with overlay.
- Smooth transitions and accessible ARIA attributes.
- Click outside to close.

### ↕️ Quantity Selector

- Increase/decrease product count with safeguards (no negative values).

### 🎨 Styled with Tailwind CSS

- Fully custom design based on challenge style guide.
- Lightbox overlay, animations, responsive grid layout, and utility-based styling.

### 🧠 State Management

- Simple global state store that tracks:
- Current image index
- Cart quantity
- Counter value
- UI states (menu, cart, lightbox)

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

##📝 Frontend Mentor

This project is a solution to:
https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6

## 🙌 Acknowledgements

Thanks to Frontend Mentor for providing realistic UI challenges that help improve real-world frontend skills.
