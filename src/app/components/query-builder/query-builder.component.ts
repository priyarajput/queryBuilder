import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
  @Input() data = { rules: [] }
  @Input() config = { fields: {} }
  public fields = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const config = this.config;
    const type = typeof config;
    if (type === 'object') {
      this.fields = Object.keys(config.fields).map((value) => {
        const field = config.fields[value];
        field.value = field.value || value;
        return field;
      });
    }
  }

  addRule(): void {
    let parent = this.data;
    const field = this.fields[0];
    console.log("parent", parent, field)
    parent.rules = parent.rules.concat([{
      field: field.field,
      value: field.value
    }]);
  }

  removeRule() {
    let parent = this.data;
  }

  addRuleSet(): void {
    let parent = this.data;
    parent.rules = parent.rules.concat([{ rules: [] }]);

  }

  removeRuleSet(): void {
  }

  getEmptyWarningContext() {
    return {
      $implicit: "A ruleset cannot be empty. Please add a rule or remove it all together."
    };
  }
}
