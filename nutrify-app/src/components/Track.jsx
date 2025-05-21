import Header from './Header'
import UserContext from '../contexts/userContext'
import { useContext, useState, useEffect } from 'react'
import Food from './Food'
export default function Track() {
    const loggedData = useContext(UserContext);
    const [foodItems, setFoodItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [food, setFood] = useState();
    // function searchFood(){
    // console.log(loggedData);

    // fetch(`http://localhost:8000/foods/${query}`, {
    //     method: "GET",
    //     headers: {
    //         "Authorization": "Bearer " + loggedData.loggedUser.token
    //     }
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         setFoodItems([...data]);
    //         console.log("data : ", data)
    //         console.log("food items : ", foodItems);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }


    useEffect(() => {
        let debounceTimer = null;
        console.log(searchText);
        clearTimeout(debounceTimer);
        if (searchText == '') {
            setFoodItems([]);
            return
        }
        debounceTimer = setTimeout(() => {
            fetch(`http://localhost:8000/foods/${searchText}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + loggedData.loggedUser.token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message == undefined) {
                        setFoodItems([...data]);
                    }
                    else {
                        setFoodItems([]);
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }, 300)
        return () => clearTimeout(debounceTimer)
    }, [searchText])

    function handleSearch(event) {
        const query = event.target.value;
        setSearchText(query);
    }


    return (
        <>
            <section className="container track-container">
                <Header />
                <div className="search">

                    <input type="search" name="" id="" onChange={handleSearch}
                        className="search-inp" placeholder="search Food" />

                    <div className="search-results">
                        {
                            foodItems.map((Item) => {
                                return (<p className="item" onClick={() => {
                                    // console.log(Item);
                                    setFood(Item);
                                }} key={Item._id}>
                                    {Item.name}
                                </p>)
                            })
                        }
                    </div>
                    {
                        food === undefined ? null : <Food food={food} />
                    }
                </div>
            </section>
        </>
    )
}