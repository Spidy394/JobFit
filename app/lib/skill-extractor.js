"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSkills = extractSkills;
exports.analyzeSkillGap = analyzeSkillGap;
var commonSkills = [
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
function extractSkills(text) {
    var lowerCaseText = text.toLowerCase();
    var foundSkills = [];
    for (var _i = 0, commonSkills_1 = commonSkills; _i < commonSkills_1.length; _i++) {
        var skill = commonSkills_1[_i];
        if (lowerCaseText.includes(skill)) {
            foundSkills.push(skill);
        }
    }
    return foundSkills;
}
function analyzeSkillGap(resumeSkills, jobDescriptionSkills) {
    var skillGaps = [];
    for (var _i = 0, jobDescriptionSkills_1 = jobDescriptionSkills; _i < jobDescriptionSkills_1.length; _i++) {
        var jobSkill = jobDescriptionSkills_1[_i];
        if (!resumeSkills.includes(jobSkill)) {
            skillGaps.push(jobSkill);
        }
    }
    return skillGaps;
}
