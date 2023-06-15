"use client";
import workoutCategories from "@/backend/workoutCategories/workoutCategories.model";
import { getWorkoutCategories } from "@/backend/workoutCategories/workoutCategories.service";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const isClassesPage = pathname === "/classes";

  const [categories, setCategories] = useState<workoutCategories[]>([]); // Use the workoutCategories model in the state

  useEffect(() => {
    // Fetch the workout categories and update the state
    const fetchCategories = async () => {
      try {
        const response = await getWorkoutCategories();
        const workoutCategoriesMap = response.map(
          (data: any) =>
            new workoutCategories(data.category, data.imageUrl, data.priority)
        );
        setCategories(workoutCategoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!(isMainPage || isClassesPage)) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <div key={item.category}>
            <CategoryBox
              label={item.category}
              imageUrl={item.imageUrl}
              selected={category === item.category}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
