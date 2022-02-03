import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private eRef: ElementRef,
    private orderService: OrderService) {
    this.dropdownMenuStatus = false;
  }
  public dropdownMenuStatus = false;
  public basketCartStatus = false;
  public grayBlock = false;

  public total = 0;
  public count = 0;
  public basketProducts: Array<IProductResponse> = [];

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketProducts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basketProducts
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
    this.count = this.basketProducts
      .reduce((count: number, prod: IProductResponse) => count + prod.count, 0);
  }

 productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
      this.total = this.total + product.price;
    } else if(!value && product.count > 1){
      --product.count;
      this.total = this.total - product.price;
    }
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  MakeOrder(): void {
  }

  deleteBasketItem(productId: number) {
    let basketLocal = JSON.parse(localStorage.getItem('basket') as string);
    let indexLocal = basketLocal.findIndex((x: any) => x.id == productId);
    basketLocal.splice(indexLocal, 1); // видаляємо з локал

    localStorage.setItem('basket', JSON.stringify(basketLocal));
    let indexProduct = this.basketProducts.findIndex((x: any) => x.id == productId);
    this.basketProducts.splice(indexProduct, 1); // видаляємо з this.basketProducts
    this.loadBasket();
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
  closeBasket(): void {
    this.basketCartStatus = false;
    this.grayBlock = false;
  }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownMenuStatus = false;
    }
  }
}
