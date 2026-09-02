import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw, ArrowUpDown, Trophy, Globe, Shield, Crown, Flame, Sparkles, Star, Layers } from 'lucide-react';
import { LEAGUES_LIST, ERAS_LIST, TYPES_LIST, BRANDS_LIST } from '../data/jerseys';

const LEAGUE_ICONS = {
  Trophy: Trophy,
  Globe: Globe,
  Shield: Shield,
  Crown: Crown,
  Flame: Flame,
  Sparkles: Sparkles,
  Star: Star,
  Layers: Layers
};

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedLeague,
  setSelectedLeague,
  selectedEra,
  setSelectedEra,
  selectedType,
  setSelectedType,
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
  activeFiltersCount,
  resetFilters,
  filteredCount,
  totalCount
}) {
  return (
    <div className="sticky top-20 z-30 w-full glass-panel border-b border-slate-200 dark:border-slate-800/90 shadow-xl shadow-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">

        {/* Top Controls Row: Search & Dropdowns */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por club, selección, jugador (ej: Zidane, Maradona, Real Madrid, 1986)..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-50 dark:bg-slate-900 focus:bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 focus:border-emerald-500 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Secondary Filters & Sorters */}
          <div className="flex flex-wrap items-center gap-2">

            {/* Era Filter */}
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-850 border border-slate-300 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              {ERAS_LIST.map(era => (
                <option key={era.id} value={era.id} className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {era.label}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-850 border border-slate-300 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              {TYPES_LIST.map(type => (
                <option key={type.id} value={type.id} className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {type.label}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-850 border border-slate-300 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              {BRANDS_LIST.map(brand => (
                <option key={brand.id} value={brand.id} className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {brand.label}
                </option>
              ))}
            </select>

            {/* Sorter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl px-2.5 py-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent py-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">⭐ Destacadas</option>
                <option value="season-desc" className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">📅 Más recientes</option>
                <option value="season-asc" className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">📼 Más clásicas (Retro)</option>
                <option value="name-asc" className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">🔤 Nombre (A - Z)</option>
              </select>
            </div>

            {/* Reset button if any filter active */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="px-3 py-2.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Restablecer filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar ({activeFiltersCount})</span>
              </button>
            )}

          </div>

        </div>

        {/* League Category Horizontal Pills */}
        <div className="flex items-center justify-between gap-3 pt-1">

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none w-full">
            {LEAGUES_LIST.map((league) => {
              const isSelected = selectedLeague === league.id;

              return (
                <button
                  key={league.id}
                  onClick={() => setSelectedLeague(league.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700'
                    }`}
                >
                  <span className="text-sm">{league.flag}</span>
                  <span>{league.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Counter */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap pl-3 border-l border-slate-200 dark:border-slate-800">
            <span>Mostrando <strong className="text-slate-900 dark:text-white font-bold">{filteredCount}</strong> de {totalCount}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
