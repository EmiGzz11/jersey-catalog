import React from 'react';
import { X, Trash2, Heart, ExternalLink, MessageCircle, Shirt, ChevronRight } from 'lucide-react';
import JerseyImage from './JerseyImage';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favoriteJerseys = [],
  onToggleFavorite,
  onOpenModal,
  onClearFavorites
}) {
  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Estoy revisando el catálogo y he guardado en mi lista de favoritos las siguientes camisetas para consultar disponibilidad:\n\n` +
    favoriteJerseys.map((j, i) => `${i + 1}. *${j.name}* (${j.team} - ${j.season})`).join('\n')
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-white dark:bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Mi Selección</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {favoriteJerseys.length} {favoriteJerseys.length === 1 ? 'camiseta guardada' : 'camisetas guardadas'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {favoriteJerseys.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-500">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-200">No tienes favoritos guardados</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Haz clic en el icono del corazón en cualquier jersey para guardarlo aquí y revisarlo cuando quieras.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              favoriteJerseys.map((jersey) => (
                <div
                  key={jersey.id}
                  onClick={() => {
                    onOpenModal(jersey);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-3.5 group cursor-pointer"
                >
                  {/* Jersey Thumbnail */}
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 flex-shrink-0 relative">
                    <JerseyImage
                      src={jersey.images.front}
                      alt={jersey.name}
                      team={jersey.team}
                      accentColor={jersey.accentColor}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Jersey Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {jersey.season} • {jersey.league}
                    </span>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-emerald-400 transition-colors">
                      {jersey.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{jersey.team}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(jersey.id);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-50 dark:bg-slate-900 transition-colors"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {favoriteJerseys.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 space-y-3">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar Toda Mi Selección ({favoriteJerseys.length})</span>
              </a>

              <button
                onClick={onClearFavorites}
                className="w-full py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-colors"
              >
                Vaciar lista de favoritos
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
