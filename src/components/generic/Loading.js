import Loader from "react-loader-spinner";
import Fade from "react-reveal/Fade";
import "./Loading.scss";

const style = {
  position: "fixed",
  width: "100vw",
  height: "calc(100vh - 50px)",
  top: "50px",
  left: 0,

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const styleImg = {
  backgroundImage: "url('icon.ico')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "150px",
  height: "150px",
};

export default function LoadingImg() {
  return (
    <Fade>
      <div style={style}>
        <div className="blink-image" style={styleImg}></div>
      </div>
    </Fade>
  );
}
export function Loading() {
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
        color="#2270a0"
        height={100}
        width={100}
        timeout={2000}
      />
    </Fade>
  );
}
