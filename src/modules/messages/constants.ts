export const COMMON_ROUTES = {
  CONVERSATIONS: "/conversations",
} as const;

export const COMMON_API_ROUTES = {
  LIST_CONVERSATIONS: "api/messages",
  SEND_MESSAGE: "api/messages",
  CONVERSATION_DETAIL: "api/messages/:id",
  LIST_EMPLOYER_CONVERSATIONS: "api/applicants/messages",
  LIST_COMPANY_APPLIED_FOR_JOB_SEEKER: "api/applicants-users/messages",

  LIST_CONVERSATION_FOR_EMPLOYER: "api/messages-employer",
} as const;
