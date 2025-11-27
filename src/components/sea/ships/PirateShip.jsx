// src/components/sea/ships/PirateShip.jsx
import React, { useRef } from "react";
import { showStory } from "./ShipStoryOverlay";
import { useShipAnimation } from "../useShips";
// import { useShipAnimation } from "../../useShips";
// import { showStory } from "../ShipStoryOverlay";

export default function PirateShip() {
  const ref = useRef();
  useShipAnimation(ref, "C");

  return (
    <g ref={ref} style={{ cursor: "pointer" }} onClick={showStory}>
      <svg
        height="87px"
        width="87px"
        viewBox="0 0 511.672 511.672"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full pirate ship SVG pasted here */}
        <path
          style={{ fill: "#ED5564" }}
          d="M227.674,44.901c0,0,0.047-0.031,0.141-0.109c-0.031,0.031-3.342,2.437-9.088,3.514 c-7.745,1.437-16.208-0.109-25.14-4.591c-31.386-15.771-68.175-0.968-69.721-0.344l0.016,0.062c-3.88,1.593-6.621,5.403-6.621,9.869 c0,5.887,4.771,10.649,10.657,10.649c1.694,0,3.295-0.406,4.716-1.109c4.466-1.624,30.816-10.416,51.381-0.078 c10.954,5.497,20.706,7.371,28.919,7.371c17.028,0,27.42-8.073,28.044-8.573L227.674,44.901z"
        />
        {/* ... rest of pirate ship ... */}
        <path
          style={{ fill: "#CCD1D9" }}
          d="M213.199,271.085c-0.008-5.871-4.778-10.649-10.665-10.649s-10.657,4.778-10.657,10.665h21.322 L213.199,271.085L213.199,271.085z"
        />
      </svg>
    </g>
  );
}
