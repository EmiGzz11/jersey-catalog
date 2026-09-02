import React from 'react';
import { X, Trophy, ShieldCheck, Sparkles, CheckCircle2, HeartHandshake, HelpCircle } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 z-10">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                Acerca de <span className="text-emerald-400">Vexium</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Catálogo Digital & Galería Exclusiva de Coleccionismo
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

        {/* Informational Blocks */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>¿Cómo funciona este catálogo?</span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Esta plataforma es una <strong>galería interactiva para visualización local y consulta de indumentaria histórica</strong>. Hacemos entregas solamente en Piedras Negras, Coahuila. Nuestros productos los encuentras en <strong>Merkato: Showroom</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Calidad y Versiones
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Nuestras piezas son réplicas de la más alta calidad. Contamos con <strong>Versión Jugador</strong> (corte ajustado) y <strong>Versión Fan</strong> (corte regular). Las medidas varían dependiendo de la versión elegida.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" /> Consultas Directas
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Puedes guardar tus camisetas predilectas en tu lista de <strong>Favoritos</strong> y generar un enlace de consulta directa por WhatsApp o compartir la ficha técnica.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Entendido, volver a la galería
          </button>
        </div>

      </div>
    </div>
  );
}
