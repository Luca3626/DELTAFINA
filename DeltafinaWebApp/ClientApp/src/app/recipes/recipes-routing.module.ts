import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeActualComponent } from './recipe-actual/recipe-actual.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RecipesListComponent },
    { path: 'recipes-list', component: RecipesListComponent },
    { path: 'recipes-edit', component: RecipesEditComponent },
    { path: 'recipes-edit/:id', component: RecipesEditComponent },
    { path: 'recipe-actual', component: RecipeActualComponent }
  ])],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
