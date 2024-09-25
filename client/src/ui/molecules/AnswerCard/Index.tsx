import { Answer } from "../../../types";
import { Cn } from "../../../utils/twCn";
import Content from "../../atoms/Typography/Content/Index";

const AnswerCard: React.FC<{
  answer: Answer;
  onSelect: () => void;
  active: boolean;
}> = ({ answer, onSelect, active }) => {
  return (
    <div
      className={Cn(
        "cursor-pointer border border-light-grey rounded-md px-8 py-3 flex items-center gap-5",
        {
          "border-bright-yellow": active,
          "bg-light-cream": active,
        }
      )}
      onClick={onSelect}
    >
      <span
        className={Cn(
          "w-5 h-5 rounded-full border border-dark-grey shrink-0 inline-flex items-center justify-center bg-white grow-0",
          { "border-bright-yellow": active }
        )}
      >
        <span
          className={Cn(
            "w-1.5 h-1.5 bg-black rounded-full shrink-0 grow-0 hidden",
            { "inline-block": active }
          )}
        ></span>
      </span>
      <div className="">
        <Content className="font-[500] text-[20px] font-geologica">
          {answer.text}
        </Content>
        {answer.description && (
          <Content className="text-base text-dark-grey font-[200] font-geologica">
            {answer.description}
          </Content>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
