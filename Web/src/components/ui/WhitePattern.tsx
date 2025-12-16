import { useState, useEffect } from "react";

const NUM_COLUMNS = 24;

export default function Whitebg() {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Handle Window Resize
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize(); // Set initial size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent rendering before hydration/calculation
  if (dimensions.width === 0) return null;

  const boxWidth = dimensions.width / NUM_COLUMNS;
  const numRows = Math.ceil(dimensions.height / boxWidth);
  const GRID_LENGTH = NUM_COLUMNS * numRows;

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <Grid
        gridLength={GRID_LENGTH}
        boxWidth={boxWidth}
        numColumns={NUM_COLUMNS}
      />
    </div>
  );
}

interface GridProps {
  gridLength: number;
  boxWidth: number;
  numColumns: number;
}

function Grid({ gridLength, boxWidth, numColumns }: GridProps) {
  return (
    <div className="flex flex-wrap w-full">
      {Array.from({ length: gridLength }).map((_, i) => {
        const row = Math.floor(i / numColumns);
        const col = i % numColumns;

        const isSecondRow = row % 2 === 1;
        const isSecondCol = col % 2 === 1;

        return isSecondRow && isSecondCol ? (
          <PlusAtVertex key={i} boxWidth={boxWidth} />
        ) : (
          <GridBox key={i} boxWidth={boxWidth} />
        );
      })}
    </div>
  );
}

interface BoxProps {
  boxWidth: number;
}

function GridBox({ boxWidth }: BoxProps) {
  return (
    <div
      style={{ width: boxWidth, height: boxWidth }}
      className="border-[0.5px] border-[#E2E2E2] box-border"
    />
  );
}

function PlusAtVertex({ boxWidth }: BoxProps) {
  return (
    <div
      style={{ width: boxWidth, height: boxWidth }}
      className="relative flex items-center justify-center border-[0.5px] border-[#E2E2E2] box-border"
    >
      <span
        className="text-[20px] text-[#3F3F3F] z-10 leading-none pointer-events-none select-none"
        style={{
          // We keep the transform in inline styles because it relies on the calculated boxWidth
          transform: `translate(${boxWidth / 2}px, -${boxWidth / 2}px)`,
        }}
      >
        +
      </span>
    </div>
  );
}
