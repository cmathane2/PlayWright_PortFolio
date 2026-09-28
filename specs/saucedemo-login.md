# Test Plan: Amazon.in Login Flow

**Target:** https://www.amazon.in/
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-24

## Overview
This plan covers the requested login scenarios starting from Amazon India's `Hello, sign in Account & Lists` entry point. The named users and password are SauceDemo-style fixture credentials; the public Amazon.in site does not provide those demo accounts, so successful and locked-account outcomes require a controlled test environment or credential mapping before execution.

## Preconditions
- Use a fresh browser context for every scenario.
- Start at https://www.amazon.in/ with no authenticated Amazon session.
- The sign-in entry point is the header link named `Hello, sign in Account & Lists`.
- The Amazon sign-in flow may require an email address or mobile number, then a password, and may introduce CAPTCHA or OTP verification.
- Use `secret_sauce` only in a non-production test environment. Do not use it against a real Amazon account.
- The requested `standard_user` and `locked_out_user` identities must be provisioned or mapped by the test environment; they are not native Amazon.in users.

## Scenarios

### Scenario 1.1 — standard_user successful login
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** A controlled Amazon-compatible test environment maps `standard_user` to a valid test account and allows the login to complete without an external CAPTCHA or OTP challenge.
- **Steps:**
  1. Open https://www.amazon.in/ — expected: the Amazon.in homepage loads.
  2. Select `Hello, sign in Account & Lists` — expected: the Amazon sign-in page opens.
  3. Enter the test identifier mapped to `standard_user` — expected: the identifier is accepted.
  4. Continue to the password step — expected: the password form is displayed.
  5. Enter `secret_sauce` and submit Sign in — expected: authentication succeeds and the user returns to an Amazon page in a signed-in state.
- **Assertions:**
  - The sign-in flow completes without an authentication error.
  - The page is no longer the unauthenticated sign-in form.
  - The account area reflects the authenticated test user.
- **Edge cases considered:**
  - CAPTCHA or OTP interrupts the flow.
  - Existing cookies cause the user to skip the sign-in form.
  - The user is redirected to the original Amazon page after authentication.

### Scenario 1.2 — locked_out_user shows locked error
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** A controlled test environment maps `locked_out_user` to a locked account and suppresses external CAPTCHA or OTP requirements.
- **Steps:**
  1. Open https://www.amazon.in/ and select `Hello, sign in Account & Lists` — expected: the sign-in page opens.
  2. Enter the test identifier mapped to `locked_out_user` — expected: the identifier is accepted.
  3. Continue to the password step — expected: the password form is displayed.
  4. Enter `secret_sauce` and submit Sign in — expected: authentication is rejected.
- **Assertions:**
  - A visible error explains that the account is locked, disabled, or unavailable.
  - The user is not placed into an authenticated account state.
  - The sign-in flow remains available for recovery or retry.
- **Edge cases considered:**
  - The account is throttled instead of explicitly marked locked.
  - A lock message exposes no sensitive account details.
  - Repeating the attempt does not unexpectedly authenticate the user.

### Scenario 1.3 — Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the Amazon sign-in page with no identifier entered.
- **Steps:**
  1. Leave the email or mobile-number field empty — expected: the field remains blank.
  2. Select Continue — expected: the form is rejected without moving to password entry.
- **Assertions:**
  - A visible validation message identifies the missing email or mobile number.
  - The user remains on the identifier step.
  - No authentication request is treated as successful.
- **Edge cases considered:**
  - The field contains only whitespace.
  - Browser autofill suggests a previously used identifier.
  - Continue is activated by keyboard instead of a pointer.

### Scenario 1.4 — Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User has entered a valid test identifier and is on the Amazon password step.
- **Steps:**
  1. Leave the Password field empty — expected: no password is entered.
  2. Select Sign in — expected: submission is rejected with a password validation error.
- **Assertions:**
  - A visible message indicates that a password is required.
  - The user is not authenticated.
  - The password step remains available for correction.
- **Edge cases considered:**
  - The password contains only spaces.
  - A previously entered password is cleared before submission.
  - The password field remains masked when a value is later entered.

### Scenario 1.5 — Invalid credentials
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** User is on the Amazon sign-in page and the identifier is not associated with a valid test account, or the password is intentionally invalid for the mapped account.
- **Steps:**
  1. Open https://www.amazon.in/ and select `Hello, sign in Account & Lists` — expected: the sign-in page opens.
  2. Enter the invalid test identifier — expected: the identifier is accepted for submission.
  3. Continue to the password step — expected: the password form is displayed, or the site rejects the identifier with an account error.
  4. Enter `secret_sauce` and submit Sign in when the password step is available — expected: authentication fails.
- **Assertions:**
  - A visible authentication or account error is displayed.
  - The user is not redirected into an authenticated account state.
  - The user can retry or use an account-recovery path without a false success.
- **Edge cases considered:**
  - Invalid identifier format is rejected before password entry.
  - Wrong password for an otherwise valid test identifier.
  - Repeated failures trigger throttling, CAPTCHA, or temporary blocking.

## Not covered (and why)
- Real Amazon account authentication, because using demo credentials against a production site is invalid and unsafe.
- CAPTCHA, OTP, and multi-factor completion, because these require controlled challenge handling and potentially real user devices.
- Account creation and password recovery, because the requested scope is limited to login scenarios.
- SauceDemo-specific inventory assertions, because the requested target is Amazon.in rather than https://www.saucedemo.com/.