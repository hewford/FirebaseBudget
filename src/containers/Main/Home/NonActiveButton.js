import React, { Component } from 'react'

export class NonActiveButton extends Component {
    render() {
        return (
            <div className="col s6">
                <div className={`empty-card white ${this.props.offset}offset-vertical `}>
                    <div className="card-content black-text">
                        <div className={`card-title`}>
                        </div>
                        <p className="card-body"></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NonActiveButton
