import React from "react";

interface SkillGapAnalysisProps {
  skillGaps: string[];
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ skillGaps }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Skill Gap Analysis</h2>
      {skillGaps && skillGaps.length > 0 ? (
        <div className="space-y-5">
          <p className="text-gray-700 text-lg">
            Based on the job description, you might want to consider improving
            your skills in the following areas:
          </p>
          <ul className="list-disc list-inside ml-6 space-y-2">
            {skillGaps.map((skill, index) => (
              <li key={index} className="text-red-500 font-semibold text-lg">
                {skill}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-6 text-lg">
            Here are some resources to help you bridge these gaps:
          </p>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li>
              <a
                href="https://www.coursera.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-medium"
              >
                Coursera
              </a>
            </li>
            <li>
              <a
                href="https://www.udemy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-medium"
              >
                Udemy
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/learning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-medium"
              >
                LinkedIn Learning
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <p className="text-gray-700 text-lg">
          No significant skill gaps identified based on the provided job
          description and your resume. Great job!
        </p>
      )}
    </div>
  );
};

export default SkillGapAnalysis;
