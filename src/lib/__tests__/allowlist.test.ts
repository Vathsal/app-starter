import { describe, expect, it } from "vitest";
import { isAllowedEmail } from "@/lib/allowlist";

describe("isAllowedEmail", () => {
  const list = " Owner@Example.com , second@example.com";

  it("matches case- and whitespace-insensitively", () => {
    expect(isAllowedEmail("owner@example.com", list)).toBe(true);
    expect(isAllowedEmail(" SECOND@example.com ", list)).toBe(true);
  });

  it("rejects other and missing emails", () => {
    expect(isAllowedEmail("someone@example.com", list)).toBe(false);
    expect(isAllowedEmail(undefined, list)).toBe(false);
    expect(isAllowedEmail("", list)).toBe(false);
  });

  it("rejects everyone when the list is unset or empty", () => {
    expect(isAllowedEmail("owner@example.com", undefined)).toBe(false);
    expect(isAllowedEmail("owner@example.com", " , ")).toBe(false);
  });
});
