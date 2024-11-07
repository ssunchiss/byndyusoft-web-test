# byndyusoft-web-test
This Cypress test checks if the Telegram contact link is properly displayed on Byndyusoft's website when the contact popup is triggered. Here’s a step-by-step breakdown of how the test works:

1. **Block Unwanted Requests**:
   - The test starts by blocking third-party analytics and ad services (like Yandex, Google Analytics, and DoubleClick). This helps avoid interference from external scripts that could slow down or disrupt the page load, ensuring the target elements on Byndyusoft’s site can load properly.

2. **Search for Byndyusoft on Google**:
   - The test navigates to Google (https://www.google.ru) and searches for "Byndyusoft." This mimics a user finding the site through a search engine.

3. **Check the First Search Result**:
   - It captures the first search result, grabs its `href` attribute, and makes sure the link points to the Byndyusoft website.
   - The test then sends a `cy.request()` to check if the link returns a 200 status, confirming the page is accessible. This ensures the URL is valid and that Byndyusoft’s server is responding before visiting the page.

4. **Visit Byndyusoft’s Website Using `cy.origin`**:
   - Since Cypress enforces same-origin policies, `cy.origin` is used to handle the cross-origin navigation from Google to Byndyusoft’s domain.
   - The test also increases the `pageLoadTimeout` and waits for the Byndyusoft page to fully load, making sure the page’s body element is visible.

5. **Scroll and Click the "Request a Presentation" Button**:
   - The test scrolls to a section labeled “Know More” (marked by `.knowMore__text`) and clicks the "Request a Presentation" button (`.js-popup-callback-show`). This simulates the action of opening a popup that contains contact information.

6. **Verify the Popup Appears**:
   - The test waits for the contact information popup (`.popup-callback__contacts`) to appear, ensuring it becomes visible within a specified timeout.

7. **Check for the Telegram Link**:
   - Once the popup is displayed, the test looks for a Telegram link with these specific attributes:
     - `href` set to `http://t.me/alexanderbyndyu`
     - `target="_blank"` to open in a new tab
     - `rel="noopener noreferrer"` for security when opening links in new tabs.

### Summary:
This test automates the verification of Byndyusoft's contact information functionality by simulating user interactions from search engine navigation to viewing and validating a specific contact detail (Telegram link). It checks that the link appears in the expected format in a popup window, indicating that the page's elements and external resources are functioning as intended.
