import { Input, Directive, HostListener, ElementRef, Renderer, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[input]'
})
export class InputDirective {

    @Input() public input: String;
    @Output() onFocusOut = new EventEmitter<any>();
    @Input() data: any = {}

    constructor(private el: ElementRef,
        private renderer: Renderer) { }

    @HostListener("focusout", ["$event"])
    public onListenerTriggered(event: any): void {
        let pos = this.el.nativeElement.selectionStart;
        console.log("event", event, this.data, "/>?>>>>>>");
        const data = {
            data: this.data,
            pos: pos
        }
        this.onFocusOut.emit(data);
        // }

        // @HostListener('change') ngOnChanges() {
        //     console.log('test');
        // }

        // @HostListener('keyup', ['$event']) onInputChange(event) {
        // get position


        // let val = this.el.nativeElement.value;
        // console.log("this.el.nativeElement.selectionStart",
        //     pos)

        // // if key is '.' and next character is '.', skip position
        // if (event.key === '.' &&
        //     val.charAt(pos) === '.') {

        //     // remove duplicate periods
        //     //   val = val.replace(duplicatePeriods, '.');

        //     this.renderer.setElementProperty(this.el.nativeElement, 'value', "////");
        //     //   this.ngModelChange.emit(val);
        //     this.el.nativeElement.selectionStart = pos;
        //     this.el.nativeElement.selectionEnd = pos;

        //     console.log("this.el.nativeElement.selectionStart",
        //         this.el.nativeElement.selectionStart,
        //         this.el.nativeElement.selectionEnd);

        // }
    }

    // @HostListener('ngModelChange', ['$event'])
    // onModelChange(event) {
    //     console.log(event);
    // }

    // @HostListener('mouseover') onMouseOver() {
    //     let part = this.el.nativeElement;
    //     console.log('mouseover', part);
    //     this.renderer.setElementStyle(part, "background", "yellow")
    //     this.renderer.setText(part, 'value');

    //     this.el.nativeElement.textContent = "kdsvjds"
    //     // this.renderer.setElementStyle(part, 'display', 'block');
    //     // this.ishovering = true;
    // }

}