import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
    { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
    { code: "fr", name: "Français (French)", flag: "🇫🇷" },
    { code: "de", name: "Deutsch (German)", flag: "🇩🇪" },
    { code: "it", name: "Italiano (Italian)", flag: "🇮🇹" },
    { code: "pt", name: "Português (Portuguese)", flag: "🇵🇹" },
    { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
    { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
    { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
    { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
    { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
    { code: "nl", name: "Nederlands (Dutch)", flag: "🇳🇱" },
    { code: "sv", name: "Svenska (Swedish)", flag: "🇸🇪" },
    { code: "fi", name: "Suomi (Finnish)", flag: "🇫🇮" },
    { code: "pl", name: "Polski (Polish)", flag: "🇵🇱" },
    { code: "uk", name: "Українська (Ukrainian)", flag: "🇺🇦" }
  ];

  const translations = {
    en: {
      help: "Help",
      history: "History",
      guide: "Invoicing Guide",
      signIn: "Sign In",
      signUp: "Sign Up",
      brand: "Invoice-Generator.com"
    },
    zh: { help: "帮助", history: "历史", guide: "发票指南", signIn: "登录", signUp: "注册", brand: "发票生成器.com" },
    es: { help: "Ayuda", history: "Historial", guide: "Guía de Facturación", signIn: "Iniciar sesión", signUp: "Registrarse", brand: "Generador-de-Facturas.com" },
    fr: { help: "Aide", history: "Historique", guide: "Guide de facturation", signIn: "Connexion", signUp: "S'inscrire", brand: "Générateur-de-Factures.com" },
    de: { help: "Hilfe", history: "Verlauf", guide: "Rechnungsführer", signIn: "Anmelden", signUp: "Registrieren", brand: "Rechnungs-Generator.com" },
    it: { help: "Aiuto", history: "Cronologia", guide: "Guida alla fatturazione", signIn: "Accedi", signUp: "Registrati", brand: "Generatore-di-Fatture.com" },
    pt: { help: "Ajuda", history: "Histórico", guide: "Guia de Faturamento", signIn: "Entrar", signUp: "Registrar", brand: "Gerador-de-Faturas.com" },
    ru: { help: "Помощь", history: "История", guide: "Руководство по выставлению счетов", signIn: "Войти", signUp: "Зарегистрироваться", brand: "Генератор-Счетов.com" },
    ja: { help: "ヘルプ", history: "履歴", guide: "請求書ガイド", signIn: "ログイン", signUp: "登録", brand: "請求書ジェネレーター.com" },
    ko: { help: "도움말", history: "기록", guide: "송장 가이드", signIn: "로그인", signUp: "가입하기", brand: "송장-생성기.com" },
    ar: { help: "مساعدة", history: "السجل", guide: "دليل الفواتير", signIn: "تسجيل الدخول", signUp: "التسجيل", brand: "منشئ-الفواتير.com" },
    hi: { help: "सहायता", history: "इतिहास", guide: "चालान गाइड", signIn: "साइन इन", signUp: "साइन अप", brand: "चालान-जनरेटर.com" },
    bn: { help: "সাহায্য", history: "ইতিহাস", guide: "চালান নির্দেশিকা", signIn: "সাইন ইন", signUp: "নিবন্ধন করুন", brand: "চালান-জেনারেটর.com" },
    pa: { help: "ਮਦਦ", history: "ਇਤਿਹਾਸ", guide: "ਇਨਵੌਇਸ ਗਾਈਡ", signIn: "ਸਾਈਨ ਇਨ", signUp: "ਸਾਈਨ ਅੱਪ", brand: "ਇਨਵੌਇਸ-ਜਨਰੇਟਰ.com" },
    tr: { help: "Yardım", history: "Geçmiş", guide: "Fatura Rehberi", signIn: "Giriş Yap", signUp: "Kaydol", brand: "Fatura-Oluşturucu.com" },
    nl: { help: "Help", history: "Geschiedenis", guide: "Facturatiegids", signIn: "Inloggen", signUp: "Registreren", brand: "Factuur-Generator.com" },
    sv: { help: "Hjälp", history: "Historik", guide: "Faktureringsguide", signIn: "Logga in", signUp: "Registrera", brand: "Faktura-Generator.com" },
    fi: { help: "Ohje", history: "Historia", guide: "Laskutusopas", signIn: "Kirjaudu sisään", signUp: "Rekisteröidy", brand: "Laskunluontiohjelma.com" },
    pl: { help: "Pomoc", history: "Historia", guide: "Przewodnik po fakturowaniu", signIn: "Zaloguj się", signUp: "Zarejestruj się", brand: "Generator-Faktur.com" },
    uk: { help: "Допомога", history: "Історія", guide: "Посібник з виставлення рахунків", signIn: "Увійти", signUp: "Зареєструватися", brand: "Генератор-Рахунків.com" }
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language.name);
    setShowLanguageDropdown(false);
  };

  const getTranslation = (key) => {
    const langCode = languages.find((lang) => lang.name === currentLanguage)?.code || "en";
    return translations[langCode]?.[key] || translations.en[key];
  };

  return (
    <nav className={`border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="h-8" />
          <span className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
            {getTranslation("brand")}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/help" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {getTranslation("help")}
          </Link>
          <Link to="/history" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {getTranslation("history")}
          </Link>
          <Link to="/guide" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {getTranslation("guide")}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button onClick={() => setShowLanguageDropdown(!showLanguageDropdown)} className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              🅰️
            </button>
            {showLanguageDropdown && (
              <div className={`absolute right-0 mt-2 w-96 z-50 rounded-md shadow-lg py-2 ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                <div className="grid grid-cols-3 gap-1 p-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center px-3 py-2 text-sm rounded ${currentLanguage === language.name
                        ? darkMode ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"
                        : darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <span className="mr-2 text-lg">{language.flag}</span>
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {darkMode ? "🌙" : "🌞"}
          </button>

          {/* Sign In / Sign Up (Desktop) */}
          <Link to="/signin" className={`hidden md:inline text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {getTranslation("signIn")}
          </Link>
          <Link to="/signup" className="hidden md:inline">
            <button className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded">
              {getTranslation("signUp")}
            </button>
          </Link>

          {/* Hamburger Icon */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl">
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-3 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} border-t`}>
          <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{getTranslation("help")}</Link>
          <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{getTranslation("history")}</Link>
          <Link to="/guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{getTranslation("guide")}</Link>
          <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{getTranslation("signIn")}</Link>
          <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
            <button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">{getTranslation("signUp")}</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
