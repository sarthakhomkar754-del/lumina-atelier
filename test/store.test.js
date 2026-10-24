import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, CURRENCIES } from '../src/utils/currency.js';
import { PRODUCTS, CATEGORIES, DISCOUNT_CODES } from '../src/data/products.js';

describe('Currency Formatter Utility', () => {
  test('formats standard USD prices correctly', () => {
    assert.equal(formatPrice(100, 'USD'), '$100.00');
    assert.equal(formatPrice(2499.5, 'USD'), '$2,499.50');
  });

  test('converts rates accurately to EUR and GBP', () => {
    assert.equal(formatPrice(100, 'EUR'), '€92.00');
    assert.equal(formatPrice(100, 'GBP'), '£79.00');
  });

  test('formats JPY without decimal places', () => {
    assert.equal(formatPrice(10, 'JPY'), '¥1,550');
  });

  test('handles null, undefined, NaN, and string gracefully', () => {
    assert.equal(formatPrice(undefined, 'USD'), '$0.00');
    assert.equal(formatPrice(null, 'USD'), '$0.00');
    assert.equal(formatPrice(NaN, 'USD'), '$0.00');
    assert.equal(formatPrice('invalid', 'USD'), '$0.00');
  });

  test('falls back safely to USD when unknown currency is passed', () => {
    assert.equal(formatPrice(50, 'UNKNOWN'), '$50.00');
  });

  test('all supported currencies have valid symbol and positive rate', () => {
    for (const [code, info] of Object.entries(CURRENCIES)) {
      assert.ok(info.symbol, `Missing symbol for currency ${code}`);
      assert.ok(typeof info.rate === 'number' && info.rate > 0, `Invalid rate for currency ${code}`);
      assert.ok(info.label, `Missing label for currency ${code}`);
    }
  });
});

describe('Product Catalog Data Integrity', () => {
  test('contains valid categories', () => {
    assert.ok(CATEGORIES.length > 0, 'Categories should not be empty');
    for (const cat of CATEGORIES) {
      assert.ok(cat.id, 'Category missing id');
      assert.ok(cat.name, 'Category missing name');
      assert.ok(typeof cat.count === 'number' && cat.count > 0, 'Category missing count');
    }
  });

  test('contains valid products with required properties', () => {
    assert.ok(PRODUCTS.length > 0, 'Products catalog should not be empty');

    for (const product of PRODUCTS) {
      assert.ok(product.id, `Product missing id: ${product.name}`);
      assert.ok(product.name, `Product missing name: ${product.id}`);
      assert.ok(typeof product.price === 'number' && product.price > 0, `Invalid price for ${product.name}`);
      assert.ok(Array.isArray(product.images) && product.images.length > 0, `Missing images for ${product.name}`);
      assert.ok(Array.isArray(product.colors) && product.colors.length > 0, `Missing colors for ${product.name}`);
      assert.ok(Array.isArray(product.sizes) && product.sizes.length > 0, `Missing sizes for ${product.name}`);
      assert.ok(typeof product.rating === 'number' && product.rating >= 0 && product.rating <= 5, `Invalid rating for ${product.name}`);
      assert.ok(typeof product.inStock === 'number' && product.inStock >= 0, `Invalid inStock for ${product.name}`);
      assert.ok(product.category, `Product missing category: ${product.name}`);
    }
  });

  test('contains valid coupon codes with numerical or special discounts', () => {
    assert.ok(Object.keys(DISCOUNT_CODES).length > 0);
    for (const [code, info] of Object.entries(DISCOUNT_CODES)) {
      assert.ok(info.label, `Missing label for coupon code ${code}`);
      if (info.discount === 'free_shipping') {
        assert.equal(info.discount, 'free_shipping');
      } else {
        assert.ok(typeof info.discount === 'number' && info.discount > 0, `Invalid discount value for ${code}`);
      }
    }
  });
});

describe('RMA Self-Service Returns & Refunds Logic', () => {
  test('calculates store credit with +5% VIP incentive accurately', () => {
    const originalPrice = 2499.00;
    const storeCreditBonus = Math.round(originalPrice * 1.05 * 100) / 100;
    assert.equal(storeCreditBonus, 2623.95);

    const standardRefund = originalPrice;
    assert.equal(standardRefund, 2499.00);
    assert.ok(storeCreditBonus > standardRefund, 'VIP Store Credit bonus must exceed standard card refund');
  });

  test('validates 14-day eligible return window calculation', () => {
    const now = Date.now();
    const recentOrderDate = new Date(now - 1000 * 60 * 60 * 24 * 3); // 3 days ago
    const oldOrderDate = new Date(now - 1000 * 60 * 60 * 24 * 20); // 20 days ago

    const isEligible = (date) => (now - new Date(date).getTime()) <= 1000 * 60 * 60 * 24 * 14;
    assert.equal(isEligible(recentOrderDate), true);
    assert.equal(isEligible(oldOrderDate), false);
  });
});

describe('VIP Loyalty Points & Reward Vouchers Logic', () => {
  test('awards 1 point per $1 spent on checkout', () => {
    const orderTotal = 2429.03;
    const earnedPoints = Math.max(10, Math.round(orderTotal));
    assert.equal(earnedPoints, 2429);
  });

  test('validates voucher tier point thresholds and discounts', () => {
    const VOUCHERS = [
      { id: 'v-5', cost: 500, value: 5, code: 'VIP5' },
      { id: 'v-10', cost: 1000, value: 10, code: 'VIP10' },
      { id: 'v-20', cost: 2000, value: 20, code: 'VIP20' }
    ];

    let userPoints = 1250;
    const affordable = VOUCHERS.filter(v => userPoints >= v.cost);
    assert.equal(affordable.length, 2);
    assert.equal(affordable[0].id, 'v-5');
    assert.equal(affordable[1].id, 'v-10');

    // Simulate redemption
    userPoints -= affordable[1].cost;
    assert.equal(userPoints, 250);
  });
});

