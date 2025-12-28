'use client'

import { QueryClient, isServer } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Di server, set staleTime ke 0 atau angka kecil untuk menghindari caching antar request
        // Di client, set angka lebih tinggi (misal 1 menit) agar tidak refetching berlebihan
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 5 * 60 * 1000, // Garbage collection time, 5 menit
        refetchOnWindowFocus: false, // Optional: matikan refetch saat pindah tab
        retry: 1, // Batasi retry jika error
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: SELALU buat query client baru untuk setiap request
    return makeQueryClient()
  } else {
    // Browser: Buat query client sekali saja (Singleton)
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // CATATAN: Hindari useState(() => new QueryClient()) di sini jika menggunakan suspense boundaries
  // Gunakan fungsi utility singleton yang sudah kita buat tadi.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}