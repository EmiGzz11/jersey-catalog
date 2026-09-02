import React, { useState } from 'react';
import { Shirt, ImageOff } from 'lucide-react';

export default function JerseyImage({ src, alt, className = '', team = '', accentColor = '#10b981', player }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-50 dark:bg-slate-900/80 flex items-center justify-center ${className}`}>
      {/* Dynamic ambient color glow behind jersey */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/60 animate-pulse flex flex-col items-center justify-center text-slate-500 gap-2">
          <Shirt className="w-10 h-10 animate-bounce opacity-40" style={{ color: accentColor }} />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Cargando kit...</span>
        </div>
      )}

      {/* Actual Image */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
        />
      ) : (
        /* Fallback Kit Graphic if image not available */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-white dark:to-slate-950 border border-slate-200 dark:border-slate-800">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${accentColor}25, ${accentColor}60)` }}
          >
            <Shirt className="w-12 h-12" style={{ color: accentColor }} />
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1">{team}</span>
          {player && (
            <span className="text-xs font-semibold px-2 py-0.5 mt-1 rounded bg-slate-100 dark:bg-slate-800 text-emerald-400">
              #{player.number} {player.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
