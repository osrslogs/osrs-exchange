import { ItemPriceGraph } from '../../types';
import parseItemPriceGraph from '../item-graph';
import graphConfig from '../../util/test-util/graph-mock.json';

describe('parseItemPriceGraph', () => {
  it('it changes the keys correctly', async () => {
    const graph: ItemPriceGraph = parseItemPriceGraph(graphConfig.valid);
    expect(graph).toMatchSnapshot();
  });
});
