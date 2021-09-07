import React, { useState } from "react";
import "./App.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import foodImg from "../src/foodImg.jpg";
import { Checkbox } from "@material-ui/core";

function Navbar(props) {
  const [open, setopen] = React.useState(false);
  const [DishName, setDishName] = React.useState("");
  const [Cost, setCost] = React.useState(0.0);
  const [description, setdescription] = React.useState("");
  const [ChooseDrink, setChooseDrink] = React.useState(false);
  const [BasketData, setBasketData] = React.useState([]);
  const [fadeInElements, setfadeInElements] = useState([]);
  React.useEffect(() => {
    setfadeInElements(
      Array.from(document.getElementsByClassName("fade-in-section"))
    );
  }, []);

  const handleScroll = (evt) => {
    for (var i = 0; i < fadeInElements.length; i++) {
      var elem = fadeInElements[i];

      if (isElemVisible(elem)) {
        elem.className = "fade-in-section is-visible";
      } else {
        // elem.className = "fade-in-section";
      }
    }
  };

  const isElemVisible = (el) => {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top + 200; // 200 = buffer
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  };
  window.addEventListener("scroll", (event) => {
    handleScroll();
  });

  function viewTable(link) {
    let mapData = props.foodData[link] ? props.foodData[link] : [];
    return mapData.map((item, key) => {
      return (
        <td key={key} className={`more-padding-on-right `}>
          <div
            style={{ width: "300px" }}
            className="card"
            onClick={() => openCart(item)}
          >
            <div className={`container`}>
              <h4>{item.DishName}</h4>
              <img src={foodImg} className="img-fix" alt="food" />
              <p>{item.description}</p>
              <span>$ {item.Cost}</span>
            </div>
          </div>
        </td>
      );
    });
  }

  function openCart(item) {
    setopen(true);
    setDishName(item.DishName);
    setCost(item.Cost);
    setdescription(item.description);
    setChooseDrink(item.ChooseDrink);
  }

  function cancelCart() {
    setopen(false);
  }

  function addToCart() {
    let newBasket = [...BasketData];
    let basketObj = {
      DishName: DishName,
      Cost: Cost,
      description: description,
      ChooseDrink: ChooseDrink,
    };
    newBasket.push(basketObj);
    setBasketData(newBasket);
    setopen(false);
  }

  function chooseDrink(e) {
    setChooseDrink(e.target.checked);
  }

  function viewBasket() {
    return BasketData.map((item, key) => {
      return (
        <tr key={key}>
          <td>
            <h4>{item.DishName}</h4>
          </td>
          <td>
            <span>$ {item.Cost}</span>
          </td>
          <td>
            <button onClick={() => removeItem(key)}>
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  function removeItem(index) {
    let basketData = [...BasketData];
    basketData.splice(index, 1);
    setBasketData(basketData);
  }

  function totalCost() {
    let i = 0;
    let totalCost = 0.0;
    for (i = 0; i < BasketData.length; i++) {
      totalCost = totalCost + BasketData[i]["Cost"];
    }
    return "$ " + parseFloat(totalCost).toFixed(2);
  }

  function checkOut() {
    alert("Your order on the way !Hurraah");
  }

  function renderChildElements(childMenu) {
    return childMenu.map((childElem, key) => {
      return (
        <a key={key} href={"#" + childElem.link} className="dropdown-item">
          {childElem.header}
        </a>
      );
    });
  }

  const { navLinks } = props;

  return (
    <div>
      <header className="navbar">
        {navLinks.map((nav, key) => {
          return nav.childDropDown === true ? (
            <div key={key} className="nav-item dropdown">
              <a
                href={"#" + nav.link}
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                {nav.header}
              </a>
              <div className="dropdown-menu">
                {renderChildElements(nav.childList)}
              </div>
            </div>
          ) : (
            <div key={key} className="navbar__item">
              <a className="normal-btn" href={"#" + nav.link}>
                {nav.header}
              </a>
            </div>
          );
        })}
      </header>
      <table>
        <tbody>
          <tr style={{ width: "100%" }}>
            <td style={{ width: "80%" }}>
              {navLinks
                .filter((x) => x.showCard === true)
                .map((nav, key) => {
                  return (
                    <div id={nav.link} key={key}>
                      <h1 style={{ textAlign: "left" }}>{nav.header}</h1>
                      <table>
                        <tbody>
                          <tr className={`fade-in-section`}>
                            {viewTable(nav.link)}
                          </tr>
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
                    <tbody>
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
                      {viewBasket()}
                      <tr>
                        <td colSpan="2">{totalCost()}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <button onClick={() => checkOut()}>
                            Checkout {totalCost()}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add item to Basket
          <button onClick={() => cancelCart()} color="primary">
            <i className="fas fa-window-close"></i>
          </button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <h4>{DishName}</h4>
              <img className="img-fix" src={foodImg} alt="food" />
              <p>{description}</p>
            </div>
            <span>$ {Cost}</span>
            <br />
            Choose your second pizza
            <br />
            Choose your drink
            <Checkbox
              onClick={(e) => chooseDrink(e)}
              checked={ChooseDrink}
            ></Checkbox>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => cancelCart()} color="primary">
            Cancel
          </button>
          <button onClick={() => addToCart()} color="primary" autoFocus>
            ADD TO BASKET
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Navbar;
