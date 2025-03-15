import HeaderClient from "./Header-Client";

// Server component that will eventually fetch navigation data
export default async function HeaderV1() {
  // Static navigation items (for now)
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Recent", href: "/recent" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ];

  // STEP 1: Uncomment this when API is ready
  // Replace the static navItems above with this:
  // const navItems = await fetchNavigationItems();

  return (
    <header className="fixed w-full backdrop-blur-[6.7px] bg-[#00000091] z-50">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <HeaderClient navItems={navItems} />
      </div>
    </header>
  );
}

// STEP 2: Uncomment this function when API is ready
/*
async function fetchNavigationItems() {
  try {
    // You can use environment variables directly on the server
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      console.warn('API_URL not set, using fallback navigation');
      return getFallbackNavigation();
    }
    
    const res = await fetch(`${apiUrl}/navigation`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch navigation: ${res.status}`);
    }
    
    const data = await res.json();
    return data || getFallbackNavigation();
    
  } catch (error) {
    console.error("Failed to fetch navigation items:", error);
    return getFallbackNavigation();
  }
}

// Helper function to get fallback navigation
function getFallbackNavigation() {
  return [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Recent", href: "/recent" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ];
}
*/
