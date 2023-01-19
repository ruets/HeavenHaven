import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Slider.scss";

const Slider = ({ name,min, max,  }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 80),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="container">
      <input
        type="range"
        id= {"input1" + name}
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          document.getElementById("info1"+name).value = event.target.value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        id={"input2" + name}
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          document.getElementById("info2"+name).value = event.target.value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
            <input type="number" id={"info1" + name} defaultValue={"0"} onChange={(event) =>{
                document.getElementById("input1"+name).value = event.target.value;
            }
        }></input>
        </div>
        <div className="slider__right-value">
        <input type="number" id={"info2" + name} defaultValue={max} onChange={(event) =>{
                document.getElementById("input2"+name).value = event.target.value;
            }
        }></input>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Slider;
