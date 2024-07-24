import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ingredient } from './ingredients';
import { Recipes } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const Ingredients = [
      { id: 1, name: 'Black Bean', kj: 14.27, unit: 'g' },
      { id: 2, name: 'Chicken Broth', kj: 1.51, unit: 'ml' },
      { id: 3, name: 'Beef', kj: 6.28, unit: 'g' },
      { id: 4, name: 'Cauliflower', kj: 1.05, unit: 'g' },
      { id: 5, name: 'Salt', kj: 0, unit: 'g' },
      { id: 6, name: 'Olive Oil', kj: 36.99, unit: 'ml' },
      { id: 7, name: 'Tomato', kj: 0.75, unit: 'g' },
      { id: 8, name: 'Garlic', kj: 6.23, unit: 'g' },
      { id: 9, name: 'Pepper', kj: 10.67, unit: 'g' },
      { id: 10, name: 'Onion', kj: 1.76, unit: 'g' },
    ];
    const Recipes = [
      {
        id: 1,
        name: 'Oven-Braised Beef with Tomatoes and Garlic',
        instructions:
          '1. Heat oven to 150 degrees.2. Chop tomatoes in a food processor.3. Put roast in an ovenproof container with a lid.4. Pour tomatoes over roast and scatter garlic around it.5. Add a pinch of salt and pepper.6. Cook in oven for 3-4 hours',
        ingredients: [],
      },
      {
        id: 2,
        name: 'Black Bean Soup',
        instructions:
          '1. Put all ingredients in a pot. Bring to a boil and simmer for 10 minutes.2. Combine the mixture together in a blender3. Pour and serve',
        ingredients: [],
      },
      {
        id: 3,
        name: 'Cauliflower Soup',
        instructions:
          '1. Warm the olive oil in a pan then cook the onion on low for 15 minutes2. Add the cauliflower, a pinch of salt and 1/2 a cup of water3. Cover the pot, raise to medium heat and cook for 15 minutes4. Add 4 1/2 cups of water, change heat to low and cook for another 20 minutes5. Combine the mixture together in a blender.6. Add back to the pot with another 1/2 cup of water, reheat then serve with a pinch of black pepper',
        ingredients: [],
      },
    ];
    return { Ingredients, Recipes };
  }

  genIngredientId(ingredients: Ingredient[]): number {
    return ingredients.length > 0
      ? Math.max(...ingredients.map((ingredients) => ingredients.id)) + 1
      : 11;
  }

  genRecipeId(recipes: Recipes[]): number {
    return recipes.length > 0
      ? Math.max(...recipes.map((recipes) => recipes.id)) + 1
      : 11;
  }
}
