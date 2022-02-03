import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(  private productService: ProductService,){}
  
    ngOnInit(): void {
      // this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
      this.productService.getAllByCategory('rolls').subscribe(
      )
    }

}
