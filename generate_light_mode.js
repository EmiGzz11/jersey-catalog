const fs = require('fs');

const css = `
.light-mode {
  @apply bg-slate-50 text-slate-900;
}

/* Backgrounds */
.light-mode .bg-slate-950 { @apply bg-white !important; }
.light-mode .bg-slate-900 { @apply bg-slate-50 !important; }
.light-mode .bg-slate-800 { @apply bg-slate-100 !important; }
.light-mode .bg-slate-950\\/50 { @apply bg-white/50 !important; }
.light-mode .bg-slate-950\\/60 { @apply bg-white/60 !important; }
.light-mode .bg-slate-950\\/70 { @apply bg-white/70 !important; }
.light-mode .bg-slate-950\\/80 { @apply bg-white/80 !important; }
.light-mode .bg-slate-950\\/90 { @apply bg-white/90 !important; }
.light-mode .bg-slate-900\\/50 { @apply bg-slate-50/50 !important; }
.light-mode .bg-slate-900\\/80 { @apply bg-slate-50/80 !important; }
.light-mode .bg-slate-900\\/90 { @apply bg-slate-50/90 !important; }
.light-mode .bg-slate-800\\/80 { @apply bg-slate-100/80 !important; }
.light-mode .bg-slate-800\\/60 { @apply bg-slate-100/60 !important; }
.light-mode .bg-slate-800\\/40 { @apply bg-slate-100/40 !important; }
.light-mode .hover\\:bg-slate-900:hover { @apply hover:bg-slate-50 !important; }
.light-mode .hover\\:bg-slate-800:hover { @apply hover:bg-slate-100 !important; }
.light-mode .hover\\:bg-slate-700:hover { @apply hover:bg-slate-200 !important; }
.light-mode .hover\\:bg-slate-850:hover { @apply hover:bg-slate-100 !important; }

/* Text Colors */
.light-mode .text-white { @apply text-slate-900 !important; }
.light-mode .text-slate-100 { @apply text-slate-800 !important; }
.light-mode .text-slate-200 { @apply text-slate-700 !important; }
.light-mode .text-slate-300 { @apply text-slate-600 !important; }
.light-mode .text-slate-400 { @apply text-slate-500 !important; }
.light-mode .hover\\:text-white:hover { @apply hover:text-slate-900 !important; }
.light-mode .hover\\:text-slate-200:hover { @apply hover:text-slate-700 !important; }

/* Border Colors */
.light-mode .border-slate-800 { @apply border-slate-200 !important; }
.light-mode .border-slate-700 { @apply border-slate-300 !important; }
.light-mode .border-slate-800\\/80 { @apply border-slate-200/80 !important; }
.light-mode .border-slate-800\\/60 { @apply border-slate-200/60 !important; }
.light-mode .border-slate-700\\/80 { @apply border-slate-300/80 !important; }
.light-mode .border-slate-700\\/60 { @apply border-slate-300/60 !important; }
.light-mode .border-slate-700\\/40 { @apply border-slate-300/40 !important; }
.light-mode .hover\\:border-slate-700:hover { @apply hover:border-slate-300 !important; }

/* Gradients */
.light-mode .from-slate-900\\/50 { @apply from-slate-50/50 !important; }
.light-mode .via-slate-950 { @apply via-white !important; }
.light-mode .to-slate-950 { @apply to-white !important; }
.light-mode .from-slate-950 { @apply from-white !important; }
.light-mode .via-slate-950\\/20 { @apply via-white/20 !important; }

/* Glassmorphism */
.light-mode .glass-panel {
  background: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(0, 0, 0, 0.05) !important;
}
.light-mode .glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.05) !important;
}
.light-mode .glass-card:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  border-color: rgba(197, 169, 98, 0.4) !important;
}

/* Scrollbar */
.light-mode ::-webkit-scrollbar-track {
  background: #f0f7f4 !important;
}
.light-mode ::-webkit-scrollbar-thumb {
  background: #cce3db !important;
}
.light-mode ::-webkit-scrollbar-thumb:hover {
  background: #99c7b5 !important;
}
`;

fs.appendFileSync('src/index.css', css);
console.log('Appended light mode CSS to index.css');
