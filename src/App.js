import React from 'react';
import './App.css';
import Navbar from './Navbar_hooks';

const NavLinks = [
  {
      header:"Bundles",
      link:"bundles",
      childDropDown : false,
      showCard : true,
  },
  {
      header:"Starters",
      link:"starters",
      childDropDown : false,
      showCard : true,
  },
  {
      header:"Main Dishes",
      link:"maindishes",
      childDropDown : false,
      showCard : true,
  },
  {
      header:"Sides",
      link:"sides",
      childDropDown : false,
      showCard : true,
  },
  {
      header:"Desserts",
      link:"desserts",
      childDropDown : false,
      showCard : true,
  },
  {
      header:"Menu",
      link:"menu",
      childDropDown : true,
      showCard : false,
      childList : [
        {
          header : "Item 1",
          link : "item1"
        },
        {
          header : "Item 2",
          link : "item2"
        },
      ]
  }
];
const bundlesData = [
  {
    DishName:"Family Bundle",
    Cost:20.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Meal One X1",
    Cost:30.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Lunch Pack",
    Cost:150.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:true,
  },
];

const startersData = [
  {
    DishName:"Family Starters",
    Cost:20.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Meal One X1",
    Cost:30.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Lunch Pack",
    Cost:150.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:true,
  },
];

const mainDishData = [
  {
    DishName:"Family Main Dish",
    Cost:20.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Meal One X1",
    Cost:30.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Lunch Pack",
    Cost:150.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:true,
  },
];

const sidesData = [
  {
    DishName:"Family Sides",
    Cost:20.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Meal One X1",
    Cost:30.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Lunch Pack",
    Cost:150.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:true,
  },
];


const dessertsData = [
  {
    DishName:"Family Desserts",
    Cost:20.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Meal One X1",
    Cost:30.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:false,
  },
  {
    DishName:"Lunch Pack",
    Cost:150.00,
    description:"lorem ipsum dolor sit.",
    ChooseDrink:true,
  },
];

function App() {
  const foodData = {
    bundles : bundlesData,
    maindishes : mainDishData,
    starters : startersData,
    sides : sidesData,
    desserts : dessertsData
  }
  return (
    <div className="App">
      <Navbar navLinks = {NavLinks} foodData ={foodData}/>
    </div>
  );
}

export default App;
