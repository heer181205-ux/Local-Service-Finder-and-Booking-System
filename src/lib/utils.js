import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function simulateNetworkDelay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
