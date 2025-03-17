// Define types for the API response
export interface MenuItem {
    link: string
    text: string
  }
  
  export interface MenuItems {
    [key: string]: MenuItem
  }
  
  export interface StrapiImage {
    url: string
    ext: string
    mime: string
    height: number | null
    width: number | null
  }
  
  export interface StrapiSeo {
    metaTitle: string
    metaDescription: string
  }
  
  export interface StrapiGlobalData {
    meta: any
    data: {
      id: number
      Menu: MenuItems
      siteName: string
      TwitterLink: string
      facebooklink: string
      LinkedInLink: string
      favicon: StrapiImage
      defaultSeo: StrapiSeo
      siteDescription: string
    }
  }
  
  export interface NavItem {
    href: string
    label: string
  }
  
  export interface SocialLinks {
    facebook: string
    linkedin: string
    twitter: string
  }
  
  export interface Article {
    id: string
    title: string
    slug: string
    excerpt?: string
    content?: string
    publishedAt: string
  }
  
  // Fetch global data from Strapi
  export async function fetchGlobalData(): Promise<StrapiGlobalData | null> {
    try {
      const res = await fetch("https://credible-rhythm-2abfae7efc.strapiapp.com/api/global?populate=*", {
        next: { revalidate: 3600 }, // Revalidate every hour
      })
  
      if (!res.ok) {
        throw new Error(`Failed to fetch global data: ${res.status}`)
      }
  
      return await res.json()
    } catch (error) {
      console.error("Failed to fetch global data:", error)
      return null
    }
  }
  
  // Helper function to get fallback navigation
  export function getFallbackNavigation(): NavItem[] {
    return [
      { label: "Home", href: "/" },
      { label: "Trending", href: "/trending" },
      { label: "Recent", href: "/recent" },
      { label: "Articles", href: "/articles" },
      { label: "About", href: "/about" },
    ]
  }
  
  // Helper function to extract navigation items from global data
  export function extractNavItems(globalData: StrapiGlobalData | null): NavItem[] {
    let navItems: NavItem[] = getFallbackNavigation()
  
    if (globalData?.data?.Menu) {
      const menuItems = globalData.data.Menu
  
      navItems = Object.keys(menuItems)
        .filter((key) => menuItems[key] && menuItems[key].text && menuItems[key].link)
        .map((key) => ({
          label: menuItems[key].text,
          href: menuItems[key].link,
        }))
    }
  
    return navItems
  }
  
  // Helper function to extract social links from global data
  export function extractSocialLinks(globalData: StrapiGlobalData | null): SocialLinks {
    const defaultLinks: SocialLinks = {
      facebook: "https://www.facebook.com/",
      linkedin: "https://in.linkedin.com/",
      twitter: "https://x.com/home",
    }
  
    if (!globalData?.data) {
      return defaultLinks
    }
  
    return {
      facebook: globalData.data.facebooklink || defaultLinks.facebook,
      linkedin: globalData.data.LinkedInLink || defaultLinks.linkedin,
      twitter: globalData.data.TwitterLink || defaultLinks.twitter,
    }
  }
  
  // Fetch all articles
  export async function fetchAllArticles(): Promise<Article[]> {
    try {
      const response = await fetch("https://your-api.com/articles", {
        cache: "no-store",
      })
  
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching articles:", error)
      return []
    }
  }
  
  