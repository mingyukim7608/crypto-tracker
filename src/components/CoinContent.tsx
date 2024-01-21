import { CoinContentBox } from "./CoinContentBox";

export const CoinContent = ({
  contents,
}: {
  contents: { title?: string; info?: string }[];
}) => {
  return (
    <CoinContentBox>
      {contents.map((content) => (
        <div>
          <span>{content.title}</span>
          <span>{content.info}</span>
        </div>
      ))}
    </CoinContentBox>
  );
};
