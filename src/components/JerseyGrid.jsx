import React from 'react';
import JerseyCard from './JerseyCard';
import { Shirt, SearchX, RotateCcw, Sparkles } from 'lucide-react';

export default function JerseyGrid({
  jerseys = [],
  favorites = [],
  onToggleFavorite,
  onOpenModal,
  viewMode = 'grid',
  onResetFilters
}) {
  if (jerseys.length === 0) {
    return (
      <div className="py-20 px-4 max-w-lg mx-auto text-center space-y-5">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 shadow-xl">
          <SearchX className="w-10 h-10 text-emerald-500/80 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">No se encontraron camisetas</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            No hay ningún jersey que coincida con los filtros y término de búsqueda seleccionados.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 mx-auto active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        className={`grid gap-6 transition-all duration-300 ${
          viewMode === 'compact'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {jerseys.map((jersey) => (
          <JerseyCard
            key={jersey.id}
            jersey={jersey}
            isFavorite={favorites.includes(jersey.id)}
            onToggleFavorite={onToggleFavorite}
            onOpenModal={onOpenModal}
            compact={viewMode === 'compact'}
          />
        ))}
      </div>
    </div>
  );
}
