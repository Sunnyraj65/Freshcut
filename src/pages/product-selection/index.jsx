import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import api from 'utils/api';

import Header from 'components/ui/Header';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import CartStatusIndicator from 'components/ui/CartStatusIndicator';
import AnimalPreview from './components/AnimalPreview';
import StockIndicator from './components/StockIndicator';

const ProductSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('chicken');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  // New: support selecting multiple animals
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  

  // Fetch live products from API
  const [inventoryData, setInventoryData] = useState({
    chicken: {
      '1.2kg': { available: 15, status: 'available', animals: [] },
      '1.4kg': { available: 8, status: 'limited', animals: [] },
      '1.6kg': { available: 12, status: 'available', animals: [] },
      '1.8kg': { available: 3, status: 'limited', animals: [] },
      '2.0kg': { available: 0, status: 'out-of-stock', animals: [] }
    },
    fish: {
      '1.2kg': { available: 6, status: 'limited', animals: [] },
      '1.4kg': { available: 10, status: 'available', animals: [] },
      '1.6kg': { available: 14, status: 'available', animals: [] },
      '1.8kg': { available: 7, status: 'available', animals: [] },
      '2.0kg': { available: 2, status: 'limited', animals: [] }
    }
  });

  // Initialize category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['chicken', 'fish'].includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Fetch products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/products?status=live');
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Simulate real-time inventory updates (still keep mock for demo if no API)
  useEffect(() => {
    const interval = setInterval(() => {
      setInventoryData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(category => {
          Object.keys(newData[category]).forEach(weight => {
            const current = newData[category][weight];
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newAvailable = Math.max(0, Math.min(20, current.available + change));
            
            newData[category][weight] = {
              ...current,
              available: newAvailable,
              status: newAvailable === 0 ? 'out-of-stock' : 
                     newAvailable <= 5 ? 'limited' : 'available'
            };
          });
        });
        return newData;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const generateMockAnimals = (category, weight) => {
    const count = inventoryData[category][weight].available;
    const animals = [];
    
    for (let i = 0; i < Math.min(count, 6); i++) {
      const baseWeight = parseFloat(weight);
      const actualWeight = baseWeight + (Math.random() * 0.2 - 0.1);
      
      animals.push({
        id: `${category}-${weight}-${i + 1}`,
        category,
        targetWeight: weight,
        actualWeight: actualWeight.toFixed(2),
        image: category === 'chicken' 
          ? `https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400`
          : `https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400`,
        video: category === 'chicken'
          ? `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`
          : `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_2mb.mp4`,
        freshness: `Harvested ${Math.floor(Math.random() * 6) + 1} hours ago`,
        farmSource: `Farm ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
        quality: ['Premium', 'Grade A', 'Fresh'][Math.floor(Math.random() * 3)],
        isSelected: false
      });
    }
    
    return animals;
  };

  

  // Auto-populate animals for each weight when category changes (simulating live inventory fetch)
  useEffect(() => {
    setIsLoading(true);
    setInventoryData(prev => {
      const newData = { ...prev };
      Object.keys(newData[selectedCategory]).forEach(weight => {
        if (!newData[selectedCategory][weight].animals || newData[selectedCategory][weight].animals.length === 0) {
          newData[selectedCategory][weight].animals = generateMockAnimals(selectedCategory, weight);
        }
      });
      return newData;
    });
    // small delay to mimic network latency
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedAnimal(null);
    setSelectedAnimals([]);
    
    navigate(`/product-selection?category=${category}`, { replace: true });
  };

  const handleAnimalSelect = (animal) => {
    // Toggle selection while respecting max 5 items
    setSelectedAnimals(prev => {
      const exists = prev.find(a => a.id === animal.id);
      if (exists) {
        return prev.filter(a => a.id !== animal.id);
      }
      if (prev.length >= 5) {
        return prev; // Max reached
      }
      return [...prev, animal];
    });
    setSelectedAnimal(animal); // keep last clicked as reference
  };

  const handleContinue = () => {
    if (selectedAnimals.length > 0) {
      navigate('/customization-cutting-options', {
        state: {
          selectedAnimals,
          category: selectedCategory
        }
      });
    }
  };

  // Collect all animals for the selected category
  

  const allAnimals = products
    .filter(p => p.category?.name?.toLowerCase() === selectedCategory)
    .map(p => {
      const images = (() => {
        try {
          return JSON.parse(p.images || '[]');
        } catch {
          return [];
        }
      })();
      return {
        id: p.id,
        category: p.category.name.toLowerCase(),
        targetWeight: p.targetWeight + 'kg',
        actualWeight: p.actualWeight.toFixed(2),
        image: images[0] || (p.category.name.toLowerCase() === 'chicken'
          ? 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400'
          : 'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400'),
        video: p.videoUrl || '',
        freshness: 'Just added',
        farmSource: p.farm || 'Farm',
        quality: p.grade || 'Premium'
      };
    });
  if (selectedCategory) {
    Object.keys(inventoryData[selectedCategory]).forEach(weight => {
      const weightData = inventoryData[selectedCategory][weight];
      allAnimals.push(...weightData.animals);
    });
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <ProgressIndicator />
      
      <main className="pt-16">
        {/* Breadcrumb & Back Navigation */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/homepage"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-100 text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth touch-target"
                >
                  <Icon name="ArrowLeft" size={20} />
                </Link>
                <div>
                  <nav className="flex items-center space-x-2 text-sm font-caption">
                    <Link to="/homepage" className="text-text-secondary hover:text-primary transition-smooth">
                      Home
                    </Link>
                    <Icon name="ChevronRight" size={14} className="text-text-tertiary" />
                    <span className="text-primary font-medium">
                      Select {selectedCategory === 'chicken' ? 'Chicken' : 'Fish'}
                    </span>
                  </nav>
                  <h1 className="text-2xl font-heading font-semibold text-text-primary mt-1">
                    Choose Your {selectedCategory === 'chicken' ? 'Chicken' : 'Fish'}
                  </h1>
                </div>
              </div>
              
              <StockIndicator 
                category={selectedCategory}
                totalStock={allAnimals.length}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selection Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category Selection */}
              <div className="card p-6">
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Select Category
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'chicken', label: 'Chicken', icon: 'Bird', color: 'primary' },
                    { id: 'fish', label: 'Fish', icon: 'Fish', color: 'secondary' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-smooth touch-target ${
                        selectedCategory === category.id
                          ? `border-${category.color} bg-${category.color}-50 text-${category.color}`
                          : 'border-border bg-white text-text-secondary hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name={category.icon} size={24} />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>



            </div>

            {/* Animal Preview Panel */}
            <div className="lg:col-span-2">
              <AnimalPreview
                selectedWeight={''}
                stockStatus={'available'}
                selectedCategory={selectedCategory}
                animals={allAnimals}
                selectedAnimals={selectedAnimals}
                onAnimalSelect={handleAnimalSelect}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-large z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="hidden lg:block">
                {selectedAnimals.length > 0 && (
                  <div className="text-sm text-text-secondary">
                    {selectedAnimals.length} Selected: <span className="font-medium text-text-primary">
                      {selectedAnimals.map(a => a.actualWeight + 'kg').join(', ')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <Link
                  to="/homepage"
                  className="flex-1 lg:flex-none px-6 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface-100 text-center"
                >
                  Back to Shop
                </Link>
                <button
                  onClick={handleContinue}
                  disabled={selectedAnimals.length === 0}
                  className={`flex-1 lg:flex-none px-6 py-3 rounded-lg font-medium transition-smooth ${
                    selectedAnimals.length > 0
                      ? 'bg-primary text-white hover:scale-105 hover:shadow-lg'
                      : 'bg-surface-200 text-text-tertiary cursor-not-allowed'
                  }`}
                >
                  Continue to Customization
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartStatusIndicator />
    </div>
  );
};

export default ProductSelection;