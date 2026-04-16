'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubmitEventPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    organizerName: '',
    culturalConnection: '',
    flyer: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        flyer: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (
      !formData.eventName ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.organizerName ||
      !formData.culturalConnection
    ) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Create FormData to handle file upload
      const submitData = new FormData();
      submitData.append('eventName', formData.eventName);
      submitData.append('date', formData.date);
      submitData.append('time', formData.time);
      submitData.append('location', formData.location);
      submitData.append('organizerName', formData.organizerName);
      submitData.append('culturalConnection', formData.culturalConnection);
      if (formData.flyer) {
        submitData.append('flyer', formData.flyer);
      }

      const response = await fetch('/api/events/submit', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit event');
      }

      setSubmitted(true);
      setFormData({
        eventName: '',
        date: '',
        time: '',
        location: '',
        organizerName: '',
        culturalConnection: '',
        flyer: null,
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit event. Please try again.');
      console.error('Submission error:', err);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: '1.5rem', color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1d4ed8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#2563eb')}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
          Submit an Event
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.5' }}>
          Help us celebrate Puerto Rican culture! Share your event details below and
          it will be reviewed for inclusion in our calendar.
        </p>

        {submitted && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', border: '1px solid #6ee7b7' }}>
            ✓ Thank you! Your event has been submitted for review.
          </div>
        )}

        {error && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#fee2e2', color: '#7f1d1d', borderRadius: '6px', border: '1px solid #fca5a5' }}>
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Event Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Event Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="e.g., Fiestas de Santiago Apóstol"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              required
            />
          </div>

          {/* Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Date <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                required
              />
            </div>

            {/* Time */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Time <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Location <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., San Juan, Puerto Rico"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              required
            />
          </div>

          {/* Organizer Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Organizer Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              id="organizerName"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleInputChange}
              placeholder="Your name or organization"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              required
            />
          </div>

          {/* Cultural Connection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              How does this event connect to Puerto Rican culture? <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="culturalConnection"
              name="culturalConnection"
              value={formData.culturalConnection}
              onChange={handleInputChange}
              placeholder="Describe the cultural significance and connection to Puerto Rican heritage..."
              rows={4}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'none' }}
              required
            />
          </div>

          {/* Flyer Upload */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Event Flyer (Optional)
            </label>
            <div style={{ border: '2px dashed #d1d5db', borderRadius: '6px', padding: '2rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fafafa', transition: 'border-color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}>
              <input
                type="file"
                id="flyer"
                name="flyer"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                style={{ display: 'none' }}
              />
              <label htmlFor="flyer" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ color: '#6b7280' }}>
                  {formData.flyer ? (
                    <div>
                      <p style={{ fontWeight: '500', color: '#059669', margin: '0 0 0.5rem 0' }}>
                        ✓ {formData.flyer.name}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Click to upload or drag and drop</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                        PNG, JPG, or PDF (max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
            <button
              type="submit"
              style={{ flex: 1, backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', padding: '0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              Submit Event
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  eventName: '',
                  date: '',
                  time: '',
                  location: '',
                  organizerName: '',
                  culturalConnection: '',
                  flyer: null,
                });
              }}
              style={{ flex: 1, backgroundColor: '#d1d5db', color: '#1f2937', fontWeight: '600', padding: '0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}