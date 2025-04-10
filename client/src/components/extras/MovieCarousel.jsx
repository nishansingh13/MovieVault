import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { useConfig } from "../../context/ConfigContext";
import { useNavigate } from "react-router-dom";

function MovieCarousel({ movies, genre }) {
  const { imageBaseUrl } = useConfig();
  const navigate = useNavigate();
    const namingarray ={ "Action" : "Action" , "Adventure" : "Adventure" , "Animation" : "Animated" , "Comedy" : "Comedy" , "Crime" : "Crime" , "Documentary" : "Documentary" , "Drama" : "Drama" , "Family" : "Family" , "Fantasy" : "Fantasy" , "History" : "History" , "Horror" : "Horror" , "Music" : "Music" , "Mystery" : "Mystery" , "Romance" : "Romance" , "Science Fiction" : "Science Fiction" , "TV Movie" : "TV Movie" , "Thriller" : "Thriller" , "War" : "War" , "Western" : "Western" }
  const filteredMovies = movies.filter((movie) => movie.genre?.[0] === genre);

  return (
    <div className="container mx-auto px-4 mb-8 relative">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{namingarray[genre] } Movies</h2>
      <Carousel className="relative">
        <CarouselContent>
          {filteredMovies.map((movie) => ( 
            <CarouselItem key={movie._id} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
              <div className="aspect-[2/3] overflow-hidden rounded-xl">
                <img
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-white text-center truncate px-2 mt-2">
                {movie.title}
              </h3>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </div>
  );
}

export default MovieCarousel;
