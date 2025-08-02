import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import FilterBar from './components/FilterBar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white shadow p-4 text-xl font-bold text-blue-600">
          GitHub Explorer
        </header>
        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterBar />
                  <RepoList />
                </>
              }
            />
            <Route path="/repo/:owner/:name" element={<RepoDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
