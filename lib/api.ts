// Define types for the API response
export interface MenuItem {
    link: string
    text: string
  }
  
  export interface MenuItems {
    [key: string]: MenuItem
  }
  
  export interface ImageFormat {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: null
    size: number
    width: number
    height: number
    sizeInBytes: number
  }
  
  export interface StrapiImage {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      large?: ImageFormat
      small?: ImageFormat
      medium?: ImageFormat
      thumbnail?: ImageFormat
    } | null
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  
  export interface StrapiSeo {
    id: number
    metaTitle: string
    metaDescription: string
    shareImage?: StrapiImage // Updated to match the actual API response
  }
  
  export interface StrapiGlobalData {
    meta: any
    data: {
      id: number
      documentId: string
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
  
  // Article interface
  export interface Article {
    id: number
    title: string
    content: string
    // Add other fields as necessary
  }
  
  // Fetch global data from Strapi
  export async function fetchGlobalData(): Promise<StrapiGlobalData | null> {
    try {
      // Updated URL to include the populate parameter for the shareImage
      const res = await fetch(
        "https://credible-rhythm-2abfae7efc.strapiapp.com/api/global?populate=defaultSeo.shareImage",
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        },
      )
  
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
  
  // Helper function to extract OG image URL from global data
  export function extractOgImageUrl(globalData: StrapiGlobalData | null): string | null {
    if (!globalData?.data?.defaultSeo?.shareImage) {
      return null
    }
  
    const shareImage = globalData.data.defaultSeo.shareImage
  
    // Use large format if available (closest to recommended OG image size)
    if (shareImage.formats?.large) {
      return shareImage.formats.large.url
    }
  
    // Fallback to original image if no large format
    return shareImage.url
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
  
  