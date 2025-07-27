import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com'
});

export default {
  async getIncomes(params) {
    const response = await api.get('/incomes', { params });
    return response.data;
  },
  async getOrders(params) {
    const response = await api.get('/orders', { params });
    return response.data;
  },
  async getSales(params) {
    const response = await api.get('/sales', { params });
    return response.data;
  },
  async getStocks(params) {
    const response = await api.get('/stocks', { params });
    return response.data;
  }
};