import { useState, useMemo, useEffect } from 'react';
import { JERSEYS_DATA } from '../data/jerseys';

const FAVORITES_STORAGE_KEY = 'the_jersey_vault_favorites_v1';

// Helper to remove accents for normalized search
const cleanString = (str) => {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export function useJerseys() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'season-desc', 'season-asc', 'name-asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  // Modal detail state
  const [activeJersey, setActiveJersey] = useState(null);

  // Favorites drawer state
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Favorites stored in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Error reading favorites from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Error saving favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (jerseyId) => {
    setFavorites(prev => {
      if (prev.includes(jerseyId)) {
        return prev.filter(id => id !== jerseyId);
      } else {
        return [...prev, jerseyId];
      }
    });
  };

  const isFavorite = (jerseyId) => favorites.includes(jerseyId);

  const clearFavorites = () => setFavorites([]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLeague('all');
    setSelectedEra('all');
    setSelectedType('all');
    setSelectedBrand('all');
    setSortBy('featured');
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedLeague !== 'all') count++;
    if (selectedEra !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    return count;
  }, [searchQuery, selectedLeague, selectedEra, selectedType, selectedBrand]);

  // Filtered & Sorted jerseys
  const filteredJerseys = useMemo(() => {
    const query = cleanString(searchQuery);

    let result = JERSEYS_DATA.filter((jersey) => {
      // 1. Search Query
      if (query) {
        const matchesName = cleanString(jersey.name).includes(query);
        const matchesTeam = cleanString(jersey.team).includes(query);
        const matchesCountry = cleanString(jersey.country).includes(query);
        const matchesSeason = cleanString(jersey.season).includes(query);
        const matchesBrand = cleanString(jersey.brand).includes(query);
        const matchesPlayer = jersey.player ? cleanString(jersey.player.name).includes(query) : false;
        const matchesTags = jersey.tags?.some(tag => cleanString(tag).includes(query));

        if (!matchesName && !matchesTeam && !matchesCountry && !matchesSeason && !matchesBrand && !matchesPlayer && !matchesTags) {
          return false;
        }
      }

      // 2. League filter
      if (selectedLeague !== 'all' && jersey.league !== selectedLeague) {
        return false;
      }

      // 3. Era filter
      if (selectedEra !== 'all' && jersey.era !== selectedEra) {
        return false;
      }

      // 4. Type filter
      if (selectedType !== 'all' && jersey.type !== selectedType) {
        return false;
      }

      // 5. Brand filter
      if (selectedBrand !== 'all' && jersey.brand !== selectedBrand) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      }
      if (sortBy === 'season-desc') {
        return parseInt(b.season) - parseInt(a.season);
      }
      if (sortBy === 'season-asc') {
        return parseInt(a.season) - parseInt(b.season);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedLeague, selectedEra, selectedType, selectedBrand, sortBy]);

  // Jersey favorites items
  const favoriteJerseys = useMemo(() => {
    return JERSEYS_DATA.filter(j => favorites.includes(j.id));
  }, [favorites]);

  // Summary stats
  const stats = useMemo(() => {
    const total = JERSEYS_DATA.length;
    const inStock = JERSEYS_DATA.filter(j => j.inventory && j.inventory.length > 0).length;
    const legends = JERSEYS_DATA.filter(j => j.player?.isLegend).length;
    const leaguesCount = new Set(JERSEYS_DATA.map(j => j.league)).size;

    return { total, inStock, legends, leaguesCount };
  }, []);

  return {
    jerseys: filteredJerseys,
    totalCount: JERSEYS_DATA.length,
    filteredCount: filteredJerseys.length,
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
  };
}
