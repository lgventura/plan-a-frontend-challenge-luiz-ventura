import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/api/movie.service';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  movie: Movie;
  imageBaseUrl = environment.images;
  loaded = false;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadLatestMovie();
  }

  async loadLatestMovie() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getLatestMovie().subscribe(
      (res) => {
        this.movie = res;
        this.loaded = true;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        this.loaded = true;
        loading.dismiss();
      }
    );
  }
}
