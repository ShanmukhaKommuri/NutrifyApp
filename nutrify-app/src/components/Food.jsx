import { useState, useEffect, useContext } from 'react'
import UserContext from '../contexts/userContext'
export default function Food(props) {
    const [food, setFood] = useState({});
    const [foodInitial, setFoodInital] = useState({});
    const [eatenQuantity, setEatenQuantity] = useState(100);
    let loggedData = useContext(UserContext);


    useEffect(() => {
        setFood(props.food);
        setFoodInital(props.food);

        console.log(loggedData);

    }, [props.food])


    function calculateMacros(event) {
        if (event.target.value.length != 0) {
            let quantity = Number(event.target.value);
            setEatenQuantity(quantity);

            let copyFood = { ...food };

            copyFood.protein = (foodInitial.protein * quantity) / 100;
            copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
            copyFood.fat = (foodInitial.fat * quantity) / 100;
            copyFood.fiber = (foodInitial.fiber * quantity) / 100;
            copyFood.calories = (foodInitial.calories * quantity) / 100;

            setFood(copyFood);
        }
    }
    function trackFoodItem(event) {
        let trackItem = {
            userId: loggedData.loggedUser.userId[0],
            foodId: food._id,
            details: {
                protein: food.protein,
                carbohydrates: food.carbohydrates,
                fat: food.fat,
                calories: food.calories,
                fiber: food.fiber
            },
            quantity: eatenQuantity
        }
        // console.log(track);

        fetch("http://localhost:8000/track", {
            method: "POST",
            body: JSON.stringify(trackItem),
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <div className="food">
                <div className="food-img">
                    <img src={food?.imageUrl} alt={food.name} className='food-image' />
                </div>
                <h3>{food.name} ({food.calories} Kcal for {eatenQuantity}g)</h3>
                <div className='nutrient'></div>
                <div className="nutrient">
                    <p className="n-title">Protein</p>
                    <p className="n-value">{food.protein}g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">Carbs</p>
                    <p className="n-value">{food.carbohydrates}g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">Fat</p>
                    <p className="n-value">{food.fat}g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">fiber</p>
                    <p className="n-value">{food.fiber}g</p>
                </div>

                <div className="track-control">

                    <input type="number" onChange={calculateMacros}
                        className="inp" placeholder="Quantity in Gms" />

                    <button className="btn" onClick={trackFoodItem}>Track</button>
                </div>


            </div>
        </>
    )
}