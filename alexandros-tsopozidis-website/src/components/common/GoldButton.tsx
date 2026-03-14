import { Link } from '@/i18n/routing';
import { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  variant?: 'outline' | 'solid';
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function GoldButton({
  children,
  variant = 'outline',
  href,
  onClick,
  size = 'md',
  className = '',
  external = false,
}: GoldButtonProps) {
  const base = `inline-block font-display uppercase tracking-wider transition-all duration-300 ${sizeClasses[size]}`;
  const variants = {
    outline: 'border border-gold text-gold hover:bg-gold hover:text-bg-primary',
    solid: 'bg-gold text-bg-primary hover:bg-gold-light',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
