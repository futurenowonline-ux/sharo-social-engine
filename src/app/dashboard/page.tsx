"use client"

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import {
    BarChart, Activity, Sparkles, Calendar,
    MessageCircleHeart, Image as ImageIcon, Send, RefreshCw, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MissionControlDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'queue'>('overview');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPreview, setGeneratedPreview] = useState<{ caption: string; imageUrl: string } | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Mocking the backend generation delay
        setTimeout(() => {
            setGeneratedPreview({
                caption: "✨ Start your morning right with our freshly baked Cinnamon Raisin Sourdough. Hot out the oven and perfect with local Mzansi coffee! ☕🍞 #SharoBakery #UlundiBakes #ArtisanBread",
                imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80" // Bread placeholder
            });
            setIsGenerating(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen p-8 text-foreground bg-background">
            {/* Header */}
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">
                        Mission Control
                    </h1>
                    <p className="text-secondary opacity-80">
                        Sharo Bakery Social Engine &bull; AI Command Center
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Sync Active
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Sentiment Score */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <GlassCard glowColor="emerald" className="h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white/90">Brand Health</h2>
                            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                                <Activity size={20} />
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-end">
                            <span className="text-5xl font-bold text-white mb-2">94%</span>
                            <span className="text-sm text-emerald-400">+2.4% vs last week</span>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* AI Creative Queue */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <GlassCard glowColor="purple" className="h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white/90">Asset Generation</h2>
                            <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                                <Sparkles size={20} />
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-end">
                            <span className="text-5xl font-bold text-white mb-2">12</span>
                            <span className="text-sm text-purple-400">assets ready for review</span>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Upcoming Posts */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <GlassCard glowColor="blue" className="h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white/90">Schedule</h2>
                            <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                <Calendar size={20} />
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-end">
                            <span className="text-5xl font-bold text-white mb-2">5</span>
                            <span className="text-sm text-blue-400">posts queued this week</span>
                        </div>
                    </GlassCard>
                </motion.div>

            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 mb-6">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}
                >
                    Creative Queue
                </button>
                <button
                    onClick={() => setActiveTab('queue')}
                    className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'queue' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}
                >
                    Recent Activity
                </button>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Preview Panel: Generator */}
                <GlassCard>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Generate Fresh Assets</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors text-sm font-medium border border-primary/20">
                            <Sparkles size={16} />
                            Inspire Me
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 h-48 flex items-center justify-center relative overflow-hidden group hover:border-white/20 transition-colors cursor-pointer">
                            <div className="text-center z-10 transition-transform group-hover:scale-105">
                                <ImageIcon className="mx-auto mb-2 text-white/40" size={32} />
                                <p className="text-white/60 text-sm">Drag image or click to browse</p>
                                <p className="text-white/40 text-xs mt-1">Google Photos Picker integration pending</p>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl border border-white/10 p-2 flex items-center">
                            <input
                                type="text"
                                placeholder="Describe the content you want to generate (e.g., 'Sunny morning with Cinnamon Buns')"
                                className="bg-transparent border-none outline-none flex-grow p-2 text-white/80 text-sm placeholder:text-white/30"
                                disabled={isGenerating}
                            />
                            <button
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {generatedPreview && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 pt-6 border-t border-white/10 overflow-hidden"
                                >
                                    <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                                        <Sparkles size={14} className="text-purple-400" />
                                        Generated Output Preview
                                    </h4>
                                    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-white/5 mb-4 relative">
                                            <img
                                                src={generatedPreview.imageUrl}
                                                alt="Generated preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-sm border-l-2 border-primary pl-3 py-1 text-white/90">
                                            {generatedPreview.caption}
                                        </p>
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <button className="px-4 py-2 text-xs font-medium rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white/80">
                                                Regenerate
                                            </button>
                                            <button
                                                className="px-4 py-2 text-xs font-medium rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
                                                onClick={() => setGeneratedPreview(null)}
                                            >
                                                <CheckCircle size={14} />
                                                Approve & Schedule
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassCard>

                {/* Action Panel: Schedule List */}
                <GlassCard>
                    <h3 className="text-xl font-semibold mb-6">Upcoming Schedule Preview</h3>
                    <div className="space-y-4">
                        {[
                            { time: 'Tomorrow, 08:00', title: 'Start Your Morning Right 🥐', platform: 'Instagram' },
                            { time: 'Friday, 12:00', title: 'Weekend Loaf Pre-orders 🍞', platform: 'Facebook' },
                            { time: 'Saturday, 09:00', title: 'Fresh Cinnamon Buns Available Now ✨', platform: 'Instagram' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-white/10 flex flex-shrink-0 items-center justify-center">
                                    <ImageIcon className="text-white/40" size={20} />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-white/90">{item.title}</p>
                                    <div className="flex gap-2 text-xs text-secondary mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {item.time}</span>
                                        <span>&bull;</span>
                                        <span>{item.platform}</span>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
}
