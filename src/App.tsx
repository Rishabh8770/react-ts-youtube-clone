import { useState } from "react";
import { CategoryPills } from "./component/CategoryPills";
import { categories, videos } from "./data/home";
import { PageHeader } from "./layouts/PageHeader";
import { VideoGridItem } from "./component/VideoGridItem";
import { SideBar } from "./layouts/SideBar";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  const [selectedCategory, SetSelectedCategory] = useState(categories[0]);
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={SetSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
