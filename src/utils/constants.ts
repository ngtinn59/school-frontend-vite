import {
  ComponentSelectionWithSearchType,
  ProfileCategoryType,
  ProfileJobLevelType,
  ProfileNavLinkItemsType,
} from "./type";
import { UserInformationType } from "./type/profileType";

// COLOR CONSTANT
export const COLOR_PRIMARY = "#4f46e5";
export const COLOR_SECONDARY = "#121212";
export const TEXT_COLOR_NORMAL = "#4E4C4D";
export const TEXT_COLOR_BOLD = "#383536";
export const COLOR_DISABLED = "#e9e9e9";

// ------------------------------------------
// TEXT CONSTANT
// Login.tsx
export const LOGIN_PAGE_TEXT_USP = [
  "View salary to help you negotiate your offer or pay rise",
  "Find out about benefits, interview, company culture via reviews",
  "Easy apply with only 1 click",
  "Manage your own profile & privacy",
];

// HomePage.tsx
export const HOMEPAGE_JOBS_CITIES: { label: string; value: string }[] = [
  { label: "Ho Chi Minh", value: "Ho Chi Minh" },
  { label: "Ha Noi", value: "Ha Noi" },
  { label: "Da Nang", value: "Da Nang" },
  { label: "Can Tho", value: "Can Tho" },
  { label: "Others", value: "Others" },
];

export const HOMEPAGE_SKILLS_TRENDING = ["Java", "React", "NodeJS", "Python"];

export const HOMEPAGE_USPS = [
  {
    title: "User Profile",
    iconId: "user-profile",
    description:
      "Create an excellent profile with a well-structured format and specific guide",
    cta: "Update profile",
  },
  {
    title: "CV Templates",
    iconId: "cv-templates",
    description:
      "Generate professional IT CV with new templates - recommended by recruiters",
    cta: "View templates",
  },
  {
    title: "Blog",
    iconId: "blog",
    description:
      "Updates about salary, benefits, working policies, and careers in IT",
    cta: "Explore blog",
  },
];

export const HOMEPAGE_TOP_EMPLOYERS = [
  {
    title: "LG Electronics Development Vietnam (LGEDV)",
    skills: [...HOMEPAGE_SKILLS_TRENDING],
    location: "Ha Noi - Ho Chi Minh city - Others",
    jobsCount: 6,
  },
  {
    title: "TOP IT VIET",
    skills: [...HOMEPAGE_SKILLS_TRENDING],
    location: "Others",
  },
];

