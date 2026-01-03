import axios, { AxiosInstance } from 'axios';
import { EldoradoOrder } from './types';

export class EldoradoClient {
  private client: AxiosInstance;
  private lastCheckedOrderId: string | null = null;

  constructor(apiKey: string, apiUrl: string) {
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getRecentOrders(): Promise<EldoradoOrder[]> {
    try {
      // NOTE: This endpoint path is a placeholder
      // You'll need to update this once you have access to the actual API docs
      // Common patterns: /orders, /seller/orders, /v1/orders, etc.
      const response = await this.client.get('/orders', {
        params: {
          limit: 10,
          sort: 'createdAt:desc',
        },
      });

      return response.data.orders || response.data || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to fetch orders:', error.response?.status, error.response?.data);
      } else {
        console.error('Failed to fetch orders:', error);
      }
      return [];
    }
  }

  async checkForNewOrders(): Promise<EldoradoOrder[]> {
    const orders = await this.getRecentOrders();

    if (orders.length === 0) {
      return [];
    }

    // If this is the first check, just store the latest order ID
    if (this.lastCheckedOrderId === null) {
      this.lastCheckedOrderId = orders[0].id;
      console.log(`Initialized with latest order ID: ${this.lastCheckedOrderId}`);
      return [];
    }

    // Find all new orders since last check
    const newOrders: EldoradoOrder[] = [];
    for (const order of orders) {
      if (order.id === this.lastCheckedOrderId) {
        break;
      }
      newOrders.push(order);
    }

    // Update last checked ID if we have new orders
    if (newOrders.length > 0) {
      this.lastCheckedOrderId = newOrders[0].id;
      console.log(`Found ${newOrders.length} new order(s)`);
    }

    return newOrders;
  }
}
