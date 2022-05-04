import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appTheme')
  public themeInput: any;

  private properties: string[] = [];
  private theme!: any;
  private destroyed$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {}

  public ngOnInit(): void {
    this.themeService.theme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((theme) => {
        this.properties = Object.keys(this.themeInput);
        this.theme = theme;
        this.applyStyles();
      });
  }

  public ngOnChanges(): void {
    if (this.properties && this.theme) {
      this.applyStyles();
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public applyStyles(): void {
    this.properties.forEach((property) => {
      if (!this.themeInput[property]) {
        this.renderer2.setStyle(this.elementRef.nativeElement, property, null);
        return;
      }

      if (!this.theme[this.themeInput[property]]) {
        throw Error(`Invalid theme property: ${this.themeInput[property]}`);
      }

      this.renderer2.setStyle(
        this.elementRef.nativeElement,
        property,
        this.theme[this.themeInput[property]]
      );
      document.body.style['background-color' as any] = this.theme['bodyColor'];
    });
  }
}
