import { Button, DialogActions } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { IEmployee, IEmployeeInfo } from "@interfaces/IEmployee";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { Fieldset } from "@components/Fieldset";
import { EmployeeInfoProps } from "./EmployeeInfo.types";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USERS,
  GET_USER_INFO,
  UPDATE_USER,
  UserInfoData,
  UserInput,
  UserUpdateData,
} from "@graphql/User";
import { getEmployeeInfo } from "./helpers";
import { useEffect, useMemo } from "react";
import { useState } from "react";

export const EmployeeInfo = ({ employeeId }: EmployeeInfoProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { data: userQueryData } = useQuery<UserInfoData>(GET_USER_INFO, {
    variables: {
      id: employeeId,
    },
    onCompleted: () => {
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
    },
    fetchPolicy: "no-cache",
  });

  const [saveUser] = useMutation<UserUpdateData, UserInput>(UPDATE_USER, {
    onCompleted: () => {
      navigate("/employees");
    },
    onError: (error) => {
      setError(error.message);
    },
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
  });

  const employee = useMemo(() => {
    return getEmployeeInfo(userQueryData?.user);
  }, [userQueryData?.user]);

  const { control, handleSubmit, reset, getValues } = useForm<IEmployeeInfo>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      specialization: "",
      departmentId: "",
    },
  });

  useEffect(() => {
    if (employee) {
      const { name, lastName, email, specialization, departmentId } = employee;

      reset({ name, lastName, email, specialization, departmentId });
    }
  }, [employee, reset]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IEmployeeInfo> = (data) => {
    setLoading(true);

    saveUser({
      variables: {
        id: employeeId,
        user: {
          profile: {
            first_name: data.name,
            last_name: data.lastName,
            departmentId: data.departmentId,
            specialization: data.specialization,
            languages: [], // TODO: Replace with entities input
            skills: [], // TODO: Replace with entities input
          },
          // TODO: remove once graphql rules update
          // eslint-disable-next-line
          // @ts-ignore
          cvsIds: [],
        },
      },
    });
  };

  if (error) {
    return <>{error}</>;
  } else if (Object.values(getValues()).every((key) => !!key) && !loading) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoFormWrapper>
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="First Name"
            name="name"
          />
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="Last Name"
            name="lastName"
          />
          {/* <Fieldset
            control={control}
            required="Please, specify the field"
            label="Email"
            name="email"
          /> */}
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="Department ID"
            name="departmentId"
          />
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="Specialization"
            name="specialization"
          />
        </InfoFormWrapper>
        <DialogActions>
          <Button type="submit" value="Save" variant="contained">
            Save
          </Button>
          <Button
            onClick={() => navigate(ROUTE.EMPLOYEES)}
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    );
  } else {
    return <>loader</>;
  }
};
