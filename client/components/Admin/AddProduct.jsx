import React from 'react';
import axios from 'axios';
import store, {fetchCategories} from '../../store/index';

export default class AddProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            name:   '',
            price:    0,
            description: '',
            img_url: '',
            remaining_inventory: 1,
            categoryId : '',
            categories:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        store.dispatch(fetchCategories());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }


    handleChange (evt) {
        const value = evt.target.value;
        console.log(value)
        this.setState({
            [evt.target.name]: value
        });
    }

    handleSubmit (evt) {
        evt.preventDefault();
        const inputbody = this.state;
        console.log('inputdata',inputbody)
        axios.post(`/api/products/`, inputbody)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    product: data.product
                })
            });
        this.setState({
            name:   '',
            price:    0,
            description: '',
            img_url: '',
            remaining_inventory: 1,
            categoryId : '',
        });
    }

    render() {
        const categories = this.state.categories;
        console.log('listed category', categories);
        return (
            <div className="container">
                <h3>Add a product</h3>
                <form onSubmit={this.handleSubmit}>
                <section>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 col-lg-2 control-label">Name</label>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                             <input name="name" type="text" className="form-control" value={this.state.name} required onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 col-lg-2 control-label">Price</label>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input name="price" type="text" className="form-control" value={this.state.price} required onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                            <input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Inventory</label>
                        <div className="col-sm-10">
                            <input name="remaining_inventory" type="text" className="form-control" value={this.state.dremaining_inventory} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Img_url</label>
                        <div className="col-sm-10">
                            <input name="img_url" type="text" className="form-control" value={this.state.img_url} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Category</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange}>
                                {
                                    categories && categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))

                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-primary">submit</button>
                    </div>
                </section>

                </form>
            </div>
        )
    }
}
