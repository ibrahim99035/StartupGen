import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Zap, X } from 'lucide-react';

const StartupIdeaGenerator = () => {
  const [industry, setIndustry] = useState('');
  const [trend, setTrend] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [animation, setAnimation] = useState('');
  const [showIndustrySuggestions, setShowIndustrySuggestions] = useState(false);
  const [showTrendSuggestions, setShowTrendSuggestions] = useState(false);
  const [recentCombinations, setRecentCombinations] = useState([]);
  const industryInputRef = useRef(null);
  const trendInputRef = useRef(null);

  // Sample data for suggestions
  const industryOptions = [
    { name: 'Food', icon: '🍔', description: 'Restaurants, delivery, agriculture' },
    { name: 'Healthcare', icon: '🏥', description: 'Medical services, wellness, biotech' },
    { name: 'Education', icon: '🎓', description: 'Schools, e-learning, training' },
    { name: 'Finance', icon: '💰', description: 'Banking, investments, insurance' },
    { name: 'Transportation', icon: '🚗', description: 'Mobility, logistics, delivery' },
    { name: 'Retail', icon: '🛍️', description: 'E-commerce, stores, marketplaces' },
    { name: 'Real Estate', icon: '🏢', description: 'Property, construction, facilities' },
    { name: 'Entertainment', icon: '🎬', description: 'Media, gaming, events' },
  ];

  const trendOptions = [
    { name: 'AI', icon: '🤖', description: 'Artificial intelligence, machine learning' },
    { name: 'Blockchain', icon: '🔗', description: 'Decentralized systems, cryptocurrency' },
    { name: 'VR', icon: '👓', description: 'Virtual reality, immersive experiences' },
    { name: 'IoT', icon: '📱', description: 'Internet of Things, connected devices' },
    { name: 'Green Energy', icon: '🌱', description: 'Sustainability, renewables' },
    { name: 'No-Code', icon: '🧩', description: 'Visual development, automation' },
    { name: 'Robotics', icon: '🦾', description: 'Automation, mechanical systems' },
    { name: 'Web3', icon: '🌐', description: 'Decentralized web, digital ownership' },
  ];

  // List of pre-generated ideas for different combinations
  const ideaDatabase = {
    'food+ai': [
      {
        name: 'NutriPredict',
        pitch: 'AI-powered meal planning that optimizes your nutrition based on your health data and food preferences.'
      },
      {
        name: 'FlavorGenius',
        pitch: 'Using AI to discover unique flavor combinations that will revolutionize home cooking.'
      }
    ],
    'healthcare+blockchain': [
      {
        name: 'MedLedger',
        pitch: 'Secure, patient-controlled medical records on the blockchain, accessible anywhere in the world.'
      },
      {
        name: 'RxChain',
        pitch: 'Blockchain-based prescription tracking to eliminate fraud and improve medication adherence.'
      }
    ],
    'education+vr': [
      {
        name: 'HistoryDive',
        pitch: 'VR field trips to historical events, making history education immersive and unforgettable.'
      },
      {
        name: 'LabVirtual',
        pitch: 'Virtual reality science labs allowing students to conduct experiments impossible in physical classrooms.'
      }
    ]
  };

  // Function to generate more ideas based on inputs when not in database
  const generateIdea = (industry, trend) => {
    const ideas = [
      {
        name: `${trend.charAt(0).toUpperCase() + trend.slice(1)}${industry.charAt(0).toUpperCase() + industry.slice(1)}`,
        pitch: `Using ${trend} technology to revolutionize how people engage with ${industry.toLowerCase()}.`
      },
      {
        name: `${industry.charAt(0).toUpperCase() + industry.slice(1)}${trend.charAt(0).toUpperCase() + trend.slice(1)}`,
        pitch: `Bringing the power of ${trend.toLowerCase()} to transform the ${industry.toLowerCase()} industry forever.`
      },
      {
        name: `${industry.charAt(0).toUpperCase()}${trend.charAt(0).toUpperCase()}Fusion`,
        pitch: `The first platform to seamlessly integrate ${trend.toLowerCase()} solutions into everyday ${industry.toLowerCase()} problems.`
      }
    ];
    
    return ideas[Math.floor(Math.random() * ideas.length)];
  };

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (industryInputRef.current && !industryInputRef.current.contains(event.target)) {
        setShowIndustrySuggestions(false);
      }
      if (trendInputRef.current && !trendInputRef.current.contains(event.target)) {
        setShowTrendSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate random selection indication
  const getRandomSuggestion = (options) => {
    return options[Math.floor(Math.random() * options.length)].name;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!industry || !trend) return;
    
    setIsLoading(true);
    setShowResult(false);
    setAnimation('animate-pulse');
    
    // Simulate API call with timeout and animated steps
    setTimeout(() => {
      const key = `${industry.toLowerCase()}+${trend.toLowerCase()}`;
      let idea;
      
      if (ideaDatabase[key]) {
        idea = ideaDatabase[key][Math.floor(Math.random() * ideaDatabase[key].length)];
      } else {
        idea = generateIdea(industry, trend);
      }
      
      setResult(idea);
      setIsLoading(false);
      setAnimation('animate-bounce');
      
      setTimeout(() => {
        setShowResult(true);
        setAnimation('');
        
        // Add to recent combinations
        setRecentCombinations(prev => {
          const newCombos = [{
            industry,
            trend,
            name: idea.name
          }, ...prev.slice(0, 2)];
          return newCombos;
        });
      }, 500);
    }, 1500);
  };

  const selectIndustry = (value) => {
    setIndustry(value);
    setShowIndustrySuggestions(false);
  };

  const selectTrend = (value) => {
    setTrend(value);
    setShowTrendSuggestions(false);
  };

  const handleResetFields = () => {
    setIndustry('');
    setTrend('');
    setResult(null);
    setShowResult(false);
  };

  const handleUseCombination = (combo) => {
    setIndustry(combo.industry);
    setTrend(combo.trend);
  };

  // Filter options based on input
  const filteredIndustries = industry 
    ? industryOptions.filter(option => option.name.toLowerCase().includes(industry.toLowerCase()))
    : industryOptions;
    
  const filteredTrends = trend
    ? trendOptions.filter(option => option.name.toLowerCase().includes(trend.toLowerCase()))
    : trendOptions;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <Lightbulb color="white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-blue-600">
            Idea Generator
          </h1>
        </div>
        
        {recentCombinations.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-500 mb-2">RECENT COMBINATIONS</p>
            <div className="flex flex-wrap gap-2">
              {recentCombinations.map((combo, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleUseCombination(combo)}
                  className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                >
                  {combo.industry} + {combo.trend}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Industry Field */}
          <div className="relative" ref={industryInputRef}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Industry
              <div className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">required</div>
            </label>
            <div className="relative">
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                onFocus={() => setShowIndustrySuggestions(true)}
                className={`block w-full rounded-lg border ${industry ? 'border-blue-500' : 'border-gray-300'} px-4 py-3 focus:outline-none focus:border-blue-500 pr-10`}
                placeholder="What industry?"
                required
              />
              {industry && (
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setIndustry('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Industry Suggestions */}
            {showIndustrySuggestions && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <div className="sticky top-0 bg-gray-50 px-3 py-2 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500">SELECT AN INDUSTRY OR TYPE YOUR OWN</p>
                </div>
                <div className="p-1">
                  {filteredIndustries.map((option, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center p-2 hover:bg-blue-50 rounded-md cursor-pointer"
                      onClick={() => selectIndustry(option.name)}
                    >
                      <div className="text-xl mr-3">{option.icon}</div>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  ))}
                  {filteredIndustries.length === 0 && (
                    <div className="p-3 text-sm text-gray-500 text-center">No matches. Continue typing to create a custom industry.</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Trend Field */}
          <div className="relative" ref={trendInputRef}>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Trend
              <div className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">required</div>
            </label>
            <div className="relative">
              <input
                type="text"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
                onFocus={() => setShowTrendSuggestions(true)}
                className={`block w-full rounded-lg border ${trend ? 'border-purple-500' : 'border-gray-300'} px-4 py-3 focus:outline-none focus:border-purple-500 pr-10`}
                placeholder="What trend?"
                required
              />
              {trend && (
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setTrend('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Trend Suggestions */}
            {showTrendSuggestions && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <div className="sticky top-0 bg-gray-50 px-3 py-2 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500">SELECT A TREND OR TYPE YOUR OWN</p>
                </div>
                <div className="p-1">
                  {filteredTrends.map((option, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center p-2 hover:bg-purple-50 rounded-md cursor-pointer"
                      onClick={() => selectTrend(option.name)}
                    >
                      <div className="text-xl mr-3">{option.icon}</div>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  ))}
                  {filteredTrends.length === 0 && (
                    <div className="p-3 text-sm text-gray-500 text-center">No matches. Continue typing to create a custom trend.</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading || !industry || !trend}
              className={`flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-70 ${animation}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="mr-2" size={18} />
                  Generate Idea
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleResetFields}
              className="p-3 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>
        </form>
        
        {/* Idea suggestion if fields aren't filled */}
        {!industry && !trend && !result && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-center text-blue-800">
              Try <span className="font-medium">{getRandomSuggestion(industryOptions)}</span> + <span className="font-medium">{getRandomSuggestion(trendOptions)}</span> to get started!
            </p>
          </div>
        )}
        
        {/* Result Display */}
        {result && (
          <div className={`mt-8 rounded-lg overflow-hidden transition-all duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-blue-600 p-1">
              <div className="bg-white p-5 rounded-b-lg border-t-4 border-purple-600">
                <div className="font-bold text-2xl mb-3 text-center text-blue-600">
                  {result.name}
                </div>
                <div className="text-center text-gray-700 italic">"{result.pitch}"</div>
                
                <div className="flex justify-center mt-4 space-x-3">
                  <button 
                    onClick={handleResetFields}
                    className="px-4 py-2 bg-purple-100 rounded-md text-purple-700 text-sm hover:bg-purple-200"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-center text-gray-500">
        <p>Combine any industry with emerging trends to discover your next big startup idea</p>
      </div>
    </div>
  );
};

export default StartupIdeaGenerator;