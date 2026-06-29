import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { RecipeGlasswareModel } from '../../models/recipe/recipe-glassware.models'
import { FilterService } from '../../services/filter.service'
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html'
})
export class RecipesListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private recipeService: RecipeService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Aziende - Pagina';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Filters
  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = '/api/recipes/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 50;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  recipesData: RecipeGlasswareModel[] = [];
  originalRecipesData: RecipeGlasswareModel[] = [];

  async loadData() {
    this.originalRecipesData = await this.recipeService.getAll();
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalRecipesData = data.slice(0);
    //    this.update();
    //  });
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.recipesData = this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalRecipesData) {

      isOk = true;

      if (this.filterService.recipeFilters.code != null && this.filterService.recipeFilters.code.length > 0 && (c.code == null || !c.code.toString().toUpperCase().match(this.filterService.recipeFilters.code.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.recipeFilters.name != null && this.filterService.recipeFilters.name.length > 0 && (c.name == null || !c.name.toString().toUpperCase().match(this.filterService.recipeFilters.name.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.recipeFilters.note != null && this.filterService.recipeFilters.note.length > 0 && (c.note == null || !c.note.toString().toUpperCase().match(this.filterService.recipeFilters.note.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  onKey(event: any) {

    if (event.target.name == 'fCode')
      this.filterService.recipeFilters.code = event.target.value;
    else if (event.target.name == 'fName')
      this.filterService.recipeFilters.name = event.target.value;
    else if (event.target.name == 'fNote')
      this.filterService.recipeFilters.note = event.target.value;

    this.update();
  }

  //update() {
  //  const data = this.filter(this.originalRecipesData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.recipesData = this.paginate(data);
  //}

  //filter(data) {
  //  const filter = this.filterVal.toLowerCase();
  //  return !filter ?
  //    data.slice(0) :
  //    data.filter(d => {
  //      return Object.keys(d)
  //        .filter(k => this.searchKeys.includes(k))
  //        .map(k => String(d[k]))
  //        .join('|')
  //        .toLowerCase()
  //        .indexOf(filter) !== -1 || !filter;
  //    });
  //}

  sort(data: any) {
    data.sort((a: any, b: any) => {
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data: any) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key: any) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.applyFilters();
  }

  onBnNewClick() {
    this.router.navigate(['/recipes/recipes-edit']);
  }

  open(item: any) {
    this.router.navigate(['/recipes/recipes-edit/' + item.id]);
  }

  public removeFilters() {
    this.filterService.resetRecipeFilters();

    this.update();
  }

}
