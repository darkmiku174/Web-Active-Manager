import React, { Component } from 'react';
import TaskItem from './TaskItem.js'

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: "",
            filterStatus: -1 // All: -1, Active: 1, Deactive: 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = name === "filterName" ? target.value : parseInt(target.value);
        this.props.onFilter(name === "filterName" ? value : this.state.filterName, 
                            name === "filterStatus" ? value : this.state.filterStatus)
        this.setState({
            [name]: value
        });
    }

    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }

    onDelete = (id) => {
        this.props.onDelete(id);
    }

    onUpdateItem = (id) => {
        this.props.onUpdateItem(id);
    }

    render() {
        var { tasks } = this.props
        var { filterName, filterStatus } = this.state
        var elemTask = tasks.map((task, index) => {
            return <TaskItem 
                            key={ task.id } 
                            task={ task } 
                            index = { index } 
                            onUpdateStatus = { this.onUpdateStatus }
                            onDelete = { this.onDelete }
                            onUpdateItem = { this.onUpdateItem } />
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name = "filterName"
                                        value = { filterName }
                                        onChange={ this.onChange } />
                                </td>
                                <td>
                                    <select 
                                        className="form-control"
                                        name = "filterStatus"
                                        value = { filterStatus }
                                        onChange={ this.onChange }>
                                            <option value={-1}>Tất Cả</option>
                                            <option value={0}>Ẩn</option>
                                            <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            { elemTask }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskList;
