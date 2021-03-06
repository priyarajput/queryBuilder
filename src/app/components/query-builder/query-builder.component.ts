import {
  Component, OnInit, Input, SimpleChanges, OnChanges,
  ViewChildren, QueryList, ElementRef, ViewChild, Renderer, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnChanges, OnInit {
  @Input() data = { rules: [] };
  @Input() config = { fields: {} };
  @Input() allowRuleset = false;
  @Input() parentData: any;
  @Input() indexRuleSet: number;
  @ViewChildren('attendee') attendeeInputs: QueryList<ElementRef>;
  @Output() getId = new EventEmitter<any>();

  charAt = 0;

  setId = 0;

  public fields = {};

  constructor(private renderer: Renderer) {
  }


  ngOnInit() {
    console.log('ng on init');
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    console.log('attendeeInputs', this.attendeeInputs);
    this.attendeeInputs.forEach((s: ElementRef, i) => {
      console.log(s.nativeElement, i);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ng On change');
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
    const parent = this.data;
    const field = this.fields[0];
    parent.rules = parent.rules.concat([{
      id: field.id + ' ' + addRandomId,
      field: field.field + ' ' + addRandomId,
      value: field.value + ' ' + addRandomId
    }]);
  }

  removeRule(rule): void {
    const parent = this.data;
    parent.rules = parent.rules.filter((value, index) => index !== rule);
  }

  addRuleSet(): void {
    const parent = this.data;
    parent.rules = parent.rules.concat([{ rules: [] }]);
  }

  removeRuleSet(): void {
    this.parentData.splice(this.indexRuleSet, 1);
  }

  getEmptyWarningContext(): object {
    return {
      $implicit: 'A ruleset cannot be empty. Please add a rule or remove it all together.'
    };
  }

  valueChange(e) {
    this.setId = e.setId;
    this.charAt = e.charAt;

    const d = {
      charAt: this.charAt,
      setId: this.setId
    };
    this.getId.emit(d);
  }

  updateValue() {
    this.search(this.data.rules);
  }

  myFunction(e) {
    this.setId = e.data.id;
    this.charAt = e.pos;
    const d = {
      charAt: this.charAt,
      setId: this.setId
    };
    this.getId.emit(d);
  }

  search(rules) {
    rules.forEach((element, index) => {
      if (element.id === this.setId) {
        element.value = [element.value.slice(0, this.charAt),
        'Update some text ' + this.addRandomId(), element.value.slice(this.charAt)].join('');
        return false;
      }
      if (element.rules) {
        this.search(element.rules);
      }
    });
  }
}
