import React, { useState } from 'react';
import { BarChart3, AlertTriangle, Users, Building, Shield, Search, Filter, Download } from 'lucide-react';
import { mockVerifications, mockInstitutions, mockCertificates } from '../data/mockData';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = {
    totalVerifications: 12453,
    validCertificates: 11230,
    invalidCertificates: 1223,
    suspiciousActivity: 45,
    institutionsRegistered: mockInstitutions.filter(inst => inst.verified).length,
    monthlyGrowth: 18.5
  };

  const recentVerifications = mockVerifications.slice(0, 10);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVerifications.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{stats.monthlyGrowth}% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valid Certificates</p>
              <p className="text-2xl font-bold text-green-600">{stats.validCertificates.toLocaleString()}</p>
              <p className="text-xs text-gray-600">90.2% success rate</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Invalid/Suspicious</p>
              <p className="text-2xl font-bold text-red-600">{stats.invalidCertificates.toLocaleString()}</p>
              <p className="text-xs text-gray-600">9.8% flagged</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Registered Institutions</p>
              <p className="text-2xl font-bold text-purple-600">{stats.institutionsRegistered}</p>
              <p className="text-xs text-gray-600">Verified institutions</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Suspicious Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Multiple fake certificates detected</p>
                <p className="text-sm text-red-600">Institution: Fake Technical Institute</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Unusual verification pattern</p>
                <p className="text-sm text-yellow-600">45 verifications in 1 hour from same IP</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Institutions</h3>
          <div className="space-y-3">
            {mockInstitutions.filter(inst => inst.verified).map(inst => (
              <div key={inst.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{inst.name}</p>
                  <p className="text-sm text-gray-600">{inst.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{inst.certificatesIssued.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">certificates</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Verification Activity</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search verifications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="valid">Valid</option>
              <option value="invalid">Invalid</option>
              <option value="suspicious">Suspicious</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Certificate ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Confidence</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issues</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentVerifications.map(verification => (
                <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{verification.certificateId}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      verification.status === 'valid' 
                        ? 'bg-green-100 text-green-800'
                        : verification.status === 'invalid'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {verification.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-2 rounded-full mr-2 ${
                        verification.confidence >= 80 ? 'bg-green-200' :
                        verification.confidence >= 50 ? 'bg-yellow-200' : 'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            verification.confidence >= 80 ? 'bg-green-500' :
                            verification.confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${verification.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm">{verification.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{new Date(verification.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {verification.details.tamperFlags.length > 0 && (
                      <span className="text-red-600 text-sm">
                        {verification.details.tamperFlags.length} issue(s)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInstitutions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Registered Institutions</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
            <Building className="h-4 w-4 mr-2" />
            Add Institution
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInstitutions.map(institution => (
            <div key={institution.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">{institution.name}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  institution.verified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {institution.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Type:</span> {institution.type}</p>
                <p><span className="text-gray-500">Location:</span> {institution.location}</p>
                <p><span className="text-gray-500">Established:</span> {institution.established}</p>
                <p><span className="text-gray-500">Certificates:</span> {institution.certificatesIssued.toLocaleString()}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'verifications', label: 'Verifications', icon: Shield },
    { key: 'institutions', label: 'Institutions', icon: Building },
    { key: 'alerts', label: 'Alerts', icon: AlertTriangle }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Higher Education Department • Government of Jharkhand</p>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'verifications' && renderVerifications()}
      {activeTab === 'institutions' && renderInstitutions()}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security Alerts</h3>
          <p className="text-gray-600">Monitor and manage security alerts and suspicious activities.</p>
        </div>
      )}
    </div>
  );
}