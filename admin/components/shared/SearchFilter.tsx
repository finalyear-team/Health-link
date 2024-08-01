import { useState } from 'react';

type Item = {
  id: number;
  name: string;
  category: string;
};

type Props = {
  items: Item[];
};

const SearchFilter: React.FC<Props> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredItems = items.filter(item => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (item.category.includes(categoryFilter) || categoryFilter === '')
    );
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">All Categories</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id} className="p-2 border-b">
            {item.name} - {item.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;
