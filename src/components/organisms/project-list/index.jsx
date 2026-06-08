import { BlossomCarousel } from "@blossom-carousel/react";

import { ProjectCard } from "@/components/molecules/project-card";
import { SkeletonShell } from "@/components/molecules/skeleton-shell";

const FIXTURE_ITEMS = Array.from({ length: 5 }, (_, index) => ({
  id: `fixture-${index + 1}`,
  fieldData: {
    name: "Project name",
    "project-summary": `Fusce aliquet turpis at orci bibendum, non convallis justo tempor.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
Cras sit amet velit id nulla tempus dictum sit amet eu nisi.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Praes`,
    "main-project-image": {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    },
  },
}));

function ProjectListSection({ heading, items }) {
  return (
    <section className="flex w-full flex-col gap-48 px-80 py-120 overflow-clip">
      {heading && <h2 className="type-m w-fit">{heading}</h2>}

      <BlossomCarousel
        as="ul"
        className="w-[calc(100%+160px)] scroll-smooth flex gap-x-32 -ml-80 px-80"
      >
        {items?.map(({ id, fieldData }) => (
          <li key={id} role="listitem">
            <ProjectCard
              title={fieldData.name}
              description={fieldData["project-summary"]}
              image={{ src: fieldData["main-project-image"].url }}
            />
          </li>
        ))}
      </BlossomCarousel>
    </section>
  );
}

export const ProjectList = ({ heading = "Projects" }) => {
  return (
    <SkeletonShell
      name="project-list"
      show={false}
      fixture={<ProjectListSection heading={heading} items={FIXTURE_ITEMS} />}
    >
      <ProjectListSection heading={heading} items={FIXTURE_ITEMS} />
    </SkeletonShell>
  );
};
