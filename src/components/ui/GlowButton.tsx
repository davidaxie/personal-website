'use client';

import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
};

const variantConfig = {
  primary: {
    className: 'bg-gradient-to-r from-[#D0D0D8] to-[#A0A0B0] text-black border-0 font-semibold',
    hoverShadow: '0 0 30px rgba(208,208,216,0.5), 0 4px 20px rgba(208,208,216,0.3)',
    hoverScale: 1.03,
  },
  secondary: {
    className: 'bg-white/[0.07] text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.12]',
    hoverShadow: '0 0 25px rgba(255,255,255,0.1)',
    hoverScale: 1.02,
  },
  ghost: {
    className: 'bg-transparent text-white/80 border border-white/20 hover:bg-white/[0.08]',
    hoverShadow: '0 0 20px rgba(255,255,255,0.08)',
    hoverScale: 1.02,
  },
};

export function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: GlowButtonProps) {
  const v = variantConfig[variant];
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`
        inline-flex items-center justify-center gap-2.5
        rounded-full font-mono tracking-wider
        transition-colors duration-200
        cursor-pointer select-none
        ${sizeClasses[size]}
        ${v.className}
        ${className}
      `}
      whileHover={{
        scale: v.hoverScale,
        boxShadow: v.hoverShadow,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Component>
  );
}
