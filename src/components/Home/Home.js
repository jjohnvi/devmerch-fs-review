import React, { Component } from "react";
import { logoutUser } from "../../redux/AuthReducer/AuthReducer";
import { connect } from "react-redux";
import { getAllProducts } from "../../redux/ProductReducer/ProductReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleLogout = () => {
    this.props.logoutUser().then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    console.log(this.props.user);

    let productDisplay = this.props.products.map((val, i) => {
      return (
        <div key={i}>
          <div>{val.product_name}</div>
          <img src={val.img_url} alt="Product picture"></img>
          <div>{val.price}</div>
        </div>
      );
    });
    return (
      <div>
        <div>Home</div>
        <div>{productDisplay}</div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    products: state.productReducer.products
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, getAllProducts }
)(Home);
