# Next.js Atomic Design Template

This is a [Next.js](https://nextjs.org/) project structured using the **Atomic Design** methodology. This template provides a foundational structure to organize your components efficiently as your application scales.

## Project Structure

The project follows the Atomic Design principles, with the component directory organized as follows:

```
components/
├── atoms/       # Basic building blocks (e.g., buttons, inputs, icons)
├── molecules/   # Groups of atoms working together (e.g., search form, card header)
├── organisms/   # Complex sections forming distinct parts of an interface (e.g., navbar, footer)
└── templates/   # Page layouts that define the structure of content
```

### 1. Atoms
Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.

### 2. Molecules
Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

### 3. Organisms
Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

### 4. Templates
Templates consist mostly of groups of organisms stitched together to form pages. It is here where we start to see the design come together and start seeing things like layout in action.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Next.js Documentation](https://nextjs.org/docs)
