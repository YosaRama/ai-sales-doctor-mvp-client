import type { GeneralDataModel } from "./general";
import type { IndustryDataModel } from "./industry";

export type LeadPayload = {
  name: string;
  job_title: string;
  phone_number: string;
  company: string;
  email: string;
  headcount: number;
  industry_id: number;
};

export type LeadDataModel = LeadPayload &
  GeneralDataModel & {
    industry: IndustryDataModel;
  };

export type LeadPayloadUpdate = Partial<LeadPayload>;
