"use client"
import { Button } from "@/component";

export default function Home() {
    const handleClick = () => {
      console.log('Button clicked');
    };
  return (
    <div>

    <Button onClick={handleClick} className='bg-primary-600 dark:bg-white dark:hover:bg-gray-100 hover:bg-primary-700 text-white dark:text-dark-700' > Primary Button </Button>
    <Button onClick={handleClick} className='bg-secondary-600 hover:bg-secondary-700 text-white dark:text-dark-700'> Secondary Button </Button>

    </div>
  );
}
