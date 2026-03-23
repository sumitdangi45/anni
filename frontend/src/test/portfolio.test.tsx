import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Helpers ──────────────────────────────────────────────
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

beforeEach(() => {
  vi.clearAllMocks();
  (global.fetch as any).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({}),
  });
});

// ── HeroSection ───────────────────────────────────────────
describe("HeroSection", () => {
  it("renders fullstack and developer headings", async () => {
    const { default: HeroSection } = await import("@/components/HeroSection");
    render(<Wrapper><HeroSection /></Wrapper>);
    expect(screen.getAllByText(/fullstack/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/developer/i).length).toBeGreaterThan(0);
  });

  it("renders Resume link", async () => {
    const { default: HeroSection } = await import("@/components/HeroSection");
    render(<Wrapper><HeroSection /></Wrapper>);
    expect(screen.getByRole("link", { name: /resume/i })).toBeInTheDocument();
  });

  it("renders Hi bubble", async () => {
    const { default: HeroSection } = await import("@/components/HeroSection");
    render(<Wrapper><HeroSection /></Wrapper>);
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("renders tech badges on desktop", async () => {
    const { default: HeroSection } = await import("@/components/HeroSection");
    render(<Wrapper><HeroSection /></Wrapper>);
    expect(screen.getAllByText(/react/i).length).toBeGreaterThan(0);
  });
});

// ── Navbar ────────────────────────────────────────────────
describe("Navbar", () => {
  it("renders all nav links", async () => {
    const { default: Navbar } = await import("@/components/Navbar");
    render(<Wrapper><Navbar /></Wrapper>);
    expect(screen.getAllByText(/home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/projects/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/blogs/i).length).toBeGreaterThan(0);
  });

  it("renders Contact button", async () => {
    const { default: Navbar } = await import("@/components/Navbar");
    render(<Wrapper><Navbar /></Wrapper>);
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0);
  });

  it("renders avatar image", async () => {
    const { default: Navbar } = await import("@/components/Navbar");
    render(<Wrapper><Navbar /></Wrapper>);
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBeGreaterThan(0);
  });
});

// ── AboutSection ──────────────────────────────────────────
describe("AboutSection", () => {
  it("renders About me heading", async () => {
    const { default: AboutSection } = await import("@/components/AboutSection");
    render(<Wrapper><AboutSection /></Wrapper>);
    expect(screen.getAllByText(/about me/i).length).toBeGreaterThan(0);
  });

  it("renders My Story button", async () => {
    const { default: AboutSection } = await import("@/components/AboutSection");
    render(<Wrapper><AboutSection /></Wrapper>);
    expect(screen.getByRole("link", { name: /my story/i })).toBeInTheDocument();
  });

  it("renders stats labels", async () => {
    const { default: AboutSection } = await import("@/components/AboutSection");
    render(<Wrapper><AboutSection /></Wrapper>);
    // Stats are rendered but may be animated (opacity:0) — check they exist in DOM
    expect(screen.getAllByText(/hackathon/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/projects/i).length).toBeGreaterThan(0);
  });

  it("renders contact info", async () => {
    const { default: AboutSection } = await import("@/components/AboutSection");
    render(<Wrapper><AboutSection /></Wrapper>);
    expect(screen.getByText(/call today/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });
});

// ── ContactSection ────────────────────────────────────────
describe("ContactSection", () => {
  it("renders contact form inputs", async () => {
    const { default: ContactSection } = await import("@/components/ContactSection");
    render(<Wrapper><ContactSection /></Wrapper>);
    expect(screen.getByPlaceholderText(/john smith/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/johnsmith@gmail.com/i)).toBeInTheDocument();
  });

  it("renders submit button", async () => {
    const { default: ContactSection } = await import("@/components/ContactSection");
    render(<Wrapper><ContactSection /></Wrapper>);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders Let's work together heading", async () => {
    const { default: ContactSection } = await import("@/components/ContactSection");
    render(<Wrapper><ContactSection /></Wrapper>);
    expect(screen.getAllByText(/let's work together/i).length).toBeGreaterThan(0);
  });
});

// ── FAQSection ────────────────────────────────────────────
describe("FAQSection", () => {
  it("renders FAQ heading", async () => {
    const { default: FAQSection } = await import("@/components/FAQSection");
    render(<Wrapper><FAQSection /></Wrapper>);
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
  });

  it("renders FAQ items", async () => {
    const { default: FAQSection } = await import("@/components/FAQSection");
    render(<Wrapper><FAQSection /></Wrapper>);
    expect(screen.getAllByText(/what services do you offer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/how do i get started/i).length).toBeGreaterThan(0);
  });

  it("renders 6 FAQ numbers", async () => {
    const { default: FAQSection } = await import("@/components/FAQSection");
    render(<Wrapper><FAQSection /></Wrapper>);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("06")).toBeInTheDocument();
  });
});

// ── TestimonialsSection ───────────────────────────────────
describe("TestimonialsSection", () => {
  it("renders What People Say heading", async () => {
    const { default: TestimonialsSection } = await import("@/components/TestimonialsSection");
    render(<Wrapper><TestimonialsSection /></Wrapper>);
    expect(screen.getAllByText(/what people say/i).length).toBeGreaterThan(0);
  });

  it("renders Add Review and More Reviews buttons", async () => {
    const { default: TestimonialsSection } = await import("@/components/TestimonialsSection");
    render(<Wrapper><TestimonialsSection /></Wrapper>);
    expect(screen.getByRole("button", { name: /add review/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /more reviews/i })).toBeInTheDocument();
  });

  it("renders satisfaction rate stat", async () => {
    const { default: TestimonialsSection } = await import("@/components/TestimonialsSection");
    render(<Wrapper><TestimonialsSection /></Wrapper>);
    expect(screen.getAllByText(/satisfaction rate/i).length).toBeGreaterThan(0);
  });
});

// ── Footer ────────────────────────────────────────────────
describe("Footer", () => {
  it("renders footer with name (multiple instances ok)", async () => {
    const { default: Footer } = await import("@/components/Footer");
    render(<Wrapper><Footer /></Wrapper>);
    // "Sumit Dangi" appears multiple times in footer — use getAllByText
    expect(screen.getAllByText(/sumit dangi/i).length).toBeGreaterThan(0);
  });

  it("renders copyright text", async () => {
    const { default: Footer } = await import("@/components/Footer");
    render(<Wrapper><Footer /></Wrapper>);
    expect(screen.getAllByText(/copyright/i).length).toBeGreaterThan(0);
  });
});

// ── useSiteImages hook ────────────────────────────────────
describe("useSiteImages hook", () => {
  it("returns object initially", async () => {
    const { renderHook } = await import("@testing-library/react");
    const { useSiteImages } = await import("@/hooks/useSiteImages");
    const { result } = renderHook(() => useSiteImages());
    expect(typeof result.current).toBe("object");
  });

  it("fetches from API and updates images", async () => {
    const { renderHook, act } = await import("@testing-library/react");
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ hero: "/uploads/test.jpg", navbar_avatar: "/uploads/avatar.jpg" }),
    });
    const { useSiteImages } = await import("@/hooks/useSiteImages");
    const { result } = renderHook(() => useSiteImages());
    await act(async () => { await new Promise(r => setTimeout(r, 100)); });
    // hero should be set from API
    expect(result.current.hero).toBe("/uploads/test.jpg");
  });
});
