import { chromium } from "playwright";
import * as path from "path";

async function runVisualTests() {
  console.log("Starting visual tests...\n");

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotDir = path.join(process.cwd(), "screenshots");

  // Test desktop viewport
  console.log("Testing Desktop (1920x1080)...");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Wait for animations to complete
  await page.waitForTimeout(2000);

  // Full page screenshot
  await page.screenshot({
    path: `${screenshotDir}/desktop-full.png`,
    fullPage: true
  });
  console.log("  - Full page screenshot saved");

  // Hero section
  await page.screenshot({
    path: `${screenshotDir}/desktop-hero.png`
  });
  console.log("  - Hero section saved");

  // Scroll to philosophy section
  await page.locator("#philosophy").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${screenshotDir}/desktop-philosophy.png`
  });
  console.log("  - Philosophy section saved");

  // Scroll to meta section
  await page.locator("#meta").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${screenshotDir}/desktop-meta.png`
  });
  console.log("  - Meta section saved");

  // Test tablet viewport
  console.log("\nTesting Tablet (768x1024)...");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `${screenshotDir}/tablet-hero.png`
  });
  console.log("  - Tablet hero saved");

  // Test mobile viewport
  console.log("\nTesting Mobile (375x812)...");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `${screenshotDir}/mobile-hero.png`
  });
  console.log("  - Mobile hero saved");

  // Full mobile page
  await page.screenshot({
    path: `${screenshotDir}/mobile-full.png`,
    fullPage: true
  });
  console.log("  - Mobile full page saved");

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
