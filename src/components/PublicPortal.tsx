import React, { useState } from 'react';
import { Upload, Search, FileText, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { VerificationResult } from '../types';
import { mockCertificates, mockInstitutions } from '../data/mockData';

export function PublicPortal() {
  const [verificationMode, setVerificationMode] = useState<'upload' | 'search'>('upload');
  const [certificateId, setCertificateId] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResult(null);
    }
  };

  const simulateOCR = (filename: string): Partial<any> => {
    // Simulate OCR extraction based on filename patterns
    if (filename.toLowerCase().includes('rajesh') || filename.toLowerCase().includes('ju')) {
      return {
        studentName: 'Rajesh Kumar Singh',
        rollNumber: 'JU/CSE/2020/001',
        certificateNumber: 'JU/CSE/2024/CERT/001',
        institution: 'Jharkhand University'
      };
    } else if (filename.toLowerCase().includes('fake')) {
      return {
        studentName: 'John Doe',
        rollNumber: 'FAKE/001',
        certificateNumber: 'FAKE/CERT/001',
        institution: 'Fake Technical Institute'
      };
    }
    return {
      studentName: 'Unknown',
      rollNumber: 'Unknown',
      certificateNumber: 'Unknown'
    };
  };

  const performVerification = async (searchTerm: string, isFileUpload = false) => {
    setIsVerifying(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    let ocrData = {};
    if (isFileUpload && uploadedFile) {
      ocrData = simulateOCR(uploadedFile.name);
    }

    // Check against mock database
    const certificate = mockCertificates.find(cert => 
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const institution = mockInstitutions.find(inst => 
      certificate?.institution === inst.name
    );

    if (certificate && institution?.verified) {
      setResult({
        id: Date.now().toString(),
        certificateId: searchTerm,
        status: 'valid',
        confidence: 98,
        timestamp: new Date().toISOString(),
        details: {
          ocrExtracted: ocrData,
          databaseMatch: certificate,
          tamperFlags: [],
          anomalies: []
        }
      });
    } else if (searchTerm.toLowerCase().includes('fake')) {
      setResult({
        id: Date.now().toString(),
        certificateId: searchTerm,
        status: 'invalid',
        confidence: 15,
        timestamp: new Date().toISOString(),
        details: {
          ocrExtracted: ocrData,
          databaseMatch: null,
          tamperFlags: ['Invalid institution code', 'Certificate not found in database'],
          anomalies: ['Signature inconsistency', 'Tampered document structure']
        }
      });
    } else {
      setResult({
        id: Date.now().toString(),
        certificateId: searchTerm,
        status: 'suspicious',
        confidence: 45,
        timestamp: new Date().toISOString(),
        details: {
          ocrExtracted: ocrData,
          databaseMatch: null,
          tamperFlags: ['Certificate not found in database'],
          anomalies: ['Requires manual verification']
        }
      });
    }

    setIsVerifying(false);
  };

  const handleVerify = () => {
    if (verificationMode === 'upload' && uploadedFile) {
      performVerification(uploadedFile.name, true);
    } else if (verificationMode === 'search' && certificateId) {
      performVerification(certificateId, false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'invalid':
        return <XCircle className="h-8 w-8 text-red-600" />;
      case 'suspicious':
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'invalid':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'suspicious':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Verify Academic Certificates
          </h2>
          <p className="text-blue-100">
            Upload a certificate or enter details to verify authenticity
          </p>
        </div>

        <div className="p-6">
          {/* Verification Mode Toggle */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setVerificationMode('upload')}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                verificationMode === 'upload'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Certificate
            </button>
            <button
              onClick={() => setVerificationMode('search')}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                verificationMode === 'search'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="h-4 w-4 mr-2" />
              Search by ID
            </button>
          </div>

          {/* Upload Mode */}
          {verificationMode === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="certificate-upload"
                />
                <label htmlFor="certificate-upload" className="cursor-pointer">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {uploadedFile ? uploadedFile.name : 'Drop certificate here or click to upload'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, JPG, PNG files up to 10MB
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Search Mode */}
          {verificationMode === 'search' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID or Roll Number
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., JU/CSE/2024/CERT/001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Sample IDs to try:</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <button
                    onClick={() => setCertificateId('JU/CSE/2024/CERT/001')}
                    className="block hover:underline"
                  >
                    • JU/CSE/2024/CERT/001 (Valid Certificate)
                  </button>
                  <button
                    onClick={() => setCertificateId('FAKE/CERT/001')}
                    className="block hover:underline"
                  >
                    • FAKE/CERT/001 (Invalid Certificate)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verify Button */}
          <div className="mt-6">
            <button
              onClick={handleVerify}
              disabled={
                isVerifying ||
                (verificationMode === 'upload' && !uploadedFile) ||
                (verificationMode === 'search' && !certificateId.trim())
              }
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Verify Certificate
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              <div className={`border rounded-lg p-6 ${getStatusColor(result.status)}`}>
                <div className="flex items-center mb-4">
                  {getStatusIcon(result.status)}
                  <div className="ml-3">
                    <h3 className="text-lg font-bold capitalize">{result.status}</h3>
                    <p className="text-sm">
                      Confidence: {result.confidence}% • 
                      Verified on {new Date(result.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {result.details.databaseMatch && (
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">Certificate Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Student:</span>
                        <p className="font-medium">{result.details.databaseMatch.studentName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Roll Number:</span>
                        <p className="font-medium">{result.details.databaseMatch.rollNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Course:</span>
                        <p className="font-medium">{result.details.databaseMatch.course}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Institution:</span>
                        <p className="font-medium">{result.details.databaseMatch.institution}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Year:</span>
                        <p className="font-medium">{result.details.databaseMatch.graduationYear}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Grade:</span>
                        <p className="font-medium">{result.details.databaseMatch.grade}</p>
                      </div>
                    </div>
                  </div>
                )}

                {result.details.tamperFlags.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-red-800 mb-2">Issues Detected</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {result.details.tamperFlags.map((flag, index) => (
                        <li key={index}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.details.anomalies.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Anomalies Found</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {result.details.anomalies.map((anomaly, index) => (
                        <li key={index}>• {anomaly}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Verification ID: {result.id}
                  </div>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}