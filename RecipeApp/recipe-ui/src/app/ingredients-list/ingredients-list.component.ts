import { Component, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../ingredients';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';
import { DeleteIngredientComponent } from '../delete-ingredient/delete-ingredient.component';
import { EditIngredientComponent } from '../edit-ingredient/edit-ingredient.component';
import { IngredientsService } from '../ingredients.service';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css'],
})
export class IngredientsListComponent implements OnInit {
  @Input() ingredients: Ingredient[] = [];
  @Output() selectedIngredient: Ingredient[] = [];
  ingredientsSubscription$?: Subscription;
  ingredientId: number = 0;
  ingredientSearchData$!: Observable<Ingredient[]>;
  private searchTerms = new Subject<string>();
  searchResults: Ingredient[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ingredientsService: IngredientsService,
    private route: ActivatedRoute
  ) {}

  ngDoCheck() {
    if (!this.searchTerm) {
      this.getIngredients();
    }
  }

  ngOnInit(): void {
    this.getIngredients();
    this.ingredientSearchData$ = this.searchTerms.pipe(
      switchMap((term: string) =>
        this.ingredientsService.searchIngredients(term)
      )
    );
    this.ingredientSearchData$.subscribe({
      next: (data) => {
        this.searchResults = data;
        this.ingredients = data;
      },
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.ingredientId = +id;
      }
    });
    const path = this.router.url;
    const pathWithoutID = this.router.url.slice(0, -1);
    if (path === '/ingredients/add') {
      this.openAddModal();
    }
    if (pathWithoutID === '/ingredients/edit/') {
      this.openEditModal(this.ingredientId);
    }

    if (pathWithoutID === '/ingredients/delete/') {
      this.openDeleteModal(this.ingredientId);
    }

    this.ingredientSearchData$ = this.searchTerms.pipe(
      switchMap((term: string) =>
        this.ingredientsService.searchIngredients(term)
      )
    );
    this.ingredientSearchData$.subscribe({
      next: (data) => {
        this.searchResults = data;
      },
    });
  }

  getIngredients(): void {
    this.ingredientsService
      .getIngredients()
      .subscribe((ingredients) => (this.ingredients = ingredients));
  }

  openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteIngredientComponent);
    modalRef.componentInstance.selectedIngredient = id;
  }

  openAddModal(): void {
    this.modalService.open(AddIngredientComponent);
  }

  openEditModal(id: number): void {
    const modalRef = this.modalService.open(EditIngredientComponent);
    modalRef.componentInstance.selectedIngredient = id;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
