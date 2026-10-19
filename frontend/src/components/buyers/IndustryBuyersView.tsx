import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Phone,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Info,
  ExternalLink,
} from 'lucide-react';
import { IndustryBuyer, Language } from '../../types';
import { INDUSTRY_BUYERS_DATA } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface Props {
  lang: Language;
}

export const IndustryBuyersView: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [inquiryModalBuyer, setInquiryModalBuyer] = useState<IndustryBuyer | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const buyerTypes = [
    'All',
    'Farmer Producer Co (FPO)',
    'Biofuel Plant',
    'Textile Manufacturer',
    'Organic Exporter',
  ];

  const filteredBuyers = INDUSTRY_BUYERS_DATA.filter((buyer) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      buyer.companyName.toLowerCase().includes(term) ||
      buyer.commoditiesWanted.some((c) => c.toLowerCase().includes(term)) ||
      buyer.district.toLowerCase().includes(term);
    const matchType = selectedType === 'All' || buyer.type === selectedType;
    return matchSearch && matchType;
  });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryModalBuyer(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="border-b-2 border-[#202820]/15 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="neo-badge bg-purple-100 text-purple-800 text-[10px] border border-purple-400">
            System Module 07 &bull; Direct Market Linkage
          </span>
          <span className="text-xs font-semibold text-neutral-500">
            Aggregator, FPO &amp; Agribusiness Off-Take Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
          {t.buyersDirectory} &amp; Institutional Off-Takers
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          Connect directly with certified Farmer Producer Companies (FPOs), bio-energy briquette plants, and food processing mills. Bypass commission agents and secure upfront volume contracts.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="neo-card p-4 rounded-xl bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by commodity (e.g. Onion, Cotton, Biofuel, Soybean)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold bg-[#F7F5EB] border-2 border-[#202820] rounded-lg focus:outline-none shadow-[2px_2px_0px_#202820]"
            >
              {buyerTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Organization Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="neo-card rounded-2xl p-5 bg-white flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="neo-badge bg-[#E8B65C] text-[#202820] text-[10px] font-black">
                  {buyer.type}
                </span>
                {buyer.verifiedFPO && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Off-Taker</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-[#202820] leading-snug">
                {buyer.companyName}
              </h3>
              <p className="text-xs text-neutral-600 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#245638]" />
                <span>
                  {buyer.district}, {buyer.state}
                </span>
              </p>

              {/* Commodities Wanted */}
              <div className="mt-3.5 space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-neutral-500 block">
                  Commodities Sourced
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {buyer.commoditiesWanted.map((com, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#DDEBD7] text-[#245638] font-bold rounded text-xs border border-[#245638]/40"
                    >
                      {com}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Minimum Batch Volume
                  </span>
                  <span className="font-black text-[#202820]">{buyer.minVolume}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Settlement Term
                  </span>
                  <span className="font-black text-[#245638]">{buyer.pricingTerm}</span>
                </div>
              </div>
            </div>

            {/* Contact Action */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">
                Desk: {buyer.contactPerson}
              </span>

              <button
                onClick={() => setInquiryModalBuyer(buyer)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#245638] text-white font-bold text-xs rounded hover:bg-[#1b412a] border border-[#202820] shadow-[2px_2px_0px_#202820]"
              >
                <Handshake className="w-3.5 h-3.5 text-[#E8B65C]" />
                <span>Initiate Sourcing Inquiry</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sourcing Inquiry Modal */}
      {inquiryModalBuyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#F7F5EB] border-3 border-[#202820] rounded-xl shadow-[6px_6px_0px_#202820] p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3">
              <div>
                <h3 className="font-black text-base text-[#202820]">
                  Direct Procurement Inquiry
                </h3>
                <p className="text-xs text-[#245638] font-bold">
                  {inquiryModalBuyer.companyName}
                </p>
              </div>
              <button
                onClick={() => setInquiryModalBuyer(null)}
                className="text-xs font-bold px-2 py-1 bg-white border border-[#202820] rounded"
              >
                Close
              </button>
            </div>

            {inquirySent ? (
              <div className="p-6 text-center space-y-2 bg-[#DDEBD7] rounded-xl border-2 border-[#245638]">
                <CheckCircle2 className="w-10 h-10 text-[#245638] mx-auto" />
                <h4 className="font-black text-sm text-[#202820]">Inquiry Dispatched!</h4>
                <p className="text-xs text-neutral-600">
                  The procurement officer has received your lot details. Contact desk:{' '}
                  <strong>{inquiryModalBuyer.phonePlaceholder}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Your Crop / Residue Available
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={inquiryModalBuyer.commoditiesWanted[0]}
                    className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Estimated Quantity (Quintals/Tonnes)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50 Quintals"
                      className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Expected Harvest Ready Date
                    </label>
                    <input
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 bg-white border-2 border-[#202820] rounded-lg font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#245638] text-white font-black rounded-lg hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820]"
                >
                  Submit Lot to Buyer Procurement Desk
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
