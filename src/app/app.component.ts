import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'queryBuilder';

  public query = {
    rules: [
      { field: 'Col1', value: "1" },
      { field: 'Col2', value: "2" }
    ]
  };

  public config = {
    fields: {
      col3: { field: 'Col3',value: "3" },
    }
  }

}
