import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({ baseURL: `${API_BASE}/api`, withCredentials: true });

let csrfToken = null;

export async function getCsrfToken() {
  if (!csrfToken) {
    const response = await api.get('/csrf-token');
    csrfToken = response.data.csrf_token;
  }
  return csrfToken;
}

export async function securePost(path, payload) {
  const token = await getCsrfToken();
  return api.post(path, payload, { headers: { 'X-CSRF-Token': token } });
}

export { API_BASE, api };
