import React from 'react';
import { connect } from 'react-redux';
import {addCategory} from '../../store';

function NewCategory (props) {

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <label className="col-sm-2 control-label">Add New Category</label>
                <div className="col-sm-9">
                    <div>
                        <label htmlFor="Name"><small>Category Name</small></label>
                        <input name="name" type="text" />
                    </div>

                </div>
                <button className="btn btn-default col-sm-1" type="submit">+</button>
            </div>
        </form>
    );
}

const mapStateToProps = function (state, ownProps) {

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