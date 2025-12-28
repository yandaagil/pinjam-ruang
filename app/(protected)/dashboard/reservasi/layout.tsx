export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Reservasi</h1>
      </div>

      {children}
    </div>
  )
}