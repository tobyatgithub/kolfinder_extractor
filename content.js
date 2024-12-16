// Add a button to the page
function addExportButton() {
  // Check if button already exists
  if (document.querySelector('#kol-export-button')) return;
  
  const button = document.createElement('button');
  button.id = 'kol-export-button';
  button.className = 'export-button';
  button.textContent = 'Copy Data';
  
  // Add tooltip
  button.title = 'Click to copy with headers\nHold Shift to copy without headers';
  
  button.addEventListener('click', async (e) => {
    // If shift is held, copy without headers
    await copyToClipboard(!e.shiftKey);
  });
  
  document.body.appendChild(button);
}

// Wait for the dashboard table to be loaded
function waitForTable() {
  const table = document.querySelector('table.caption-bottom'); // More specific selector
  if (table) {
    addExportButton();
  } else {
    // If table is not found, try again after a short delay
    setTimeout(waitForTable, 500);
  }
}

// Start checking for table when page loads
window.addEventListener('load', waitForTable);

// Also watch for dynamic content changes
const observer = new MutationObserver((mutations, obs) => {
  const table = document.querySelector('table.caption-bottom');
  if (table) {
    addExportButton();
    obs.disconnect();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});

async function copyToClipboard(includeHeaders = true) {
  // Select all table rows
  const rows = document.querySelectorAll('tr');
  let csvContent = includeHeaders 
    ? 'Creator\tFollowers\tAverage Views\tTotal Videos\tTotal Likes\tEngagement Rate\tCategories\tContact\n'
    : '';

  // Convert each row to tab-separated format
  rows.forEach(row => {
    // Skip header row if it exists
    if (row.querySelector('th')) return;
    
    // Get all cell data
    const cells = Array.from(row.querySelectorAll('td'));
    if (cells.length === 0) return;
    
    // Extract text content and clean it
    const rowData = cells.map(cell => {
      return cell.textContent.trim();
    });
    
    // Add the row to content with tabs as separators
    csvContent += rowData.join('\t') + '\n';
  });

  try {
    await navigator.clipboard.writeText(csvContent);
    
    // Show success message
    const message = document.createElement('div');
    message.textContent = `Data copied ${includeHeaders ? 'with' : 'without'} headers!`;
    message.style.position = 'fixed';
    message.style.top = '70px';
    message.style.right = '20px';
    message.style.backgroundColor = '#4CAF50';
    message.style.color = 'white';
    message.style.padding = '10px';
    message.style.borderRadius = '4px';
    message.style.zIndex = '9999';
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
      document.body.removeChild(message);
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy data to clipboard. Please try again.');
  }
}
