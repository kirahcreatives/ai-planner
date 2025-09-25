import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ItineraryProvider } from './context/ItineraryContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelpProvider } from './contexts/HelpContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import HelpCenter from './pages/HelpCenter';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <HelpProvider>
          <ProgressProvider>
            <Router>
              <ItineraryProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                  <Routes>
                    <Route element={<Layout title="AI Planner" />}>
                      <Route index element={<Landing />} />
                      <Route path="/create" element={<Home />} />
                      <Route path="/results" element={<Results />} />
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
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
