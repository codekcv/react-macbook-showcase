import clsx from "clsx";
import useMacbookStore from "../store";

export function ProductViewer() {
  const { color, scale, setColor, setScale } = useMacbookStore();

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <p className="info">
          MacBook Pro {scale} in {color} / Space Black
        </p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active"
              )}
              onClick={() => setColor("#adb5bd")}
            />

            <div
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active"
              )}
              onClick={() => setColor("#2e2c2e")}
            />
          </div>

          <div className="size-control">
            <div
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              )}
              onClick={() => setScale(0.06)}
            >
              <p>14"</p>
            </div>

            <div
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              )}
              onClick={() => setScale(0.08)}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white text-4xl">Render Canvas</p>
    </section>
  );
}
