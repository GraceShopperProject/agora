import React from 'react';
import { connect } from 'react-redux';
import store, {addCategory, fetchCategories} from '../../store';


class NewCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
        };
    }

    componentDidMount() {
        store.dispatch(fetchCategories());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        return (
            <form id="new-message-form" onSubmit={this.props.handleSubmit}>

                <div className="form-group">
                    <label className="col-sm-4 control-label">Add Category Name</label>
                    <div className="col-sm-8">
                        <div>
                            <label htmlFor="Name">
                                <small></small>
                            </label>
                            <input name="name" type="text"/>

                            <button className="btn btn-default col-sm-1" type="submit">+</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
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