export const HOMEPAGE_FEATURE_ARTICLES = [
  {
    title:
      'ITviec releases "IT Salary Report 2023-2024: Data-driven for better decision making"',
    description:
      "Đọc bản tiếng Việt tại đây. ITviec is excited to announce the launch of our IT salary report: “Salary & Job Expectation of IT Professionals...",
    link: "itviec-it-salary-report-2023-2024-press-release",
    image:
      "https://itviec.com/blog/wp-content/uploads/2023/12/itviec-it-salary-report-2023-2024-mini-press-realease-en-vippro-950x500.png",
    isHighlight: true,
  },
  {
    title: "Spring là gì? Spring Framework là gì?",
    description:
      "Spring Framework giúp lập trình viên dễ dàng tạo các ứng dụng Java Enterprise (Java EE) và cung cấp mọi thứ bạn cần để sử dụng ngôn ngữ Java. Là mã nguồn mở, Spring có cộng đồng rộng lớn và năng động, phản hồi liên tục dựa trên nhiều trường hợp sử dụng thực tế. Điều này đã giúp Spring phát triển thành công và trở thành một nguồn kiến thức mà bất kỳ lập trình viên nào cũng cần hiểu rõ.",
    link: "spring-framework-la-gi",
    image:
      "https://itviec.com/blog/wp-content/uploads/2024/02/spring-framework-blog-thumbnail-vippro.jpg",

    isHighlight: false,
  },
  {
    title: "Bí quyết xây dựng quy trình tuyển dụng giúp tăng tỷ lệ thành công",
    description:
      "Việc xây dựng một quy trình tuyển dụng chỉ dựa vào nhu cầu tìm kiếm nhân tài của công ty mà không cân nhắc hành vi tìm kiếm và ứng tuyển của ứng viên IT thường sẽ xa rời thực tế và khó đạt được hiệu quả. Bài viết sau đây sẽ gợi ý cho những nhà tuyển dụng IT các bí quyết xây dựng quy trình tuyển dụng dựa trên chính hành vi tìm việc hiện nay của chuyên gia IT tại Việt Nam.",
    link: "bi-quyet-xay-dung-quy-trinh-tuyen-dung",
    image:
      "https://itviec.com/blog/wp-content/uploads/2024/01/quy-trinh-tuyen-dung-blog-vippro-1600x842.webp",
    isHighlight: false,
  },
  {
    title:
      "Những điều cần biết về jQuery – Thư viện Javascript hàng đầu thế giới",
    description:
      "jQuery là gì? Trong danh sách các công cụ và thư viện cho lập trình viên, jQuery nổi bật là một thư viện JavaScript mạnh mẽ và linh hoạt, được sử dụng rộng rãi trong cộng đồng phát triển web. Với khả năng giảm độ phức tạp của mã nguồn, jQuery đã trở thành một công cụ hữu ích cho việc thao tác DOM, xử lý sự kiện, và tương tác Ajax một cách hiệu quả.",
    link: "jquery-la-gi",
    image:
      "https://itviec.com/blog/wp-content/uploads/2024/01/jquery-la-gi-blog-thumbnail-vippro.jpg",
    isHighlight: false,
  },
  {
    title:
      "Salesforce Developer là gì? Lộ trình sự nghiệp Salesforce Developer 2024",
    description:
      "Với nhu cầu tuyển dụng ngày càng tăng đối với vị trí Salesforce Developer, cơ hội phát triển tại vị trí Salesforce Developer là không giới hạn. Trong bài viết này, hãy cùng khám phá cơ hội nghề nghiệp hấp dẫn dành cho các nhà phát triển Salesforce, cũng như vai trò và trách nhiệm, những kỹ năng cần thiết, các chứng chỉ cần theo đuổi và roadmap để bạn có thể bắt đầu hành trình Salesforce thú vị vào năm 2024!.",
    link: "itviec-it-salary-report-2023-2024-press-release",
    image:
      "https://itviec.com/blog/wp-content/uploads/2024/01/salesforce-developer-la-gi-blog-vippro-950x500.png",
    isHighlight: false,
  },
];

// Profile.tsx
export const PROFILE_NAV_LINK_ITEMS: ProfileNavLinkItemsType = [
  { to: "/profile", label: "Profile" },
  { to: "/profile/manage-cv", label: "Manage CV" },
  { to: "/profile/job-preferences", label: "Job Preferences" },
];

export const PROFILE_UPDATE_PROFILE_CTA: string[] = [
  "Add About Me",
  "Add Education",
  "Add Contact Information",
  "Add Work Experience",
  "Add Skills",
  "Add Certificates",
  "Add Awards",
  "Add Personal Projects",
];

export const PROFILE_CONTACT_INFORMATION: UserInformationType = {
  image_url: "src/assets/profile-avatar.jpg",
  name: "Le Phuoc Thanh",
  title: "Front end developer intern",
  email: "thanhlp18@gmail.com",
  phone: "0795442122",
  birthday: "18/08/2002",
  gender: "Male",
  location: "TP Hồ Chí Minh",
  website: "https://fontawesome.com/icons/globe?f=classic&s=solid",
};

export const PROFILE_DATA_CATEGORY: ProfileCategoryType = {
  aboutMe: {
    title: "About Me",
    id: "about-me",
    description: "Introduce your strengths and years of experience",
  },
  education: {
    title: "Education",
    id: "education",

    description: "Share your background education",
  },
  workExperience: {
    title: "Work Experience",
    id: "work-experience",
    description: "Highlight detailed information about your job history",
  },
  skills: {
    title: "Skills",
    id: "skills",
    description: "Showcase your skills and proficiencies",
  },
  personalProjects: {
    title: "Personal Project",
    id: "personal-project",
    description: "Showcase your skills and proficiencies",
  },
  certificates: {
    title: "Certificates",
    id: "certificates",
    description: "Provides evidence of your specific expertise and skills",
  },
  awards: {
    title: "Awards",
    id: "awards",
    description: "Highlight your awards or recognitions",
  },
  coverLetter: {
    title: "Cover Letter",
    id: "cover-letter",
    description: "Introduce yourself and why you'd make a great hire",
  },
};

