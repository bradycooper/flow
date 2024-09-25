import { useEffect, useRef, RefObject, DependencyList } from "react";

const useScrollToView = (
  dependencies: DependencyList | undefined = []
): { ref: RefObject<HTMLDivElement> } => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, dependencies);

  return { ref };
};

export default useScrollToView;
