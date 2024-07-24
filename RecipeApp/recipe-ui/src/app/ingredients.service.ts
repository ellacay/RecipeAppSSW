import { Injectable } from '@angular/core';
import { Ingredient } from './ingredients';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  private ingredientsURL = '/api/Ingredients';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(this.ingredientsURL)
      .pipe(catchError(this.handleError<Ingredient[]>('getIngredients', [])));
  }

  getIngredient(id: number): Observable<Ingredient> {
    const url = `${this.ingredientsURL}/${id}`;
    return this.http
      .get<Ingredient>(url)
      .pipe(catchError(this.handleError<Ingredient>(`getIngredient id=${id}`)));
  }

  editIngredient(ingredient: Ingredient): Observable<HttpResponse<any>> {
    return this.http
      .put(this.ingredientsURL, ingredient, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(catchError(this.handleError<any>('editIngredient')));
  }

  createIngredient(
    ingredient: Ingredient
  ): Observable<HttpResponse<Ingredient>> {
    return this.http
      .post<Ingredient>(this.ingredientsURL, ingredient, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError(
          this.handleError<HttpResponse<Ingredient>>('create_ingredient')
        )
      );
  }

  deleteIngredient(id: number): Observable<HttpResponse<any>> {
    const url = `${this.ingredientsURL}/${id}`;

    return this.http
      .delete<any>(url, { ...this.httpOptions, observe: 'response' })
      .pipe(catchError(this.handleError<any>('deleteIngredient')));
  }

  searchIngredients(term: string): Observable<Ingredient[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Ingredient[]>(`${this.ingredientsURL}/?name=${term}`)
      .pipe(catchError(this.handleError<Ingredient[]>('searchHeroes', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
