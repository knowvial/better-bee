// Enhanced security configuration
const securityConfig = {
  // Allowed domains (add your GitHub Pages URL)
  allowedDomains: [
    'localhost:3000',
    'localhost:8000', 
    '127.0.0.1',
    'knowvial.github.io' // Your GitHub Pages domain
  ],
  
  // Basic domain check
  isDomainAllowed() {
    const currentDomain = window.location.hostname;
    return this.allowedDomains.some(domain => 
      currentDomain === domain || currentDomain.endsWith('.' + domain)
    );
  },
  
  // Rate limiting (client-side)
  rateLimits: {
    maxRequestsPerMinute: 60,
    requests: [],
    
    canMakeRequest() {
      const now = Date.now();
      // Remove requests older than 1 minute
      this.requests = this.requests.filter(time => now - time < 60000);
      
      if (this.requests.length >= this.maxRequestsPerMinute) {
        console.warn('⚠️ Rate limit exceeded');
        return false;
      }
      
      this.requests.push(now);
      return true;
    }
  }
};

// Export for use in main app
window.SecurityConfig = securityConfig;