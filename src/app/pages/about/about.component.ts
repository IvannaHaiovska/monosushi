import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public articleOpen1 = false;
  public articleOpen2 = false;
  public articleOpen3 = false;
  public articleOpen4 = false;
  constructor() { }

  ngOnInit(): void {
  }
  openArticle1(): void {
    this.articleOpen1 = !this.articleOpen1;
  }
  openArticle2(): void {
    this.articleOpen2 = !this.articleOpen2;
  }
  openArticle3(): void {
    this.articleOpen3 = !this.articleOpen3;
  }
  openArticle4(): void {
    this.articleOpen4 = !this.articleOpen4;
  }
}
