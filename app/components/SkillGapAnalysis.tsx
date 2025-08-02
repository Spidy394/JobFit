import React from "react";

interface SkillGapAnalysisProps {
  skillGaps: string[];
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ skillGaps }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis</h2>
      {skillGaps && skillGaps.length > 0 ? (
        <div className="space-y-3">
          <p className="text-gray-700">
            Based on the job description, you might want to consider improving
            your skills in the following areas:
          </p>
          <ul className="list-disc list-inside ml-4">
            {skillGaps.map((skill, index) => (
              <li key={index} className="text-red-600 font-semibold">
                {skill}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4">
            Here are some resources to help you bridge these gaps:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <a
                href="https://www.coursera.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Coursera
              </a>
            </li>
            <li>
              <a
                href="https://www.udemy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Udemy
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/learning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn Learning
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <p className="text-gray-700">
          No significant skill gaps identified based on the provided job
          description and your resume. Great job!
        </p>
      )}
    </div>
  );
};

export default SkillGapAnalysis;
