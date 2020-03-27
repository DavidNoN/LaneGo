import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '../entity/Location';


@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @Output() positionChanged = new EventEmitter<Location>();

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

}
