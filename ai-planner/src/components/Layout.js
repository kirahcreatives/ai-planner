import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { ThemeToggle } from './ThemeToggle';

const Layout = ({ title }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Header title={title}>
                <ThemeToggle />
            </Header>
            <main className="flex-grow pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Layout;