export const PROFILE_JOB_PREFERENCES_SKILLS: ComponentSelectionWithSearchType[] =
  [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "Python" },
    { id: 3, name: "Java" },
    { id: 4, name: "C++" },
    { id: 5, name: "C#" },
    { id: 6, name: "Ruby" },
    { id: 7, name: "Go" },
    { id: 8, name: "Swift" },
    { id: 9, name: "TypeScript" },
    { id: 10, name: "Kotlin" },
    { id: 11, name: "Rust" },
    { id: 12, name: "PHP" },
    { id: 13, name: "HTML" },
    { id: 14, name: "CSS" },
  ];

export const PROFILE_JOB_PREFERENCES_SKILLS_STRING: string[] = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "TypeScript",
  "Kotlin",
  "Rust",
  "PHP",
  "HTML",
  "CSS",
];

export const PROFILE_JOB_LEVELS: ProfileJobLevelType[] = [
  {
    id: "job-level-fresher",
    text: "Fresher (0 - 10 months of experience)",
  },
  {
    id: "job-level-junior",
    text: "Junior (10 - 36 months of experience)",
  },
  {
    id: "job-level-senior",
    text: "Senior (37 - 60 months of experience)",
  },
  {
    id: "job-level-manager",
    text: "Manager (> 60 months of experience)",
  },
];

export const PROFILE_CURRENT_SALARY_CURRENCY: {
  label: string;
  value: string;
}[] = [
  { label: "VND", value: "VND" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
];

export const PROFILE_WORKING_TYPE: string[] = ["At office", "Remote", "Hybrid"];
export const PROFILE_COMPANY_TYPE: string[] = [
  "IT Product",
  "IT Outsourcing",
  "Headhunt",
  "It Service and Consulting",
  "Non-IT",
];
export const PROFILE_COMPANY_SIZE: string[] = [
  "1-50",
  "51-150",
  "151-300",
  "301-500",
  "501-1000",
  "1000+",
];

export const SELECT_MONTH_OF_YEAR: { label: string; value: string }[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

export const SELECT_YEAR: { label: string; value: string }[] = [
  { value: "2000", label: "2000" },
  { value: "2001", label: "2001" },
  { value: "2002", label: "2002" },
  { value: "2003", label: "2003" },
  { value: "2004", label: "2004" },
  { value: "2005", label: "2005" },
  { value: "2006", label: "2006" },
  { value: "2007", label: "2007" },
  { value: "2008", label: "2008" },
  { value: "2009", label: "2009" },
  { value: "2010", label: "2010" },
  { value: "2011", label: "2011" },
  { value: "2012", label: "2012" },
  { value: "2013", label: "2013" },
  { value: "2014", label: "2014" },
  { value: "2015", label: "2015" },
  { value: "2016", label: "2016" },
  { value: "2017", label: "2017" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];

export const BASE_URL_API = "http://101.101.96.43";
export const URL_API_LOGIN = `${BASE_URL_API}/api`;
export const URL_API_PROFILE = `${BASE_URL_API}/api/profile`;
export const URL_API_ABOUT_ME = `${BASE_URL_API}/api/profiles/aboutMe`;
export const URL_API_EDUCATION = `${BASE_URL_API}/api/profiles/educations`;
export const URL_API_EXPERIENCE = `${BASE_URL_API}/api/profiles/experiences`;
export const URL_API_SKILLS = `${BASE_URL_API}/api/profiles/skills`;
export const URL_API_PERSONAL_PROJECT = `${BASE_URL_API}/api/profiles/projects`;
export const URL_API_AWARDS = `${BASE_URL_API}/api/profiles/awards`;
export const URL_API_CERTIFICATES = `${BASE_URL_API}/api/profiles/certificates`;
