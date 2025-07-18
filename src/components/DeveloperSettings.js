import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

export default function DeveloperSettings() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState([
    {
      key: 'sk_00bGDKtVDp2JRpztIZFZ6iN0Fs5QbTtt',
      createdAt: 'Jul 11, 2025',
    },
    {
      key: 'sk_N8zf6RjGEwJJSJYZ0TCmn2TI0F1viMKe',
      createdAt: 'Jul 11, 2025',
    },
  ]);

  const generateApiKey = () => {
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 32);
    const date = new Date();
    const createdAt = date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    setApiKeys([...apiKeys, { key: newKey, createdAt }]);
  };

  const deleteKey = (index) => {
    const updatedKeys = [...apiKeys];
    updatedKeys.splice(index, 1);
    setApiKeys(updatedKeys);
  };

  return (
    <div
      className={`min-h-screen px-8 py-10 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div
        className={`rounded-lg shadow p-8 w-full transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center mb-2">Developer Settings</h1>
        <p className={`text-center mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your API keys and monitor your API usage.
        </p>

        {/* API Usage */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-1">API Usage</h2>
          <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="font-medium">This Month</span><br />
            Invoices Generated: <span className="font-semibold text-gray-800 dark:text-white">0</span> / 100
          </p>

          <div className="bg-orange-100 border-l-4 border-orange-400 p-4 rounded mb-4">
            <p className="text-sm text-orange-800 flex items-start gap-2">
              <span className="text-lg">ℹ️</span> You are currently on the free API plan. Purchase a subscription to the Invoice-Generator.com API in order to unlock more usage.
            </p>
          </div>

          <button
            onClick={() => navigate('/upgrade')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Upgrade
          </button>
        </div>

        {/* API Keys */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">API Keys</h2>
            <button
              onClick={generateApiKey}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              + New
            </button>
          </div>

          {/* API Key Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <tr className="text-left border-b border-gray-200 dark:border-gray-600">
                  <th className="py-2">API KEY</th>
                  <th className="py-2">CREATED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key, index) => (
                  <tr
                    key={index}
                    className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
                  >
                    <td className="py-2 text-pink-600 break-all">{key.key}</td>
                    <td className="py-2">{key.createdAt}</td>
                    <td className="py-2">
                      <button onClick={() => deleteKey(index)}>
                        <FiTrash2 className="text-pink-600 hover:text-red-600 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
