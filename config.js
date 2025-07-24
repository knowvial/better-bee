// Configuration for single-user spell bee app
const config = {
  // Supabase configuration - replace with your project details
  supabase: {
    url: 'https://your-project-id.supabase.co', // Replace with your Supabase project URL
    anonKey: 'your-anon-key-goes-here', // Replace with your Supabase anon/public key
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