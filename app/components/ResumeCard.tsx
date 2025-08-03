import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="flex flex-row justify-between items-start gap-4 mb-4">
        <div className="flex flex-col gap-1">
          {companyName && (
            <h2 className="text-xl font-bold text-gray-800 break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-base text-gray-600 break-words">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="text-xl font-bold text-gray-800">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback?.overallScore || 0} />
        </div>
      </div>
      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};
export default ResumeCard;
