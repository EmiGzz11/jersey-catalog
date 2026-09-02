import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useJerseys } from './hooks/useJerseys';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import JerseyGrid from './components/JerseyGrid';
import JerseyModal from './components/JerseyModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import InfoModal from './components/InfoModal';
import Footer from './components/Footer';

export default function App() {
  const {
    jerseys,
    totalCount,
    filteredCount,
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
    viewMode,
    setViewMode,
    activeFiltersCount,
    resetFilters,
    activeJersey,
    setActiveJersey,
    favorites,
    favoriteJerseys,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    stats
  } = useJerseys();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  React.useEffect(() => {
    if (!isLightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isLightMode]);

  // Trigger confetti on adding a favorite
  const handleToggleFavorite = (jerseyId) => {
    const willBeFavorite = !isFavorite(jerseyId);
    toggleFavorite(jerseyId);

    if (willBeFavorite) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.85 },
          colors: ['#10b981', '#f59e0b', '#ec4899']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Quick filter helper from Hero banner shortcuts
  const handleQuickFilter = ({ type, value }) => {
    resetFilters();
    if (type === 'search') {
      setSearchQuery(value);
    } else if (type === 'league') {
      setSelectedLeague(value);
    } else if (type === 'era') {
      setSelectedEra(value);
    } else if (type === 'tag') {
      setSearchQuery(value);
    }

    // Smooth scroll down to filter bar
    const filterElement = document.getElementById('catalog-section');
    if (filterElement) {
      filterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Modal Next / Prev index navigation
  const currentIndex = jerseys.findIndex(j => j.id === activeJersey?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < jerseys.length - 1;

  const handlePrevJersey = () => {
    if (hasPrev) {
      setActiveJersey(jerseys[currentIndex - 1]);
    }
  };

  const handleNextJersey = () => {
    if (hasNext) {
      setActiveJersey(jerseys[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">

      {/* Sticky Header */}
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalJerseys={totalCount}
        onOpenInfo={() => setIsInfoOpen(true)}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Hero Presentation */}
        <HeroBanner
          stats={stats}
          onQuickFilter={handleQuickFilter}
        />

        {/* Catalog Section with Sticky Filter Bar */}
        <div id="catalog-section">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
            selectedEra={selectedEra}
            setSelectedEra={setSelectedEra}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeFiltersCount={activeFiltersCount}
            resetFilters={resetFilters}
            filteredCount={filteredCount}
            totalCount={totalCount}
          />

          {/* Jerseys Gallery Grid */}
          <JerseyGrid
            jerseys={jerseys}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenModal={(jersey) => setActiveJersey(jersey)}
            viewMode={viewMode}
            onResetFilters={resetFilters}
          />
        </div>

      </main>

      {/* Detail Lightbox Modal */}
      {activeJersey && (
        <JerseyModal
          jersey={activeJersey}
          onClose={() => setActiveJersey(null)}
          isFavorite={isFavorite(activeJersey.id)}
          onToggleFavorite={handleToggleFavorite}
          onPrev={handlePrevJersey}
          onNext={handleNextJersey}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}

      {/* Favorites Slide-over Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteJerseys={favoriteJerseys}
        onToggleFavorite={handleToggleFavorite}
        onOpenModal={(jersey) => setActiveJersey(jersey)}
        onClearFavorites={clearFavorites}
      />

      {/* Info About Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      {/* Footer */}
      <Footer onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

    </div>
  );
}
