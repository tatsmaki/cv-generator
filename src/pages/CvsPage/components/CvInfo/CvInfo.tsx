import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { ICV } from "@interfaces/ICV";
import { ButtonWrapper } from "./CvInfo.styles";
import { Button, DialogActions } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { cvsMock } from "@mock/cvs";
import { ROUTE } from "@constants/route";
import { ProjectAccordion } from "@components/ProjectAccordion";
import { Fieldset } from "@components/Fieldset";
import { CvInfoProps } from "./CvInfo.types";

export const CvInfo = ({ cvId }: CvInfoProps) => {
  const cv = cvsMock.find(({ id }) => id === cvId)!;

  const { control, handleSubmit, reset } = useForm<ICV>({
    defaultValues: {
      id: cv.id,
      name: cv.name,
      description: cv.description,
      email: cv.email,
      lastName: cv.lastName,
      skills: cv.skills,
      specialization: cv.specialization,
      department: cv.department,
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ICV> = (data) => {
    // save cv info
    reset();
  };

  const addProjectClickHandler = () => {
    // show projects table
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InfoFormWrapper>
        <Fieldset
          control={control}
          required="Please, specify the field"
          label="Email"
          name="email"
        />
        <Fieldset
          control={control}
          required="Please, specify the field"
          label="CV Name"
          name="lastName"
        />
        <Fieldset
          control={control}
          required="Please, specify the field"
          label="Skills"
          name="skills"
        />
        <Fieldset
          control={control}
          required="Please, specify the field"
          label="Specialization"
          name="specialization"
        />
        <Fieldset
          control={control}
          required="Please, specify the field"
          label="Department"
          name="department"
        />
      </InfoFormWrapper>

      <ButtonWrapper>
        <Button onClick={addProjectClickHandler} variant="contained">
          Add Project
        </Button>
      </ButtonWrapper>
      {/* cvs.projects.map ...  */}
      <ProjectAccordion />

      <DialogActions>
        <Button type="submit" value="Save" variant="contained">
          Save
        </Button>
        <Button
          onClick={() => navigate(ROUTE.CVS)}
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
};
