# Cedar-Secured Todo App (POC)

This is a **Node.js + Express + TypeScript** project.  
It will later integrate **Drizzle ORM, GraphQL, and Cedar** for access control.

---

## Features (Current)

- Node.js + Express backend  
- TypeScript support  
- Dev server with **nodemon** and **ts-node**  
- Minimal **Hello World** route: `GET /`  

---

## Prerequisites

- Node.js v18+  
- npm v9+  
- VS Code or any code editor  

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Biplav-05/cedar-secured-todo.git
cd cedar-secured-todo
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Open browser at [http://localhost:3000](http://localhost:3000)  
You should see:  

```
Hello World from Express + TypeScript!
```

---

## Project Structure (Current)

```
cedar-secured-todo/
├── src/
│   └── index.ts      # Entry point
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Next Steps

- Add **Drizzle ORM** for database integration  
- Implement **GraphQL endpoints**  
- Integrate **Cedar** for access control

