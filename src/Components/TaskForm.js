import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        };
    }

    componentWillMount() {
        if (this.props.taskEditor){
            this.setState({
                id: this.props.taskEditor.id,
                name: this.props.taskEditor.name,
                status: this.props.taskEditor.status
            });
        };
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.name){
            this.props.onSubmit(this.state);    
        };
        this.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === "status"){
            value = value === "true" ? true : false;
        };
        this.setState({
           [name] : value
        });
    }

    onClear = () => {
        this.setState({
            name: "",
            status: false
        });
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { this.state.id ? "Cập Nhật Công Việc" : "Thêm Công Việc" }
                        <button type="button" className="close" aria-label="Close" onClick = { this.onCloseForm }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit = { this.onSubmit } >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name = "name" value = { this.state.name } onChange={ this.onChange }/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name = "status" value = { this.state.status } onChange={ this.onChange }>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                { this.state.id ? "Sửa" : "Thêm" }
                            </button>&nbsp;
                            <button type="submit" className="btn btn-danger" onClick = { this.onClear }>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
