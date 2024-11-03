import { SkillType } from "../type";

interface Skill {
  name: string;
  level: string;
}
export function convertSkillTypeToSkills(skillType: SkillType): Skill[] {
  const skills: Skill[] = [];

  // Add excellent skills
  skills.push(...skillType.excellent.map((name) => ({ name, level: "3" })));

  // Add intermediate skills
  skills.push(...skillType.intermediate.map((name) => ({ name, level: "2" })));

  // Add beginner skills
  skills.push(...skillType.beginner.map((name) => ({ name, level: "1" })));

  return skills;
}
