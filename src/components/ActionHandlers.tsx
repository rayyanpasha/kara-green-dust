import { toast } from "sonner";

export const handleReportHotspot = () => {
  toast.success("📍 Hotspot Report Started", {
    description: "Opening location picker to report a new dust hotspot..."
  });
  
  // Simulate opening a report form
  setTimeout(() => {
    toast.info("📋 Report Form Ready", {
      description: "Please describe the location and dust severity level."
    });
  }, 1500);
};

export const handleJoinCleanup = () => {
  toast.success("🧹 Cleanup Team Registration", {
    description: "Connecting you with local volunteers..."
  });
  
  setTimeout(() => {
    toast.success("✅ Registered Successfully!", {
      description: "You'll receive cleanup schedule notifications."
    });
  }, 2000);
};

export const handleSupportReport = (location: string) => {
  toast.success("👍 Report Supported!", {
    description: `Added your support for ${location} cleanup request.`
  });
};

export const handleShopMossFrames = () => {
  toast.success("🛒 Moss Frame Store", {
    description: "Opening sustainable air purification solutions..."
  });
  
  setTimeout(() => {
    toast.info("🌱 Featured Product", {
      description: "Premium Moss Frame - Removes 2.3kg dust/month"
    });
  }, 1500);
};

export const handleStartReporting = () => {
  toast.success("🌍 Starting AQI reporting...", {
    description: "Set up your location for personalized air quality monitoring"
  });
  
  setTimeout(() => {
    toast.info("📍 Location access required", {
      description: "Please enable location services for accurate readings"
    });
  }, 1500);
  
  // Smooth scroll to AQI section
  setTimeout(() => {
    const aqiSection = document.querySelector('[data-section="aqi"]');
    aqiSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 500);
};

export const handleNewsletterSignup = (email: string) => {
  if (!email) {
    toast.error("📧 Email Required", {
      description: "Please enter your email address to subscribe."
    });
    return;
  }
  
  toast.success("📬 Newsletter Subscription", {
    description: `Welcome! You'll receive weekly environmental updates at ${email}`
  });
};

export const handleSearchAction = (query: string) => {
  if (!query.trim()) {
    toast.error("🔍 Search Query Empty", {
      description: "Please enter a search term to find content."
    });
    return;
  }
  
  toast.success("🔍 Searching...", {
    description: `Finding results for "${query}" across Kara platform`
  });
};