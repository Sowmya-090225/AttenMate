export const subjectColors = [
  { id: 'blue', label: 'Blue', color: '#6366f1', secondary: '#818cf8', bg: 'rgba(99, 102, 241, 0.1)', glow: 'rgba(99, 102, 241, 0.3)' },
  { id: 'purple', label: 'Purple', color: '#a855f7', secondary: '#c084fc', bg: 'rgba(168, 85, 247, 0.1)', glow: 'rgba(168, 85, 247, 0.3)' },
  { id: 'emerald', label: 'Emerald', color: '#10b981', secondary: '#34d399', bg: 'rgba(16, 185, 129, 0.1)', glow: 'rgba(16, 185, 129, 0.3)' },
  { id: 'orange', label: 'Orange', color: '#f59e0b', secondary: '#fbbf24', bg: 'rgba(245, 158, 11, 0.1)', glow: 'rgba(245, 158, 11, 0.3)' },
  { id: 'pink', label: 'Pink', color: '#ec4899', secondary: '#f472b6', bg: 'rgba(236, 72, 153, 0.1)', glow: 'rgba(236, 72, 153, 0.3)' },
  { id: 'cyan', label: 'Cyan', color: '#06b6d4', secondary: '#22d3ee', bg: 'rgba(6, 182, 212, 0.1)', glow: 'rgba(6, 182, 212, 0.3)' },
  { id: 'yellow', label: 'Yellow', color: '#eab308', secondary: '#fde047', bg: 'rgba(234, 179, 8, 0.1)', glow: 'rgba(234, 179, 8, 0.3)' },
  { id: 'red', label: 'Red', color: '#ef4444', secondary: '#f87171', bg: 'rgba(239, 68, 68, 0.1)', glow: 'rgba(239, 68, 68, 0.3)' },
];

export const getColorConfig = (colorId) => {
  return subjectColors.find(c => c.id === colorId) || subjectColors[0];
};

export const subjectColorMap = subjectColors.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});
