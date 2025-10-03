import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api');
      const text = await response.text();
      setApiResponse(text);
    } catch (error) {
      setApiResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testHealthAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/health');
      const text = await response.text();
      setApiResponse(text);
    } catch (error) {
      setApiResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          {/*<img src={reactLogo} className="logo react" alt="React logo" />*/}
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <h2>API Testing</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={testAPI} disabled={loading}>
            Test /api
          </button>
          <button onClick={testHealthAPI} disabled={loading}>
            Test /api/health
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {apiResponse && (
          <div
            style={{
              padding: '10px',
              background: '#f0f0f0',
              borderRadius: '4px',
              marginTop: '10px',
            }}
          >
            <strong>API Response:</strong> {apiResponse}
          </div>
        )}
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
