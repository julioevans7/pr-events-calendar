export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Puerto Rican Events in NY & NJ</h1>
      <p>
        Discover bomba nights, festivals, workshops, fundraisers, and community gatherings.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <p>
          <a href="/calendar">View Calendar</a>
        </p>
        <p>
          <a href="/submit-event">Submit an Event</a>
        </p>
        <p>
          <a href="/admin">Admin Dashboard</a>
        </p>
      </div>
    </main>
  );
}