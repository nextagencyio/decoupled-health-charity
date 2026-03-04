export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse [animation-delay:150ms]" />
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  )
}
