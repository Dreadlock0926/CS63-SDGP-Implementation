import React from 'react'
import trigonomerty from '../../components/images/trigonometry.webp'
import LinearAlgebra from '../../components/images/linearAlgibra.webp'
import differensation from '../../components/images/differentsation.webp'
import intergration from '../../components/images/Intergration.webp'
import quadratic from '../../components/images/quadratic.webp'
import circles from '../../components/images/Circles.webp'
import coordinate from '../../components/images/coordinategeometry.webp'
import staistics from '../../components/images/Statistics.webp'
import calculas from '../../components/images/calculas.webp'


export const Trigonometry = () => {

  return (
    <div>
      
      <body>
          <main>
            <section className="container py-5 text-center">
              <div className="row py-lg-5">
                <div className="mx-auto col-lg-6 col-md-8">
                  <h1 className="fw-light">Mathematics</h1>
                  <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                  <p>
                    <a href="#" className="my-2 btn btn-primary">Main call to action</a>
                    <a href="#" className="my-2 btn btn-secondary">Secondary action</a>
                  </p>
                </div>
              </div>
            </section>

            <div className="py-5 album bg-body-tertiary">
              <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={trigonomerty}  height="300px"  alt="" />
                     
                      <div className="card-body">
                        <h1>Triogonmetry</h1>
                        <p className="card-text">Trigonometry studies relationships between angles and sides of triangles, focusing on sine, cosine.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={LinearAlgebra} height="300px" alt="" />
                      <div className="card-body">
                        <h1>Linear Algebra</h1>
                        <p className="card-text">Linear algebra studies vectors, matrices, and linear transformations between vector spaces.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={differensation} height="300px" alt="" />
                      <div className="card-body">
                        <h1>Differentiation</h1>
                        <p className="card-text">Differentiation calculates the rate at which a function changes with respect to its variables.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={intergration} height="300px" alt="" />
                      <div className="card-body">
                        <h1>Intergration</h1>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={quadratic} height="300px" alt="" />
                      <div className="card-body">
                        <h1>Quadratic</h1>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                    <img src={circles} height="300px" alt="" />
                      <div className="card-body">
                        <h1>Circles</h1>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="shadow-sm card">
                       <img src={coordinate} height="300px" alt="" />
                      <div className="card-body">
                        <h2>Coordinate Geaometry</h2>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                     <img src={calculas} width="420px" height="300px" alt="" />
                      <div className="card-body">
                        <h1>Calculas</h1>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="shadow-sm card">
                      <img src={staistics} width="420px" height="300px" alt="" />
                      <div className="card-body">
                        <h1>Staistics</h1>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </main>

          <footer className="py-5 text-body-secondary">
            <div className="container">
              <p className="mb-1 float-end">
                <a href="#">Back to top</a>
              </p>
              <p className="mb-1">Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
              <p className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.</p>
            </div>
          </footer>
          <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    </body>
      
    </div>
  )
}
