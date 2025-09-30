import { ReactNode } from "react";
import FormFieldDwelling from "./form-fields-dwelling";
import FormFieldsVehicles from "./form-fields-vehicles";

export const FormFieldsExtra = {
  DWELLING: () => <FormFieldDwelling />,
  VEHICLE: () => <FormFieldsVehicles />,
} as Record<string, () => ReactNode>;
