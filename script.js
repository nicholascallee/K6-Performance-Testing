import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 5,
      duration: '1m',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    page.locator('#checkbox1').check();

    check(page, {
      'checkbox is checked':
        page.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
    });
  } finally {
    page.close();
  }
}