import { ApiItemDetails, ItemDetails, ApiItemPage } from '../types';

const parseItemPage = (itemPage: ApiItemPage): ItemDetails[] => {
  const items: ItemDetails[] = itemPage.items.map((item: ApiItemDetails) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      icon: item.icon_large,
      members: JSON.parse(item.members),
    };
  });
  return items;
};

export default parseItemPage;
