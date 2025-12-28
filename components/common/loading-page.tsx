interface LoadingPageProps {
  fullScreen?: boolean
  message?: string
}

export default function LoadingPage({
  fullScreen = false,
  message = "Memuat data..."
}: LoadingPageProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-primary"
            style={{
              animation: `bounce 1.4s ease-in-out infinite`,
              animationDelay: `${index * 0.16}s`,
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  )
}
