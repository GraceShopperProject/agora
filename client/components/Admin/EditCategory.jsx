import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../store';
import { connect } from 'react-redux';
import NewCategory from './NewCategory';

function EditCategory(props) {
	const categories = props.categories;
	console.log(categories);
	return (
		<div className="container content">
			<h3>Category List</h3>
			{
				categories && categories.map(category => (
					<div key={category.id} >
						<div className="col-sm-6 col-md-6 col-lg-6">
							<li >
								<Link value={category.id} to={`/category/${category.id}`}>{category.name} </Link>
								<input className="col-cm-1" onClick={() => props.handleRemove(category.id)} type='button' value='x' />
							</li>
						</div>
					</div>
				))
			}
			<div>
				<NewCategory />
			</div>
		</div>
	)
}

const mapState = state => ({
	categories: state.categories,
});

const mapDispatch = (dispatch, ownProps) => ({

	handleRemove(categoryId) {
		console.log('categoryId pass to the store', categoryId);
		dispatch(deleteCategory(categoryId));
	}
});

export default connect(mapState, mapDispatch)(EditCategory);