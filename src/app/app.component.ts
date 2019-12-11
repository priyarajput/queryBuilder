import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'queryBuilder';

  public query = {
    rules: [{ "id": "Col1", "field": "Col1", "value": "1" }, { "id": "Col2", "field": "Col2", "value": "2" }, { "rules": [{ "id": "Col3", "field": "Col3 56", "value": "3 56" }] }]
  };

  public config = {
    fields: {
      col3: { id: 'Col3', field: 'Col3', value: "3" },
    }
  }

}
