// Add a button to the page
function addExportButton() {
  // Check if button already exists
  if (document.querySelector('#kol-export-button')) return;
  
  const button = document.createElement('button');
  button.id = 'kol-export-button';
  button.className = 'export-button';
  button.textContent = 'Copy Data';
  
  button.addEventListener('click', async (e) => {
    // If shift is held, copy without headers
    await copyToClipboard(!e.shiftKey);
    
    // Update button text based on the last action
    if (e.shiftKey) {
      button.textContent = 'Copy Data';
      button.classList.remove('showing-hint');
    } else {
      button.textContent = 'Shift+Click for no headers';
      button.classList.add('showing-hint');
    }
    
    // // Reset button text after 3 seconds
    // setTimeout(() => {
    //   button.textContent = 'Copy Data';
    //   button.classList.remove('showing-hint');
    // }, 3000);
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
    message.className = 'copy-notification';
    document.body.appendChild(message);
    
    // Add a fade-out animation before removing
    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transition = 'opacity 0.3s ease';
      setTimeout(() => document.body.removeChild(message), 300);
    }, 1700);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy data to clipboard. Please try again.');
  }
}
