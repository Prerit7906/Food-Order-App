import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import loader from '../../assets/Spinner-2.gif'
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://mybackend-bf49e-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok){
          throw new Error("Could not fetch");
        }
        const responseData = await response.json();
      
      const mealsItems = [];
      for (const key in responseData) {
        mealsItems.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(mealsItems);
    }
      catch(error){
        console.log(error);
        setHttpError(error.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [])
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if(isLoading){
    return <h4 className={classes.loading}><img src={loader} alt='Loader'></img></h4>
  }
  if(httpError){
    return <h4 className={classes['http-error']}>{httpError}</h4>
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
