'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { getWorkoutCategories } from '@/backend/workoutCategories/workoutCategories.service';
import workoutCategories from '@/backend/workoutCategories/workoutCategories.model';
import { FaRegCircle } from 'react-icons/fa';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  const [categories, setCategories] = useState<workoutCategories[]>([]); // Use the workoutCategories model in the state

   useEffect(() => {
    // Fetch the workout categories and update the state
    const fetchCategories = async () => {
      try {
        const response = await getWorkoutCategories();
        const workoutCategoriesMap = response.map(
          (data: any) => new workoutCategories(data.category, data.imageUrl, data.priority)
        );
        setCategories(workoutCategoriesMap);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  if (!isMainPage) {
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
          <CategoryBox 
            label={item.category}
            imageUrl={item.imageUrl}
            selected={category === item.category}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;