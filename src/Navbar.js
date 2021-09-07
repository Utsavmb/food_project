import React from "react";
import "./App.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import foodImg from "../src/foodImg.jpg";
import { Checkbox } from "@material-ui/core";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      DishName: "",
      Cost: 0.0,
      description: "",
      ChooseDrink: false,
      BasketData: [],
    };
  }

  viewTable = (link) => {
    let mapData = this.props.foodData[link];
    return mapData.map((item) => {
      return (
        <td className="more-padding-on-right">
          <div
            style={{ width: "350px" }}
            className="card"
            onClick={() => this.openCart(item)}
          >
            <div className="container">
              <h4>{item.DishName}</h4>
              <img src={foodImg} className="img-fix" alt="food" />
              <p>{item.description}</p>
              <span>$ {item.Cost}</span>
            </div>
          </div>
        </td>
      );
    });
  };

  openCart = (item) => {
    this.setState({
      open: true,
      DishName: item.DishName,
      Cost: item.Cost,
      description: item.description,
      ChooseDrink: item.ChooseDrink,
    });
  };

  cancelCart = () => {
    this.setState({ open: false, close: true });
  };

  addToCart = () => {
    let basketObj = {
      DishName: this.state.DishName,
      Cost: this.state.Cost,
      description: this.state.description,
      ChooseDrink: this.state.ChooseDrink,
    };
    this.state.BasketData.push(basketObj);
    this.setState({ open: false });
  };

  chooseDrink = (e) => {
    // debugger
    this.setState({ ChooseDrink: e.target.checked });
  };

  viewBasket = () => {
    return this.state.BasketData.map((item, key) => {
      return (
        <tr>
          <td>
            <h4>{item.DishName}</h4>
          </td>
          <td>
            <span>$ {item.Cost}</span>
          </td>
          <td>
            <button onClick={() => this.removeItem(key)}>
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  removeItem = (index) => {
    let basketData = this.state.BasketData;
    basketData.splice(index, 1);
    this.setState({ BasketData: basketData });
  };

  totalCost = () => {
    let i = 0;
    let totalCost = 0.0;
    for (i = 0; i < this.state.BasketData.length; i++) {
      totalCost = totalCost + this.state.BasketData[i]["Cost"];
    }
    return "$ " + parseFloat(totalCost).toFixed(2);
  };

  checkOut = () => {
    alert("Your order on the way !Hurraah");
  };

  render() {
    const { navLinks } = this.props;
    // const {  bundles,maindishes,starters,sides,desserts } = this.props.foodData;
    return (
      <div>
        <header className="navbar">
          {navLinks.map((nav, key) => {
            return (
              <div key={key} className="navbar__item">
                <a className="normal-btn" href={"#" + nav.link}>
                  {nav.header}
                </a>
              </div>
            );
          })}
        </header>
        <table>
          <tr style={{ width: "100%" }}>
            <td style={{ width: "80%" }}>
              {navLinks.map((nav, key) => {
                return (
                  <div id={nav.link} key={key}>
                    <h1 style={{ textAlign: "left" }}>{nav.header}</h1>
                    <table>
                      <tbody>
                        <tr>{this.viewTable(nav.link)}</tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </td>
            <td className="vertical-top">
              <div className="card">
                <div className="container">
                  <table>
                    <tr>
                      <th>Your Basket</th>
                      <th>
                        <select>
                          Order
                          <option>Order</option>
                          <option>Pickup</option>
                        </select>
                      </th>
                    </tr>
                    {this.viewBasket()}
                    <tr>
                      <td colSpan="2">{this.totalCost()}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button onClick={() => this.checkOut()}>
                          Checkout {this.totalCost()}
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <Dialog
          open={this.state.open}
          onClose={this.state.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Add item to Basket
            <button onClick={() => this.cancelCart()} color="primary">
              <i className="fas fa-window-close"></i>
            </button>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h4>{this.state.DishName}</h4>
              <img className="img-fix" src={foodImg} alt="food" />
              <p>{this.state.description}</p>
              <span>$ {this.state.Cost}</span>
              <br />
              Choose your second pizza
              <br />
              Choose your drink
              <Checkbox
                onClick={(e) => this.chooseDrink(e)}
                checked={this.state.ChooseDrink}
              ></Checkbox>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => this.cancelCart()} color="primary">
              Cancel
            </button>
            <button onClick={() => this.addToCart()} color="primary" autoFocus>
              ADD TO BASKET
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Navbar;
