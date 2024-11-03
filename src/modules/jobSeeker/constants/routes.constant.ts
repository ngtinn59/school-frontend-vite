export const JobSeekerRoute = {
  employerList: "/employer/list",
  employerDetail: "/employer/detail/:id",
  jobList: "/job/list",
} as const;

export const JobSeekerApiRoute = {
  employerList: "api/list-companies",
  employerDetail: "api/list-companies/:id",
} as const;
