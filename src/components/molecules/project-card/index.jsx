import clsx from "clsx";

export const ProjectCard = ({ title, description, image, link }) => {
  const href = link?.href;
  const target = link?.target ?? "_self";

  const content = (
    <>
      {image?.src && (
        <div className="aspect-4/3 w-full overflow-hidden bg-neutral-100">
          <img
            className="h-full w-full object-cover"
            src={image.src}
            alt={image.alt ?? title ?? ""}
          />
        </div>
      )}
      <div className="flex flex-col gap-16">
        {title && <p className="type-m font-medium text-black">{title}</p>}
        {description && (
          <p className="type-m text-neutral-500">{description}</p>
        )}
      </div>
    </>
  );

  if (!href) {
    return (
      <article className="flex w-400 shrink-0 flex-col gap-24">
        {content}
      </article>
    );
  }

  return (
    <article className="flex w-400 shrink-0 flex-col gap-24">
      <a
        className={clsx(
          "flex flex-col gap-24 text-black no-underline select-none",
          "transition-opacity hover:opacity-80",
        )}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    </article>
  );
};
