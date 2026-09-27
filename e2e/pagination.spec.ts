import { expect, test } from "@playwright/test";

test.describe("Game pagination", () => {
  test("navigates to the next page", async ({ page }) => {
    await page.goto("/games");

    await page.getByRole("button", { name: "Next", exact: true }).click();

    await expect(page).toHaveURL(/\/games\?page=2$/);
    await expect(page.getByText("Page 2 of")).toBeVisible();
  });

  test("navigates to the previous page", async ({ page }) => {
    await page.goto("/games?page=2");

    await page.getByRole("button", { name: "Previous", exact: true }).click();

    await expect(page).toHaveURL("/games");
    await expect(page.getByText(/Page 1 of/)).toBeVisible();
  });

  test("preserves filters when changing page", async ({ page }) => {
    await page.goto("/games?genre=action");

    await page.getByRole("button", { name: "Next", exact: true }).click();

    await expect(page).toHaveURL("/games?genre=action&page=2");
  });
});
