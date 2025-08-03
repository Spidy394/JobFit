const commonSkills: string[] = [
  "javascript",
  "typescript",
  "react",
  "angular",
  "vue",
  "nodejs",
  "python",
  "java",
  "c++",
  "c#",
  "go",
  "ruby",
  "php",
  "html",
  "css",
  "sql",
  "nosql",
  "mongodb",
  "postgresql",
  "mysql",
  "aws",
  "azure",
  "google cloud",
  "docker",
  "kubernetes",
  "git",
  "agile",
  "scrum",
  "rest api",
  "graphql",
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "machine learning",
  "data science",
  "artificial intelligence",
  "ui/ux",
  "figma",
  "photoshop",
  "excel",
  "word",
  "powerpoint",
  "communication",
  "teamwork",
  "problem-solving",
  "leadership",
  "project management",
];

export function extractSkills(text: string): string[] {
  const lowerCaseText = text.toLowerCase();
  const foundSkills: string[] = [];

  for (const skill of commonSkills) {
    if (lowerCaseText.includes(skill)) {
      foundSkills.push(skill);
    }
  }

  return foundSkills;
}


export function analyzeSkillGap(
  resumeSkills: string[],
  jobDescriptionSkills: string[]
): string[] {
  const skillGaps: string[] = [];

  for (const jobSkill of jobDescriptionSkills) {
    if (!resumeSkills.includes(jobSkill)) {
      skillGaps.push(jobSkill);
    }
  }

  return skillGaps;
}
