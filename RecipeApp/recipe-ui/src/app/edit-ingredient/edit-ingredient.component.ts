import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredients';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrl: './edit-ingredient.component.css',
})
export class EditIngredientComponent {
  private subscription: Subscription = new Subscription();
  ingredient?: Ingredient;
  @Input() selectedIngredient: number = 0;
  name: string = '';
  kj: number = 0;
  unit: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private ingredientsService: IngredientsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getIngredient();
  }

  getIngredient(): void {
    this.ingredientsService
      .getIngredient(this.selectedIngredient)
      .subscribe((ingredient) => {
        this.ingredient = ingredient;

        this.name = this.ingredient ? this.ingredient.name : '';
        this.kj = this.ingredient ? this.ingredient.kj : 0;
        this.unit = this.ingredient ? this.ingredient.unit : '';
      });
  }

  editIngredient(): void {
    const editedIngredient: Ingredient = {
      id: this.selectedIngredient,
      name: this.name,
      kj: this.kj,
      unit: this.unit,
    };
    const subscriptionEditIngredient = this.ingredientsService
      .editIngredient(editedIngredient)
      .subscribe();
    this.subscription.add(subscriptionEditIngredient);
    this.close();
  }

  close() {
    this.activeModal.close(EditIngredientComponent);
    this.router.navigate(['/ingredients']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
