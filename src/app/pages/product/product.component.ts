import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public categoryName!:any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
    ) { 
      this.eventSubscription = this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          this.loadProducts();
        }
      })
    }
  
    ngOnInit(): void {
    }
    
    loadProducts(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    if(this.categoryName!=null){
      this.productService.getAllByCategory(this.categoryName).subscribe(data => {
        this.userProducts = data;
      })
    }
      else{
        this.productService.getAllByCategory('rolls').subscribe(data => {
          this.userProducts = data;
        })
      }
      console.log(this.categoryName);
      
    }
  
    ngOnDestroy(): void {
        this.eventSubscription.unsubscribe();
    }

    productCount(product: IProductResponse, value: boolean): void {
      if(value){
        ++product.count;
      } else if(!value && product.count > 1){
        --product.count;
      }
    }

    addToBasket(product: IProductResponse): void {
      let basket: Array<IProductResponse> = [];
      if(localStorage.length > 0 && localStorage.getItem('basket')){
        basket = JSON.parse(localStorage.getItem('basket') as string);
        if(basket.some(prod => prod.id === product.id)){
          const index = basket.findIndex(prod => prod.id === product.id);
          basket[index].count += product.count;
        } else {
          basket.push(product);
        }
      } else {
        basket.push(product);
      }
      localStorage.setItem('basket', JSON.stringify(basket));
      product.count = 1;
      this.orderService.changeBasket.next(true);
    }
  }