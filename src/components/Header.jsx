import React from 'react';
import { Shirt, Heart, LayoutGrid, Grid3X3, Sparkles, Trophy, Info, Sun, Moon } from 'lucide-react';

export default function Header({
  favoritesCount = 0,
  onOpenFavorites,
  viewMode,
  setViewMode,
  totalJerseys = 0,
  onOpenInfo,
  isLightMode,
  setIsLightMode
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <img src="/images/vexium_logo.jpg" alt="Vexium Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white dark:border-slate-950 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-slate-900 dark:text-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-700 dark:via-slate-100 to-slate-500 dark:to-slate-400">
                VEXIUM
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <Trophy className="w-2.5 h-2.5" /> Catálogo Exclusivo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Galería Histórica & Joyas de Colección
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Light Mode Toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-1.5 text-xs font-medium"
            title={isLightMode ? "Cambiar a fondo oscuro" : "Cambiar a fondo claro"}
          >
            {isLightMode ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-emerald-400" />}
            <span className="hidden md:inline">{isLightMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
          </button>

          {/* About / Info Modal Button */}
          {onOpenInfo && (
            <button
              onClick={onOpenInfo}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Información del Catálogo"
            >
              <Info className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Acerca del Catálogo</span>
            </button>
          )}

          {/* Favorites Bookmark Drawer Button */}
          <button
            onClick={onOpenFavorites}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${favoritesCount > 0
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-slate-900 dark:text-white shadow-lg shadow-rose-600/25 hover:brightness-110 active:scale-95'
              : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700'
              }`}
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-white' : 'text-rose-400'}`} />
            <span className="hidden sm:inline">Favoritos</span>
            {favoritesCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-white text-rose-600 rounded-full shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
