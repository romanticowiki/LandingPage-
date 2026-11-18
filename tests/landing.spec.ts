import { expect, test } from "@playwright/test";

test.describe("Aula Remota", () => {
  test("loads the approved landing content without runtime errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Escritorios académicos desde el navegador.",
    );
    await expect(page.getByText("El acceso público aún no está disponible.")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("desktop navigation and calls to action resolve to real sections", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('nav[aria-label="Navegación principal"] a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const href = await links.nth(index).getAttribute("href");
      expect(href).toMatch(/^#[a-z0-9-]+$/);
      await expect(page.locator(href as string)).toHaveCount(1);
    }

    await page.getByRole("link", { name: "Conocer cómo funciona" }).click();
    await expect(page).toHaveURL(/#como-funciona$/);
    await expect(page.locator("#como-funciona")).toBeInViewport();
  });

  test("mobile menu opens, navigates, closes, and restores focus with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Abrir menú" });

    await trigger.click();
    await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible();
    await expect(page.getByRole("link", { name: "El problema" }).last()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();

    await trigger.click();
    await page.getByRole("link", { name: "Beneficios" }).last().click();
    await expect(page).toHaveURL(/#beneficios$/);
    await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeHidden();
  });

  test("interface tabs support pointer and keyboard operation", async ({ page }) => {
    await page.goto("/");
    const student = page.getByRole("tab", { name: /Estudiante/ });
    const admin = page.getByRole("tab", { name: /Docente o administrador/ });

    await expect(student).toHaveAttribute("aria-selected", "true");
    await admin.click();
    await expect(admin).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("img", { name: /pestaña Sesiones/ })).toBeVisible();
    await admin.press("ArrowLeft");
    await expect(student).toBeFocused();
    await expect(student).toHaveAttribute("aria-selected", "true");
  });

  test("frequently asked questions expand and collapse accessibly", async ({ page }) => {
    await page.goto("/");
    const first = page.getByRole("button", { name: "¿Ya puedo utilizar el laboratorio?" });
    const second = page.getByRole("button", { name: "¿Necesito instalar un programa?" });

    await expect(first).toHaveAttribute("aria-expanded", "true");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/El acceso está diseñado para funcionar/)).toBeVisible();
  });

  test("external links are HTTPS and cannot control the opener", async ({ page }) => {
    await page.goto("/");
    const externalLinks = page.locator('a[href^="https://"]');
    expect(await externalLinks.count()).toBeGreaterThan(0);

    for (const link of await externalLinks.all()) {
      const href = await link.getAttribute("href");
      const target = await link.getAttribute("target");
      const rel = await link.getAttribute("rel");
      expect(() => new URL(href as string)).not.toThrow();
      if (target === "_blank") expect(rel).toMatch(/noreferrer|noopener/);
    }
  });

  test("footer identifies the project and its asset licence", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText("Aula Remota es un producto de RFD Innovations.");
    await expect(footer.getByRole("link", { name: "Licencia de la fotografía" })).toHaveAttribute(
      "href",
      "https://unsplash.com/license",
    );
  });

  test("essential same-origin resources load successfully", async ({ page }) => {
    const failed: string[] = [];
    page.on("requestfailed", (request) => failed.push(request.url()));
    page.on("response", (response) => {
      if (response.url().startsWith("http://127.0.0.1:3210") && response.status() >= 400) {
        failed.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    expect(failed).toEqual([]);
    await expect(page.locator('img[alt="Estudiantes trabajando frente a computadoras en un aula de cómputo"]')).toBeVisible();
  });

  test("reduced motion preserves all core interactions", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("link", { name: "Conocer cómo funciona" }).click();
    await expect(page.locator("#como-funciona")).toBeInViewport();
    await page.getByRole("tab", { name: /Docente o administrador/ }).click();
    await expect(page.getByRole("img", { name: /pestaña Sesiones/ })).toBeVisible();
  });

  test("unknown routes return the custom 404 page", async ({ page }) => {
    const response = await page.goto("/ruta-que-no-existe");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: /Página no encontrada/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Volver al inicio/i })).toHaveAttribute("href", "/");
  });

  test("security headers protect every page response", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();

    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("object-src 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["strict-transport-security"]).toContain("max-age=31536000");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });

  test("SEO metadata, robots, sitemap, and social image are production-ready", async ({ page, request }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Aula Remota/);
    await expect(page.locator('html')).toHaveAttribute("lang", "es-MX");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/aulasremotas\.net\/?$/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Aula Remota/);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap: https://aulasremotas.net/sitemap.xml");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("https://aulasremotas.net");

    const socialImageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
    const socialImageLocation = new URL(socialImageUrl as string);
    const socialImage = await request.get(`${socialImageLocation.pathname}${socialImageLocation.search}`);
    expect(socialImage.status()).toBe(200);
    expect(socialImage.headers()["content-type"]).toContain("image/png");
  });

  test("JSON-LD remains valid and cannot terminate its script element", async ({ page }) => {
    await page.goto("/");
    const source = await page.locator('script[type="application/ld+json"]').textContent();
    expect(source).not.toContain("</script");
    expect(() => JSON.parse(source as string)).not.toThrow();
  });

  test("unexpected query strings do not cause redirects or unsafe reflection", async ({ page }) => {
    const payload = '<script>window.__xss = true</script>';
    const response = await page.goto(`/?next=${encodeURIComponent("https://example.com")}&q=${encodeURIComponent(payload)}`);
    expect(response?.status()).toBe(200);
    expect(await page.evaluate(() => Boolean((window as typeof window & { __xss?: boolean }).__xss))).toBe(false);
    await expect(page).toHaveURL(/127\.0\.0\.1:3210/);
    await expect(page.locator("body")).not.toContainText(payload);
  });
});

test("the essential content remains understandable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3210/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("El acceso público aún no está disponible.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Preguntas sobre el acceso y el proyecto." })).toBeVisible();
  await context.close();
});
