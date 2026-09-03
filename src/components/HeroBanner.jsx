import React from 'react';
import { Sparkles, Trophy, History, Shield, Flame, Compass, Layers } from 'lucide-react';

export default function HeroBanner({ stats, onQuickFilter }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-200 dark:border-slate-800/60 bg-gradient-to-b from-slate-50/50 dark:from-slate-900/50 via-white dark:via-slate-950 to-white dark:to-slate-950">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Main Title & Description */}
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Galería & Museo Digital de Camisetas</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Viste los colores <br className="hidden sm:block" />
              de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500">equipo</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Con jerseys de clubes y selecciones de todo el mundo 🌎⚽
            </p>

          </div>

          {/* Stats Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-auto min-w-[300px]">
            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2 text-emerald-400 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.total}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kits en Exhibición</span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center group hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 text-amber-400 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.inStock}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">En Inventario</span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center group hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2 text-blue-400 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.leaguesCount}+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ligas & Torneos</span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center group hover:border-rose-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-2 text-rose-400 group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stats.legends}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dorsales Legendarios</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
