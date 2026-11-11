import { describe, expect, it } from "vitest";
import { dateKey, daysBetween, formatDay, formatTime, relativeDay } from "@/lib/time";

describe("ET dates", () => {
  it("formats in New York, not UTC", () => {
    // 00:30 UTC on Nov 15 is 7:30 PM Nov 14 in New York (EST).
    expect(formatDay("2026-11-15T00:30:00Z")).toBe("Sat, Nov 14");
    expect(formatTime("2026-11-15T00:30:00Z")).toBe("7:30 PM");
    expect(dateKey("2026-11-15T00:30:00Z")).toBe("2026-11-14");
  });

  it("counts calendar days across the fall-back DST change", () => {
    // Nov 1, 2026 is the fall-back Sunday; that day is 25 hours long.
    expect(daysBetween("2026-10-31T16:00:00-04:00", "2026-11-02T16:00:00-05:00")).toBe(2);
    expect(daysBetween("2026-11-01T23:30:00-05:00", "2026-11-02T00:30:00-05:00")).toBe(1);
  });

  it("counts calendar days across the spring-forward DST change", () => {
    expect(daysBetween("2027-03-13T23:00:00-05:00", "2027-03-14T23:00:00-04:00")).toBe(1);
  });

  it("labels relative days by New York date", () => {
    const now = new Date("2026-11-11T23:50:00-05:00"); // 11:50 PM Wed in NY, already Thu in UTC
    expect(relativeDay("2026-11-11T20:00:00-05:00", now)).toBe("Today");
    expect(relativeDay("2026-11-12T00:10:00-05:00", now)).toBe("Tomorrow");
    expect(relativeDay("2026-11-15T19:00:00-05:00", now)).toBe("In 4 days");
  });
});
