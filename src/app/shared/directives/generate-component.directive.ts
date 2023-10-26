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
  constructor(
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    if (this.component) {
      const viewContainerRef = this.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(this.component);
      this.changeDetectorRef.detectChanges();
    }
  }
}
