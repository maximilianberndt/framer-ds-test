import { uiStore } from "@/stores/ui-store";
import clsx from "clsx";

export const Badge = ({ text, variant }) => {
  const count = uiStore((store) => store.count);

  return (
    <span
      onClick={() => {
        uiStore.setState((state) => ({ count: state.count + 1 }));
      }}
      className={clsx(
        "w-fit inline-block rounded-full px-10 py-2 text-sm leading-none select-none text-center",
        variant === "Light" ? "bg-[#eee] text-black" : "bg-black text-white",
      )}
    >
      {text} {count}
    </span>
  );
};
