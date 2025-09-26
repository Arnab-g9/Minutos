export interface IGetAdsResponse {
  success: boolean
  banner: Banner
}

export interface Banner {
  _id: string
  advertiseBanners: string[]
  createdAt: string
  updatedAt: string
  __v: number
  homeBanner1: string
  homeBanner2: string
  homeBanner3: string
  homeBanner4: string
}
