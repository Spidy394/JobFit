common_skills = [
    "javascript", "typescript", "react", "angular", "vue", "nodejs", "python",
    "java", "c++", "c#", "go", "ruby", "php", "html", "css", "sql", "nosql",
    "mongodb", "postgresql", "mysql", "aws", "azure", "google cloud", "docker",
    "kubernetes", "git", "agile", "scrum", "rest api", "graphql", "frontend",
    "backend", "fullstack", "devops", "machine learning", "data science",
    "artificial intelligence", "ui/ux", "figma", "photoshop", "excel", "word",
    "powerpoint", "communication", "teamwork", "problem-solving", "leadership",
    "project management",
]

def extract_skills(text: str) -> list[str]:
    lower_case_text = text.lower()
    found_skills = []
    for skill in common_skills:
        if skill in lower_case_text:
            found_skills.append(skill)
    return found_skills

def analyze_skill_gap(resume_skills: list[str], job_description_skills: list[str]) -> list[str]:
    skill_gaps = []
    for job_skill in job_description_skills:
        if job_skill not in resume_skills:
            skill_gaps.append(job_skill)
    return skill_gaps

resume_text = 'I have experience with Javascript, React, Node.js, and Git.'
job_description_text = 'Looking for a developer with strong skills in Javascript, React, Angular, and AWS.'

resume_skills = extract_skills(resume_text)
job_description_skills = extract_skills(job_description_text)
skill_gaps = analyze_skill_gap(resume_skills, job_description_skills)

print('Resume Skills:', resume_skills)
print('Job Description Skills:', job_description_skills)
print('Skill Gaps:', skill_gaps)