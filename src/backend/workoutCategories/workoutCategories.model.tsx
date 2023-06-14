export default class workoutCategories {
    category: string;
    imageUrl: string;
    priority: number;
  
    constructor(category: string, imageUrl: string, priority: number) {
      this.category = category;
      this.imageUrl = imageUrl;
      this.priority = priority;
    }
  }