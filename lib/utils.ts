// utils/actions.ts
import { Page, Locator, expect } from '@playwright/test';

export class utils {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page
  }

  // ------------------------------------------
  // 🔹 INTERNAL HELPER: Resolve string → locator
  // ------------------------------------------
  private getLocator(locatorOrSelector: Locator | string): Locator {
    return typeof locatorOrSelector === "string"
      ? this.page.locator(locatorOrSelector)
      : locatorOrSelector;
  }


  // ------------------------------------------
  // 🔹 INTERNAL HELPER: Wait for visible
  // ------------------------------------------
  private async waitVisible(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: "visible", timeout });
  }


  // ------------------------------------------
  // 1️⃣ CLICK ELEMENT
  // ------------------------------------------
  async clickElement(locatorOrSelector: Locator | string) {
    const locator = this.getLocator(locatorOrSelector);
    await this.waitVisible(locator);
    await locator.click();
  }

 // ------------------------------------------
  // 2️⃣ FILL INPUT
  // ------------------------------------------
  async fillField(locatorOrSelector: Locator | string, value: string) {
    const locator = this.getLocator(locatorOrSelector);
    await this.waitVisible(locator);

    await locator.click();
    await locator.clear();
    await locator.fill(value);
  }

  // ------------------------------------------
  // 3️⃣ CHECK ELEMENT (checkbox/radio)
  // ------------------------------------------
  async checkElement(locatorOrSelector: Locator | string) {
    const locator = this.getLocator(locatorOrSelector);
    await this.waitVisible(locator);

    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }


 // ------------------------------------------
  // 4️⃣ IS DISPLAYED (LOG ONLY)
  // ------------------------------------------
  async isDisplayed(
    locatorOrSelector: Locator | string,
    timeout = 5000,
    fieldName: string
  ) {
    const locator = this.getLocator(locatorOrSelector);

    await expect.soft(locator).toBeVisible({timeout:timeout,visible:true})
/*
    try {
      await locator.waitFor({ state: "visible", timeout });
      console.log(`✔ ${fieldName} is displayed`);
    } catch {
      console.log(`❌ ${fieldName} is NOT displayed`);
    } */
  }
   // ------------------------------------------
  // 5️⃣ PAUSE EXECUTION
  // ------------------------------------------
  async pauseFor(ms: number): Promise<void> {
    console.log(`⏳ Waiting for ${ms} ms`);
    await this.page.waitForTimeout(ms);
  }

  // ------------------------------------------
  // 6️⃣ VALIDATE INNER TEXT
  // ------------------------------------------
  async validateInnerText(
    locatorOrSelector: Locator | string,
    expectedText: string
  ) {
    const locator = this.getLocator(locatorOrSelector);
    await this.waitVisible(locator);

    const actualText = (await locator.innerText()).trim();
    console.log("Actual Text:", actualText);

    expect.soft(actualText).toBe(expectedText.trim());
  }

  // ------------------------------------------
  // 7️⃣ HOVER ELEMENT
  // ------------------------------------------
  async hoverOn(locatorOrSelector: Locator | string) {
    const locator = this.getLocator(locatorOrSelector);
    await locator.hover();
    await this.page.waitForTimeout(300);
  }

 // ------------------------------------------
  // 8️⃣ COUNT ELEMENTS
  // ------------------------------------------
  async getTheNumberOfElement(locator: Locator): Promise<number> {
    await locator.first().waitFor({
      state: "attached",
      timeout: 15000,
    });

    return await locator.count();
  }


  // ------------------------------------------
  // 9️⃣ INPUT CHARACTER-BY-CHARACTER
  // ------------------------------------------
  async inputCharacterByCharacter(locator: Locator, text: string) {
    await locator.clear();
    await locator.click();
    await locator.pressSequentially(text, { delay: 500 });
  }

  async focusAndFIllTheForm(element: Locator, valueToFill: string) {
    await element.focus();
    await element.fill(valueToFill);
  }

  async selectDropDownForSelectClass(
    element: string,
    type: string,
    option: string | number
  ) {
    try {
      switch (type.toLowerCase()) {
        case "value":
          await this.page.selectOption(element, { value: option as string });
          break;

        case "label":
          await this.page.selectOption(element, { label: option as string });
          break;

        case "index":
          await this.page.selectOption(element, { index: option as number });
          break;

        default:
          throw new Error(`Invalid dropdown type: ${type}. Use value | label | index.`);
      }
    } catch (error) {
      console.error(`Dropdown selection failed for ${element} →`, error);
      throw error;
    }
  }

  async selectCustomDropdown(locator: string, optionText: string) {
    try {
      console.log(`⏳ Opening custom dropdown → ${locator}`);
      await this.page.click(locator);

      const optionLocator = this.page.locator(`text="${optionText}"`);
      await optionLocator.waitFor({ state: "visible" });

      console.log(`⏳ Selecting option → ${optionText}`);
      await optionLocator.click();

      console.log(`✔ Custom dropdown selected → ${optionText}`);
    } catch (error) {
      console.error(`❌ Failed selecting custom dropdown ${locator}`, error);
      throw error;
    }
  }

/**
   * Navigate to URL and validate the final URL
   * @param expectedUrl - URL to validate after navigation
   * @param useSoftAssert - If true → uses soft assertion
   */
  async navigateToUrl(expectedUrl: string, useSoftAssert = false) {
    // Step 1: Launch URL from environment
    console.log(`🌐 Navigating to: ${process.env.BASE_URL}`);
    await this.page.goto(process.env.BASE_URL!);

    // Step 2: Validate URL after navigation
    console.log(`🔍 Validating final URL...`);

    if (useSoftAssert) {
      await expect.soft(this.page).toHaveURL(expectedUrl);
    } else {
      await expect(this.page).toHaveURL(expectedUrl);
    }

    console.log(`✅ Navigation + URL validation completed.`);
  }
  
}
