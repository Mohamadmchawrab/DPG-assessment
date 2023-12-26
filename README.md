# GildedRose Refactoring

## Overview
The GildedRose project is a refactoring exercise aimed at improving the maintainability and extensibility of the existing codebase. The original code lacked a clear design pattern and structure, making it challenging to add new features or modify existing ones. In this refactoring, the code has been redesigned using the Strategy Pattern and Factory Pattern to enhance flexibility and maintainability.

## Changes Made

### 1. Introduction of the `Item` Class

An `Item` class was introduced to encapsulate the properties of each item, including its name, days left to sell (`sellIn`), and quality. This improves code readability and adheres to the principles of object-oriented programming.

```typescript
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

### 2. Strategy Pattern Implementation

A Strategy Pattern has been applied to define a family of algorithms (update strategies) and make them interchangeable. The `UpdateStrategy` interface defines a common method signature for all update strategies.

```typescript
interface UpdateStrategy {
  (item: Item): void;
}


## Update Strategies

- **Normal Item Update Strategy**: Handles the update logic for normal items.
- **Aged Brie Update Strategy**: Handles the update logic for "Aged Brie."
- **Backstage Passes Update Strategy**: Handles the update logic for "Backstage Passes."
- **Conjured Item Update Strategy**: Handles the update logic for "Conjured" items.
- **Sulfuras Update Strategy**: Handles the update logic for the legendary item "Sulfuras."

### 3. Factory Pattern Implementation

A Factory Pattern has been implemented to create different update strategy objects based on the item's name. The `GildedRose` class utilizes the `getUpdateStrategy` method to select the appropriate update strategy for each item.

```typescript
getUpdateStrategy = (item: Item): UpdateStrategy => {
  // ... (implementation details)
};

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

Mocha

```sh
npm run test:mocha
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


