import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { Macbook16Model } from "../models/macbook-16";
import { Macbook14Model } from "../models/macbook-14";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  scale: number;
  isMobile: boolean;
};

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

export function ModelSwitcher({ scale, isMobile }: Props) {
  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  console.log(0, showLargeMacbook);

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);

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
