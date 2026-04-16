const sampleEvents = [
  {
    id: 1,
    title: "Bomba Night in Brooklyn",
    date: "2026-04-25",
    location: "Brooklyn, NY",
  },
  {
    id: 2,
    title: "Puerto Rican Poetry Night",
    date: "2026-04-28",
    location: "Newark, NJ",
  },
  {
    id: 3,
    title: "Community Fundraiser",
    date: "2026-05-03",
    location: "Jersey City, NJ",
  },
];

export default function CalendarPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Calendar</h1>
      <p>All approved Puerto Rican events in NY and NJ will appear here.</p>

      <div style={{ marginTop: "2rem" }}>
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ margin: 0 }}>{event.title}</h2>
            <p style={{ margin: "0.5rem 0" }}>Date: {event.date}</p>
            <p style={{ margin: 0 }}>Location: {event.location}</p>
          </div>
        ))}
      </div>
    </main>
  );
}