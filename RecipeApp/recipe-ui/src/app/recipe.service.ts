import { Injectable } from '@angular/core';
import { Recipes } from './recipe';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  private recipesURL = '/api/Recipes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getRecipes(): Observable<Recipes[]> {
    return this.http
      .get<Recipes[]>(this.recipesURL)
      .pipe(catchError(this.handleError<Recipes[]>('getRecipes', [])));
  }

  getRecipe(id: number): Observable<Recipes> {
    const url = `${this.recipesURL}/${id}`;
    return this.http
      .get<Recipes>(url)
      .pipe(catchError(this.handleError<Recipes>(`getRecipe id=${id}`)));
  }

  editRecipe(recipe: Recipes): Observable<HttpResponse<any>> {
    return this.http
      .put(this.recipesURL, recipe, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(catchError(this.handleError<any>('editRecipe')));
  }

  createRecipe(Recipe: Recipes): Observable<HttpResponse<Recipes>> {
    return this.http
      .post<Recipes>(this.recipesURL, Recipe, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError(this.handleError<HttpResponse<Recipes>>('create_Recipe'))
      );
  }

  deleteRecipe(id: number): Observable<HttpResponse<any>> {
    const url = `${this.recipesURL}/${id}`;

    return this.http
      .delete<any>(url, { ...this.httpOptions, observe: 'response' })
      .pipe(catchError(this.handleError<any>('deleteRecipe')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
