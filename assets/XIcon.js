import * as React from "react";
// import { Svg } from "expo";
import { Svg, Path } from "react-native-svg";
import colors from "../components/ui/CustomColors";

function svgConfig(props) {
  return (
    <Svg
      width="32"
      height="32"
      fill={colors.bs.danger}
      className="prefix__bi prefix__bi-x-circle"
      viewBox="0 0 16 16"
      {...props}
    >
      <Path d="M8 15A7 7 0 118 1a7 7 0 010 14m0 1A8 8 0 108 0a8 8 0 000 16" />
      <Path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708" />
    </Svg>
  );
}

const XIcon = React.memo(svgConfig);
export default XIcon;
