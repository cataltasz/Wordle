import Loader from "react-loader-spinner";
import Fade from "react-reveal/Fade";

const style = {
  position: "fixed",
  width: "100vw",
  height: "calc(100vh - 50px)",
  top: "50px",
  left: 0,

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
};
export default function Loading() {
  return (
    <Fade>
      <div className="loaderContainer" style={style}>
        <Loader
          type="Bars"
          color="#2270a0"
          height={100}
          width={100}
          timeout={5000}
        />
      </div>{" "}
    </Fade>
  );
}

export function LoadingSmall() {
  return (
    <Fade>
      <Loader
        type="Bars"
        color="#ADFF45"
        height={100}
        width={100}
        timeout={2000}
      />
    </Fade>
  );
}
