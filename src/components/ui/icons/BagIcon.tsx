import React from 'react';

export const BagIcon = ({
  hasItems,
  ...props
}: React.SVGProps<SVGSVGElement> & { hasItems?: boolean }) => (
  <svg
    role="img"
    aria-label="Bag"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {hasItems ? (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.47059 0H3.76471V3.76471H0V16H12.2353V3.76471H8.47059V0ZM7.52941 3.76471V7.05882H8.47059V3.76471H7.52941ZM4.70588 3.76471V7.05882H3.76471V3.76471H4.70588ZM4.70588 3.76471H7.52941V0.941176H4.70588V3.76471Z"
        fill="black"
      />
    ) : (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4706 1.32031H6.76471V5.08502H3V17.3203H15.2353V5.08502H11.4706V1.32031ZM10.5294 6.0262V8.37914H11.4706V6.0262H14.2941V16.3791H3.94118V6.0262H6.76471V8.37914H7.70588V6.0262H10.5294ZM10.5294 5.08502V2.26149H7.70588V5.08502H10.5294Z"
        fill="black"
      />
    )}
  </svg>
);
