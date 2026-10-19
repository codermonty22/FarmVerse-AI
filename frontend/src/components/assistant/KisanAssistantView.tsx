import React, { useState, useRef, useEffect } from 'react';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  ArrowRight,
  User,
  RotateCcw,
  Languages,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { AssistantMessage, FarmerProfile, Language } from '../../types';
import { INITIAL_ASSISTANT_SUGGESTIONS } from '../../data/mockData';
import { askKisanAssistant } from '../../services/apiService';
import { translations } from '../../i18n/translations';

interface Props {
  profile: FarmerProfile;
  lang: Language;
  onNavigateToTab: (tabId: string) => void;
}

export const KisanAssistantView: React.FC<Props> = ({
  profile,
  lang,
  onNavigateToTab,
}) => {
  const t = translations[lang];

  const initialGreeting: AssistantMessage = {
    id: 'msg-init',
    sender: 'assistant',
    text:
      lang === 'mr'
        ? `नमस्कार ${profile.name || 'शेतकरी मित्र'}! मी फार्मव्हर्स AI कृषी सल्लागार आहे. तुमच्या ${profile.district || 'नाशिक'} मधील ${profile.soilType || 'काळ्या मातीसाठी'} पिक नियोजन, बाजार भाव किंवा सेंद्रिय कीटकनाशक उपायांबद्दल काहीही विचारा.`
        : lang === 'hi'
        ? `नमस्ते ${profile.name || 'किसान भाई'}! मैं फार्मवर्स AI कृषि सलाहकार हूँ। आपके ${profile.district || 'नासिक'} में ${profile.soilType || 'काली मिट्टी'} के लिए फसल योजना, मंडी भाव या जैविक उपचार के बारे में कोई भी प्रश्न पूछें।`
        : `Hello ${profile.name || 'Farmer'}! I am your FarmVerse AI Agricultural Assistant. Ask me about crop economics for your ${profile.soilType || 'Black soil'} in ${profile.district || 'Nashik'}, current APMC mandi trends, or university-verified organic pest control.`,
    timestamp: 'Just now',
    suggestions: INITIAL_ASSISTANT_SUGGESTIONS,
  };

  const [messages, setMessages] = useState<AssistantMessage[]>([initialGreeting]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AssistantMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askKisanAssistant(textToSend, lang, profile);
      setMessages((prev) => [...prev, response]);
    } catch (e) {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#202820]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="neo-badge bg-[#DDEBD7] text-[#245638] text-[10px] font-black">
              System Module 08 &bull; NLP Agricultural Chat
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Multilingual RAG Grounded on Indian Agricultural Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202820] tracking-tight">
            {t.aiAssistant} &amp; Field Decision Companion
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
            Conversational advisory available in Marathi, Hindi, and English. Injects your live farm context ({profile.soilType}, {profile.district}, {profile.landSize} {profile.landUnit}) directly into the prompt.
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-bold text-[#202820] rounded-lg border-2 border-[#202820] shadow-[2px_2px_0px_#202820] hover:bg-[#DDEBD7]"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#245638]" />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="neo-card rounded-2xl bg-white overflow-hidden flex flex-col h-[600px] border-3 border-[#202820] shadow-[6px_6px_0px_#202820]">
        {/* Chat Status Bar */}
        <div className="p-3 bg-[#245638] text-white flex items-center justify-between border-b-2 border-[#202820] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-bold">FarmVerse AI Agro-Agent Online</span>
          </div>
          <span className="text-[11px] text-[#DDEBD7] font-semibold">
            Context: {profile.name} • {profile.district} ({profile.soilType.split(' ')[0]})
          </span>
        </div>

        {/* Message History Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F7F5EB]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#245638] text-[#E8B65C] flex items-center justify-center border-2 border-[#202820] flex-shrink-0 shadow-[1.5px_1.5px_0px_#202820]">
                    <BotMessageSquare className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-xl p-3.5 text-xs sm:text-sm font-medium leading-relaxed border-2 ${
                    isUser
                      ? 'bg-[#245638] text-white border-[#202820] shadow-[3px_3px_0px_#202820]'
                      : 'bg-white text-[#202820] border-[#202820] shadow-[3px_3px_0px_#202820]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Module Shortcut Action if present */}
                  {msg.moduleShortcut && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-200">
                      <button
                        onClick={() => onNavigateToTab(msg.moduleShortcut!.tabId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8B65C] text-[#202820] font-black text-xs rounded border border-[#202820] shadow-[1px_1px_0px_#202820] hover:bg-[#ffc966]"
                      >
                        <span>{msg.moduleShortcut.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Quick Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-200 space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-neutral-400 block">
                        Suggested Inquiries:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(sug)}
                            className="px-2.5 py-1 bg-[#DDEBD7] text-[#245638] text-xs font-bold rounded-lg border border-[#245638]/40 hover:bg-[#E8B65C] hover:text-[#202820] transition-colors text-left"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={`mt-1.5 text-[9px] font-semibold text-right ${
                      isUser ? 'text-[#DDEBD7]' : 'text-neutral-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#E8B65C] text-[#202820] flex items-center justify-center border-2 border-[#202820] flex-shrink-0 shadow-[1.5px_1.5px_0px_#202820] font-black text-xs">
                    {profile.name ? profile.name[0] : 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#245638] text-white flex items-center justify-center border border-[#202820]">
                <BotMessageSquare className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 rounded-xl border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center gap-1.5 text-xs text-neutral-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#245638] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#245638] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#245638] animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-[11px]">Consulting Agricultural Knowledge Base...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t-2 border-[#202820]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.askQuestion}
              className="flex-1 px-4 py-2.5 bg-[#F7F5EB] border-2 border-[#202820] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none shadow-[2px_2px_0px_#202820]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 bg-[#245638] text-white font-bold text-xs rounded-xl hover:bg-[#1b412a] border-2 border-[#202820] shadow-[2px_2px_0px_#202820] flex items-center gap-1.5 disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5"
            >
              <Send className="w-4 h-4 text-[#E8B65C]" />
              <span className="hidden sm:inline">{t.send}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
