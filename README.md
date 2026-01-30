# ITPM Assignment 1 - Swift Translator Automation

This repository contains the automated test suite for the Swift Translator (Singlish to Sinhala) application. Developed for ITPM Assignment 1.

## 📝 Student Information
- **Registration Number**: IT23604476
- **Batch**: BSc (Hons) in IT - Year 3

## 🚀 Project Overview
This automation suite covers 36 test scenarios using Playwright:
- 25 Positive Functional Scenarios
- 10 Negative Functional Scenarios
- 01 UI Test Scenario

## 🛠️ Setup and Execution Instructions

Follow these steps to set up and run the tests on your machine:

1. **Install Dependencies & Browsers:**
   Run these commands in your terminal:
npm install
npx playwright install chromium

2. **Run All Tests:**
Run this command to execute the automation suite:
npx playwright test

3. **View Test Report:**
After the tests are finished, run this to see the results:
npx playwright show-report

---
## 📁 Folder Structure
- `tests/translator.spec.js`: All automated test cases.
- `playwright.config.js`: Framework configuration.
- `README.md`: Documentation and setup guide.