const { extractSkills, analyzeSkillGap } = require('./app/lib/skill-extractor.js');

const resumeText = 'I have experience with Javascript, React, Node.js, and Git.';
const jobDescriptionText = 'Looking for a developer with strong skills in Javascript, React, Angular, and AWS.';

const resumeSkills = extractSkills(resumeText);
const jobDescriptionSkills = extractSkills(jobDescriptionText);
const skillGaps = analyzeSkillGap(resumeSkills, jobDescriptionSkills);

console.log('Resume Skills:', resumeSkills);
console.log('Job Description Skills:', jobDescriptionSkills);
console.log('Skill Gaps:', skillGaps);