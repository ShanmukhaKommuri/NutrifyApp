import { useEffect, useState } from 'react'
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
import Header from './Header'

export default function Diet() {

    let loggedData = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date())

    let [total, setTotal] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0
    })
    useEffect(() => {
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userId[0]}/${(date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data);
                console.log(items);
            })
    }, [date])

    useEffect(() => {
        calculateTotal();
    }, [items])

    function calculateTotal() {
        let totalCopy = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0
        };

        items.forEach((item) => {
            totalCopy.totalCalories += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalFiber += item.details.fiber;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
        })
        setTotal(totalCopy);
    }
    return (
        <>
            <section className="container diet-container">
                <Header />


                <input type="date" onChange={(event) => {
                    setDate(new Date(event.target.value));
                }} />

                {items.length == 0 ? (<div>No items on this date {date.getDate()} - {date.getMonth() + 1} - {date.getFullYear()}</div>) :
                    (<>
                        {items.map((item) => {
                            return (
                                <div className='item' key={item._id}>
                                    <h3> {item.foodId.name}  {item.details.calories} Kcal  for {item.quantity}g</h3>
                                    <p> protein : {item.details.protein}g</p>
                                    <p> carbs : {item.details.carbohydrates}g</p>
                                    <p> fat : {item.details.fat}g</p>
                                    <p> fibre : {item.details.fibre}g</p>
                                </div>
                            )
                        })}

                    </>)
                }
                < div className='item'>
                    <h3> <b>Total Calories : </b>{total.totalCalories} Kcal  </h3>
                    <p> <b>protein :</b> {total.totalProtein}g   <b>carbs :</b> {total.totalCarbohydrates}g</p>
                    <p> <b>fat :</b> {total.totalFats}g   <b>fibre :</b> {total.totalFiber}g</p>
                </div>
            </section >
        </>
    )
}