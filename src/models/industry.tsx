import type { GeneralDataModel } from "./general";

export type IndustryPayload = {
  name: string;
};

export type IndustryDataModel = IndustryPayload & GeneralDataModel;
