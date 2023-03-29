import React from 'react'
import './Widgets.scss'

export const Widgets = (props) => {



    // const checkType = () => {
    //     if(type === "")
    // }

    const { ...input } = props
    // console.log(input.number);
    return (
        <div className="widget">
            <div className="left">
                <span className="title"><p>{input.title}</p></span>
                <span className="link">{input.link}</span>
            </div>
            <div className="right">
                <span className="number">{input.number}</span>
                <span className="logo">{input.logo}</span>
            </div>
        </div>
    )
}
