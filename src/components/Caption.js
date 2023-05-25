import { useSelector } from "react-redux";
import "./Caption.css";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
const Caption = () => {
  const data = useSelector((state) => state.imageData);
  const [can, setCan] = useState();
  const [finaltext, setText] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 500,
      height: 500,
      //   backgroundColor: "red",
    });
    canvas.renderAll();
    setCan(canvas);
    fabric.Image.fromURL(data, (img) => {
      {
        img.scaleToHeight(300);
        img.scaleToWidth(320);
        img.top = 50;
        img.left = 50;
        img.crossOrigin = "Anonymous";
      }
      canvas.add(img);
      canvas.renderAll();
    });
    const text = new fabric.Textbox(finaltext, {
      width: 400,
      editable: true,
    });
    canvas.add(text);
    canvas.renderAll();
  }, []);

  const rectangleHandler = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      opacity: 0.5,
      top: 200,
      fill: "green",
    });
    can.add(rect);
    can.renderAll();
  };
  const circleHandler = () => {
    const cir = new fabric.Circle({
      radius: 50,
      left: 320,
      opacity: 0.5,
      fill: "yellow",
    });
    can.add(cir);
    can.renderAll();
  };
  const trianleHandler = () => {
    const tri = new fabric.Triangle({
      width: 100,
      height: 100,
      opacity: 0.5,
      fill: "red",
    });
    can.add(tri);
    can.renderAll();
  };
  const polygonHandler = () => {
    const pol = new fabric.Polygon(
      [
        { x: 200, y: 10 },
        { x: 250, y: 50 },
        { x: 250, y: 180 },
        { x: 150, y: 180 },
        { x: 150, y: 50 },
      ],
      { fill: "green", opacity: 0.5, left: 300, top: 150 }
    );
    can.add(pol);
    can.renderAll();
  };
  const textHandler = () => {
    setShow(true);
  };
  const SubmitHandler = () => {
    const text = new fabric.Textbox(finaltext, {
      width: 500,
      editable: true,
    });
    can.add(text);
    can.renderAll();
    setShow(false);
  };
  function saveImage(e) {
    this.href = can.toDataURL({
      format: "jpeg",
      quality: 0.8,
    });
    this.download = "canvas.png";
  }

  return (
    <div>
      <canvas id="canvas"></canvas>
      <div className="wrapper">
        <div id="objectButtonsWrapper">
          <p id="objectsTitle">Objects</p>
          <div id="objectButtons">
            <button onClick={trianleHandler} className="bttn">
              Triangle
            </button>
            <button onClick={circleHandler} className="bttn">
              Circle
            </button>
            <button onClick={rectangleHandler} className="bttn">
              Rectangle
            </button>
            <button onClick={polygonHandler} className="bttn">
              Polygon
            </button>
          </div>
        </div>
        <div>
          <button onClick={textHandler} className="btn6">
            Add Captions
          </button>
        </div>
        {show && (
          <div>
            <input
              type={"text"}
              placeholder="Enter Caption"
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="inp2"
            />
            <button
              onClick={SubmitHandler}
              className="btn6"
              style={{ marginLeft: "10px" }}
            >
              Add
            </button>
          </div>
        )}
        <div>
          {/* <button className="btn6">Download</button> */}
          <a id="lnkDownload" href="#" onClick={saveImage}>
            Save image
          </a>
        </div>
      </div>
    </div>
  );
};
export default Caption;
