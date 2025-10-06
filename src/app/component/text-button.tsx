import { useState } from 'react';

export function TestRpcButton() {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState('');

  const testRpc = async () => {
    setLoading(true);
    setResponseText('');
    try {
      const body = `{"_tag":"Request","id":"123","tag":"UserList","payload":{},"traceId":"traceId","spanId":"spanId","sampled":true,"headers":[]}\n`;

      const res = await fetch('/rpc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ndjson',
        },
        body,
      });

      const text = await res.text();
      setResponseText(text);
    } catch (err) {
      setResponseText('Error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={testRpc} disabled={loading}>
        {loading ? 'Testing RPC...' : 'Test /rpc (UserList)'}
      </button>

      {responseText && (
        <pre
          style={{
            background: '#f5f5f5',
            padding: '10px',
            marginTop: '10px',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {responseText}
        </pre>
      )}
    </div>
  );
}
