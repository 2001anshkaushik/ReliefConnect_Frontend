import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// helper: exponential backoff
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function withRetries(
  fn,
  { retries = 3, delays = [1000, 2000, 4000] } = {}
) {
  let attempt = 0;
  let lastError;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      const delay = delays[attempt] ?? delays[delays.length - 1];
      // small wait before retrying
      await wait(delay);
      attempt += 1;
    }
  }
  throw lastError;
}

// If offlineMode true, callers should pass { offline: true } to use the mock fallback
export const recommend = async (needs, options = {}) => {
  const { offline = false } = options;
  if (offline) {
    // dynamic import of the mock to keep bundle small
    const mock = await import("../mocks/recommendations.json");
    return mock.default;
  }

  return withRetries(async () => {
    const res = await api.post("/recommend", { needs });
    return res.data;
  });
};

export const createOrder = async (order, options = {}) => {
  const { offline = false } = options;
  if (offline) {
    const mock = await import("../mocks/order_response.json").catch(() => null);
    // create a fake response to simulate an order id
    return (
      mock?.default || {
        orderId: `offline-${Date.now()}`,
        status: "created",
        ...order,
      }
    );
  }

  return withRetries(async () => {
    const res = await api.post("/order", order);
    return res.data;
  });
};

export const getOrder = async (id, options = {}) => {
  const { offline = false } = options;
  if (offline) return { orderId: id, status: "offline" };
  const res = await api.get(`/order/${id}`);
  return res.data;
};

export default api;
