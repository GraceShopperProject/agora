import React from 'react';
import {Link} from 'react-router-dom';
import {deleteCategory} from '../store';
import NewCategory from './NewCategory';

const EditCategory = (props) => {
    const categories = this.props.categories;
        return (
            <div className="container content">
                <h3>Category List</h3>
                {
                    categories && categories.map(category=> (
                        <div key = {category.id} >
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <li >
                                    <Link value={category.id} to={`/category/${category.id}`}>{category.name} </Link>
                                </li>
                            </div>
                            <input className="col-cm-1" onClick={()=> this.props.handleRemove(category.id)} type='button' value='x'/>
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
        console.log('courseId pass to the store', courseId);
        dispatch(deleteCategory(categoryId));
    }
});

export default connect(mapState, mapDispatch )(EditCategory);