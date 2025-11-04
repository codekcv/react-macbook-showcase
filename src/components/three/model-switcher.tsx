import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { Macbook16Model } from "../models/macbook-16";
import { Macbook14Model } from "../models/macbook-14";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Group, Mesh, Material, Object3D } from "three";

interface Props {
  scale: number;
  isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const SCALE_LARGE_DESKTOP = 0.08;
const SCALE_LARGE_MOBILE = 0.05;

interface PresentationControlsConfig {
  snap: boolean;
  speed: number;
  zoom: number;
  azimuth: [number, number];
  config: { mass: number; tension: number; friction: number };
}

const fadeMeshes = (group: Group | null, opacity: number): void => {
  if (!group) return;

  group.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      const material = mesh.material as Material & {
        transparent?: boolean;
        opacity?: number;
      };
      material.transparent = true;
      gsap.to(material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group: Group | null, x: number): void => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

export function ModelSwitcher({ scale, isMobile }: Props) {
  const smallMacbookRef = useRef<Group | null>(null);
  const largeMacbookRef = useRef<Group | null>(null);

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  } as PresentationControlsConfig;

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
