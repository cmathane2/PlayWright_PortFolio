# Test Plan: Amazon.in Sign-in Flow

**Target:** https://www.amazon.in/
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-23

## Overview
This plan covers the authentication journey for Amazon India’s sign-in flow as it appears on the public homepage. It focuses on the user journey that begins from the home page, opens the sign-in page, and validates the login states for successful, locked, empty-field, and invalid-credential scenarios.

## Preconditions
- A fresh browser session is used for each scenario.
- The user is not signed in to Amazon.
- The app is available at https://www.amazon.in/.
- The user is able to reach the Amazon sign-in page by clicking the Sign in link from the homepage.
- The password used in all credential attempts is `secret_sauce` unless the scenario explicitly states a different value.

## Scenarios

### Scenario 1.1 — Standard user successful login
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** User is on the Amazon India homepage and not signed in.
- **Steps:**
  1. Click the Sign in link from the homepage header — expected: the Amazon sign-in page opens.
  2. Enter `standard_user` in the email/phone input field — expected: the field accepts the value.
  3. Click Continue or proceed to the password step — expected: the app requests the password or transitions to the password form.
  4. Enter `secret_sauce` in the password field — expected: the password field accepts the value and remains masked.
  5. Click Sign in — expected: the user is logged in and redirected away from the sign-in page to a signed-in Amazon page.
- **Assertions:**
  - The sign-in flow completes successfully.
  - The user is no longer on the sign-in page.
  - The account area or homepage reflects a signed-in state.
- **Edge cases considered:**
  - CAPTCHA or OTP challenges during login
  - Existing Amazon account with saved session state
  - Browser back navigation after a successful sign-in

### Scenario 1.2 — Locked-out user shows lock error
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** User is on the Amazon sign-in page and not signed in.
- **Steps:**
  1. Click the Sign in link from the homepage header — expected: the sign-in page opens.
  2. Enter `locked_out_user` in the email/phone field — expected: the value is accepted.
  3. Continue to password step — expected: the app advances to the password prompt.
  4. Enter `secret_sauce` in the password field — expected: the value is accepted and masked.
  5. Click Sign in — expected: the login attempt is rejected and an error message is displayed.
- **Assertions:**
  - A clear error message indicates the account is locked or unavailable.
  - The page does not show a successful signed-in state.
  - The user remains on the sign-in flow and can try again or recover the account.
- **Edge cases considered:**
  - Account temporarily blocked after repeated attempts
  - Error message persistence after multiple retries
  - Incorrect phone/email formatting for locked accounts

### Scenario 1.3 — Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the Amazon sign-in page.
- **Steps:**
  1. Click the Sign in link from the homepage header — expected: the sign-in page opens.
  2. Leave the email/phone field empty — expected: no value is entered.
  3. Click Continue — expected: Amazon blocks the request and shows a validation error.
- **Assertions:**
  - The app displays a validation message for a missing mobile number or email input.
  - No password form is accepted without a valid account identifier.
  - The user remains on the sign-in page.
- **Edge cases considered:**
  - Input field containing only spaces
  - Browser autofill or saved account suggestions
  - Empty username combined with valid password on a later step

### Scenario 1.4 — Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the Amazon sign-in page and has reached the password step for a valid account identifier.
- **Steps:**
  1. Enter `standard_user` in the sign-in email/phone field — expected: the field accepts the value.
  2. Continue to the password page — expected: the password prompt displays.
  3. Leave the Password field empty — expected: no password is provided.
  4. Click Sign in — expected: the submission is rejected and a validation message appears.
- **Assertions:**
  - The app requires a password before sign-in proceeds.
  - The sign-in flow is not completed and no signed-in state is displayed.
- **Edge cases considered:**
  - Empty password after a previously saved value is cleared
  - Case where the user enters spaces only in the password field
  - Re-entry after a validation error

### Scenario 1.5 — Invalid credentials
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** User is on the Amazon sign-in page and not signed in.
- **Steps:**
  1. Click the Sign in link from the homepage header — expected: the sign-in page opens.
  2. Enter `invalid_user` in the email/phone field — expected: the field accepts the value.
  3. Continue to the password step — expected: the password prompt displays.
  4. Enter `secret_sauce` in the password field — expected: the value is accepted.
  5. Click Sign in — expected: Amazon rejects the login and shows an error notification.
- **Assertions:**
  - An authentication error is displayed for a non-matching username and password combination.
  - No successful account state is reached.
  - The user remains on the sign-in path and can retry.
- **Edge cases considered:**
  - Wrong password for a known valid username
  - Email/phone format mismatch for real accounts
  - Repeated failed attempts triggering lock or throttling behavior

## Not covered (and why)
- Account creation, password recovery, OTP verification, and two-factor flows, because the requested test scope is limited to the login/sign-in flow.
- Order or cart scenarios, because they are outside the sign-in validation scope.
- Product catalog behaviors, because the plan is focused on authentication state and validation messages only.
