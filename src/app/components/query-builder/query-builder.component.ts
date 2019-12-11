import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChildren, QueryList, ElementRef, ViewChild, Renderer, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnChanges, OnInit {
  @Input() data = { rules: [] }
  @Input() config = { fields: {} }
  @Input() allowRuleset: boolean = false;
  @Input() parentData: any;
  @ViewChildren('attendee') attendeeInputs: QueryList<ElementRef>;
  @Output() getId = new EventEmitter<any>();

  setId = 0;

  public fields = {};

  constructor(private renderer: Renderer) {
  }


  ngOnInit() {
    console.log("ng on init")
  }

  ngAfterViewInit(): void {
    console.log("attendeeInputs", this.attendeeInputs)
    this.attendeeInputs.forEach((s: ElementRef, i) => {
      console.log(s.nativeElement, i)
    })
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
      id: field.id + " " + addRandomId,
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

  onClick(event: string, field?: object) {
    console.log(field, event, this.data)
    this.setId = field['id'];
    console.log("id", this.setId);

    this.getId.emit(this.setId);
  }

  valueChange(e) {
    console.log("valueChange", e);
    this.setId = e;
    this.getId.emit(this.setId);
    // this.attendeeInputs.forEach((s: ElementRef, i) => {
    //   console.log(s.nativeElement, i)
    //   // this.renderer.setElementStyle(s.nativeElement, "background", "yellow");
    //   // this.renderer.setProperty(this.zipEl.nativeElement, 'value', '94085');
    // });

  }
  updateValue() {
    console.log("updateValue", this.setId);
    this.search(this.data.rules);
    this.attendeeInputs.forEach((s: ElementRef, i) => {
      // console.log(s.nativeElement, i)
      this.renderer.setElementStyle(s.nativeElement, "background", "yellow");
      // this.renderer.setProperty(this.zipEl.nativeElement, 'value', '94085');
    });
  }

  search(rules) {
    rules.forEach((element, index) => {
      if (element.id === this.setId) {
        console.log("found", element);
        element.value = "Update some text" + this.addRandomId();
        return false
      }
      if (element.rules) {
        this.search(element.rules);
      }
    });
  }
}
