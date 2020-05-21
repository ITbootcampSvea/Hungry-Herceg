let users = [
    {
        Id:0,
        username: "Admin",
        password: 1234,
        history: [0, 0, 2, 1]
    },
    {
        Id:1,
        username: "Pera",
        password: 5678,
        history: [
            {
                user: "Pera",
                orderId: 0,
                mealId: 3,
                quantity: 2,
                note: "Note"
            },
            {
                user: "Pera",
                orderId: 0,
                mealId: 2,
                quantity: 2,
                note: "Note"
            }
        ]
    }
]


let polls = [
    {
        pollId: 0,
        name: "First poll ever created",
        author: "Nikola Mrkovic",
        createdAt: "00:00AM",
        ends: "00:10AM",
        duration: "10 (min)",
        status: "active",
        restaurants: [
            {
                restaurantId: 0,
                votes: 0
            },
            {
                restaurantId: 1,
                votes: 0
            }
        ]
    },
    {
        pollId: 1,
        name: "Monday",
        author: "Pera",
        createdAt: "00:00AM",
        ends: "00:10AM",
        duration: "10 (min)",
        status: "active",
        restaurants: [
            {
                restaurantId: 0,
                votes: 0
            },
            {
                restaurantId: 1,
                votes: 0
            }
        ]
    }
]


let orders = [
    {
        orderId: 0,
        pollId: 0,
        restaurantId: 0,
        duration: "20min", 
        status: "active",	
        orderItemsList: [0, 1, 2]
    },
    {
        orderId: 1,
        pollId: 1,
        restaurantId: 1,
        duration: "20min", 
        status: "active",	
        orderItemsList: [0, 1, 2]
    }
]


let restaurants = [
	{
        restaurantId: 0,
        name: "Prvi restoran",
        address: "Adresa restorana",
        meals: [0, 1, 2]
	},
    {
        restaurantId: 1,
        name: "Drugi restoran",
        address: "Adresa restorana",
        meals: [3]
	}
]


let orderItems = [
	{
        user: "nikola",
        orderId: 0,
        mealId: 0,
        quantity: 2,
        note: "Note"
    },
    {
        user: "danko",
        orderId: 0,
        mealId: 1,
        quantity: 5,
        note: "Note"
    },
    {
        user: "denis",
        orderId: 0,
        mealId: 2,
        quantity: 2,
        note: "Note"
    },
    {
        user: "Pera",
        orderId: 0,
        mealId: 3,
        quantity: 2,
        note: "Note"
    },
    {
        user: "Pera",
        orderId: 0,
        mealId: 2,
        quantity: 2,
        note: "Note"
    }
]


let meals = [
	{
        mealId: 0,
        name: "Pljeskavica",
        price: 100
    },
    {
        mealId: 1,
        name: "Lapacinka",
        price: 200
    },
    {
        mealId: 2,
        name: "Masan burek",
        price: 1000
    },
    {
        mealId: 3,
        name: "Krofna",
        price: 250
    }
]


export { users, polls, orders, restaurants, orderItems, meals }