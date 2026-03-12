# CLAUDE.md — PDF Statement Converter

## Project Overview

Privacy-first, client-side tool that converts bank/card PDF statements into accounting formats (QIF, with more formats planned). All processing happens in the browser — no financial data is ever sent to a server or stored anywhere.

Copyright (c) 2026 Double Wolf Consulting. All rights reserved.
Source-available for personal, non-commercial use only. See LICENSE.

## Tech Stack

- **Frontend:** Vanilla HTML + JavaScript (no framework, no build step)
- **PDF Parsing:** PDF.js (loaded from CDN) — runs entirely client-side
- **Hosting:** GitHub Pages (static files) or open `index.html` directly from disk
- **Development:** Claude Code for feature work

## File Structure

```text
pdf-statement-converter/
├── CLAUDE.md          # This file — project context for Claude Code
├── README.md          # User-facing documentation
├── ROADMAP.md         # Planned features and priorities
├── LICENSE            # Source-available, personal use only
├── .gitignore         # Blocks *.pdf, *.qif, *.csv — never commit financial data
├── index.html         # Main application (UI + parsers + QIF generation)
└── categories.personal.js  # Category rules for auto-classification (external config)
```

## Architecture

### How It Works

1. User uploads PDF statement(s) via the browser
2. **PDF.js** extracts text from the PDF entirely client-side
3. A **bank-specific parser** (selected by user) identifies transactions from the extracted text
4. Transactions are **auto-categorized** using keyword substring matching from `categories.js`
5. Output is generated in **QIF format** with sequential N-numbers
6. User downloads the resulting file — nothing is stored

### Key Design Decisions

- **No server, no database, no API calls** (except PDF.js CDN load). This is non-negotiable.
- **No build step.** Open `index.html` in a browser and it works. Keep it that way.
- **Categories are external config.** `categories.js` is loaded via `<script>` tag. Users edit this file to customize — no code changes needed.
- **One parser per bank/card format.** Each parser is a standalone function registered in the `PARSERS` object. Parsers should never share mutable state.
- **Pre-sorted output.** Transactions are sorted by date after parsing, before QIF generation.

## Supported Cards

| Bank | Card | Parser Key | Card Identifier | Notes |
| ---- | ---- | ---------- | --------------- | ----- |
| Citi | SMRT Platinum Visa | `citi-smrt` | N/A | One card per PDF — no section isolation needed |
| Citi | Rewards World Mastercard | `citi-rewards` | N/A | One card per PDF — no section isolation needed |
| UOB | Absolute Cashback (AMEX) | `uob-absolute` | `ABSOLUTE CASHBACK AMEX` | Multi-card PDF — identifier isolates this card's section |
| UOB | PRVI Miles (Mastercard) | `uob-privi` | `PRVI MILES MASTERCARD` | Multi-card PDF — identifier isolates this card's section |
| UOB | Preferred Platinum (Visa) | `uob-preferred` | `PREFERRED PLATINUM VISA` | Multi-card PDF — identifier isolates this card's section |
| AMEX | KrisFlyer (Singapore Airlines) | `amex-krisflyer` | N/A | Single card per PDF — amounts and descriptions extracted in separate blocks |

## Coding Standards

- **JavaScript:** ES6+, no jQuery, no external frameworks
- **No minification.** Code should be readable — users may inspect it for privacy assurance.
- **Console logging** is intentional. Conversion logs card type, transaction counts, date ranges, and category breakdowns to the browser console for debugging.
- **Comments for parsing logic.** Bank statement formats are quirky — document why regex patterns exist, not just what they do.

## Adding a New Card Parser

1. Study the bank's PDF statement format (upload a PDF, check browser console for extracted text)
2. Create a parser function following the pattern of `parseStandardCitiTransactions` (single-line) or `parseUOBTransactions` (multi-line with card section isolation)
3. Handle year detection — watch out for cross-year statements (e.g., January statement with December transactions)
4. Register the parser in the `PARSERS` object with `name`, `extractYear`, `parseTransactions`, and optionally `cardIdentifier`
5. Add the card option to the HTML `<select id="cardType">` dropdown
6. Add the filename mapping in `updateFilename()`
7. Update this file's Supported Cards table

## Category Files

Two category files are committed:

| File | Purpose |
| ---- | ------- |
| `categories.personal.js` | Personal file — German categories, Singapore-specific merchants. Loaded by default in `index.html`. |
| `categories.default.js` | Clean English starting point for new users. Copy and rename to `categories.personal.js` to use. |

To switch which file is loaded, update the `<script src="...">` tag in `index.html`.

Format:

```javascript
'Category:Subcategory': ['KEYWORD1', 'KEYWORD2'],
```

- Keywords are **case-insensitive** and use **substring matching** ("contains")
- First match wins — put specific keywords before generic ones

## Known Parsing Challenges

- **UOB multi-line transactions:** Amount appears on a separate line from description. The parser uses a `currentTransaction` state machine to handle this.
- **UOB multi-card statements:** A single PDF contains sections for multiple cards. Parser uses `cardIdentifier` to isolate the correct section and stops at the next card header.
- **Cross-year transactions:** A January 2026 statement may contain December 2025 transactions. Year detection compares transaction month against statement month.
- **Citi Rewards year detection:** Falls back to Payment Due Date if Statement Date is missing.
- **Credit vs debit:** Citi uses parentheses `(amount)` for credits. UOB uses `CR` suffix.

## Git Workflow

**Never push directly to `main`.** Use feature branches and PRs.

```bash
git checkout -b feature/your-description
# make changes
git add .
git commit -m "descriptive message"
git push -u origin feature/your-description
gh pr create
```

Branch naming:

- `feature/` — new functionality (new parsers, export formats)
- `fix/` — bug fixes (parsing errors, year detection issues)
- `docs/` — documentation changes

## Privacy & Security Rules

These are absolute and apply to all development:

1. **No network requests** beyond loading PDF.js from CDN. No analytics, no tracking, no telemetry.
2. **No localStorage, no cookies, no sessionStorage.** Nothing persists after the tab closes.
3. **Never commit financial data.** The `.gitignore` blocks `*.pdf`, `*.qif`, `*.csv`, `*.ofx`. If you need test data, use fabricated transactions.
4. **No external services.** No Firebase, no Supabase, no "just a small API call." Everything stays client-side.

## Current Roadmap Priority

See ROADMAP.md for full details. Next priorities:

1. More bank parsers (HSBC, Standard Chartered, DBS)
2. Export format dropdown (CSV alongside QIF)
3. Transaction preview table before export
