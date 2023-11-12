import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  template: ` <div class="slideshow-container">
    <div class="mySlides ">
      <img src="assets/User/images/slide1.jpg" style="width:100%;height:100%" />
    </div>

    <div class="mySlides ">
      <img src="assets/User/images/slide2.jpg" style="width:100%;height:100%" />
    </div>

    <div class="mySlides ">
      <img src="assets/User/images/slide3.jpg" style="width:100%;height:100%" />
    </div>
    <div class="mySlides ">
      <img src="assets/User/images/slide4.jpg" style="width:100%;height:100%" />
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" (click)="plusSlides(-1)">&#10094;</a>
    <a class="next" (click)="plusSlides(1)">&#10095;</a>
  </div>`,
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit{

  slideIndex = 1;
  ngOnInit() {
    this.showSlides(this.slideIndex);
    setInterval(() => this.next(), 2000);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) {
      return;
    }
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }

    (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
  }

  next() {
    this.plusSlides(1);
  }


}
