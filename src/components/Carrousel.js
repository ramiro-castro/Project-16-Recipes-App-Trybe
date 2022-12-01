import './Carrousel.css';

function Carrousel({ recomendations, category }) {
  const pickCategory = () => (category === 'Drink' ? 'Meal' : 'Drink');
  const maxItens = 6;
  return (
    <div>
      {recomendations && (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {recomendations.slice(0, maxItens).map((recipe, index) => (
              <div key={ index } className={ `carousel-item ${!index && 'active'}` }>
                <div data-testid={ `${index}-recommendation-card` } className="col-7">
                  <img
                    className="d-block w-100"
                    src={ recipe[`str${pickCategory()}Thumb`] }
                    alt="First slide"
                  />
                  <div className="carousel-caption d-md-block">
                    <h5 data-testid={ `${index}-recommendation-title` }>
                      {recipe[`str${pickCategory()}`]}
                    </h5>
                  </div>
                </div>
              </div>

            ))}

            {/* {recomendations.slice(0, maxItens).map((recipe, index) => (
              <div className={ `carousel-item ${!index && 'active'}` }>
                  <div data-testid={ `${index}-recommendation-card` } className="col-7">
                    <img
                      className="w-100"
                      src={ recipe[`str${pickCategory()}Thumb`] }
                      alt="First slide"
                    />
                    <div className="carousel-caption d-md-block">
                      <h5 data-testid={ `${index}-recommendation-title` }>
                        {recipe[`str${pickCategory()}`]}
                      </h5>
                    </div>
                  </div>
                  <div className="col-7">
                    { index < recomendations.length - 2
                      // ? (
                      //   <div data-testid={ `${index}-recommendation-card` }>
                      //     <img
                      //       className="w-100"
                      //       src={ recomendations[0][`str${pickCategory()}Thumb`] }
                      //       alt="First slide"
                      //     />
                      //     <div className="carousel-caption d-md-block">
                      //       <h5 data-testid={ `${index}-recommendation-title` }>
                      //         {recomendations[0][`str${pickCategory()}`]}
                      //       </h5>
                      //     </div>
                      //   </div>
                      // )
                      // :
                      && (
                        <div data-testid={ `${index + 1}-recommendation-card` }>
                          <img
                            className="w-100"
                            src={ recomendations[index + 2][`str${pickCategory()}Thumb`] }
                            alt="First slide"
                          />
                          <div className="carousel-caption d-md-block">
                            <h5 data-testid={ `${index + 2}-recommendation-title` }>
                              {recomendations[index + 2][`str${pickCategory()}`]}
                            </h5>
                          </div>
                      )}
                        </div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      )}
    </div>
  );
}

Carrousel.propTypes = {}.isRequired;

export default Carrousel;
