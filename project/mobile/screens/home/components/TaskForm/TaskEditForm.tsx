import React from 'react'
import {UserTaskContext} from './../../Context'
import PropTypes from 'prop-types'
import {View, Button, Textarea, Text} from 'native-base'
import { TextInput } from 'react-native';

interface EditFormProps{
    task_id : string
    title: string
    details: string
    onFormFinishedSubmition : any
}

interface EditFormState{
    task_title: string
    task_detail: string,
    form_errors : string[]
}

export default class TaskEditForm extends React.Component<EditFormProps, EditFormState>{
    constructor(props: EditFormProps) {
        super(props)
        this.state = {
            form_errors : [],
            task_title: this.props.title,
            task_detail: this.props.details
        }
        console.log("taskeditform", this.props.title, this.props.details);
    }

    _submitForm = (editTask : any)=>{
        editTask(this.props.task_id, this.state.task_title, this.state.task_detail, ()=>{
            this.props.onFormFinishedSubmition()
        })
    }

    render(){
        return <UserTaskContext.Consumer>
        {({editTask} : any)=>{
            return <View style={{width: "75%", height:"50%",padding: 20 , backgroundColor: "white"}}>
                {this.state.form_errors.map((err)=>{
                    return <View>
                        <Text> {err} </Text>
                    </View>
                })}
                <Text> Update Task </Text>
                <TextInput 
                    autoFocus= {true}
                    clearButtonMode = {'while-editing'}
                    placeholder="Title" 
                    value = {this.state.task_title} 
                    onChangeText={
                        (txt)=>this.setState({task_title: txt})
                    }/>

                <TextInput 
                    clearButtonMode = {'while-editing'}
                    placeholder="Details (Optional)" 
                    value = {this.state.task_detail}  
                    onChangeText={(txt)=>this.setState({
                        task_detail: txt})
                    }/>

                <Button onPress={()=>this._submitForm(editTask)}>
                    <Text>Submit</Text>
                </Button>   
            </View>
        }}
        </UserTaskContext.Consumer>
    }

}
