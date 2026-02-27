interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'mercury';
}

const variantStyles: Record<string, string> = {
  default: 'bg-white/[0.08] text-white/70 border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.25]',
  mercury: 'bg-[#8C8C8C]/[0.15] text-[#8C8C8C] border-[#8C8C8C]/[0.30] hover:bg-[#8C8C8C]/[0.22]',
  venus: 'bg-[#E8CDA0]/[0.15] text-[#E8CDA0] border-[#E8CDA0]/[0.30] hover:bg-[#E8CDA0]/[0.22]',
  earth: 'bg-[#4B8BBE]/[0.15] text-[#4B8BBE] border-[#4B8BBE]/[0.30] hover:bg-[#4B8BBE]/[0.22]',
  mars: 'bg-[#C1440E]/[0.15] text-[#C1440E] border-[#C1440E]/[0.30] hover:bg-[#C1440E]/[0.22]',
  jupiter: 'bg-[#C88B3A]/[0.15] text-[#C88B3A] border-[#C88B3A]/[0.30] hover:bg-[#C88B3A]/[0.22]',
  saturn: 'bg-[#DAA520]/[0.15] text-[#DAA520] border-[#DAA520]/[0.30] hover:bg-[#DAA520]/[0.22]',
  uranus: 'bg-[#73D8E8]/[0.15] text-[#73D8E8] border-[#73D8E8]/[0.30] hover:bg-[#73D8E8]/[0.22]',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block px-3.5 py-1.5 text-[11px] font-mono tracking-wider
        rounded-full border transition-all duration-200
        ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
}
