export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 relative">
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div className="absolute inset-0 rounded-full border border-transparent border-t-gold animate-spin" />
      </div>
    </div>
  );
}
