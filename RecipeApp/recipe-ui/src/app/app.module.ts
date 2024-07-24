import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgFor } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteIngredientComponent } from './delete-ingredient/delete-ingredient.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { FullRecipeComponent } from './full-recipe/full-recipe.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsListComponent,
    DeleteIngredientComponent,
    EditIngredientComponent,
    AddIngredientComponent,
    RecipeListComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    DeleteRecipeComponent,
    FullRecipeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgFor,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
