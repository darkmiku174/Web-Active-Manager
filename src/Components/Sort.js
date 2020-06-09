import React, { Component } from 'react';

class Sort extends Component {

    onSort = (sortBy, sortValue) =>{
        this.props.onSort(sortBy, sortValue);
    }

    componentWillMount(sortBy, sortValue) {
        console.log(sortBy + " - " + sortValue);
        this.setState({ 
            sort : {
                by: sortBy,
                value: sortValue
            }
        });
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick = { () => this.onSort("name",1) }>
                            <a role="button" href="#tittle">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                                <span className={this.props.sortBy === "name" && this.props.sortValue === 1 ? "fa fa-check mr" : ""}>
                                </span>
                            </a>
                        </li>
                        <li onClick = { () => this.onSort("name",-1) }>
                            <a role="button" href="#tittle">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                                <span className={this.props.sortBy === "name" && this.props.sortValue === -1 ? "fa fa-check mr" : ""}>
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick = { () => this.onSort("status",1) }>
                            <a role="button" href="#tittle">
                                Trạng Thái Kích Hoạt
                                <span className={this.props.sortBy === "status" && this.props.sortValue === 1 ? "fa fa-check mr" : ""}>
                                </span>
                            </a>
                        </li>
                        <li onClick = { () => this.onSort("status",-1) }>
                            <a role="button" href="#tittle">
                                Trạng Thái Ẩn
                                <span className={this.props.sortBy === "status" && this.props.sortValue === -1 ? "fa fa-check mr" : ""}>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
