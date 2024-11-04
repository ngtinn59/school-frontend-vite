import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { ProfileDataForCV } from "../../utils/type";
import { UserInformationType } from "../../utils/type/profileType";

// Define a type for the slice state
export interface UserState {
  name: string;
  token: string;
  token_type: string;
  userProfile: ProfileDataForCV;
  userInformation: UserInformationType;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "",
  token: "",
  token_type: "",
  userInformation: {
    image_url: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    location: "",
  },
  userProfile: {
    aboutMe: { description: "", id: 0 },
    education: [],
    workExperience: [],
    skills: {},
    personalProjects: [],
    certificates: [],
    awards: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
        token_type: action.payload.token_type,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        name: "",
        token: "",
        token_type: "",
      };
    },

    updateUserInformation: (state, action) => {
      return {
        ...state,
        userInformation: {
          ...state.userInformation,
          ...action.payload,
        },
      };
    },
    updateUserProfile: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...action.payload,
        },
      };
    },

    addEducation: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          education: [...state.userProfile.education, action.payload],
        },
      };
    },
    updateEducation: (state, action) => {
      const { education } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          education: [
            ...state.userProfile.education.filter((ele) => ele.id !== education.id),
            education,
          ],
        },
      };
    },
    deleteEducation: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          education: state.userProfile.education.filter((ele) => ele.id !== action.payload),
        },
      };
    },
    addExperience: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          workExperience: [...state.userProfile.workExperience, action.payload],
        },
      };
    },
    updateExperience: (state, action) => {
      const { workExperience } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          workExperience: [
            ...state.userProfile.workExperience.filter((ele) => ele.id !== workExperience.id),
            workExperience,
          ],
        },
      };
    },
    deleteExperience: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          workExperience: state.userProfile.workExperience.filter(
            (ele) => ele.id !== action.payload
          ),
        },
      };
    },
    addPersonalProject: (state, action) => {
      const { personalProject } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          personalProjects: [...state.userProfile.personalProjects, personalProject],
        },
      };
    },
    updatePersonalProject: (state, action) => {
      const { personalProject } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          personalProjects: [
            ...state.userProfile.personalProjects.filter((ele) => ele.id !== personalProject.id),
            personalProject,
          ],
        },
      };
    },
    deleteProject: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          personalProjects: state.userProfile.personalProjects.filter(
            (ele) => ele.id !== action.payload
          ),
        },
      };
    },
    updateSkill: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          skills: action.payload,
        },
      };
    },
    addAward: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          awards: [...state.userProfile.awards, action.payload],
        },
      };
    },
    updateAward(state, action) {
      const { award } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          awards: [...state.userProfile.awards.filter((ele) => ele.id !== award.id), award],
        },
      };
    },
    deleteAward: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          awards: state.userProfile.awards.filter((ele) => ele.id !== action.payload),
        },
      };
    },
    addCertificate: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          certificates: [...state.userProfile.certificates, action.payload],
        },
      };
    },
    updateCertificate: (state, action) => {
      const { certificate } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          certificates: [
            ...state.userProfile.certificates.filter((ele) => ele.id !== certificate.id),
            certificate,
          ],
        },
      };
    },
    deleteCertificate: (state, action) => {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          certificates: state.userProfile.certificates.filter((ele) => ele.id !== action.payload),
        },
      };
    },
  },
});

export const {
  signIn,
  signOut,
  updateUserProfile,
  updateUserInformation,
  updateEducation,
  deleteEducation,
  addEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addPersonalProject,
  updatePersonalProject,
  deleteProject,
  updateSkill,
  addAward,
  updateAward,
  deleteAward,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserAuthentication = (state: RootState) => state.user;
export const getUserProfile = (state: RootState) => state.user.userProfile;
export const getUserInformation = (state: RootState) => state.user.userInformation;
export const getUserEducation = (state: RootState) => state.user.userProfile.education;
export const getToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
