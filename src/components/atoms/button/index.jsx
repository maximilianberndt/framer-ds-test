import clsx from "clsx";

export const Button = ({ label, variant, ...rest }) => (
  <button
    {...rest}
    className={clsx(
      "inline-flex items-center px-24 py-12 text-[1.4rem] font-medium leading-none",
      variant === "Secondary"
        ? "border border-black text-black bg-transparent"
        : "bg-black text-white",
      rest.className,
    )}
  >
    {label}
  </button>
);
