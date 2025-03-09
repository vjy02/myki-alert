'use client'

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';  // Import the supabase client

export default function Page() {
  const [lineId, setLineId] = useState<string>('');
  const [isReporting, setIsReporting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleReport = async () => {
    if (!lineId) {
      setError('Line ID is required');
      return;
    }

    const lineIdParsed = parseInt(lineId);

    // Ensure the line ID is a valid number
    if (isNaN(lineIdParsed)) {
      setError('Invalid Line ID');
      return;
    }

    setIsReporting(true);
    setError('');
    setMessage('');

    try {
      const supabase = createClient();  // Ensure supabase client is created correctly
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('You must be logged in to report a line');
        return;
      }

      const response = await fetch('/api/report-line', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`, 
        },
        body: JSON.stringify({ line_id: lineIdParsed, user_id: session.user.id }), 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to report line');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div>
      <h1>Report a Line</h1>
      <input
        type="text"
        placeholder="Enter Line ID"
        value={lineId}
        onChange={(e) => setLineId(e.target.value)}
      />
      <button onClick={handleReport} disabled={isReporting}>
        {isReporting ? 'Reporting...' : 'Report Line'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
