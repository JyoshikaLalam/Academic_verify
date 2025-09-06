import React, { useState } from 'react';
import { Upload, Plus, Search, FileText, Database, Settings, Users, TrendingUp } from 'lucide-react';
import { mockCertificates, mockInstitutions } from '../data/mockData';

export function InstitutionPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');

  const institution = mockInstitutions[0]; // Simulating logged-in institution

  const filteredCertificates = mockCertificates.filter(cert =>
    cert.institution === institution.name &&
    (cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    totalCertificates: mockCertificates.filter(cert => cert.institution === institution.name).length,
    activeVerifications: 145,
    monthlyGrowth: 12.5,
    averageVerificationTime: '2.3s'
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCertificates.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeVerifications}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Growth</p>
              <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Verification</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageVerificationTime}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Database className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockCertificates.slice(0, 3).map(cert => (
            <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{cert.studentName}</p>
                <p className="text-sm text-gray-600">{cert.course}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{cert.certificateNumber}</p>
                <p className="text-xs text-gray-500">Issued: {cert.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Add Certificates</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setUploadMode('single')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                uploadMode === 'single'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Single Upload
            </button>
            <button
              onClick={() => setUploadMode('bulk')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                uploadMode === 'bulk'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Bulk Upload
            </button>
          </div>
        </div>

        {uploadMode === 'single' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter roll number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter certificate number"
                />
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Certificate
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload CSV file with certificate data
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Maximum file size: 50MB
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">
                Choose File
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">CSV Format Requirements:</h4>
              <p className="text-sm text-blue-700">
                Columns: Student Name, Roll Number, Course, Certificate Number, Issue Date, Grade
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderManage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Manage Certificates</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search certificates..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Roll Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Course</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Certificate Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map(cert => (
                <tr key={cert.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{cert.studentName}</td>
                  <td className="py-3 px-4">{cert.rollNumber}</td>
                  <td className="py-3 px-4 text-sm">{cert.course}</td>
                  <td className="py-3 px-4 font-mono text-sm">{cert.certificateNumber}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      cert.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
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

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: Database },
    { key: 'upload', label: 'Upload', icon: Upload },
    { key: 'manage', label: 'Manage', icon: FileText },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{institution.name}</h2>
        <p className="text-gray-600">Institution Portal • {institution.type} • Est. {institution.established}</p>
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

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'upload' && renderUpload()}
      {activeTab === 'manage' && renderManage()}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Institution Settings</h3>
          <p className="text-gray-600">Configure your institution settings and preferences.</p>
        </div>
      )}
    </div>
  );
}