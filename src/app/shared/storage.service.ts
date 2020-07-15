import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap } from 'rxjs/operators'


@Injectable({providedIn:"root"})
export class StorageService{

    
    constructor(private http:HttpClient,private recipeService:RecipeService){
    }
    saveRecipe(){
        const recipe = this.recipeService.recipeFunc()
        this.http.put('https://recipe-app-b1b6a.firebaseio.com/recipes.json',recipe)
            .subscribe(res=>{
                console.log(res);
            })
    }

    getRecipe(){
       return this.http.get<Recipe[]>('https://recipe-app-b1b6a.firebaseio.com/recipes.json')
            .pipe(
                map(response=>{
                return response.map(ele=>{
                    return {
                        ...ele, 
                        ingredient : ele.ingredient ? ele.ingredient : []
                    };
                });
            }),
            tap(res=>{
                this.recipeService.setRecipe(res);
            })
            )
    }
}