# DAVE3625 Exam Trainer

A local-first, mobile-friendly exam practice app for the DAVE3625 Introduction to Artificial Intelligence course.

## What's included

- 80-question mock exams in the 2026 exam structure: 55 Part A, 20 Part B, 5 Part C.
- 120 points total and a four-hour practice timer.
- Randomized question selection and option order.
- 113 single-answer, 62 multiple-answer and 15 written-question prompts in the current question bank.
- Autosaved answers, question navigation, review flags and the ability to reopen/edit an attempt.
- Automatic marking for Parts A and B; model-answer guidance and self-assessment for Part C.
- Local exam history, topic feedback, and an offline-capable PWA shell.

## Run locally

Open `index.html` in a modern browser. For the most reliable PWA installation and offline support, serve the folder over HTTPS (for example, with GitHub Pages).

## Publish with GitHub Pages

1. Create a new public GitHub repository (for example, `dave3625-exam-trainer`).
2. Upload the *contents* of this folder (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`) to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Open the published HTTPS address on your iPhone.

## Add to iPhone 16 Home Screen

1. Open the published HTTPS address in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Give it a name (for example, DAVE3625) and tap **Add**.

## Data and privacy

Answers and history are stored in the browser's local storage on the device. They are not uploaded to a server. Use the same browser/device to continue an attempt. Clearing Safari website data may erase saved attempts. This version does not sync data between devices.

## Exam source basis

The 2026 course page and examination guide are the primary sources for topic coverage and the 55/20/5, 120-point format. Practical coverage includes the 2026 repository's Python reference, Pandas/data-wrangling lab and Titanic feature-engineering lab, plus the assignment briefs supplied by the student. The two supplied older mock-exam PDFs appear to be duplicates of the same 39-question paper and are used only as a secondary style reference (approximately 15%), not as the syllabus or a source of repeated questions.
