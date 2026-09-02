import React from 'react';
import { Shirt, Heart, Sparkles, Trophy, Globe, Shield } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/90 text-slate-500 dark:text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <img src="/images/vexium_logo.jpg" alt="Vexium Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <div className="font-display font-extrabold text-base text-slate-900 dark:text-white tracking-wide">
                VEXIUM
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Catálogo y Galería de Exhibición de Camisetas Históricas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/vexium.store/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-emerald-400 transition-colors">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61592562848624" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-emerald-400 transition-colors">Facebook</a>
          </div>
        </div>

        {/* Football Quote */}
        <div className="text-center md:text-right max-w-md">
          <p className="text-slate-600 dark:text-slate-300 italic text-xs">
            "El fútbol es la dinámica de lo impensado."
          </p>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">
            — Dante Panzeri
          </span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Vexium. Catálogo local para visualización y coleccionismo.</p>
        <p className="flex items-center gap-1">
          Desarrollado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> para los apasionados del fútbol
        </p>
      </div>
    </footer>
  );
}
