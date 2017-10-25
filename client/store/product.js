import axios from 'axios';

/* ACTION TYPES
*/

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
const ADD_PRODUCT = 'ADD_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultState = [];

/**
 * ACTION CREATORS
 */

const getAllProducts = (products) => ({ type: GET_ALL_PRODUCTS, products })
const updateProduct = () => ({ type: UPDATE_INVENTORY })
const addProduct = () => ({ type: ADD_PRODUCT, newProduct })


/**
 * THUNK CREATORS
 */
export const fetchProducts = () => (dispatch) => {
	axios.get('/api/products/')
		.then(res => res.data)
		.then((allProducts) => {
			dispatch(getAllProducts(allProducts));
		})
		.catch(err => console.log(err))
}

export const updateInventory = (product) => {
	return (dispatch) => {
		console.log('item info send to backend to update', product, `/api/products/inventory/${product.id}/update`);
		const updateInput = { new_inventory: product.new_inventory, price: product.price };
		axios.post(`/api/products/inventory/${product.id}/update`, updateInput)
			.then(res => res.data)
			.then(allProducts => {
				dispatch(updateProduct());
			})
			.catch(err => console.log(err));
	}
}

export const updateInventory = (product) => {
	return (dispatch) => {
		console.log('item info send to backend to update', product, `/api/products/inventory/${product.id}/update`);
		const updateInput = { new_inventory: product.new_inventory, price: product.price };
		axios.post(`/api/products/inventory/${product.id}/update`, updateInput)
			.then(res => res.data)
			.then(allProducts => {
				dispatch(updateProduct());
			})
			.catch(err => console.log(err));
	}
}

export const addNewProduct = (newProduct) => {
	return (dispatch) => {
		axios.post(`/api/products/`, newProduct)
			.then(res => res.data)
			.then(product => {
				dispatch(addProduct(product));
			})
			.catch(err => console.log(err));
	}
}


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return action.products;
		case UPDATE_INVENTORY:
			return state;
		case ADD_PRODUCT:
			return [...state, action.newProduct];
		default:
			return state;
	}
}
