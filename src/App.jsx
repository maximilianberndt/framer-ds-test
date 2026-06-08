import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Media } from "@/components/molecules/media";
import { PageHero } from "@/components/organisms/page-hero";
import { ProjectList } from "@/components/organisms/project-list";
import { Shape } from "@/components/webgl/shape";
import { WebglRoot } from "@/components/webgl/webgl-root";

function App() {
  return (
    <>
      <ProjectList />

      <Badge text="Hello" variant="Light" />

      <WebglRoot />

      <Badge text="Hello" variant="Light" />

      <PageHero
        title="Haven Station"
        description="Enabling continuous human presence in low-Earth orbit"
        button={<Button label="Get started" variant="Primary" />}
        media={
          <Media
            image={{
              src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
              alt: "Abstract gradient",
            }}
          />
        }
      />

      <Shape variant="ag-station" />
    </>
  );
}

export default App;
