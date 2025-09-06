export interface Certificate {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  institution: string;
  graduationYear: number;
  grade: string;
  certificateNumber: string;
  issueDate: string;
  signature: string;
  seal: string;
  status: 'active' | 'revoked';
  hash?: string;
}

export interface VerificationResult {
  id: string;
  certificateId: string;
  status: 'valid' | 'invalid' | 'suspicious';
  confidence: number;
  timestamp: string;
  details: {
    ocrExtracted: Partial<Certificate>;
    databaseMatch: Certificate | null;
    tamperFlags: string[];
    anomalies: string[];
  };
  verifiedBy?: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  established: number;
  verified: boolean;
  certificatesIssued: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'public' | 'institution' | 'admin';
  institutionId?: string;
}

export type ViewMode = 'public' | 'institution' | 'admin';