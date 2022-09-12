import { IEmployeeCore } from "@interfaces/IEmployee";
import { PositionNamesIds } from "@graphql/Position/Position.interface";
import { Department } from "@graphql/Department/Department.interface";
import { SubmitHandler } from "react-hook-form";

export type EmployeeCreateInfoFormProps = {
  onSubmit: SubmitHandler<IEmployeeCore>;
  error?: string;
  positions?: PositionNamesIds[];
  departments?: Department[];
};
