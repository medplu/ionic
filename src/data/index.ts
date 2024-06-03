// index.ts

interface Person {
    id: number;
    name: string;
    image: string;
    cover: string;
    location: string;
    purchased: number;
    wished: number;
    likes: string;
  }
  
  interface Collection {
    name: string;
    image: string;
    no: number;
  }
  
  export const people: Person[] = [
    // ... your people data
    {
      id: 1,
      name: "Jane Doe",
      image: "/assets/avatar1.png",
      cover: "/assets/flower.jpeg",
      location: "Belfast, Northern Ireland",
      purchased: 120,
      wished: 271,
      likes: "12K"
    },
    // ... rest of the people
  ];
  
  export const collections: Collection[] = [
    // ... your collections data
    {
      name: "Winter",
      image: "/assets/winter.png",
      no: 95
    },
    // ... rest of the collections
  ];
  
  export const tags: string[] = ["Jackets", "Shirts", "Jeans", "Sweaters", "Coats"];