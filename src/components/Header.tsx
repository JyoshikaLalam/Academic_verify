import React from 'react';
import { Shield, Users, Building, BarChart3 } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const viewOptions = [
    { key: 'public' as ViewMode, label: 'Public Portal', icon: Shield },
    { key: 'institution' as ViewMode, label: 'Institution', icon: Building },
    { key: 'admin' as ViewMode, label: 'Admin Dashboard', icon: BarChart3 }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Academic Authenticity Validator
              </h1>
              <p className="text-xs text-gray-500">Government of Jharkhand</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => onViewChange(option.key)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === option.key
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {option.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}