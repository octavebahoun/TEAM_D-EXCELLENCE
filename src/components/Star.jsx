export default function Star({ className = '' }) {
  return (
    <span
      data-star
      aria-hidden="true"
      className={`inline-block w-6 h-6 align-middle ${className}`}
    />
  )
}
