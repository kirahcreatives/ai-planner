import { Tooltip } from './Help';

export const FormField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    tooltip,
    className = '',
    children,
    ...props
}) => {
    return (
        <div className={`${className}`}>
            <Tooltip content={tooltip}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 cursor-help">
                    {label}
                    <svg className="inline-block w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </label>
            </Tooltip>
            {children || (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded-md shadow-sm
            ${error
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }
            dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                    {...props}
                />
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    tooltip,
    error,
    className = ''
}) => {
    return (
        <FormField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            tooltip={tooltip}
            error={error}
            className={className}
        >
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full rounded-md shadow-sm
          ${error
                        ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }
          dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FormField>
    );
};

export const FormSection = ({ title, description, children }) => {
    return (
        <div className="space-y-4">
            {(title || description) && (
                <div>
                    {title && (
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};