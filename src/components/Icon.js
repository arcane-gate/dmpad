import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./Icon.scss";

const Icon = ({ name, pack = "ant", size = "24px" }) => {
  const [iconSvg, setIconSvg] = useState(<div />);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import("react-game-icons").then((icons) => {
      setIconSvg(icons[name]());
      setLoading(false);
    });
  }, [name]);
  const style = { "--icon-size": size };
  return (
    <span className="c-Icon" style={style}>
      {loading && <LoadingOutlined />}
      {!loading && iconSvg}
    </span>
  );
};

export default Icon;
