import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  public navEntries: NavEntry[];

  public searchPattern: string;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.navEntries = [
      new NavEntry('/browser', 'Browser'),
      new NavEntry('/remote', 'Remote Control'),
      new NavEntry('/search', 'Search')
    ]
  }

  public isSelected(nav: NavEntry): boolean {
    return this.location.path().indexOf(nav.path) == 0
  }

  public redirectToSearch(searchPattern: string) {
    this.router.navigate(['/search'], {queryParams: {pattern: searchPattern}})
    this.searchPattern = "";
  }
}

export class NavEntry {
  constructor(
    public path: string,
    public name: string) {

  }
}
