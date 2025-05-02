import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export function isExpiringSoon(date: Date, days = 30) {
  const now = new Date()
  const expiryDate = new Date(date)
  const diffTime = expiryDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= days && diffDays > 0
}

export function hasExpired(date: Date) {
  const now = new Date()
  const expiryDate = new Date(date)
  return expiryDate < now
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const deviceStatusOptions = [
  { value: "Available", label: "Verfügbar" },
  { value: "In Use", label: "In Benutzung" },
  { value: "Maintenance Required", label: "Wartung notwendig" },
  { value: "Out of Order", label: "Außer Betrieb" },
]

export const storageTemperatureOptions = [
  { value: "Room Temperature", label: "Raumtemperatur" },
  { value: "Refrigerated", label: "Gekühlt (4°C)" },
  { value: "Frozen", label: "Gefroren (-20°C)" },
  { value: "Deep Frozen", label: "Tiefgefroren (-80°C)" },
]

export const protocolCategoryOptions = [
  { value: "Biochemistry", label: "Biochemie" },
  { value: "Molecular Biology", label: "Molekularbiologie" },
  { value: "Microbiology", label: "Mikrobiologie" },
  { value: "Cell Culture", label: "Zellkultur" },
  { value: "Immunology", label: "Immunologie" },
  { value: "Other", label: "Sonstiges" },
]
