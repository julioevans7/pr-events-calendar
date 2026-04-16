import Link from 'next/link';

const approvedEvents = [
  {
    id: 1,
    title: 'Bomba Night in Brooklyn',
    date: '2026-04-25',
    location: 'Brooklyn, NY',
    source: 'Approved by Admin',
  },
  {
    id: 2,
    title: 'Puerto Rican Poetry Night',
    date: '2026-04-28',
    location: 'Newark, NJ',
    source: 'Approved by Admin',
  },
  {
    id: 3,
    title: 'Community Fundraiser',
    date: '2026-05-03',
    location: 'Jersey City, NJ',
    source: 'Approved by Admin',
  },
];

const manualEvents = [
  {
    id: 100,
    title: 'Cinco de Mayo Concert',
    date: '2026-05-05',
    location: 'Queens, NY',
    source: 'Manual Entry',
  },
  {
    id: 101,
    title: 'Summer Salsa Social',
    date: '2026-06-14',
    location: 'Hoboken, NJ',
    source: 'Manual Entry',
  },
  {
    id: 102,
    title: 'Juneteenth Community Fiesta',
    date: '2026-06-19',
    location: 'Newark, NJ',
    source: 'Manual Entry',
  },
];

const monthOrder = ['April', 'May', 'June'];

function formatMonth(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'long' });
}


export default function CalendarPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href='/' style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
          ← Back to Home
        </Link>
      </div>

      <h1 style={{ marginBottom: '0.5rem' }}>April / May / June Calendar</h1>
      <p style={{ marginBottom: '1.5rem', color: '#f5f6f8' }}>
        Approved events from the admin page and manually added events appear below.
      </p>

      {monthOrder.map((month) => {
        const monthEvents = [...approvedEvents, ...manualEvents]
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .filter((event) => formatMonth(event.date) === month);

        return (
          <section key={month} style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '0.75rem', color: '#fa73ef' }}>{month}</h2>

            {monthEvents.length === 0 ? (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#0c0d0e',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#e5e9ee',
                }}
              >
                No approved or manually added events for {month} yet.
              </div>
            ) : (
              monthEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>
                      {event.title}
                    </h3>
                    <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                      {event.source}
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0 0', color: '#334155' }}>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p style={{ margin: '0.25rem 0 0', color: '#334155' }}>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              ))
            )}
          </section>
        );
      })}
    </main>
  );
}