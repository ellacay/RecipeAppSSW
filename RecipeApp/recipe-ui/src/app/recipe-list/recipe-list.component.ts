import { Component } from '@angular/core';
import { Recipes } from '../recipe';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteRecipeComponent } from '../delete-recipe/delete-recipe.component';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipes[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private recipeService: RecipeService
  ) {}
  ngOnInit() {
    this.getRecipes();
  }

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteRecipeComponent);
    modalRef.componentInstance.selectedIngredient = id;
  }

  getRecipes(): void {
    this.recipeService
      .getRecipes()
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
