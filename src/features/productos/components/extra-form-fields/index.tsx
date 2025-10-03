import { ReactNode } from "react";
import FormFieldDwelling from "./form-fields-dwelling";
import FormFieldsVehicles from "./form-fields-vehicles";

export const FormFieldsExtra = {
  DWELLING: (isPendingMutation: boolean) => <FormFieldDwelling isDisabled={isPendingMutation} />,
  VEHICLE: (isPendingMutation: boolean) => <FormFieldsVehicles isDisabled={isPendingMutation} />,
} as Record<string, (isPendingMutation: boolean) => ReactNode>;
