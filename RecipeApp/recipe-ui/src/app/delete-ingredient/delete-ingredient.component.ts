import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredients';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-ingredient',
  templateUrl: './delete-ingredient.component.html',
  styleUrl: './delete-ingredient.component.css',
})
export class DeleteIngredientComponent {
  ingredient?: Ingredient;
  @Input() selectedIngredient: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit() {
    this.getIngredient();
  }
  getIngredient(): void {
    this.ingredientsService
      .getIngredient(this.selectedIngredient)
      .subscribe((ingredient) => {
        this.ingredient = ingredient;
      });
  }

  deleteIngredient(): void {
    const subscriptionDeleteIngredient = this.ingredientsService
      .deleteIngredient(this.selectedIngredient)
      .subscribe();
    this.subscription.add(subscriptionDeleteIngredient);
    this.close();
  }

  close() {
    this.activeModal.close(DeleteIngredientComponent);
    this.router.navigate(['/ingredients']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
