import React from 'react';
import {Link} from 'react-router-dom';
import { connect, } from 'react-redux';
import store, { me, updateUser} from '../../store';


class EditAccount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            name:'',
            phone:'',
            email:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            name:this.props.user.name,
            phone:this.props.user.phone,
            email:this.props.user.email,
        })
    }

    handleChange(evt) {
        evt.preventDefault();
        const value = evt.target.value;
        console.log(value)
        this.setState({
            [evt.target.name]: value
        });
    }

    handleSubmit (evt) {
        evt.preventDefault();
        const user = {
            id: this.props.user.id,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
        };
        console.log('need to update the product',user);
        store.dispatch(updateUser(user));
    }

    render() {
        console.log('current users',this.state.name);
        return (
            <div className="container content">
                <div className="col-xs-12">
                    <h3>Edit Account</h3>
                    <form onSubmit={this.handleSubmit}>
                        <section>
                            <div className="form-group">
                                <label className="col-sm-2 col-md-2 col-lg-2 control-label">Name</label>
                                <div className="col-sm-10 col-md-10 col-lg-10">
                                    <input name="name" type="text" className="form-control" value={this.state.name} required onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-md-2 col-lg-2 control-label">Email</label>
                                <div className="col-sm-10 col-md-10 col-lg-10">
                                    <input name="email" type="text" className="form-control" value={this.state.email} required onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Phone</label>
                                <div className="col-sm-10">
                                    <input name="phone" type="text" className="form-control" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary">submit</button>
                            </div>
                        </section>

                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        user: state.user
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        getCurUser () {
            dispatch (me());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccount);