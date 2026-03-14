import '../globals.css';

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
