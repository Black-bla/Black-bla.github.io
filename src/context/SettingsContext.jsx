// User preferences (sound, etc)
import { createContext, useState } from 'react';

// SettingsContext provides simple user preferences.
// `performanceMode` can be 'high' (default) or 'low' to reduce GPU/CPU load.
export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
	const [performanceMode, setPerformanceMode] = useState('high');

	const value = {
		performanceMode,
		setPerformanceMode,
	};

	return (
		<SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
	);
}
