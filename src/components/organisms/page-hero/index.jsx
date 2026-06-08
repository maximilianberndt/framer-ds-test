import { uiStore } from "@/stores/ui-store";

export const PageHero = ({ title, description, button, media }) => {
  const count = uiStore((store) => store.count);

  return (
    <section className="w-full flex flex-col gap-40 pt-120 px-80 pb-80">
      <div className="flex flex-row justify-between items-end">
        <div className="flex max-w-400">
          <h1 className="text-[10rem] font-bold leading-[0.9] tracking-tight">
            {title} {count}
          </h1>
        </div>
        <div className="flex">
          <div className="flex flex-col items-start gap-24 max-w-300">
            <p className="text-[1.6rem] leading-[1.6] text-neutral-500">
              {description}
            </p>
            {button}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full">{media}</div>
      </div>
    </section>
  );
};
