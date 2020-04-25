import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeKey;
  @Input() index;
  constructor() { }

  ngOnInit(): void {
  }


}
