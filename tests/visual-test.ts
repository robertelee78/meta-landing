import { chromium } from "playwright";
import * as path from "path";

async function runVisualTests() {
  console.log("Starting visual tests for interactive terminal...\n");

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotDir = path.join(process.cwd(), "screenshots");

  // Test desktop viewport
  console.log("Testing Desktop (1920x1080)...");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Wait for boot sequence to complete (look for the input prompt)
  await page.waitForSelector('input[type="text"]', { timeout: 10000 });
  await page.waitForTimeout(500);

  // Screenshot after boot
  await page.screenshot({
    path: `${screenshotDir}/desktop-boot.png`
  });
  console.log("  - Boot sequence screenshot saved");

  // Type 'menu' command
  await page.keyboard.type("menu");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/desktop-menu.png`
  });
  console.log("  - Menu command screenshot saved");

  // Type '1' for philosophy
  await page.keyboard.type("1");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/desktop-philosophy.png`
  });
  console.log("  - Philosophy section saved");

  // Type '2' for stack
  await page.keyboard.type("2");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/desktop-stack.png`
  });
  console.log("  - Stack section saved");

  // Type 'rabbit' for easter egg
  await page.keyboard.type("rabbit");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/desktop-rabbit.png`
  });
  console.log("  - Easter egg screenshot saved");

  // Type 'clear' then 'help'
  await page.keyboard.type("clear");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  await page.keyboard.type("help");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/desktop-help.png`
  });
  console.log("  - Help menu screenshot saved");

  // Test tablet viewport
  console.log("\nTesting Tablet (768x1024)...");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForSelector('input[type="text"]', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${screenshotDir}/tablet-boot.png`
  });
  console.log("  - Tablet boot saved");

  // Test mobile viewport
  console.log("\nTesting Mobile (375x812)...");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForSelector('input[type="text"]', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${screenshotDir}/mobile-boot.png`
  });
  console.log("  - Mobile boot saved");

  // Mobile with menu
  await page.keyboard.type("menu");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${screenshotDir}/mobile-menu.png`
  });
  console.log("  - Mobile menu saved");

  // Performance check
  console.log("\nPerformance Metrics:");
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
      firstPaint: Math.round(performance.getEntriesByType("paint").find((e) => e.name === "first-paint")?.startTime || 0),
      firstContentfulPaint: Math.round(performance.getEntriesByType("paint").find((e) => e.name === "first-contentful-paint")?.startTime || 0),
    };
  });

  console.log(`  - DOM Content Loaded: ${metrics.domContentLoaded}ms`);
  console.log(`  - Load Complete: ${metrics.loadComplete}ms`);
  console.log(`  - First Paint: ${metrics.firstPaint}ms`);
  console.log(`  - First Contentful Paint: ${metrics.firstContentfulPaint}ms`);

  await browser.close();

  console.log("\n✅ Visual tests complete! Screenshots saved to ./screenshots/");
}

runVisualTests().catch(console.error);
