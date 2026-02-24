import React from 'react';
import { cn } from '@/lib/utils'; // I will create this utility

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'none';
  children: React.ReactNode;
}

export function GlassCard({
  children,
  className,
  glowColor = 'none',
  ...props
}: GlassCardProps) {
  const glowClass = glowColor !== 'none' ? `glow-${glowColor}` : '';

  return (
    <div
      className={cn(
        'glass-card p-6 flex flex-col gap-4 relative overflow-hidden',
        glowClass,
        className
      )}
      {...props}
    >
      {/* Optional subtle gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
