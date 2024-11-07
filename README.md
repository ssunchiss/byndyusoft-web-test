# byndyusoft-web-test
This Cypress test is designed to verify the presence of a Telegram contact link on Byndyusoft's website, ensuring that the link appears as expected when the contact popup is triggered. Below is a detailed breakdown of each step and its purpose:

1. **Block Third-Party Analytics Requests**:
   - The test begins by intercepting and blocking requests to third-party analytics and ad services (Yandex, Google Analytics, DoubleClick). This is done to reduce potential interference from external scripts that might slow down or prevent proper page load and interaction with the target elements on the Byndyusoft site.

2. **Navigate to Google and Perform a Search**:
   - The test navigates to Google (https://www.google.ru) and searches for "Byndyusoft." This simulates a user finding the Byndyusoft website through a search engine.

3. **Locate and Check the First Search Result Link**:
   - The test captures the first search result, extracts its `href` attribute, and checks that the URL points to Byndyusoft’s site.
   - It then performs a `cy.request()` to confirm that the link returns a 200 status, meaning the page is reachable. This step ensures the URL is valid and the Byndyusoft server is responsive before visiting the page.

4. **Visit the Byndyusoft Site Using `cy.origin`**:
   - Since Cypress enforces same-origin policies, `cy.origin` is used to handle the cross-origin navigation from Google to Byndyusoft’s domain.
   - The test then increases the `pageLoadTimeout` and waits for the Byndyusoft page to fully load, verifying that the `body` element is visible on the page.

5. **Scroll to and Click the "Request a Presentation" Button**:
   - The test scrolls to a section labeled “Know More” (indicated by `.knowMore__text`) and clicks on a button labeled "Request a Presentation" (`.js-popup-callback-show`). This action simulates a user interaction that would trigger a popup with contact information.

6. **Verify Contact Information Popup**:
   - The test then waits for a popup containing contact information (`.popup-callback__contacts`) to appear, ensuring it becomes visible within a specified timeout.

7. **Check for a Telegram Link in the Popup**:
   - Within the popup, the test looks for a link to Telegram that should have specific attributes:
     - `href` set to `http://t.me/alexanderbyndyu`
     - `target="_blank"` to open in a new tab
     - `rel="noopener noreferrer"` to enhance security when opening links in new tabs.

### Summary of Purpose:
This test automates the verification of Byndyusoft's contact information functionality by simulating user interactions from search engine navigation to viewing and validating a specific contact detail (Telegram link). It checks that the link appears in the expected format in a popup window, indicating that the page's elements and external resources are functioning as intended.
