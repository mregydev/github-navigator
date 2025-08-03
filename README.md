# 🚀 Repo Navigator

[Live Demo](https://github-navigator-3oy1.vercel.app/)

Repo Navigator is a minimal GitHub repository explorer that allows users to search, sort, and view details about GitHub repositories — with a strong focus on performance, global state management, and robust error handling.

---

## 🔍 Features

- 🔎 **Search GitHub Repositories** by query and language and applied debouncing
- ⭐ **Sort** by stars or forks
- 📄 **Repository Detail View** at `/repo/:owner/:repo`, e.g., [`/repo/NARKOZ/hacker-scripts`](https://github-navigator-3oy1.vercel.app/repo/NARKOZ/hacker-scripts)
- 📌 **Bookmark Repositories** with local persistence
- ⚙️ **Centralized Error Handling** using `react-query` + `toast`
- 💨 **Blazing-fast retrieval** of bookmarked repos with `O(1)` lookup via object 

---

## 🧱 Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| **React Query** | Server state & caching with error tracking |
| **Zustand**     | Global state management with persistence for bookmarks |
| **shadcn/ui**   | Accessible, styled component library |
| **Axios**       | API requests to GitHub |
| **Sonner**      | Toast notifications |

---

## 🧠 Architecture Highlights

### 🔁 Server State with React Query

- Centralized API logic in `queryClient` using `onError` to catch and toast API errors.
- GitHub rate limits and network errors are automatically handled with custom UI feedback.

### 🧠 Global State with Zustand

- Lightweight, persistent global state for bookmarked repositories.
- Uses an `object` as a hash map for **O(1)** retrieval and duplication checks.

---

## 📌 Bookmarks

Bookmarked repositories are saved locally (persisted using Zustand middleware), making it easy to store and retrieve without performance issues.

---

## 🧪 TODOs

### 🛠 Improvements

- [ ] Add `ErrorBoundary` for static/render-time error handling
- [ ] Add component-level tests with **Vitest** or **Jest** and **Testing Library**

---

## 🖥 Deployment

Deployed on **Vercel** at  
🌍 **[https://github-navigator-3oy1.vercel.app](https://github-navigator-3oy1.vercel.app)**

---
