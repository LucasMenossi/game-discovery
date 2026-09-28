import { expect, test } from "@playwright/test";

test.describe("Game details", () => {
  test("displays the game details", async ({ page }) => {
    await page.goto("/games/the-witcher-3-wild-hunt");

    await expect(
      page.getByRole("heading", { name: "The Witcher 3" }),
    ).toBeVisible();
    await expect(page.getByText("Release date", { exact: true })).toBeVisible();

    await expect(
      page.getByRole("main").getByText("Genres", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("main").getByText("Platforms", { exact: true }),
    ).toBeVisible();
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
