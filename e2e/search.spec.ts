import { expect, test } from "@playwright/test";

test.describe("Game search", () => {
  test("searches for games and updates the URL", async ({ page }) => {
    await page.goto("/games");

    const searchInput = page.getByRole("searchbox");

    await searchInput.fill("zelda");

    await expect(page).toHaveURL(/\/games\?search=zelda/);
  });
  test("removes the search parameter when the search is cleared", async ({
    page,
  }) => {
    await page.goto("/games?search=zelda");

    const searchInput = page.getByRole("searchbox");

    await expect(searchInput).toHaveValue("zelda");

    await searchInput.fill("");

    await expect(page).toHaveURL("/games");
  });
});
