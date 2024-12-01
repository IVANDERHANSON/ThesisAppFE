export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    preThesis: PreThesis;
    thesis: Thesis;
}

export interface PreThesis {
    id: number;
    studentId: number;
    preThesisName: string;
    preThesisLink: string;
    mentorPair: MentorPair;
}

export interface MentorPair {
    id: number;
    preThesisId: number;
    mentorLecturerId: number;
    mentoringSessions: MentoringSession[];
}

export interface MentorPairCreation {
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
    thesisDefence: ThesisDefence;
}

export interface ThesisDefence {
    id: number;
    thesisId: number;
    mentorLecturerId: number;
    examinerLecturerId: number;
    schedule: string;
    meetingLink: string;
}

export interface ThesisDefenceCreation {
    thesisId: number;
    mentorLecturerId: number;
    examinerLecturerId: number;
    schedule: string;
    meetingLink: string;
}

export interface Response {
    message: string;
}