import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { Macbook16Model } from "../models/macbook-16";
import { Macbook14Model } from "../models/macbook-14";

type Props = {
  scale: number;
  isMobile: boolean;
};

export function ModelSwitcher({ scale, isMobile }: Props) {
  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    // azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <Macbook16Model scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <Macbook14Model scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}
