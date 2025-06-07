export type SurveyStatus = "pending" | "approved" | "rejected";

export interface SurveyEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  province: string;
  city: string;
  district: string;
  gender: string;
  ageRange: string;
  occupation: string;
  companyName: string;
  companySize: string;
  companyType: number;
  dailyWorkHours: number;
  weeklyWorkDays: number;
  overtimePay: string;
  negativeConsequence: SurveyStatus;
  longWorkIssues: string | null;
  longWorkIssuesOtherText: string | null;
  discriminationReasons: string | null;
  discriminationReasonsOther: string | null;
  violationsObserved: string | null;
  violationsObservedOther: string | null;
  expectedChanges: string | null;
  expectedChangesOther: string | null;
  story: string | null;
  safetyWord: string | null;
  reviewStatus: string | null;
  reviewer: string | null;
  reviewComment: string | null;

}

export interface ReviewAction {
  surveyId: number;
  reviewStatus: SurveyStatus;
  comment: string;
}
