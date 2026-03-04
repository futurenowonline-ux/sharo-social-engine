"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Sparkles,
  BarChart3,
  Calendar,
  ArrowRight,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Caption Engine",
    description:
      "Generate platform-specific social captions powered by Gemini. Tuned to Sharo Bakery's unique brand voice.",
    glow: "purple" as const,
    color: "text-purple-400",
    bg: "bg-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Sentiment Analysis",
    description:
      "Real-time brand health monitoring using Google Cloud NLP. Know how your audience feels — instantly.",
    glow: "emerald" as const,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Approve content and auto-schedule to Google Calendar. One click from generation to your content calendar.",
    glow: "blue" as const,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
  },
];

const TECH_STACK = [
  { icon: Zap, label: "Gemini 3.0 Pro" },
  { icon: Layers, label: "Vertex AI" },
  { icon: Shield, label: "Workload Identity" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[128px]" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-[128px]" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-secondary/10 blur-[128px]" />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Sparkles size={18} className="text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Sharo Social Engine
          </span>
        </div>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
        >
          Open Dashboard →
        </Link>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: copy */}
          <div>
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <Zap size={12} />
                Powered by Gemini &amp; Vertex AI
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Your bakery&apos;s
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI command center
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-white/60 max-w-md mb-8 leading-relaxed"
            >
              Generate captions, analyze sentiment, and schedule content — all
              from one premium dashboard built for Sharo Bakery, Ulundi.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/25"
              >
                Launch Mission Control
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <div className="flex items-center gap-3 px-4 opacity-60 text-sm">
                {TECH_STACK.map((tech, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 text-white/50"
                  >
                    <tech.icon size={14} />
                    {tech.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: hero image */}
          <motion.div variants={item} className="relative">
            <div className="glass-card glow-amber overflow-hidden aspect-[4/3] relative">
              <Image
                src="/hero-bread.png"
                alt="Freshly baked artisan sourdough and cinnamon raisin rolls from Sharo Bakery"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs text-white/90 border border-white/10">
                  📸 AI-generated for Sharo Bakery
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <GlassCard
                glowColor={feature.glow}
                className="h-full hover:scale-[1.02] transition-transform duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}
                >
                  <feature.icon size={20} className={feature.color} />
                </div>
                <h3 className="text-lg font-semibold text-white/95 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>
            © 2026 Sharo Bakery &bull; Built with{" "}
            <span className="text-primary/70">Antigravity</span>
          </span>
          <span>Ulundi, KwaZulu-Natal 🇿🇦</span>
        </div>
      </footer>
    </div>
  );
}
