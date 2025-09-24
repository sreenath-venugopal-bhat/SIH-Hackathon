import React, { useState, useEffect, useRef } from 'react';
import bin1 from "../assets/bin1.png";
import bin2 from "../assets/bin2.png";
import bin3 from "../assets/bin3.png";

// Import your background images - replace these with your actual image paths
import bg1 from "../assets/bg2.jpg";
import bg2 from "../assets/bg3.jpg";
import bg3 from "../assets/bg4.jpg";

const WasteManagementAwareness = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = [
    {
      title: "Waste Crisis in India",
      subtitle: "Understanding the Scale",
      bgImage: bg1,
      textColor: "text-white",
      overlayColor: "bg-black/60",
      content: {
        main: "62 Million Tons",
        sub: "of municipal solid waste generated annually",
        description: "India's urban population generates this massive amount of waste, with only 75% being collected and mere 22% processed properly."
      },
      binImage: bin1
    },
    {
      title: "Environmental Impact",
      subtitle: "The Consequences of Poor Waste Management",
      bgImage: bg3,
      textColor: "text-white",
      overlayColor: "bg-blue-900/50",
      content: {
        main: "3.4 Million Tons",
        sub: "of plastic waste contaminating oceans yearly",
        description: "Improper waste disposal leads to soil degradation, water pollution, air contamination, and greenhouse gas emissions affecting climate change."
      },
      binImage: bin2
    },
    {
      title: "Segregation Matters",
      subtitle: "The Foundation of Effective Waste Management",
      bgImage: bg2,
      textColor: "text-white",
      overlayColor: "bg-green-800/50",
      content: {
        main: "60% Reduction",
        sub: "in landfill waste through proper segregation",
        description: "Separating wet, dry, and hazardous waste at source increases recycling rates and reduces environmental burden significantly."
      },
      binImage: bin3
    },
    {
      title: "Circular Economy",
      subtitle: "From Waste to Resource",
      bgImage: bg1,
      textColor: "text-gray-800",
      overlayColor: "bg-white/30",
      content: {
        main: "90% Potential",
        sub: "of waste can be recycled or composted",
        description: "Adopting circular economy principles transforms waste into valuable resources, creating economic opportunities while protecting the environment."
      },
      binImage: bin1
    },
    {
      title: "Take Action Now",
      subtitle: "Your Role in Waste Management",
      bgImage: bg2,
      textColor: "text-gray-800",
      overlayColor: "bg-blue-200/40",
      content: {
        main: "Start Small",
        sub: "Big changes begin with individual actions",
        description: "Every segregated waste item and reduced plastic usage contributes to a larger solution for sustainable waste management."
      },
      binImage: bin2
    },
    {
      title: "Waste Segregation Game",
      subtitle: "Test Your Knowledge",
      bgImage: bg1,
      textColor: "text-[#0F5257]",
      overlayColor: "bg-[#F2F5EA]/90",
      content: {
        main: "Sort It Right!",
        sub: "Drag items to the correct bins",
        description: "Practice waste segregation by sorting different items into the appropriate waste categories."
      },
      binImage: bin3
    }
  ];

  // Waste items for the game
  const wasteItems = [
    { id: 1, name: "Apple Core", type: "wet", image: "🍎" },
    { id: 2, name: "Plastic Bottle", type: "dry", image: "🧴" },
    { id: 3, name: "Battery", type: "hazardous", image: "🔋" },
    { id: 4, name: "Newspaper", type: "dry", image: "📰" },
    { id: 5, name: "Banana Peel", type: "wet", image: "🍌" },
    { id: 6, name: "Medicine", type: "hazardous", image: "💊" },
    { id: 7, name: "Glass Jar", type: "dry", image: "🍯" },
    { id: 8, name: "Coffee Grounds", type: "wet", image: "☕" },
    { id: 9, name: "Phone", type: "hazardous", image: "📱" },
    { id: 10, name: "Cardboard", type: "dry", image: "📦" }
  ];

  // Initialize available items when game starts
  useEffect(() => {
    if (gameStarted && !gameOver) {
      setAvailableItems([...wasteItems]);
      setSortedItems([]);
    }
  }, [gameStarted, gameOver]);

  // Check if all items are sorted
  useEffect(() => {
    if (gameStarted && !gameOver && availableItems.length === 0 && wasteItems.length > 0) {
      // All items sorted - end game with success
      setGameOver(true);
    }
  }, [availableItems.length, gameStarted, gameOver]);

  // Game functions
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setAvailableItems([...wasteItems]);
    setSortedItems([]);
  };

  const handleItemDrop = (item, binType) => {
    if (!gameStarted || gameOver) return;
    
    const isCorrect = item.type === binType;
    
    if (isCorrect) {
      setScore(score + 10);
    } else {
      setScore(score - 5);
    }
    
    // Remove the specific dragged item from available items
    const newAvailableItems = availableItems.filter(availableItem => availableItem.id !== item.id);
    setAvailableItems(newAvailableItems);
    
    // Add to sorted items for results display
    setSortedItems(prev => [...prev, { ...item, correct: isCorrect }]);
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [gameStarted, gameOver, timeLeft]);

  // Handle scroll navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      
      if (newSection !== activeSection) {
        setActiveSection(newSection);
        sectionsRef.current[newSection]?.scrollIntoView({
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => setIsScrolling(false), 1000);
    };

    const handleKeyDown = (e) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsScrolling(true);
        
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const newSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
        
        if (newSection !== activeSection) {
          setActiveSection(newSection);
          sectionsRef.current[newSection]?.scrollIntoView({
            behavior: 'smooth'
          });
        }
        
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    // Intersection Observer for active section detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: isMobile ? '-30% 0px -30% 0px' : '-50% 0px -50% 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [activeSection, isScrolling, sections.length, isMobile]);

  // Navigation dots - Hidden on mobile
  const NavigationDots = () => (
    !isMobile && (
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3 md:space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSection(index);
              sectionsRef.current[index]?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'bg-[#0F5257] scale-125'
                : 'bg-[#0F5257] bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    )
  );

  // Waste bin component - Hidden on mobile and section 6
  const WasteBin = () => (
    !isMobile && activeSection !== 5 && (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
        <div className="w-16 h-20 md:w-20 md:h-24 flex items-center justify-center mb-2">
          <img 
            src={sections[activeSection].binImage} 
            alt="Waste Bin" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    )
  );

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, binType) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('application/json'));
    handleItemDrop(item, binType);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  // Calculate game results
  const calculateResults = () => {
    const correctItems = sortedItems.filter(item => item.correct).length;
    const wrongItems = sortedItems.filter(item => !item.correct).length;
    const totalItems = wasteItems.length;
    const accuracy = totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 0;
    
    return { correctItems, wrongItems, totalItems, accuracy };
  };

  // Game component for section 6
  const WasteSegregationGame = () => {
    const results = calculateResults();
    
    return (
      <div className={`w-full max-w-7xl mx-auto px-2 sm:px-4 transition-all duration-1000 delay-300 transform ${
        activeSection === 5 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Game Info */}
        <div className="bg-[#0F5257] rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border-2 border-[#669D31] shadow-lg">
          <div className="grid grid-cols-3 gap-3 md:gap-6 text-center">
            <div>
              <h3 className="text-sm md:text-xl font-semibold text-[#F2F5EA] mb-1 md:mb-2">Time Left</h3>
              <div className="text-xl md:text-3xl font-bold text-[#5BC0EB]">{timeLeft}s</div>
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-semibold text-[#F2F5EA] mb-1 md:mb-2">Score</h3>
              <div className="text-xl md:text-3xl font-bold text-[#669D31]">{score}</div>
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-semibold text-[#F2F5EA] mb-1 md:mb-2">Status</h3>
              <div className="text-sm md:text-xl font-bold">
                {!gameStarted ? (
                  <span className="text-[#5BC0EB]">Ready</span>
                ) : gameOver ? (
                  <span className="text-[#669D31]">Game Over!</span>
                ) : (
                  <span className="text-[#5BC0EB]">Playing...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        {!gameStarted || gameOver ? (
          <div className="text-center mb-4 md:mb-6">
            <button
              onClick={startGame}
              className="bg-[#669D31] hover:bg-[#5BC0EB] text-[#F2F5EA] font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        ) : null}

        {/* Results Display */}
        {gameOver && (
          <div className="bg-[#0F5257] rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border-2 border-[#669D31] shadow-lg">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-3xl font-bold text-[#5BC0EB] mb-2">
                {availableItems.length === 0 ? "🎉 Congratulations! 🎉" : "⏰ Time's Up!"}
              </h2>
              <p className="text-[#F2F5EA] text-sm md:text-lg">
                {availableItems.length === 0 
                  ? "You sorted all items correctly!" 
                  : "Time's up! Let's see how you did."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
              <div className="bg-[#669D31]/30 rounded-lg md:rounded-xl p-2 md:p-4 border border-[#669D31]">
                <div className="text-lg md:text-2xl font-bold text-[#669D31]">{results.correctItems}</div>
                <div className="text-[#F2F5EA] text-xs md:text-sm">Correct</div>
              </div>
              <div className="bg-[#5BC0EB]/30 rounded-lg md:rounded-xl p-2 md:p-4 border border-[#5BC0EB]">
                <div className="text-lg md:text-2xl font-bold text-[#5BC0EB]">{results.wrongItems}</div>
                <div className="text-[#F2F5EA] text-xs md:text-sm">Wrong</div>
              </div>
              <div className="bg-[#0F5257] rounded-lg md:rounded-xl p-2 md:p-4 border border-[#669D31]">
                <div className="text-lg md:text-2xl font-bold text-[#F2F5EA]">{results.totalItems}</div>
                <div className="text-[#F2F5EA] text-xs md:text-sm">Total Items</div>
              </div>
              <div className="bg-[#5BC0EB]/20 rounded-lg md:rounded-xl p-2 md:p-4 border border-[#5BC0EB]">
                <div className="text-lg md:text-2xl font-bold text-[#5BC0EB]">{results.accuracy}%</div>
                <div className="text-[#F2F5EA] text-xs md:text-sm">Accuracy</div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6 text-center">
              <div className="text-lg md:text-2xl font-bold text-[#F2F5EA] mb-2">Final Score: <span className="text-[#669D31]">{score}</span></div>
              <div className="text-[#F2F5EA] text-sm md:text-base">
                {results.accuracy === 100 ? "Perfect score! You're a waste segregation expert! 🌟" :
                 results.accuracy >= 80 ? "Great job! You know your waste categories well! 👍" :
                 results.accuracy >= 60 ? "Good effort! Keep practicing to improve! 💪" :
                 "Keep learning about waste segregation - you'll get better! 📚"}
              </div>
            </div>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && !gameOver && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Waste Items */}
            <div className="lg:col-span-1">
              <h3 className="text-lg md:text-2xl font-semibold text-[#0F5257] mb-2 md:mb-4 text-center">Waste Items</h3>
              <div className="grid grid-cols-2 gap-2 md:gap-3 max-h-64 md:max-h-96 overflow-y-auto p-1 md:p-2">
                {availableItems.length > 0 ? (
                  availableItems.map((item) => (
                    <div
                      key={item.id}
                      draggable={!isMobile}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onTouchStart={(e) => handleTouchStart(e, item)}
                      className="bg-[#F2F5EA] rounded-lg md:rounded-xl p-2 md:p-3 text-center cursor-grab active:cursor-grabbing border-2 border-dashed border-[#0F5257] hover:bg-[#5BC0EB]/20 transition-all duration-200 shadow-md"
                    >
                      <div className="text-2xl md:text-3xl mb-1">{item.image}</div>
                      <div className="text-[#0F5257] font-semibold text-xs md:text-xs">{item.name}</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-[#0F5257] py-4 md:py-8">
                    <div className="text-3xl md:text-4xl mb-2">🎉</div>
                    <p className="font-semibold text-sm md:text-base">All items sorted!</p>
                    <p className="text-xs md:text-sm">Calculating results...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bins Area */}
            <div className="lg:col-span-3">
              <h3 className="text-lg md:text-2xl font-semibold text-[#0F5257] mb-2 md:mb-4 text-center">Sorting Bins</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Wet Waste Bin */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'wet')}
                  className="bg-[#669D31]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border-4 border-dashed border-[#669D31] hover:border-[#669D31] hover:bg-[#669D31]/30 transition-all duration-300 min-h-[120px] md:min-h-[180px] flex flex-col items-center justify-center shadow-lg"
                >
                  <div className="text-3xl md:text-5xl mb-2 md:mb-3">🍃</div>
                  <h4 className="text-base md:text-lg font-bold text-[#0F5257] mb-1">Wet Waste</h4>
                  <p className="text-[#0F5257] text-center text-xs">Food scraps, vegetable peels, garden waste</p>
                </div>

                {/* Dry Waste Bin */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'dry')}
                  className="bg-[#5BC0EB]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border-4 border-dashed border-[#5BC0EB] hover:border-[#5BC0EB] hover:bg-[#5BC0EB]/30 transition-all duration-300 min-h-[120px] md:min-h-[180px] flex flex-col items-center justify-center shadow-lg"
                >
                  <div className="text-3xl md:text-5xl mb-2 md:mb-3">📦</div>
                  <h4 className="text-base md:text-lg font-bold text-[#0F5257] mb-1">Dry Waste</h4>
                  <p className="text-[#0F5257] text-center text-xs">Plastic, paper, metal, glass</p>
                </div>

                {/* Hazardous Waste Bin */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'hazardous')}
                  className="bg-[#0F5257]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border-4 border-dashed border-[#0F5257] hover:border-[#0F5257] hover:bg-[#0F5257]/30 transition-all duration-300 min-h-[120px] md:min-h-[180px] flex flex-col items-center justify-center shadow-lg"
                >
                  <div className="text-3xl md:text-5xl mb-2 md:mb-3">⚠️</div>
                  <h4 className="text-base md:text-lg font-bold text-[#0F5257] mb-1">Hazardous</h4>
                  <p className="text-[#0F5257] text-center text-xs">Batteries, medicines, e-waste</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Instructions */}
        {!gameStarted && (
          <div className="bg-[#0F5257] rounded-xl md:rounded-2xl p-4 md:p-6 mt-4 md:mt-6 border-2 border-[#669D31] shadow-lg">
            <h3 className="text-lg md:text-2xl font-semibold text-[#F2F5EA] mb-3 md:mb-4 text-center">How to Play</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-[#F2F5EA]">
              <div>
                <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2 text-[#669D31]">Objective</h4>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li>• Drag waste items to the correct bins</li>
                  <li>• Sort all {wasteItems.length} items within 60 seconds</li>
                  <li>• Earn 10 points for correct sorting</li>
                  <li>• Lose 5 points for wrong sorting</li>
                  <li>• Game ends when all items are sorted or time runs out</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2 text-[#5BC0EB]">Tips</h4>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li>• Wet waste: Organic, biodegradable items</li>
                  <li>• Dry waste: Recyclable materials</li>
                  <li>• Hazardous: Dangerous or toxic items</li>
                  <li>• Think before you drag!</li>
                  <li>• Sort quickly but accurately!</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F5257] via-[#669D31] to-[#5BC0EB]"></div>
        
        {/* Floating particles animation - Reduced on mobile */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-[#F2F5EA] rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        {/* Animated wave patterns */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-[#669D31]/20 to-transparent animate-wave"></div>
        <div className="absolute top-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-b from-[#5BC0EB]/20 to-transparent animate-wave-reverse"></div>

        {/* Pulsing circles - Reduced intensity on mobile */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-[#669D31]/10 md:bg-[#669D31]/20 rounded-full blur-xl md:blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-[#5BC0EB]/10 md:bg-[#5BC0EB]/20 rounded-full blur-xl md:blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 md:w-48 md:h-48 bg-[#0F5257]/10 md:bg-[#0F5257]/15 rounded-full blur-lg md:blur-2xl animate-pulse-delayed"></div>
      </div>

      <NavigationDots />
      <WasteBin />

      {/* Main sections */}
      <div className="relative z-10 h-full">
        {sections.map((section, index) => (
          <section
            key={index}
            ref={el => sectionsRef.current[index] = el}
            className="h-screen w-full flex items-center justify-center p-2 sm:p-4 transition-all duration-1000 relative overflow-y-auto"
            style={{
              backgroundImage: index !== 5 ? `url(${section.bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: index === 5 ? 'scroll' : 'fixed'
            }}
          >
            {/* Overlay for better text readability - Only for non-game sections */}
            {index !== 5 && <div className={`absolute inset-0 ${section.overlayColor}`}></div>}
            
            <div className={`w-full max-w-7xl mx-auto text-center relative z-10 ${
              index === 5 ? 'flex flex-col justify-center h-full py-4 md:py-8' : ''
            }`}>
              {index !== 5 ? (
                <div className={`mb-4 md:mb-8 transition-all duration-1000 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 ${section.textColor}`}>
                    {section.content.main}
                  </h1>
                  <h2 className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-6 ${section.textColor} opacity-90`}>
                    {section.content.sub}
                  </h2>
                  <p className={`text-xs sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto ${section.textColor} opacity-80 px-2`}>
                    {section.content.description}
                  </p>
                </div>
              ) : (
                <WasteSegregationGame />
              )}

              {/* Section 1: Waste Crisis Facts */}
              {index === 0 && (
                <div className={`mt-6 md:mt-12 transition-all duration-1000 delay-300 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
                    {[
                      { stat: "1.3kg", desc: "Waste generated per person daily in urban India" },
                      { stat: "80%", desc: "Increase in waste generation expected by 2030" },
                      { stat: "15,000", desc: "Tons of waste remain uncollected daily across cities" }
                    ].map((item, i) => (
                      <div key={i} className="bg-transparent rounded-xl md:rounded-2xl p-3 md:p-6 backdrop-blur-sm border border-white border-opacity-30
                        hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
                        <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-white">{item.stat}</h3>
                        <p className="text-xs md:text-sm text-white opacity-90">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: Environmental Impact Details */}
              {index === 1 && (
                <div className={`mt-6 md:mt-12 transition-all duration-1000 delay-300 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Health Impacts</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Respiratory diseases from burning waste</li>
                        <li>• Waterborne diseases from contaminated water sources</li>
                        <li>• Soil contamination affecting food safety</li>
                        <li>• Vector-borne diseases from accumulated waste</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Ecological Damage</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Marine life endangered by plastic pollution</li>
                        <li>• Soil fertility reduction from chemical leaching</li>
                        <li>• Groundwater contamination from landfill leachate</li>
                        <li>• Biodiversity loss in affected ecosystems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Segregation Guidelines */}
              {index === 2 && (
                <div className={`mt-6 md:mt-12 transition-all duration-1000 delay-300 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                    {[
                      { 
                        type: "Wet Waste", 
                        items: ["Food scraps", "Vegetable peels", "Garden waste", "Tea leaves"]
                      },
                      { 
                        type: "Dry Waste", 
                        items: ["Plastic", "Paper", "Metal", "Glass"]
                      },
                      { 
                        type: "Hazardous Waste", 
                        items: ["Batteries", "Medicines", "E-waste", "Chemicals"]
                      }
                    ].map((category, i) => (
                      <div key={i} className="bg-transparent rounded-xl md:rounded-2xl p-3 md:p-6 backdrop-blur-sm border border-white border-opacity-30
                        hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
                        <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-white">{category.type}</h3>
                        <ul className="space-y-1 md:space-y-2 text-left text-white opacity-90 text-sm md:text-base">
                          {category.items.map((item, j) => (
                            <li key={j} className="hover:opacity-100 transition-opacity duration-200">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Circular Economy Benefits */}
              {index === 3 && (
                <div className={`mt-6 md:mt-12 transition-all duration-1000 delay-300 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Economic Benefits</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Creation of green jobs in recycling sector</li>
                        <li>• Reduced raw material costs through recycling</li>
                        <li>• Energy savings from waste-to-energy plants</li>
                        <li>• New business opportunities in upcycling</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Environmental Benefits</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Reduced landfill space requirement</li>
                        <li>• Lower greenhouse gas emissions</li>
                        <li>• Conservation of natural resources</li>
                        <li>• Reduced pollution and ecological damage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5: Actionable Steps */}
              {index === 4 && (
                <div className={`mt-6 md:mt-12 transition-all duration-1000 delay-300 transform ${
                  activeSection === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Immediate Actions</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Start segregating waste at home today</li>
                        <li>• Carry reusable bags and containers</li>
                        <li>• Compost kitchen waste</li>
                        <li>• Avoid single-use plastics</li>
                        <li>• Educate family and friends</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 ${section.textColor}`}>Long-term Commitments</h3>
                      <ul className={`space-y-1 md:space-y-3 ${section.textColor} opacity-90 text-sm md:text-base`}>
                        <li>• Support local recycling initiatives</li>
                        <li>• Participate in community clean-ups</li>
                        <li>• Advocate for better waste policies</li>
                        <li>• Choose products with minimal packaging</li>
                        <li>• Spread awareness in your community</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Scroll indicator - Hide for section 6 and mobile */}
      {!isMobile && activeSection !== 5 && (
        <div className="fixed bottom-16 md:bottom-20 right-4 md:right-8 z-50 flex items-center space-x-2 text-white text-opacity-70">
          <span className="text-xs md:text-sm">Scroll to explore</span>
          <div className="animate-bounce">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      {/* Mobile navigation buttons */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
          <button
            onClick={() => {
              const newSection = Math.max(0, activeSection - 1);
              setActiveSection(newSection);
              sectionsRef.current[newSection]?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={activeSection === 0}
            className="bg-[#0F5257] text-white p-3 rounded-full shadow-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => {
              const newSection = Math.min(sections.length - 1, activeSection + 1);
              setActiveSection(newSection);
              sectionsRef.current[newSection]?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={activeSection === sections.length - 1}
            className="bg-[#0F5257] text-white p-3 rounded-full shadow-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Add custom animations to tailwind config via style tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.08); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-wave { animation: wave 8s ease-in-out infinite; }
        .animate-wave-reverse { animation: wave 10s ease-in-out infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
        .animate-pulse-delayed { animation: pulse-delayed 15s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default WasteManagementAwareness;