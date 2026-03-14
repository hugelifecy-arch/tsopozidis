interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`w-[60px] h-[1px] gold-line mb-6 ${align === 'center' ? 'mx-auto' : ''}`} />
      <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-serif italic text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
