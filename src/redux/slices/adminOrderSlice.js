import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getOrders = createAsyncThunk(
  "adminOrder/getOrders",
  async ({ status, search } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const params = {};
      if (status && status !== "all") params.status = status;
      if (search) params.search = search;
      
      console.log("Fetching orders from:", `${BASE_URL}/order/`);
      const res = await axios.get(`${BASE_URL}/order/`, { 
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Orders response:", res.data);
      console.log("Orders response type:", typeof res.data);
      console.log("Orders response is array:", Array.isArray(res.data));
      console.log("Orders response keys:", Object.keys(res.data || {}));
      
      let data;
      if (Array.isArray(res.data)) {
        data = res.data;
        console.log("Data is array, using directly:", data);
      } else if (res.data?.data) {
        data = res.data.data;
        console.log("Data found in res.data.data:", data);
      } else if (res.data?.orders) {
        data = res.data.orders;
        console.log("Data found in res.data.orders:", data);
      } else {
        data = [];
        console.log("No data found, using empty array");
      }
      
      console.log("Final processed orders data:", data);
      console.log("Number of orders:", data.length);
      return data;
    } catch (e) {
      console.error("Error fetching orders:", e);
      return rejectWithValue(e?.response?.data?.message || e.message || "Failed to fetch orders");
    }
  }
);

export const getOrderById = createAsyncThunk(
  "adminOrder/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      console.log("=== GET ORDER BY ID DEBUG ===");
      console.log("Order ID:", id);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const url = `${BASE_URL}/order/${id}`;
      console.log("API URL:", url);
      
      // Try with population parameters for referenced fields
      let params = {
        populate: 'user,items.product'
      };
      
      let res;
      try {
        res = await axios.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("First attempt with population successful");
      } catch (populateError) {
        console.log("Population failed, trying without population:", populateError.response?.status);
        // If population fails, try without it
        try {
          res = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Fallback attempt without population successful");
        } catch (fallbackError) {
          console.error("Both population and fallback failed:", fallbackError);
          throw fallbackError;
        }
      }
      
      console.log("Order by ID response:", res);
      console.log("Order by ID response data:", res.data);
      console.log("Order by ID response status:", res.status);
      console.log("Response data type:", typeof res.data);
      console.log("Response data keys:", Object.keys(res.data || {}));
      console.log("=============================");
      
      let orderData = res.data?.data || res.data?.order || res.data;
      
      console.log("Extracted order data:", orderData);
      console.log("Order data type:", typeof orderData);
      console.log("Order data keys:", orderData ? Object.keys(orderData) : "No order data");
      console.log("Order _id:", orderData?._id);
      console.log("Order id:", orderData?.id);
      console.log("Order user:", orderData?.user);
      console.log("Order items:", orderData?.items);
      console.log("Order status:", orderData?.status);
      console.log("Order totalAmount:", orderData?.totalAmount);
      console.log("Order finalAmount:", orderData?.finalAmount);
      
      // Only try to fetch individual data if we have a valid order
      if (orderData && (orderData._id || orderData.id)) {
        // If the order data doesn't have populated fields, try to fetch them separately
        if (!orderData.user || typeof orderData.user === 'string') {
          console.log("Order user not populated, attempting to fetch user data...");
          try {
            const userRes = await axios.get(`${BASE_URL}/user-management/${orderData.user}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            orderData.user = userRes.data?.data || userRes.data;
            console.log("User data fetched:", orderData.user);
          } catch (userError) {
            console.error("Failed to fetch user data:", userError);
            // If user fetch fails, set a placeholder
            orderData.user = {
              _id: orderData.user,
              name: "Unknown User",
              email: "No email available"
            };
          }
        }
        
        // If items don't have populated products, try to fetch them
        if (orderData.items && orderData.items.length > 0) {
          const itemsWithProducts = await Promise.all(
            orderData.items.map(async (item) => {
              if (!item.product || typeof item.product === 'string') {
                try {
                  const productRes = await axios.get(`${BASE_URL}/products/${item.product}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  return { ...item, product: productRes.data?.data || productRes.data };
                } catch (productError) {
                  console.error("Failed to fetch product data:", productError);
                  // If product fetch fails, set a placeholder
                  return {
                    ...item,
                    product: {
                      _id: item.product,
                      name: "Unknown Product",
                      image: "/placeholder-image.jpg"
                    }
                  };
                }
              }
              return item;
            })
          );
          orderData.items = itemsWithProducts;
        }
      } else if (orderData && typeof orderData === 'object' && Object.keys(orderData).length === 0) {
        console.error("Order data is an empty object");
        throw new Error("Order data is empty - order may not exist");
      } else {
        console.error("Invalid order data received:", orderData);
        console.error("Order data is null/undefined:", !orderData);
        console.error("Order data has no _id or id:", !orderData?._id && !orderData?.id);
        throw new Error("Invalid order data received from API - missing order ID");
      }
      
      return orderData;
    } catch (e) {
      console.error("=== GET ORDER BY ID ERROR ===");
      console.error("Error:", e);
      console.error("Error response:", e.response);
      console.error("Error response data:", e.response?.data);
      console.error("Error response status:", e.response?.status);
      console.error("Error response headers:", e.response?.headers);
      console.error("=============================");
      
      // Handle specific error cases
      if (e.response?.status === 404) {
        return rejectWithValue({ message: "Order not found", status: 404 });
      } else if (e.response?.status === 401) {
        return rejectWithValue({ message: "Unauthorized access", status: 401 });
      } else if (e.response?.status === 403) {
        return rejectWithValue({ message: "Access forbidden", status: 403 });
      }
      
      return rejectWithValue(e?.response?.data?.message || e.message || "Failed to fetch order details");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log("=== UPDATE ORDER STATUS DEBUG ===");
      console.log("Order ID:", id);
      console.log("New Status:", status);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const url = `${BASE_URL}/order/${id}/status`;
      console.log("API URL:", url);
      
      const res = await axios.patch(url, { 
        status 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Update status response:", res);
      console.log("Update status response data:", res.data);
      console.log("Update status response status:", res.status);
      console.log("================================");
      
      return res.data?.data || res.data;
    } catch (e) {
      console.error("=== UPDATE ORDER STATUS ERROR ===");
      console.error("Error:", e);
      console.error("Error response:", e.response);
      console.error("Error response data:", e.response?.data);
      console.error("Error response status:", e.response?.status);
      console.error("================================");
      
      // Handle specific error cases
      if (e.response?.status === 404) {
        return rejectWithValue({ message: "Order not found", status: 404 });
      } else if (e.response?.status === 401) {
        return rejectWithValue({ message: "Unauthorized access", status: 401 });
      } else if (e.response?.status === 403) {
        return rejectWithValue({ message: "Access forbidden", status: 403 });
      }
      
      return rejectWithValue(e?.response?.data?.message || e.message || "Failed to update order status");
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Redux: getOrders.fulfilled - action.payload:", action.payload);
        console.log("Redux: getOrders.fulfilled - payload type:", typeof action.payload);
        console.log("Redux: getOrders.fulfilled - payload length:", action.payload?.length);
        state.orders = action.payload || [];
        console.log("Redux: Final state.orders:", state.orders);
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (!updated || !updated._id) return;
        const idx = state.orders.findIndex((o) => o._id === updated._id);
        if (idx !== -1) state.orders[idx] = updated;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;


