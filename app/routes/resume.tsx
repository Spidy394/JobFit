import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import SkillGapAnalysis from "~/components/SkillGapAnalysis";

export const meta = () => [
  { title: "Resumind | Review " },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto py-8 px-4 gap-8">
        <section className="lg:w-1/2 flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
          {imageUrl && resumeUrl && (
            <div className="w-full h-full max-h-[800px] rounded-xl overflow-hidden shadow-md">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain object-top rounded-xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-gray-800">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
              {feedback.skillGaps && (
                <SkillGapAnalysis skillGaps={feedback.skillGaps} />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <img src="/images/resume-scan-2.gif" className="w-40" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
