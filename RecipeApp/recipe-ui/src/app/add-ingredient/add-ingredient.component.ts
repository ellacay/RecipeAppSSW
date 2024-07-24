import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredients';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.css',
})
export class AddIngredientComponent {
  private subscription: Subscription = new Subscription();

  constructor(
    private activeModal: NgbActiveModal,
    private ingredientsService: IngredientsService,
    private router: Router
  ) {}

  error: string = '';
  ingredients: Ingredient[] = [];

  createIngredient(name: string, kj: number, unit: string) {
    this.error = '';
    name = name.trim();
    unit = unit.trim();

    if (name.length === 0 || Number.isNaN(kj) || unit.length === 0) {
      this.error = 'Error: An ingredient cannot be added with blank values.';
    } else if (kj < 0) {
      this.error =
        "Error: An ingredient's Kilojoules per unit must be equal to or greater than 0";
    } else {
      const subscriptionCreateIngredient = this.ingredientsService
        .createIngredient({ name, kj, unit } as Ingredient)
        .subscribe((response: HttpResponse<Ingredient>) => {
          if (response.body != null) {
            const ingredient: Ingredient = response.body;
            this.ingredients.push(ingredient);
          }
        });
      this.subscription.add(subscriptionCreateIngredient);
      this.close();
    }
  }

  close() {
    this.activeModal.close(AddIngredientComponent);
    this.router.navigate(['/ingredients']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
