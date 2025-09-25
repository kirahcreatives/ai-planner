import { createContext, useContext, useState } from 'react';
import { Tooltip, HelpButton, HelpOverlay } from '../components/Help';

const HelpContext = createContext();

const helpSteps = [
    {
        title: 'Create a Plan',
        description: 'Click the "New Plan" button to start. Give your plan a name and describe what you want to achieve.'
    },
    {
        title: 'Add Tasks',
        description: 'Break down your goal into smaller tasks. Add deadlines and priority levels to stay organized.'
    },
    {
        title: 'AI Assistance',
        description: 'Our AI will analyze your plan and suggest improvements, resources, and potential challenges.'
    },
    {
        title: 'Track Progress',
        description: 'Mark tasks as complete, update priorities, and adjust your plan as needed.'
    },
    {
        title: 'Review & Adapt',
        description: 'Use the analytics dashboard to review your progress and optimize your planning strategy.'
    }
];

export const HelpProvider = ({ children }) => {
    const [isHelpOverlayOpen, setIsHelpOverlayOpen] = useState(false);

    const value = {
        openHelp: () => setIsHelpOverlayOpen(true),
        closeHelp: () => setIsHelpOverlayOpen(false),
        isHelpOverlayOpen
    };

    return (
        <HelpContext.Provider value={value}>
            {children}
            <HelpOverlay
                isOpen={isHelpOverlayOpen}
                onClose={() => setIsHelpOverlayOpen(false)}
                steps={helpSteps}
            />
        </HelpContext.Provider>
    );
};

export const useHelp = () => {
    const context = useContext(HelpContext);
    if (context === undefined) {
        throw new Error('useHelp must be used within a HelpProvider');
    }
    return context;
};

export const withTooltip = (Component, tooltipContent, position = 'top') => {
    return (props) => (
        <Tooltip content={tooltipContent} position={position}>
            <Component {...props} />
        </Tooltip>
    );
};

export const QuickHelp = () => {
    const { openHelp } = useHelp();
    return <HelpButton onClick={openHelp} />;
};