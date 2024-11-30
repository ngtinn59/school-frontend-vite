export const JobSeekerRoute = {
  employerList: "/employer/list",
  employerDetail: "/employer/detail/:id",
  jobSaved: "/job/saved",
  conversations: "/conversations",
} as const;

export const JobSeekerApiRoute = {
  employerList: "api/list-companies",
  employerDetail: "api/list-companies/:id",
  jobDetail: "api/list-jobs/:id",
} as const;
