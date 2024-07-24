import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FullRecipeComponent } from './full-recipe/full-recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'ingredients', component: IngredientsListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/add', component: RecipeListComponent },
  { path: 'recipes/delete/:id', component: RecipeListComponent },
  { path: 'recipes/edit/:id', component: RecipeListComponent },
  { path: 'recipe/view/:id', component: FullRecipeComponent },
  { path: 'recipe/add', component: AddRecipeComponent },
  { path: 'recipe/edit/:id', component: EditRecipeComponent },
  { path: 'recipe/delete/:id', component: DeleteRecipeComponent },
  { path: 'ingredients/edit/:id', component: IngredientsListComponent },
  { path: 'ingredients/add', component: IngredientsListComponent },
  { path: 'ingredients/delete/:id', component: IngredientsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
