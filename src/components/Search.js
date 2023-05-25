import { createClient } from "pexels";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { sliceAction } from "./store/Slice";
const Search = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (value == "") {
      alert("Please Enter Valid Search Input");
    } else {
      const client = createClient(
        "EROlm9SI6UwJ11hwA0fJ9Uo7l3sbpDEAuwlMkskcGJUgpMjilVNw7C3Q"
      );
      const query = value;
      client.photos.search({ query, per_page: 8 }).then((response) => {
        console.log(response.photos);
        setData(response.photos);
      });
      setShow(false);
      setValue("");
      setData([]);
    }
  };
  const captionHandler = (value) => {
    dispatch(sliceAction.image(value));
    navigate("/caption");
  };
  return (
    <div className="main">
      <h1>Name: Nitin Kumar</h1>
      <h1>Email: nitinbansal481@gmail.com</h1>
      <div className="search">
        <input
          type={"text"}
          placeholder="Enter Your Search Term"
          className="inp1"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={clickHandler}
          style={{
            marginLeft: "10px",
            height: "30px",
            width: "40px",
            borderRadius: "10px",
          }}
        >
          <BsSearch />
        </button>
      </div>
      <div className="master_container">
        {data.map((ele) => {
          return (
            <div className="container" key={ele.id}>
              <img src={ele.src.original} className="image" alt="image" />
              <button
                className="caption"
                onClick={() => {
                  captionHandler(ele.src.original);
                }}
              >
                Add Caption
              </button>
            </div>
          );
        })}
      </div>
      {show && (
        <h1
          style={{
            fontWeight: "bolder",
            fontSize: "60px",
            fontFamily: "cursive",
            textAlign: "center",
          }}
        >
          Please Enter Keywords In Search Bar To Get Started
        </h1>
      )}
    </div>
  );
};
export default Search;
