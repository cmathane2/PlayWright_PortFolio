import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle;
  readonly cartLink;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: /products/i });
    this.cartLink = page.getByRole('link', { name: /shopping cart/i });
  }
}
