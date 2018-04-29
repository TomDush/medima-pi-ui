import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FileController} from "../browser/file-controller.service";
import {File} from "../browser/domain";
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {

  public files$: Observable<File[]>;
  public loading: boolean = true;

  @ViewChild("searchInput", {read: ElementRef}) searchInputRef: ElementRef;

  private searchTerms = new Subject<string>();
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileController: FileController) {
  }

  public ngOnInit() {
    // Change URL while typing
    this.sub = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((pattern: string) => {
      let p = pattern ? pattern : "";
      this.router.navigate(['/search'], {queryParams: {pattern: p}});
    });

    // Search & update display
    let firstPass = true;
    this.files$ = this.route
      .queryParams
      .pipe(
        map(params => params['pattern']),
        distinctUntilChanged(),
        switchMap((pattern: string) => {
          this.loading = true;
          let obs = Observable.of([]);
          if (pattern) {
            obs = this.fileController.search(pattern);
          }

          if (firstPass) {
            setTimeout(_ => {
              this.searchInputRef.nativeElement.value = pattern;
              firstPass = false;
            });
          }

          return obs.pipe(
            tap(_ => this.loading = false)
          );
        })
      );
  }

  public search(pattern: string) {
    if (!pattern || pattern.length >= 3) {
      // send empty / undefined pattern to clear the search
      console.log("search " + pattern);
      this.searchTerms.next(pattern);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
