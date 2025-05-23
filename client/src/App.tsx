import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SnippetsPage from "./pages/SnippetsPage";
import CreateSnippetPage from "./pages/CreateSnippetPage";
import SnippetDetailPage from "./pages/SnippetDetailPage";
import EditSnippetPage from "./pages/EditSnippetPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/snippets" element={<SnippetsPage />} />
              <Route path="/create-snippet" element={<CreateSnippetPage />} />
              <Route path="/snippet/:id" element={<SnippetDetailPage />} />
              <Route path="/snippet/edit/:id" element={<EditSnippetPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;