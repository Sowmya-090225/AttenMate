/**
 * Calculates attendance percentage and status message
 * @param {number} attended 
 * @param {number} total 
 * @returns {object} { percentage, status, statusColor }
 */
export const calculateAttendance = (attended, total) => {
  if (total === 0) return { percentage: 0, status: "No classes yet", statusColor: "secondary" };
  
  const percentage = (attended / total) * 100;
  let status = "Good attendance";
  let statusColor = "success";
  
  if (percentage < 65) {
    status = "Low attendance";
    statusColor = "danger";
  } else if (percentage < 75) {
    status = "Warning: Near target";
    statusColor = "warning";
  }
  
  return {
    percentage: parseFloat(percentage.toFixed(2)),
    status,
    statusColor
  };
};

/**
 * Calculates classes needed to reach target percentage
 * @param {number} attended 
 * @param {number} total 
 * @param {number} target 
 * @returns {number} classes needed
 */
export const calculateRequirement = (attended, total, target = 75) => {
  if (target <= 0 || target >= 100) return 0;
  if (total === 0) return 0;
  
  const currentPercentage = (attended / total) * 100;
  if (currentPercentage >= target) return 0;
  
  const targetDecimal = target / 100;
  const needed = Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal));
  
  return needed > 0 ? needed : 0;
};

/**
 * Calculates overall average percentage across all subjects
 * @param {Array} subjects 
 * @returns {number} overall percentage
 */
export const calculateOverallAverage = (subjects) => {
  if (!subjects || subjects.length === 0) return 0;
  
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  
  if (totalClasses === 0) return 0;
  return parseFloat(((totalAttended / totalClasses) * 100).toFixed(2));
};

/**
 * Groups attendance logs by week or month
 * @param {Array} logs 
 * @param {string} period 'week' | 'month'
 * @returns {Array} grouped summaries
 */
export const getAttendanceSummaryByPeriod = (logs, period = 'week') => {
  if (!logs) return [];
  const summary = {};
  
  logs.forEach(log => {
    const date = new Date(log.timestamp);
    let key;
    
    if (period === 'week') {
      const year = date.getFullYear();
      const firstDayOfYear = new Date(year, 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      key = `Week ${weekNum}, ${year}`;
    } else {
      key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    
    if (!summary[key]) {
      summary[key] = { attended: 0, total: 0, label: key };
    }
    
    summary[key].total += 1;
    if (log.status === 'present') {
      summary[key].attended += 1;
    }
  });
  
  return Object.values(summary).sort((a,b) => b.label.localeCompare(a.label)).map(s => ({
    ...s,
    percentage: parseFloat(((s.attended / s.total) * 100).toFixed(2))
  }));
};

/**
 * Checks if exams are near and determines the alert level
 * @param {string} examDate 
 * @param {number} overallAvg 
 * @param {boolean} reminderEnabled 
 * @returns {Array} active alerts
 */
export const getActiveAlerts = (examDate, overallAvg, reminderEnabled) => {
  const alerts = [];
  
  // 1. Daily Reminder
  if (reminderEnabled) {
    alerts.push({
      id: 'reminder',
      type: 'info',
      message: 'Attend class today!',
      icon: 'Bell'
    });
  }
  
  // 2. Low Attendance Alert
  if (overallAvg > 0 && overallAvg < 75) {
    alerts.push({
      id: 'low-attendance',
      type: overallAvg < 60 ? 'critical' : 'warning',
      message: 'Your attendance is low. You need to attend more classes.',
      icon: 'AlertTriangle'
    });
  }
  
  // 3. Exam Warning
  if (examDate) {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays <= 10) {
      if (overallAvg < 75) {
        alerts.push({
          id: 'exam-critical',
          type: 'critical',
          priority: 1,
          message: `Exams are near (${diffDays} days left) and your attendance is low. Attend classes to avoid shortage.`,
          icon: 'AlarmClock'
        });
      }
    }
  }

  // Add priority to others
  alerts.forEach(a => {
    if (!a.priority) {
      if (a.type === 'critical') a.priority = 1;
      else if (a.type === 'warning') a.priority = 2;
      else a.priority = 3;
    }
  });
  
  return alerts.sort((a, b) => a.priority - b.priority);
};
