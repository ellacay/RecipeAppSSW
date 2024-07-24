import { Component } from '@angular/core';

import { RECIPES } from '../mock-recipe-data';
import { Recipes } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrl: './full-recipe.component.css',
})
export class FullRecipeComponent {
  recipe?: Recipes;
  ingredientId: number = 0;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.ingredientId = +id;
      }
      this.getRecipe(this.ingredientId);
    });
  }

  getRecipe(id: number): void {
    this.recipeService.getRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
}
