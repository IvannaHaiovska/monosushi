import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private eRef: ElementRef) {
    this.dropdownMenuStatus=false;
  }
  public dropdownMenuStatus = false;
  public basketCartStatus = false;
  public grayBlock = false;

  ngOnInit(): void {
  }
  dropdownMenuOpen(): void {
    this.dropdownMenuStatus = true;
  }
  close(): void {
    this.dropdownMenuStatus = false;
  }
  basketOpen(): void {
    this.basketCartStatus = !this.basketCartStatus;
    this.grayBlock = !this.grayBlock;
  }
  closeBasket():void{
    this.basketCartStatus = false;
    this.grayBlock = false;
  }
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownMenuStatus=false;
    }
  }
}
