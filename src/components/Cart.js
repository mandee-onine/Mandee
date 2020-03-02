import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity } from './actions/cartActions'
import Recipe from './Recipe'
class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    render() {

        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.imgURL} alt={item.imgURL} className="" />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.name}</span>
                                <p>{item.desc}</p>
                                <p><b>Price: ₹ {item.price}</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={() => { this.handleAddQuantity(item.id) }}>add</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(item.id) }}>remove</i></Link>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Nothing.</p>
            )
        return (
            <div className="container-fluid">
                <h5>You have ordered:</h5>
                <div class="row justify-content-md-center">
                    <div className="cart col col-lg-8">
                        <ul className="collection">
                            {addedItems}
                        </ul>
                    </div>

                    <div className=" col-md-auto">
                        <Recipe />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)