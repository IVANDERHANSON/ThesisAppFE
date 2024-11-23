export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
}

export interface PreThesis {
    id: number;
    studentId: number;
    thesisName: string;
    thesisLink: string;
}

export interface MentorPair {
    id: number;
    preThesisId: number;
    mentorLecturerId: number;
}

export interface MentoringSession {
    id: number;
    mentorPairId: number;
    schedule: string;
    meetingLink: string;
}

export interface Thesis {
    id: number;
    studentId: number;
    thesisName: string;
    thesisLink: string;
}

export interface ThesisDefence {
    id: number;
    thesisId: number;
    mentorLecturerId: number;
    examinerLecturerId: number;
    schedule: string;
    meetingLink: string;
}