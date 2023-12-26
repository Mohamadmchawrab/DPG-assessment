// An individual item with name, days left to sell (sellIn), and quality.
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  // Constructor to initialize item properties
  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
// The implemented way does not follow any design pattern while coding.
// Strategy Pattern to define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
// The update strategy interface to be applied to all update cases we have
interface UpdateStrategy {
  (item: Item): void;
}

export class GildedRose {
  items: Item[];

  // Constructor to initialize items array
  constructor(items: Item[] = []) {
    this.items = items;
  }

  // Normal Item Update Strategy
  normalItemUpdateStrategy: UpdateStrategy = (item: Item) => {
    // Decrement quality, twice if sellIn has passed
    const qualityDecrement = item.sellIn <= 0 ? 2 : 1;
    item.quality = item.quality - qualityDecrement;
  };

  // Aged Brie Update Strategy
  agedBrieUpdateStrategy: UpdateStrategy = (item: Item) => {
    // Increase quality, twice if sellIn has passed
    item.quality = item.quality + 1;
    if (item.sellIn <= 0) {
      item.quality = item.quality + 1;
    }
  };

  // Backstage Passes Update Strategy
  backstagePassesUpdateStrategy: UpdateStrategy = (item: Item) => {
    if (item.sellIn <= 0) {
      // Quality drops to 0 after the concert
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      // Quality increases by 3 when there are 5 or fewer days left
      item.quality = item.quality + 3;
    } else if (item.sellIn <= 10) {
      // Quality increases by 2 when there are 10 or fewer days left
      item.quality = item.quality + 2;
    } else {
      // Quality increases by 1 when there are more than 10 days left
      item.quality = item.quality + 1;
    }
  };

  // Conjured Item Update Strategy
  conjuredItemUpdateStrategy: UpdateStrategy = (item: Item) => {
    // Decrement quality, twice if sellIn has passed
    const qualityDecrement = item.sellIn <= 0 ? 4 : 2;
    item.quality = item.quality - qualityDecrement;
  };

  // Sulfuras Update Strategy
  sulfurasUpdateStrategy: UpdateStrategy = () => {
    // Legendary item, no need to update
  };

  // Update the quality of all items
  updateQuality = (): Item[] => {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // Get the appropriate update strategy for the item
      const updateStrategy = this.getUpdateStrategy(item);
      // Apply the update strategy to the item
      updateStrategy(item);

      // Update common properties for all items except Sulfuras
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        // Decrease the number of days left to sell (sellIn)
        item.sellIn -= 1;
        // Bound quality between 0 and 50
        item.quality = Math.max(0, Math.min(item.quality, 50));
      }
    }
    return this.items;
  };

  // Factory Pattern object creating different objects an interface for creating objects in a superclass
  // Selects the appropriate update strategy based on the item's name
  getUpdateStrategy = (item: Item): UpdateStrategy => {
    switch (item.name) {
      case "Aged Brie":
        return this.agedBrieUpdateStrategy;
      case "Backstage passes to a TAFKAL80ETC concert":
        return this.backstagePassesUpdateStrategy;
      case "Sulfuras, Hand of Ragnaros":
        return this.sulfurasUpdateStrategy;
      case "Conjured":
        return this.conjuredItemUpdateStrategy;
      default:
        // Default to the normal item update strategy
        return this.normalItemUpdateStrategy;
    }
  };
}
