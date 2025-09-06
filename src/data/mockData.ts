import { Certificate, Institution, VerificationResult } from '../types';

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    studentName: 'Rajesh Kumar Singh',
    rollNumber: 'JU/CSE/2020/001',
    course: 'Bachelor of Technology in Computer Science',
    institution: 'Jharkhand University',
    graduationYear: 2024,
    grade: 'First Class',
    certificateNumber: 'JU/CSE/2024/CERT/001',
    issueDate: '2024-06-15',
    signature: 'Dr. A.K. Sharma',
    seal: 'Official Seal - Jharkhand University',
    status: 'active',
    hash: 'a1b2c3d4e5f6789'
  },
  {
    id: '2',
    studentName: 'Priya Kumari',
    rollNumber: 'BIT/ECE/2019/045',
    course: 'Bachelor of Technology in Electronics',
    institution: 'Birla Institute of Technology',
    graduationYear: 2023,
    grade: 'Second Class',
    certificateNumber: 'BIT/ECE/2023/CERT/045',
    issueDate: '2023-05-20',
    signature: 'Prof. S.K. Jha',
    seal: 'Official Seal - BIT Mesra',
    status: 'active',
    hash: 'x9y8z7w6v5u4t3s2'
  },
  {
    id: '3',
    studentName: 'Amit Kumar Das',
    rollNumber: 'CUT/ME/2018/023',
    course: 'Bachelor of Technology in Mechanical Engineering',
    institution: 'Central University of Jharkhand',
    graduationYear: 2022,
    grade: 'First Class with Distinction',
    certificateNumber: 'CUT/ME/2022/CERT/023',
    issueDate: '2022-07-10',
    signature: 'Dr. R.P. Singh',
    seal: 'Official Seal - CUJ',
    status: 'active',
    hash: 'p1q2r3s4t5u6v7w8'
  }
];

export const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Jharkhand University',
    code: 'JU',
    type: 'State University',
    location: 'Ranchi',
    established: 1960,
    verified: true,
    certificatesIssued: 15420
  },
  {
    id: '2',
    name: 'Birla Institute of Technology',
    code: 'BIT',
    type: 'Private Institute',
    location: 'Mesra, Ranchi',
    established: 1955,
    verified: true,
    certificatesIssued: 28500
  },
  {
    id: '3',
    name: 'Central University of Jharkhand',
    code: 'CUJ',
    type: 'Central University',
    location: 'Brambe, Ranchi',
    established: 2009,
    verified: true,
    certificatesIssued: 8200
  },
  {
    id: '4',
    name: 'Fake Technical Institute',
    code: 'FTI',
    type: 'Unverified',
    location: 'Unknown',
    established: 2020,
    verified: false,
    certificatesIssued: 0
  }
];

export const mockVerifications: VerificationResult[] = [
  {
    id: '1',
    certificateId: 'JU/CSE/2024/CERT/001',
    status: 'valid',
    confidence: 98,
    timestamp: '2024-01-15T10:30:00Z',
    details: {
      ocrExtracted: {
        studentName: 'Rajesh Kumar Singh',
        rollNumber: 'JU/CSE/2020/001',
        certificateNumber: 'JU/CSE/2024/CERT/001'
      },
      databaseMatch: mockCertificates[0],
      tamperFlags: [],
      anomalies: []
    }
  },
  {
    id: '2',
    certificateId: 'FAKE/CERT/001',
    status: 'invalid',
    confidence: 15,
    timestamp: '2024-01-14T14:20:00Z',
    details: {
      ocrExtracted: {
        studentName: 'John Doe',
        rollNumber: 'FAKE/001',
        certificateNumber: 'FAKE/CERT/001'
      },
      databaseMatch: null,
      tamperFlags: ['Invalid institution code', 'Certificate number not found'],
      anomalies: ['Signature mismatch', 'Seal tampering detected']
    }
  }
];