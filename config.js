// Configuration for single-user spell bee app
const config = {
  // Supabase configuration - replace with your project details
  supabase: {
    url: 'https://sfykhrlalocgtvspqztg.supabase.co', // Replace with your Supabase project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmeWtocmxhbG9jZ3R2c3BxenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMzUyODYsImV4cCI6MjA2ODkxMTI4Nn0.8z0fjvv_jaLr0GuPMzpP31Hb-1q7ksuP8lW4LNI_Z3I', // Replace with your Supabase anon/public key
  },
  
  // Single user settings
  settings: {
    enableDatabase: true,
    enableAuth: false, // No authentication needed for single user
    userId: 'single-user' // Fixed user ID for single user mode
  }
};

// Export configuration
window.SpellBeeConfig = config;