const pendingEvents = [
  {
    id: 1,
    title: "Bronx Cultural Workshop",
    date: "2026-05-05",
    location: "Bronx, NY",
  },
  {
    id: 2,
    title: "Boricua Art Showcase",
    date: "2026-05-10",
    location: "Paterson, NJ",
  },
];

export default function AdminPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <p>Review and manage pending event submissions.</p>

      <div style={{ marginTop: "2rem" }}>
        {pendingEvents.map((event) => (
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
            <p style={{ marginBottom: "1rem" }}>Location: {event.location}</p>

            <button style={{ marginRight: "0.5rem", padding: "0.5rem 1rem" }}>
              Approve
            </button>
            <button style={{ padding: "0.5rem 1rem" }}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}