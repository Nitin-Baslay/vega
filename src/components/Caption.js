import { useSelector } from "react-redux";
import "./Caption.css";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Caption = () => {
  const data = useSelector((state) => state.imageData);
  const [can, setCan] = useState(null);
  const [finaltext, setText] = useState("");
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [imgdisabled, setImgDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 500,
      height: 500,
      selection: true,
      //   backgroundColor: "red",
    });
    setCan(canvas);
    return () => {
      canvas.dispose();
    };
  }, []);

  const imageHandler = () => {
    setImgDisabled(true);
    fabric.Image.fromURL(data, (img) => {
      {
        img.scaleToHeight(300);
        img.scaleToWidth(320);
        img.top = 50;
        img.left = 50;
        img.crossOrigin = "Anonymous";
      }
      can.add(img);
      can.renderAll();
    });
  };
  const rectangleHandler = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      opacity: 0.5,
      top: 200,
      fill: "green",
      selectable: true,
      hasControls: true,
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
      selectable: true,
      hasControls: true,
    });
    can.add(cir);
    can.renderAll();
  };
  console.log(can);
  const triangleHandler = () => {
    const tri = new fabric.Triangle({
      width: 100,
      height: 100,
      //   opacity: 0.5,
      fill: "red",
      selectable: true,
      hasControls: true,
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
      {
        fill: "green",
        opacity: 0.5,
        left: 300,
        top: 150,
        selectable: true,
        hasControls: true,
        hasBorders: true,
      }
    );
    can.add(pol);
    can.renderAll();
  };
  const TextHandler = () => {
    setShow(true);
    setDisabled(true);
  };
  const submitHandler = () => {
    const text = new fabric.Textbox(finaltext, {
      width: 400,
      editable: true,
      borderColor: "black",
    });
    can.add(text);
    can.renderAll();
    setShow(false);
    setDisabled(false);
  };
  const saveImage = () => {
    const imgdownload = can.toDataURL({
      format: "png",
      quality: 1,
    });
    const downloadFile = document.createElement("a");
    downloadFile.href = imgdownload;
    downloadFile.download = "canvas.png";
    downloadFile.click();
  };
  const backHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <button className="bttn btn25" onClick={backHandler}>
        {" "}
        Back to Home
      </button>
      <canvas id="canvas"></canvas>
      <div className="wrapper">
        <div>
          <img src={data} className="image_main"></img>
          <button className="bttn" onClick={imageHandler}>
            Add Image
          </button>
        </div>
        <div id="objectButtonsWrapper">
          <p id="objectsTitle">Objects</p>
          <div id="objectButtons">
            <button onClick={triangleHandler} className="bttn">
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
          <button onClick={TextHandler} className="btn6" disabled={disabled}>
            Add Captions
          </button>
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
                onClick={submitHandler}
                className="btn6"
                style={{ marginLeft: "10px" }}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div>
          <button onClick={saveImage} className="bttn" disabled={imgdisabled}>
            Save Image
          </button>
          {/* <a id="lnkDownload" href={download} onClick={saveImage}>
            Save image
          </a> */}
        </div>
      </div>
    </div>
  );
};
export default Caption;
