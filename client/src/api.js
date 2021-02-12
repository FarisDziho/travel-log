
export async function listLogEntries()
{
    const response = await fetch('http://localhost:5000/api/logs');
    return response.json();
}

export async function createLogEntry(entry) {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`http://localhost:5000/api/logs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-KEY': apiKey, 
      },
      body: JSON.stringify(entry),
    })
}