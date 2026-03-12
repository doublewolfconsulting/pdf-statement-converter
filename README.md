# PDF Statement Converter

A privacy-first, client-side tool that converts bank and credit card PDF statements into QIF format for import into accounting software.

**All processing happens in your browser. No financial data is ever sent to a server or stored anywhere.**

## Supported Cards

| Bank | Card | Status |
|------|------|--------|
| Citi | SMRT Platinum Visa | ✅ Supported |
| Citi | Rewards World Mastercard | ✅ Supported |
| UOB | Absolute Cashback (AMEX) | ✅ Supported |
| UOB | PRVI Miles (Mastercard) | ✅ Supported |
| UOB | Preferred Platinum (Visa) | ✅ Supported |

## Quick Start

1. Clone or download this repo
2. Open `index.html` in your browser
3. Select your card type, upload your PDF statement(s), and click Convert

That's it — no build step, no server, no dependencies to install.

### Alternative: GitHub Pages

If you fork this repo, you can enable GitHub Pages in your repo settings (Settings → Pages → Source: main branch) to get a hosted version at `https://<your-username>.github.io/pdf-statement-converter/`.

## How It Works

1. **PDF.js** extracts text from your PDF entirely in the browser
2. A **bank-specific parser** identifies transactions based on the statement format
3. Transactions are **auto-categorized** using keyword matching (configurable in `categories.js`)
4. Output is generated in **QIF format** with sequential N-numbers for import

## File Structure

```
pdf-statement-converter/
├── index.html                # Main application (open this in your browser)
├── categories.default.js     # Default English categories — copy this to get started
├── categories.personal.js    # Personal categories — loaded by default
├── README.md                 # This file
└── ROADMAP.md                # Planned features and development priorities
```

## Customizing Categories

The repo includes two category files:

- **`categories.default.js`** — a clean English starting point with common categories
- **`categories.personal.js`** — the active file loaded by the tool

To set up your own categories:

1. Copy `categories.default.js` and rename it `categories.personal.js`
2. Edit it with your own merchant keywords and category names
3. Open `index.html` — your categories will be used automatically

The format is straightforward:

```javascript
const CATEGORY_RULES = {
    'YourCategory:Subcategory': ['KEYWORD1', 'KEYWORD2'],
    // ...
};
```

- Keywords are **case-insensitive** and use **substring matching**
- First match wins, so put more specific keywords before general ones
- Category names can use any format your accounting software supports

## Privacy & Security

- **Zero server communication** — no APIs, no analytics, no tracking
- **No data storage** — nothing is saved to disk, localStorage, or cookies
- **Client-side only** — PDF.js runs in your browser; the PDF never leaves your machine
- **Open source** — inspect every line of code yourself

## Contributing

Contributions are welcome! See [ROADMAP.md](ROADMAP.md) for planned features. The easiest way to contribute is adding support for new bank/card statement formats or expanding the category keyword list.

### Adding a New Card Parser

1. Study your bank's PDF statement format (use browser console to inspect extracted text)
2. Add a parser function following the pattern in `index.html` (see `parseStandardCitiTransactions` or `parseUOBTransactions`)
3. Register it in the `PARSERS` object
4. Add the card option to the HTML `<select>` dropdown
5. Submit a PR — no real statement data please, just the parser logic

## License

Source-available, personal use only. See [LICENSE](LICENSE) for details. For commercial licensing inquiries, please open an issue.
