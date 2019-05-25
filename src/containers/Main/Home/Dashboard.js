import React, { Component } from 'react'

export class Dashboard extends Component {
    render() {
        return (
            <div onclick="setDash()" className="dash">
                  <div className="col s6">
                      <div className="card white offset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#FF6F00"}}>
                                  Personal1
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>

                  <div className="col s6">
                      <div className="card white nonoffset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#00D9C5"}}>
                                  Personal2
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>

                  <div className="col s6">
                      <div className="card white offset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#FF00A2"}}>
                                  Personal3
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>

                  <div className="col s6">
                      <div className="card white nonoffset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#007AFF"}}>
                                  Personal4
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>

                  <div className="col s6">
                      <div className="card white offset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#00B309"}}>
                                  Personal3
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>

                  <div className="col s6">
                      <div className="card white nonoffset-vertical">
                          <span className="float-right">...</span>
                          <div className="card-content black-text">
                              <div className="card-title" style={{color:"#6D4322"}}>
                                  Personal4
                              </div>
                              <p className="card-body">$data</p>

                          </div>

                      </div>
                  </div>
                </div>
        )
    }
}

export default Dashboard

// route: Home
// takes categories array and renders a list of CatergoryExpenseButtons