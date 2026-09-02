import React, { useState, useEffect } from 'react';
import {
  X, Heart, Sparkles, Shield, Tag, Calendar, Layers,
  CheckCircle2, Share2, MessageCircle, ChevronLeft, ChevronRight,
  Maximize2, Award, Info, Shirt
} from 'lucide-react';
import JerseyImage from './JerseyImage';
import { getFlagEmoji } from '../data/jerseys';

export default function JerseyModal({
  jersey,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) {
  const [selectedAngle, setSelectedAngle] = useState('front'); // 'front' | 'back' | 'detail'
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    setSelectedAngle('front');
    setIsZoomed(false);
  }, [jersey?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!jersey) return null;

  const currentImageSrc =
    selectedAngle === 'back' && jersey.images.back
      ? jersey.images.back
      : selectedAngle === 'detail' && jersey.images.detail
        ? jersey.images.detail
        : jersey.images.front;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${jersey.name} - ${jersey.team} (${jersey.season}) | Vexium`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Estoy revisando el catálogo y me interesa conocer más información y disponibilidad sobre la camiseta: *${jersey.name}* (${jersey.team} - ${jersey.season}).`
  );
  const whatsappNumber = "528781015811";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-white dark:bg-slate-950/85 backdrop-blur-md animate-fadeIn">

      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-5xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">

        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60">
              Ficha Técnica de Colección
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Ref: {jersey.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Nav */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl p-0.5 border border-slate-300 dark:border-slate-700">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white disabled:opacity-30 disabled:hover:text-slate-600 dark:text-slate-300 transition-colors"
                title="Camiseta anterior (Flecha Izq)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white disabled:opacity-30 disabled:hover:text-slate-600 dark:text-slate-300 transition-colors"
                title="Siguiente camiseta (Flecha Der)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(jersey.id)}
              className={`p-2 rounded-xl border transition-all ${isFavorite
                ? 'bg-rose-500 text-slate-900 dark:text-white border-rose-400 shadow-md shadow-rose-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 hover:bg-slate-750'
                }`}
              title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition-colors"
              title="Cerrar modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Multi-angle Media Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 group">
              <JerseyImage
                src={currentImageSrc}
                alt={jersey.name}
                team={jersey.team}
                accentColor={jersey.accentColor}
                player={jersey.player}
                className="w-full h-full"
              />

              {/* Angle Label Overlay */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
                {selectedAngle === 'front' && 'Vista Frontal'}
                {selectedAngle === 'back' && 'Vista Dorsal'}
                {selectedAngle === 'detail' && 'Detalle Textil / Escudo'}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedAngle('front')}
                className={`p-1.5 rounded-xl border transition-all text-left flex items-center gap-2 ${selectedAngle === 'front'
                  ? 'border-emerald-500 bg-emerald-950/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:border-slate-700'
                  }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={jersey.images.front} alt="Front" className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">Frente</div>
              </button>

              {jersey.images.back && (
                <button
                  onClick={() => setSelectedAngle('back')}
                  className={`p-1.5 rounded-xl border transition-all text-left flex items-center gap-2 ${selectedAngle === 'back'
                    ? 'border-emerald-500 bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:border-slate-700'
                    }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={jersey.images.back} alt="Back" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">Dorsal</div>
                </button>
              )}

              {jersey.images.detail && (
                <button
                  onClick={() => setSelectedAngle('detail')}
                  className={`p-1.5 rounded-xl border transition-all text-left flex items-center gap-2 ${selectedAngle === 'detail'
                    ? 'border-emerald-500 bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-slate-300 dark:border-slate-700'
                    }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={jersey.images.detail} alt="Detail" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">Detalle</div>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Specifications & Lore */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">

            <div className="space-y-4">

              {/* Header Title & Tags */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <span className="text-sm leading-none">
                    {jersey.league === 'Selecciones' ? '🌐' : getFlagEmoji(jersey.country)}
                  </span>
                  <span>{jersey.league}</span>
                  <span>•</span>
                  <span>{jersey.country}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {jersey.name}
                </h2>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                  {jersey.team} <span className="text-slate-500">|</span> Temporada {jersey.season}
                </p>
              </div>

              {/* Customization Banner if present */}
              {jersey.customizable && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black font-display text-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Shirt className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Opción Disponible
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Personalización de Nombre y Número</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lore / Story */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Historia & Relevancia del Jersey</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{jersey.story}"
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Especificaciones Técnicas
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Fabricante:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{jersey.brand}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Versión:</span>
                    <span className="font-bold text-emerald-400">{jersey.specs?.version || 'Authentic'}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Tecnología Textil:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{jersey.specs?.fabricTech}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Tipo de Cuello:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{jersey.specs?.collar}</span>
                  </div>

                  {jersey.specs?.patches && jersey.specs.patches.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 sm:col-span-2">
                      <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Parches y Distintivos:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {jersey.specs.patches.map((patch, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            {patch}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Inventory Section */}
              <div className="space-y-2.5 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Disponibilidad
                </h4>

                {jersey.inventory && jersey.inventory.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {jersey.inventory.map((inv, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{inv.size}</span>
                        <span className="text-emerald-400 font-semibold text-xs">{inv.quantity} disp.</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <p>
                    {jersey.inventory && jersey.inventory.length > 0 ? (
                      <>
                        <span className="font-bold text-emerald-400">¿No está tu talla?</span> Podemos mandarla a pedir.
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-emerald-400">Bajo pedido.</span> Este modelo no está en stock físico actualmente, pero podemos mandarlo a pedir.
                      </>
                    )}
                    <br />
                    Tallas disponibles bajo pedido: <span className="font-bold text-slate-900 dark:text-white">S, M, L, XL, 2XL</span>.
                  </p>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors underline decoration-emerald-500/30 underline-offset-2"
                  >
                    Ver medidas de las tallas
                  </button>
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="flex flex-wrap gap-1.5">
                {jersey.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Action Buttons Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
              {/* WhatsApp / Direct Inquiry Preview */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar Disponibilidad</span>
              </a>

              {/* Copy Info Button */}
              <button
                onClick={handleShare}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 border border-slate-300 dark:border-slate-700 transition-colors"
                title="Copiar datos al portapapeles"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Size Chart Modal Overlay */}
      {showSizeChart && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white dark:bg-slate-950/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Guía de Tallas</h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex justify-center bg-white dark:bg-slate-950">
              {/* Replace this with the actual size chart image path */}
              <img
                src={jersey.specs?.version?.toLowerCase().includes("jugador") ? "/images/tallasVJ.jpeg" : "/images/tallasVF.jpeg"}
                alt="Guía de Tallas"
                className="max-w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x600/050a07/C5A962?text=Gu%C3%ADa+de+Tallas+(Imagen+Pendiente)";
                }}
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 text-center">
              Las medidas pueden variar ligeramente dependiendo de la versión (Aficionado vs Jugador).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
