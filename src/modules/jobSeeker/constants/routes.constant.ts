export const JobSeekerRoute = {
  employerList: "/employer/list",
  employerDetail: "/employer/detail/:id",
  jobSaved: "/job/saved",
} as const;

export const JobSeekerApiRoute = {
  employerList: "api/list-companies",
  employerDetail: "api/list-companies/:id",
} as const;
