import { useRef } from "react";

type Props = {
  scale: number;
  isMobile: boolean;
};

export function ModelSwitcher({ scale, isMobile }: Props) {
  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  return <>hi</>;
}
