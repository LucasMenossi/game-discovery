import { expect, test } from "@playwright/test";

test.describe("Game filters", () => {
  test("filters games by genre", async ({ page }) => {
    await page.goto("/games");

    await page.getByRole("combobox").nth(0).click();

    await page.getByRole("option", { name: "Action" }).click();

    await expect(page).toHaveURL(/\/games\?genre=action$/);
  });

  test("filters games by platform", async ({ page }) => {
    await page.goto("/games");

    await page.getByRole("combobox").nth(1).click();

    await page.getByRole("option", { name: "PC" }).click();

    await expect(page).toHaveURL(/\/games\?platform=4$/);
  });

  test("sorts games", async ({ page }) => {
    await page.goto("/games");

    await page.getByRole("combobox", { name: "Sort games" }).click();

    await page.getByRole("option", { name: "Rating: High to Low" }).click();

    await expect(page).toHaveURL(/\/games\?sort=-rating$/);
  });
});
