

export function search(items: any[], keyword: string): any[] {
  
    return items.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
  }
  

  export function filter(items: any[], condition: (item: any) => boolean): any[] {
    return items.filter(condition);
  }
  

  export function sort(items: any[], property: string, order: 'ascending' | 'descending' = 'ascending'): any[] {
    return items.slice().sort((a, b) => {
      if (order === 'ascending') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
  }
  