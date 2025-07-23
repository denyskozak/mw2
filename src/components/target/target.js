import './target.css';

export const Target = props => (
  <div
    id="target"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "25px",
      height: "25px",
      transform: "translate(-50%, -50%)",
      display: "none", // Hidden by default
      pointerEvents: "none",
      zIndex: 1000,
    }}
  >
    <div className="crosshair not-targeted" id="targetImage" />
  </div>
)