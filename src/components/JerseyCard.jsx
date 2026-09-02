import React, { useState } from 'react';
import { Heart, Sparkles, Eye, Shield, Tag, Calendar, Layers } from 'lucide-react';
import JerseyImage from './JerseyImage';
import { getFlagEmoji } from '../data/jerseys';

export default function JerseyCard({
  jersey,
  isFavorite = false,
  onToggleFavorite,
  onOpenModal,
  compact = false
}) {
  const [hovered, setHovered] = useState(false);
  const [currentView, setCurrentView] = useState('front'); // 'front' | 'back'

  const activeImage = currentView === 'back' && jersey.images.back ? jersey.images.back : jersey.images.front;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentView('front');
      }}
      className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl ${isFavorite ? 'border-rose-500/30' : 'hover:border-emerald-500/40'
        }`}
      style={{
        boxShadow: hovered ? `0 20px 30px -10px ${jersey.accentColor}25` : undefined
      }}
    >
      {/* Top Media Header / Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50 dark:bg-slate-900/90">

        {/* Main Image */}
        <JerseyImage
          src={activeImage}
          alt={jersey.name}
          team={jersey.team}
          accentColor={jersey.accentColor}
          player={jersey.player}
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-950 via-slate-100/20 dark:via-slate-950/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

        {/* Top Badges: Era / Brand / Featured */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-950/80 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/60 shadow-sm">
              {jersey.season}
            </span>
            {jersey.featured && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Joya
              </span>
            )}
          </div>

          {/* Favorite Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(jersey.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isFavorite
              ? 'bg-rose-500 text-slate-900 dark:text-white shadow-lg shadow-rose-500/30 scale-110'
              : 'bg-white dark:bg-slate-950/70 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-rose-600/80 border border-slate-300 dark:border-slate-700/60'
              }`}
            title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-75 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Quick View Angle Switcher on Hover (Frente / Espalda) */}
        {jersey.images.back && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentView('front');
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${currentView === 'front' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300'
                }`}
            >
              Frente
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentView('back');
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${currentView === 'back' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300'
                }`}
            >
              Dorsal
            </button>
          </div>
        )}

        {/* Customization Badge (bottom right) */}
        {jersey.customizable && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700/60 backdrop-blur-md">
            <span className="text-xs font-bold text-emerald-400">Personalizable</span>
          </div>
        )}
      </div>

      {/* Card Content Information */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">

        <div className="space-y-1.5">
          {/* League & Type Subtitle */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 truncate text-emerald-400/90 font-semibold">
              <span className="text-sm leading-none">
                {jersey.league === 'Selecciones' ? '🌐' : getFlagEmoji(jersey.country)}
              </span>
              <span className="truncate">{jersey.league}</span>
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
              {jersey.type}
            </span>
          </div>

          {/* Jersey Title */}
          <h3
            onClick={() => onOpenModal(jersey)}
            className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
            title={jersey.name}
          >
            {jersey.name}
          </h3>

          {/* Team / Club */}
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
            {jersey.team} <span className="text-slate-500">•</span> {jersey.brand}
          </p>
        </div>

        {/* Tags pills */}
        {!compact && jersey.tags && (
          <div className="flex flex-wrap gap-1 pt-1">
            {jersey.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700/40"
              >
                {tag}
              </span>
            ))}
            {jersey.tags.length > 2 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
                +{jersey.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/70 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            <span className="text-slate-500">Specs: </span>
            <span className="font-semibold text-slate-600 dark:text-slate-300 truncate">{jersey.specs?.fabricTech?.split(' ')[0] || 'Original'}</span>
          </div>

          <button
            onClick={() => onOpenModal(jersey)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 group-hover:shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Ficha</span>
          </button>
        </div>

      </div>
    </div>
  );
}
