import { Zoomies } from "ldrs/react";
import "ldrs/react/Zoomies.css";

const Loader = () => {
  return (
    <main className="absolute top-0 left-0 z-50 flex items-center justify-center w-full overflow-hidden bg-background h-dvh">
      <Zoomies size="40" bgOpacity="0.1" speed="1.75" color="#8c5cff" />
    </main>
  );
};

export default Loader;
