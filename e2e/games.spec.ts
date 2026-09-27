import { expect, test } from "@playwright/test";

test.describe("Games catalog", () => {
  test("displays the games catalog", async ({ page }) => {
    await page.goto("/games");

    await expect(page.getByRole("heading", { name: /games/i })).toBeVisible();

    const gameLinks = page.locator('a[href^="/games/"]');

    await expect(gameLinks.first()).toBeVisible();
  });

  test("navigates to a game details page", async ({ page }) => {
    await page.goto("/games");

    const gameLink = page.locator('a[href^="/games/"]').first();

    await expect(gameLink).toBeVisible();

    await gameLink.click();

    await expect(page).toHaveURL(/\/games\/[^/]+$/);
  });
});
