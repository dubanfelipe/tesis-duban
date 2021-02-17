import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent} from './components/home/home.component';

const appRoutes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full" },
];
export const routing = RouterModule.forRoot(appRoutes);