const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-1 py-8">
      <div className="size-2 rounded-full bg-primary animate-bounce" />
      <div
        className="size-2 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="size-2 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  )
}

export default Loader