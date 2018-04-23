import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FileController} from "../browser/file-controller.service";
import {File} from "../browser/domain";
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  public files$: Observable<File[]>;
  public loading: boolean = false;

  @ViewChild("searchInput", {read: ElementRef}) searchInputRef: ElementRef;

  private searchTerms = new Subject<string>();
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileController: FileController) {
  }

  public ngOnInit() {
    this.files$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((pattern: string) => {
        this.loading = true;
        let obs = Observable.of([]);
        if (pattern) {
          obs = this.fileController.search(pattern);
        }

        return obs.map(files => [pattern, files])
      }),
      map((patternAndResult: any[]) => {
        // update URL and loading flag
        console.log("received " + patternAndResult);
        this.router.navigate(['/search'], {queryParams: {pattern: patternAndResult[0]}});
        this.loading = false;

        // Only return list of files
        return patternAndResult[1];
      })
    );

    this.sub = this.route
      .queryParams
      .debounceTime(500) // server answer too quickly for async pipe to have created the subscription...
      .subscribe(params => {
        let pattern = params['pattern'];
        this.search(pattern);
        this.searchInputRef.nativeElement.value = pattern;
      });
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
