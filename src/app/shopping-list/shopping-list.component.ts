import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredient: Ingredient[];
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredient = this.shoppingService.ingredientFunc();
    this.shoppingService.ingredientChanged
      .subscribe((ingredient: Ingredient[]) => {
        this.ingredient = ingredient;
      })
  }

  

}
