export interface HealthResponse {
  status: 'ok';
  service: string;
}

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health');

  if (!response.ok) {
    throw new Error('API is unavailable');
  }

  return response.json() as Promise<HealthResponse>;
}
