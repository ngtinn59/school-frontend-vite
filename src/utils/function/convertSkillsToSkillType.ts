import { SkillType } from "../type";
interface Skill {
  id: number;
  name: string;
  level: string;
  profiles_id: number;
}
export function convertSkillsToSkillType(skills: Skill[]): SkillType {
  const skillType: SkillType = {
    excellent: [],
    intermediate: [],
    beginner: [],
  };

  skills.forEach((skill) => {
    switch (skill.level) {
      case "Excellent":
        if (!skillType.excellent) skillType.excellent = [];
        skillType.excellent.push(skill.name);
        break;
      case "Intermediate":
        if (!skillType.intermediate) skillType.intermediate = [];
        skillType.intermediate.push(skill.name);
        break;
      case "Beginner":
        if (!skillType.beginner) skillType.beginner = [];
        skillType.beginner.push(skill.name);
        break;
      default:
        break;
    }
  });

  return skillType;
}
