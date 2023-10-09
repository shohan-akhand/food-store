import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    activatedRoutes: ActivatedRoute
  ) {
    let foodsObservable: Observable<Food[]>;
    activatedRoutes.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else foodsObservable = foodService.getAll();
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {}
}