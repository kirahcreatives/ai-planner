import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ItineraryProvider } from './context/ItineraryContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelpProvider } from './contexts/HelpContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import HelpCenter from './pages/HelpCenter';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <ErrorProvider>
            <HelpProvider>
              <ProgressProvider>
                <Router>
                  <ItineraryProvider>
                    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                      <Routes>
                        <Route element={<Layout title="AI Planner" />}>
                          <Route index element={<Landing />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/create" element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          } />
                          <Route path="/results" element={
                            <ProtectedRoute>
                              <Results />
                            </ProtectedRoute>
                          } />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/help" element={<HelpCenter />} />
                        </Route>
                      </Routes>
                    </div>
                  </ItineraryProvider>
                </Router>
              </ProgressProvider>
            </HelpProvider>
          </ErrorProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
