import { CustomerDTO, HttpTypes } from "@medusajs/types"

export interface ModuleEmployee {
  id: string
  spending_limit: number
  is_admin: boolean
  company_id: string
  created_at: Date
  updated_at: Date
}
export enum ModuleCompanySpendingLimitResetFrequency {
  NEVER = "never",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}
export type ModuleCompany = {
  id: string
  name: string
  phone: string
  email: string
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  country: string | null
  logo_url: string | null
  currency_code: string | null
  spending_limit_reset_frequency: ModuleCompanySpendingLimitResetFrequency
  created_at: Date
  updated_at: Date
}
export type QueryCompany = ModuleCompany & {
  employees: QueryEmployee[]
}

export type QueryEmployee = ModuleEmployee & {
  company: QueryCompany
  customer: CustomerDTO
}

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export enum SpendingLimitResetFrequency {
  never = "never",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}

export interface B2BCart extends HttpTypes.StoreCart {
  company: QueryCompany
  promotions?: HttpTypes.StorePromotion[]
}

export interface B2BOrder extends HttpTypes.StoreOrder {
  company: QueryCompany
}

export interface B2BCustomer extends HttpTypes.StoreCustomer {
  employee: QueryEmployee | null
  orders?: HttpTypes.StoreOrder[]
}
