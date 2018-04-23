import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  public navEntries: NavEntry[];

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    this.navEntries = [
      new NavEntry('/browser', 'Browser'),
      new NavEntry('/remote', 'Remote Control')
    ]
  }

  public isSelected(nav: NavEntry): boolean {
    return this.location.path().indexOf(nav.path) == 0
  }

}

export class NavEntry {
  constructor(
    public path: string,
    public name: string) {

  }
}
