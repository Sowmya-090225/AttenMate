import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Captures the dashboard element and generates a clean PDF report
 * @param {string} userName - Optional user email/name for the header
 * @param {string} elementId - ID of the dashboard container
 */
export const exportToPDF = async (userName = 'AttenMate User', elementId = 'dashboard-content') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  try {
    // Hide buttons during capture
    const buttons = element.querySelectorAll('button:not(.no-export)');
    buttons.forEach(btn => btn.style.visibility = 'hidden');

    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#0b1120' : '#f1f5f9'
    });

    // Restore buttons
    buttons.forEach(btn => btn.style.visibility = 'visible');

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    
    // Add page with metadata if needed, but for now just single image dashboard
    const fileName = `AttenMate_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('PDF Export failed:', error);
    return false;
  }
};
