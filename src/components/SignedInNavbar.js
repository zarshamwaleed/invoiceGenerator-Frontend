import React, { useContext, useState } from 'react';
import logo from '../images/logo.png';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function SignedInNavbar({ userName, email, onSignOut }) {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const navigate = useNavigate();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
        { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
        { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano (Italian)', flag: '🇮🇹' },
        { code: 'pt', name: 'Português (Portuguese)', flag: '🇵🇹' },
        { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺' },
        { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
        { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
        { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
        { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
        { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
        { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
        { code: 'tr', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
        { code: 'nl', name: 'Nederlands (Dutch)', flag: '🇳🇱' },
        { code: 'sv', name: 'Svenska (Swedish)', flag: '🇸🇪' },
        { code: 'fi', name: 'Suomi (Finnish)', flag: '🇫🇮' },
        { code: 'pl', name: 'Polski (Polish)', flag: '🇵🇱' },
        { code: 'uk', name: 'Українська (Ukrainian)', flag: '🇺🇦' }
    ];

  
    const translations = {
        en: { brand: 'Invoice-Generator.com', myInvoices: 'My Invoices', settings: 'Settings', upgrade: 'Upgrade', myAccount: 'My Account', signOut: 'Sign Out' },
        zh: { brand: '发票生成器.com', myInvoices: '我的发票', settings: '设置', upgrade: '升级', myAccount: '我的账户', signOut: '登出' },
        es: { brand: 'Generador-de-Facturas.com', myInvoices: 'Mis Facturas', settings: 'Configuraciones', upgrade: 'Mejorar', myAccount: 'Mi Cuenta', signOut: 'Cerrar sesión' },
        fr: { brand: 'Générateur-de-Factures.com', myInvoices: 'Mes Factures', settings: 'Paramètres', upgrade: 'Mettre à niveau', myAccount: 'Mon Compte', signOut: 'Se Déconnecter' },
        de: { brand: 'Rechnungs-Generator.com', myInvoices: 'Meine Rechnungen', settings: 'Einstellungen', upgrade: 'Upgrade', myAccount: 'Mein Konto', signOut: 'Abmelden' },
        it: { brand: 'Generatore-di-Fatture.com', myInvoices: 'Le mie Fatture', settings: 'Impostazioni', upgrade: 'Aggiorna', myAccount: 'Il mio Account', signOut: 'Disconnettersi' },
        pt: { brand: 'Gerador-de-Faturas.com', myInvoices: 'Minhas Faturas', settings: 'Configurações', upgrade: 'Atualizar', myAccount: 'Minha Conta', signOut: 'Sair' },
        ru: { brand: 'Генератор-Счетов.com', myInvoices: 'Мои счета', settings: 'Настройки', upgrade: 'Обновить', myAccount: 'Мой аккаунт', signOut: 'Выйти' },
        ja: { brand: '請求書ジェネレーター.com', myInvoices: '請求書', settings: '設定', upgrade: 'アップグレード', myAccount: 'マイアカウント', signOut: 'サインアウト' },
        ko: { brand: '송장-생성기.com', myInvoices: '내 송장', settings: '설정', upgrade: '업그레이드', myAccount: '내 계정', signOut: '로그아웃' },
        ar: { brand: 'منشئ-الفواتير.com', myInvoices: 'فواتيري', settings: 'الإعدادات', upgrade: 'الترقية', myAccount: 'حسابي', signOut: 'تسجيل الخروج' },
        hi: { brand: 'चालान-जनरेटर.com', myInvoices: 'मेरे चालान', settings: 'सेटिंग्स', upgrade: 'अपग्रेड', myAccount: 'मेरा खाता', signOut: 'साइन आउट' },
        bn: { brand: 'চালান-জেনারেটর.com', myInvoices: 'আমার চালান', settings: 'সেটিংস', upgrade: 'আপগ্রেড', myAccount: 'আমার অ্যাকাউন্ট', signOut: 'সাইন আউট' },
        pa: { brand: 'ਇਨਵੌਇਸ-ਜਨਰੇਟਰ.com', myInvoices: 'ਮੇਰੇ ਇਨਵੌਇਸ', settings: 'ਸੈਟਿੰਗਾਂ', upgrade: 'ਅਪਗਰੇਡ', myAccount: 'ਮੇਰਾ ਅਕਾਊਂਟ', signOut: 'ਸਾਈਨ ਆਊਟ' },
        tr: { brand: 'Fatura-Oluşturucu.com', myInvoices: 'Faturalarım', settings: 'Ayarlar', upgrade: 'Yükselt', myAccount: 'Hesabım', signOut: 'Çıkış Yap' },
        nl: { brand: 'Factuur-Generator.com', myInvoices: 'Mijn Facturen', settings: 'Instellingen', upgrade: 'Upgrade', myAccount: 'Mijn Account', signOut: 'Uitloggen' },
        sv: { brand: 'Faktura-Generator.com', myInvoices: 'Mina Fakturor', settings: 'Inställningar', upgrade: 'Uppgradera', myAccount: 'Mitt Konto', signOut: 'Logga ut' },
        fi: { brand: 'Laskunluontiohjelma.com', myInvoices: 'Omat Laskut', settings: 'Asetukset', upgrade: 'Päivitä', myAccount: 'Oma Tili', signOut: 'Kirjaudu Ulos' },
        pl: { brand: 'Generator-Faktur.com', myInvoices: 'Moje Faktury', settings: 'Ustawienia', upgrade: 'Uaktualnij', myAccount: 'Moje Konto', signOut: 'Wyloguj się' },
        uk: { brand: 'Генератор-Рахунків.com', myInvoices: 'Мої рахунки', settings: 'Налаштування', upgrade: 'Оновити', myAccount: 'Мій акаунт', signOut: 'Вийти' }
    };

    const handleLanguageChange = (language) => {
        setCurrentLanguage(language.name);
        setShowLanguageDropdown(false);
    };

    const getTranslation = (key) => {
        const langCode = languages.find(lang => lang.name === currentLanguage)?.code || 'en';
        return translations[langCode]?.[key] || translations.en[key];
    };

    return (
        <nav className={`border-b shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo + Brand */}
               <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/signinHomepage')}>

                    <img src={logo} alt="Logo" className="h-8" />
                    <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {getTranslation('brand')}
                    </span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center space-x-6 text-sm">
                    <button onClick={() => navigate('/my-invoices')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                        {getTranslation('myInvoices')}
                    </button>
                    {/* <button onClick={() => navigate('/settings')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                        {getTranslation('settings')}
                    </button> */}
                    <button onClick={() => navigate('/upgrade')} className="px-4 py-1.5 rounded text-white bg-green-600 hover:bg-green-700">
                        {getTranslation('upgrade')}
                    </button>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-4 relative">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            className={`text-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        >
                            🅰️
                        </button>
                        {showLanguageDropdown && (
                            <div className={`absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 z-50 ${darkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                                <div className="grid grid-cols-3 gap-1 p-2">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => handleLanguageChange(language)}
                                            className={`flex items-center px-3 py-2 text-sm rounded ${currentLanguage === language.name ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900') : (darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                                        >
                                            <span className="mr-2 text-lg">{language.flag}</span>
                                            {language.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Theme toggle */}
                    <button
                        className={`text-xl ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                        onClick={toggleTheme}
                    >
                        {darkMode ? '🌙' : '🌞'}
                    </button>

                    {/* User dropdown */}
                    <button
                        onClick={() => setShowUserDropdown(prev => !prev)}
                        className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center space-x-1`}
                    >
                        <span className="hidden md:inline">{userName}</span>
                        {/* <span className="text-xs text-gray-500">({email})</span> */}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {showUserDropdown && (
                        <div className={`absolute right-0 top-12 w-64 rounded-md shadow-lg z-50 ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <div className="p-4 border-b">
                                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userName}</div>
                                <div className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{email}</div>
                            </div>
                            <div className="p-2">
                                <button
                                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                                    onClick={() => navigate('/settings')}
                                >
                                    {getTranslation('myAccount')}
                                </button>   
                                <button
                                    className={`block w-full text-left px-4 py-2 text-sm text-red-500 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-red-100'}`}
                                    onClick={() => {
  localStorage.clear();
  onSignOut();
}}

                                >
                                    {getTranslation('signOut')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
