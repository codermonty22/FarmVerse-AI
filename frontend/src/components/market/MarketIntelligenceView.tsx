import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Scale,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Language, MarketPriceItem } from '../../types';
import { MANDI_PRICES, INDIAN_STATES } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  lang: Language;
}

export const MarketIntelligenceView: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'priceDesc' | 'priceAsc' | 'changeDesc'>('priceDesc');
  const [activeMandi, setActiveMandi] = useState<MarketPriceItem>(MANDI_PRICES[0]);

  // Filter & sort
  const filteredMandis = MANDI_PRICES.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchName =
      item.commodity.toLowerCase().includes(term) ||
      item.mandi.toLowerCase().includes(term) ||
      item.district.toLowerCase().includes(term);
    const matchState = selectedState === 'All' || item.state === selectedState;
    return matchName && matchState;
  }).sort((a, b) => {
    if (sortOption === 'priceDesc') return b.modalPrice - a.modalPrice;
    if (sortOption === 'priceAsc') return a.modalPrice - b.modalPrice;
    if (sortOption === 'changeDesc') return b.changePercent - a.changePercent;
    return 0;
  });

  // Calculate SVG chart coordinates for active mandi
  const prices = activeMandi.historicalPrices.map((p) => p.price);
  const minP = Math.min(...prices) * 0.95;
  const maxP = Math.max(...prices) * 1.05;
  const range = maxP - minP || 1;

  const points = activeMandi.historicalPrices
    .map((p, idx) => {
      const x = (idx / (activeMandi.historicalPrices.length - 1)) * 360 + 20;
      const y = 140 - ((p.price - minP) / range) * 110;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="border-b-2 border-[#202820]/15 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="neo-badge bg-blue-100 text-blue-800 text-[10px] border border-blue-400">
            System Module 06 &bull; Time-Series Mandi Intelligence
          </span>
          <span className="text-xs font-semibold text-neutral-500">
            ARIMA / Prophet Price Trend Forecasting
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
          {t.marketIntelligence} &amp; Mandi Price Radar
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          Track spot auction rates across Indian APMC mandis. Spot favorable selling windows, compare regional price spreads, and monitor arrivals before loading your harvest into transport.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="neo-card p-4 rounded-xl bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            />
          </div>

          {/* State Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            >
              <option value="All">All States (India)</option>
              {Object.keys(INDIAN_STATES).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-3">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            >
              <option value="priceDesc">Price: High to Low</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="changeDesc">Largest Price Jump (%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Trend Chart for Active Selected Mandi */}
      {activeMandi && (
        <div className="neo-card rounded-2xl bg-white p-5 border-3 border-[#245638] shadow-[5px_5px_0px_#245638]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px] font-black">
                  Active Price Chart
                </span>
                <span className="text-xs text-neutral-500 font-semibold">
                  {activeMandi.mandi} ({activeMandi.district}, {activeMandi.state})
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#202820] flex items-center gap-3">
                <span>{activeMandi.commodity}</span>
                <span className="text-[#245638]">₹{activeMandi.modalPrice.toLocaleString()} / Qtl</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Daily Arrivals</span>
                <span className="text-sm font-black text-[#202820]">{activeMandi.dailyArrivalTonnes} Tonnes</span>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg border-2 text-xs font-black flex items-center gap-1 ${
                  activeMandi.trend === 'up'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-600'
                    : 'bg-red-100 text-red-800 border-red-600'
                }`}
              >
                {activeMandi.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>
                  {activeMandi.changePercent > 0 ? `+${activeMandi.changePercent}%` : `${activeMandi.changePercent}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Trend Chart */}
          <div className="py-4">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-500 mb-2">
              <span>15-Day Historical Price Trajectory (₹ / Quintal)</span>
              <span>Outlook: <strong className="text-[#245638] uppercase">{activeMandi.marketOutlook}</strong></span>
            </div>

            <div className="w-full bg-[#F7F5EB] rounded-xl p-3 border-2 border-[#202820] shadow-[2px_2px_0px_#202820]">
              <svg viewBox="0 0 400 160" className="w-full h-44 overflow-visible">
                {/* Horizontal reference grid lines */}
                <line x1="20" y1="30" x2="380" y2="30" stroke="#CBD5C1" strokeDasharray="3 3" />
                <line x1="20" y1="85" x2="380" y2="85" stroke="#CBD5C1" strokeDasharray="3 3" />
                <line x1="20" y1="140" x2="380" y2="140" stroke="#CBD5C1" strokeDasharray="3 3" />

                {/* Shaded Area under curve */}
                <polygon
                  points={`20,140 ${points} 380,140`}
                  fill="#245638"
                  fillOpacity="0.12"
                />

                {/* Polyline */}
                <polyline
                  fill="none"
                  stroke="#245638"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Data Points */}
                {activeMandi.historicalPrices.map((p, idx) => {
                  const x = (idx / (activeMandi.historicalPrices.length - 1)) * 360 + 20;
                  const y = 140 - ((p.price - minP) / range) * 110;
                  return (
                    <g key={idx}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#E8B65C"
                        stroke="#202820"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#202820"
                      >
                        ₹{p.price}
                      </text>
                      <text
                        x={x}
                        y="155"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill="#536353"
                      >
                        {p.date}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100 gap-2">
            <span>Minimum Auction: <strong>₹{activeMandi.minPrice}</strong> | Maximum: <strong>₹{activeMandi.maxPrice}</strong></span>
            {activeMandi.mspPrice && (
              <span className="font-bold text-[#245638]">
                Govt MSP: ₹{activeMandi.mspPrice} / Qtl
              </span>
            )}
            <span className="text-[11px] italic">{activeMandi.lastUpdated}</span>
          </div>
        </div>
      )}

      {/* Mandi Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMandis.map((item) => {
          const isSelected = activeMandi.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveMandi(item);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className={`neo-card rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-3 border-[#245638] bg-[#DDEBD7]/30 shadow-[4px_4px_0px_#245638]'
                  : 'bg-white hover:border-[#245638]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase text-neutral-500 bg-[#F7F5EB] px-2 py-0.5 rounded border border-[#202820]/30">
                    {item.category}
                  </span>
                  <div
                    className={`text-xs font-black flex items-center gap-0.5 ${
                      item.trend === 'up' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {item.trend === 'up' ? '+' : ''}
                    {item.changePercent}%
                  </div>
                </div>

                <h3 className="font-black text-base text-[#202820] line-clamp-1">
                  {item.commodity}
                </h3>
                <p className="text-xs text-neutral-600 font-semibold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#245638]" />
                  <span>
                    {item.mandi}, {item.district}
                  </span>
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Modal Rate
                    </span>
                    <span className="text-lg font-black text-[#245638]">
                      ₹{item.modalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-500"> / Qtl</span>
                  </div>

                  <div className="text-right text-[11px] font-semibold text-neutral-600">
                    <div>Min: ₹{item.minPrice}</div>
                    <div>Max: ₹{item.maxPrice}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-neutral-500">{item.dailyArrivalTonnes}T Arrivals</span>
                <span className="text-xs font-bold text-[#245638] hover:underline">
                  {isSelected ? 'Viewing Chart' : 'Inspect Chart &rarr;'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
