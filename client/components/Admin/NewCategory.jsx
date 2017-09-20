import React from 'react';
import { connect } from 'react-redux';
import {addCategory} from '../../store';

function NewCategory (props) {

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <label className="col-sm-4 control-label">Add Category Name</label>
                <div className="col-sm-8">
                    <div>
                        <label htmlFor="Name"><small></small></label>
                        <input name="name" type="text" />

                         <button className="btn btn-default col-sm-1" type="submit">+</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

const mapStateToProps = function (state, ownProps) {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const  category={ name: evt.target.name.value};
            dispatch (addCategory(category));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCategory);