# Roadmap

Development priorities for PDF Statement Converter. Items are roughly ordered by priority within each phase.

## Phase 1: Foundation (Current)

- [x] Citi SMRT Platinum Visa parser
- [x] Citi Rewards World Mastercard parser
- [x] UOB Absolute Cashback parser
- [x] UOB PRVI Miles parser
- [x] UOB Preferred Platinum parser
- [x] Multi-file upload and merge
- [x] Auto-categorization with configurable keyword rules
- [x] Smart year detection for cross-year statements
- [x] Multi-card statement section isolation (UOB)
- [x] External category config file (`categories.js`)

## Phase 2: Credit Card Parsers

- [x] AMEX KrisFlyer parser
- [x] SC Simply Cash parser
- [x] SC Priority Banking Visa Infinite parser
- [x] HSBC Advance credit card parser (requires `ocrmypdf` pre-processing)
- [x] HSBC Revolution credit card parser (requires `ocrmypdf` pre-processing)
- [ ] DBS credit card parser
- [ ] YOUTRIP parser
- [ ] REVOLUT parser
- [ ] Auto-detect card type from PDF content (no manual selection needed)

## Phase 3: Bank Account Parsers

Requires QIF account type research — deferred until Phase 2 is complete.

- [ ] SC bank account parser (eSaver, Bonus$aver, Securities Settlement Account)
- [ ] HSBC bank account parser

## Phase 4: Interactive Brokers Parsers

Most complex — multiple statement types, multi-currency, securities transactions.

- [ ] IB activity statement parser (trades, dividends, interest)
- [ ] IB cash report parser

## Phase 5: Export Formats

- [ ] Export format dropdown (QIF and CSV, and future formats)
- [ ] CSV export with configurable column mapping
- [ ] OFX export (broader accounting software support)
- [ ] JSON export (for developers / custom pipelines)

## Phase 6: Parsing Quality & UX

- [x] Rewrite `extractTextFromPDF` to reconstruct rows by Y/X coordinate grouping — eliminates fragile two-buffer pairing in SC parser and simplifies any future multi-column statement parsers
- [x] Improve OCR quality for scanned PDFs (HSBC) — in-browser Tesseract.js attempted but abandoned due to two-column layout mixing and missing decimals; `preprocess.sh` (ocrmypdf) is current solution; future option: server-side or native OCR pipeline
- [ ] Transaction preview table before export (review before download)
- [ ] Uncategorized transaction highlighting
- [ ] Manual category override in preview
- [ ] Duplicate detection across multiple uploads
- [ ] Running total / balance validation against statement totals
- [ ] Drag-and-drop file upload

## Phase 7: Category Management

- [ ] In-app category editor (add/edit/remove without touching code)
- [ ] Import/export category rules (share configs between users)
- [ ] Category suggestions for uncategorized transactions
- [ ] Per-bank default category mappings
- [ ] Amount-based categorization rules (e.g. merchant X: <$6 → coffee, otherwise restaurant)

## Phase 8: Deployment & Distribution

- [ ] GitHub Pages hosting
- [ ] Optional AWS hosting with custom domain
- [ ] PWA support (offline use, install to home screen)
- [ ] Versioned releases with changelog

---

## Design Principles

These guide all development decisions:

1. **Privacy first** — all processing stays client-side, always
2. **Zero dependencies for users** — open the HTML file and it works
3. **Simple to fork and customize** — especially category rules
4. **No build step required** — vanilla HTML/JS, no frameworks
