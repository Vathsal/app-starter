"use client";

// A failed read (network, or the encore schema not exposed in the Data API) keeps the shell
// and offers a retry instead of a blank page.
export default function TabsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <h1>Couldn&rsquo;t load this</h1>
      <p className="lede">Check your connection and try again.</p>
      <button className="pill fill" onClick={reset}>
        Try again
      </button>
    </>
  );
}
