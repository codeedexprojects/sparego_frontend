// utils/logout.js
import { store } from '../redux/store';

/**
 * Comprehensive logout function that clears all admin-related data
 * @param {Function} router - Next.js router instance for navigation
 */
export const performLogout = (router) => {
  try {
    // Clear localStorage
    const keysToRemove = [
      "adminToken",
      "adminUser",
      "adminBrand",
      "adminCarousel", 
      "adminVehicle",
      "adminOrder",
      "adminDealBanner",
      "adminProduct",
      "adminHomeCard",
      "adminUserManagement",
      "adminReview",
      "adminSubAdminManagement"
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear cookies (if any)
    document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Clear Redux state by dispatching clear actions
    const state = store.getState();
    
    // Clear all admin-related Redux state
    if (state.adminAuth) {
      store.dispatch({ type: 'adminAuth/clearError' });
      store.dispatch({ type: 'adminAuth/clearOperationSuccess' });
      store.dispatch({ type: 'adminAuth/adminLogout' });
    }
    
    // Clear other admin slices
    const adminSlices = [
      'adminBrand',
      'adminCarousel',
      'adminVehicle', 
      'adminOrder',
      'adminDealBanner',
      'adminProduct',
      'adminHomeCard',
      'adminUserManagement',
      'adminReview',
      'adminSubAdminManagement'
    ];
    
    adminSlices.forEach(slice => {
      if (state[slice]) {
        store.dispatch({ type: `${slice}/clearError` });
        store.dispatch({ type: `${slice}/clearOperationSuccess` });
      }
    });
    
    // Navigate to login page
    if (router) {
      router.push("/login");
    } else {
      window.location.href = "/login";
    }
    
    console.log("Logout successful");
    
  } catch (error) {
    console.error("Logout error:", error);
    // Force redirect even if there's an error
    window.location.href = "/login";
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has valid admin token
 */
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("adminToken");
    return !!token && token.trim() !== "";
  } catch (error) {
    console.error("Authentication check error:", error);
    return false;
  }
};

/**
 * Get admin token from localStorage
 * @returns {string|null} - Admin token or null if not found
 */
export const getAdminToken = () => {
  try {
    return localStorage.getItem("adminToken");
  } catch (error) {
    console.error("Get token error:", error);
    return null;
  }
};

/**
 * Set admin token in localStorage
 * @param {string} token - Admin token to store
 */
export const setAdminToken = (token) => {
  try {
    localStorage.setItem("adminToken", token);
  } catch (error) {
    console.error("Set token error:", error);
  }
};
