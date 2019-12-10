import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnChanges, OnInit {
  @Input() data = { rules: [] }
  @Input() config = { fields: {} }
  @Input() allowRuleset: boolean = false;
  @Input() parentData = this.data;

  public fields = {};

  constructor() {
  }


  ngOnInit() {
    console.log("ng on init")
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ng On change")
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


  addRandomId(): number {
    return Math.floor(Math.random() * 100);
  }

  addRule(): void {
    const addRandomId = this.addRandomId();
    let parent = this.data;
    const field = this.fields[0];
    parent.rules = parent.rules.concat([{
      field: field.field + " " + addRandomId,
      value: field.value + " " + addRandomId
    }]);
  }

  removeRule(rule): void {
    let parent = this.data;
    parent.rules = parent.rules.filter((value, index) => index != rule);
  }

  addRuleSet(): void {
    let parent = this.data;
    parent.rules = parent.rules.concat([{ rules: [] }]);

  }

  removeRuleSet(): void {
    let parent = this.parentData;
    parent.rules = parent.rules.filter(r => r !== this.data)
  }

  getEmptyWarningContext(): object {
    return {
      $implicit: "A ruleset cannot be empty. Please add a rule or remove it all together."
    };
  }
}
