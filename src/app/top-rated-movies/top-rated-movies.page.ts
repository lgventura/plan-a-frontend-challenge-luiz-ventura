import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/api/movie.service';
import { environment } from 'src/environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.page.html',
  styleUrls: ['./top-rated-movies.page.scss'],
})
export class TopRatedMoviesPage implements OnInit {
  movies: Array<any> = [];
  imageBaseUrl = environment.images;
  loaded = false;
  page = 1;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadTopRatedMovies();
  }

  async loadTopRatedMovies(event?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.page).subscribe(
      (res) => {
        this.movies = this.movies.concat(res.results);
        this.loaded = true;
        loading.dismiss();
        if (event) {
          event.target.complete();
        }
      },
      (err) => {
        console.log(err);
        this.loaded = true;
        loading.dismiss();
      }
    );
  }

  loadMore(event) {
    this.page++;
    this.loadTopRatedMovies(event);
  }
}
