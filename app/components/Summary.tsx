import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="flex flex-row items-center justify-between p-4 border-t border-gray-100">
      <div className="flex flex-row gap-3 items-center">
        <p className="text-xl font-medium text-gray-700">{title}</p>
        <ScoreBadge score={score} />
      </div>
      <p className="text-xl font-semibold">
        <span className={textColor}>{score}</span>/100
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full p-6 border border-gray-100">
      <div className="flex flex-row items-center pb-4 gap-6 border-b border-gray-100">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-800">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};
export default Summary;
