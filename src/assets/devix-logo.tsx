import clsx from "clsx";
import { memo } from "react";

function Logo({ className, title }: AssetPropTypes) {
  return (
    <svg
      className={clsx(className)}
      viewBox="0 0 90 105"
      fill="none"
      xlinkTitle={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.5 59L0 34.5V78L9.5 84L20.5 59Z" fill="currentColor" />
      <path
        d="M42 14.5L35.5 5.5L0 26.5V30L22 56.5L42 14.5Z"
        fill="currentColor"
      />
      <path d="M48.5 2L43.5 11.5L37.5 4L45 0L48.5 2Z" fill="currentColor" />
      <path d="M35 77L22.5 62L12 85L26 93L35 77Z" fill="currentColor" />
      <path
        d="M53.5 99.5L37 79.5L28 94.5L45 105L53.5 99.5Z"
        fill="currentColor"
      />
      <path d="M36.5 74L24 59L43.5 17.5L57 37L36.5 74Z" fill="currentColor" />
      <path d="M45 14.5L50 3L69 14.5L58.5 33.5L45 14.5Z" fill="currentColor" />
      <path
        d="M90 26.5L71 16L60.5 36.5L82 67.5L90 55V26.5Z"
        fill="currentColor"
      />
      <path d="M83.5 70.5L90 60L89.5 78.5L83.5 70.5Z" fill="currentColor" />
      <path
        d="M71 89L56 97.5L39 77L58.5 40L80.5 71L71 89Z"
        fill="currentColor"
      />
      <path d="M87 80L75 87L82 73.5L87 80Z" fill="currentColor" />
    </svg>
  );
}

export default memo(Logo);
