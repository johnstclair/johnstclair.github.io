import { JSX, useState } from "react";
import "../styles/Tooltip.css";

interface props {
  children: JSX.Element,
  delay: number,
  content: string,
  direction: string,
}

function Tooltip({children, delay, content, direction}: props) {
  let timeout: number;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"

      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

