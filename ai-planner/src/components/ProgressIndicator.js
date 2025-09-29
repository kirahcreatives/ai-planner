import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from './Help';
import { componentHelp } from '../utils/helpContent';

const ProgressStep = ({ step, currentStep, title, description }) => {
    const isCompleted = step < currentStep;
    const isCurrent = step === currentStep;

    return (
        <Tooltip content={description} position="top">
            <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
          ${isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isCurrent ? 'border-blue-500 text-blue-500' :
                            'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'}`}>
                    {isCompleted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <span className="text-sm font-medium">{step + 1}</span>
                    )}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {title}
                </div>
            </div>
        </Tooltip>
    );
};

ProgressStep.propTypes = {
    step: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const ProgressIndicator = ({ currentStep, steps }) => {
    return (
        <div className="w-full py-6">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav aria-label="Progress">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <ProgressStep
                                    step={index}
                                    currentStep={currentStep}
                                    title={step.title}
                                    description={step.description}
                                />
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-0.5 mx-4 ${index < currentStep
                                            ? 'bg-green-500'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                        aria-hidden="true"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
};

ProgressIndicator.propTypes = {
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProgressIndicator;