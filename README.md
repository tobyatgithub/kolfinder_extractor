# Table Data Copier Chrome Extension

A sleek Chrome extension that allows users to efficiently copy table data with or without headers. Perfect for data analysts and anyone who needs to quickly extract tabular data.

## Features

- 🚀 One-click data copying
- 📋 Flexible header options (with/without headers)
- 💫 Smooth animations and visual feedback
- 🎯 Non-intrusive UI
- ⌨️ Keyboard shortcut support (Shift+Click)

## Usage

1. Click the "Copy Data" button to copy table data with headers
2. Hold Shift while clicking to copy data without headers
3. A notification will confirm successful copying
4. The button text updates to guide you through different copying options

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Technical Details

The extension uses:
- Pure JavaScript for functionality
- CSS animations for smooth transitions
- MutationObserver for dynamic content handling
- Clipboard API for secure data copying

## File Structure

```
├── manifest.json
├── content.js
├── styles.css
├── icons/
│ ├── icon16.png
│ ├── icon48.png
│ └── icon128.png



## Contributing

Feel free to submit issues and enhancement requests!

## License

[MIT License](LICENSE)