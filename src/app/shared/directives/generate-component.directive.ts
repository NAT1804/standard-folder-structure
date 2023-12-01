import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[emirGenerateComponent]',
})
export class GenerateComponentDirective implements AfterViewInit {
  @Input()
  public component: any;
  @Input()
  public data: any;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    if (this.component) {
      const viewContainerRef = this.viewContainerRef;
      viewContainerRef.clear();
      const componentRef: any = viewContainerRef.createComponent(
        this.component
      );
      if (this.data) {
        componentRef.instance.data = this.data;
      }
      this.changeDetectorRef.detectChanges();
    }
  }
}
