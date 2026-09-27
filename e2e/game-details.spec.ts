import { expect, test } from "@playwright/test";

test.describe("Game details", () => {
  test("displays the game details", async ({ page }) => {
    await page.goto("/games");

    const gameLink = page.locator('a[href^="/games/"]').first();

    await expect(gameLink).toBeVisible();

    await gameLink.click();

    await expect(page).toHaveURL(/\/games\/[^/]+$/);

    await expect(page.locator("h1")).toBeVisible();

    await expect(
      page.getByText("Game Information", { exact: true }),
    ).toBeVisible();

    await expect(page.getByText("Release date", { exact: true })).toBeVisible();

    await expect(page.getByText("Genres", { exact: true })).toBeVisible();

    await expect(page.getByText("Platforms", { exact: true })).toBeVisible();
  });

  test("displays the game description", async ({ page }) => {
    await page.goto("/games");

    const gameLink = page.locator('a[href^="/games/"]').first();

    await expect(gameLink).toBeVisible();

    await gameLink.click();

    await expect(page).toHaveURL(/\/games\/[^/]+$/);

    const description = page.locator("main p").first();

    await expect(description).toBeVisible();
    await expect(description).not.toBeEmpty();
  });
});
