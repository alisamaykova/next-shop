import type { IconProps } from "@components/icons/Icon";
import Icon from "@components/icons/Icon";
import React from "react";

const MoonIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  );
};

export default MoonIcon;
