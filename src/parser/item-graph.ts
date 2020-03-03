import { ItemPriceGraph } from '../types';

const parseItemPriceGraph = (graph: ItemPriceGraph): ItemPriceGraph => {
  const { daily, average } = graph;

  Object.keys(daily).forEach(key => {
    const newKey = new Date(Number(key)).toISOString();
    daily[newKey] = daily[key];
    delete daily[key];
  });

  Object.keys(average).forEach(key => {
    const newKey = new Date(Number(key)).toISOString();
    average[newKey] = average[key];
    delete average[key];
  });

  return {
    daily,
    average,
  };
};

export default parseItemPriceGraph;
