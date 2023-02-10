import React, { FC } from "react";

interface StarProps {
  className?: string;
}

export const Star: FC<StarProps> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    width="35px"
    height="35px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m8 3.12 1.43 2.77.31.59.66.08 3.12.35L11.26 9l-.5.47.12.67.53 2.95-2.85-1.42-.56-.28-.57.28-2.85 1.44.53-2.95.12-.67-.5-.49-2.26-2.08 3.12-.36.66-.08.31-.59L8 3.12m0-2a.63.63 0 0 0-.57.33l-2 3.84-4.51.55a.59.59 0 0 0-.34 1l3.3 3.08-.76 4.21a.61.61 0 0 0 .62.7.65.65 0 0 0 .26-.05l4-2 4 2a.65.65 0 0 0 .29.07.61.61 0 0 0 .62-.7l-.76-4.21 3.31-3.09a.59.59 0 0 0-.34-1l-4.54-.51-2-3.84A.63.63 0 0 0 8 1.15z" />
  </svg>
);
