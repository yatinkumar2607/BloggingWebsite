export interface MenuItem {
  link: string
  text: string
}
  
export interface MenuItems {
  [key: string]: MenuItem
}
  
export interface ImageFormat {
  path: null
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  size: number
  width: number
  height: number
  sizeInBytes: number
}
  
export interface StrapiImage {
  formats: {
    large?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    thumbnail?: ImageFormat
  } | null
  id: number
  url: string
  ext: string
  name: string
  hash: string
  mime: string
  size: number
  width: number
  height: number
  provider: string
  createdAt: string
  updatedAt: string
  documentId: string
  publishedAt: string
  provider_metadata: any
  caption: string | null
  previewUrl: string | null
  alternativeText: string | null
}
  
export interface StrapiSeo {
  id: number
  metaTitle: string
  metaDescription: string
  shareImage?: StrapiImage
}
  
export interface StrapiGlobalData {
  meta: any
  data: {
    id: number
    Menu: MenuItems
    siteName: string
    documentId: string
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
  twitter: string
  linkedin: string
  facebook: string
}
  
export interface Article {
  id: number
  title: string
  content: string
}


export async function fetchGlobalData(): Promise<StrapiGlobalData | null> {
  try {
    const res = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/global?populate=defaultSeo.shareImage",
      {
        next: { revalidate: 3600 },
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
  

export function getFallbackNavigation(): NavItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Recent", href: "/recent" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ]
}
  

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
  

export function extractOgImageUrl(globalData: StrapiGlobalData | null): string | null {
  if (!globalData?.data?.defaultSeo?.shareImage) {
    return null
  }

  const shareImage = globalData.data.defaultSeo.shareImage
  
  if (shareImage.formats?.large) {
    return shareImage.formats.large.url
  }

  return shareImage.url
}
  

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
  
  