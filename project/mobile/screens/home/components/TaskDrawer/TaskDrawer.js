import React from 'react'
import {View, Text, Dimensions} from 'react-native'
import {Drawer} from 'native-base'
import SideMenu from 'react-native-side-menu'
import {Draggable} from './../TravelingList'
import TaskList from '../TaskCarousel/TaskList'
import PropTypes from 'prop-types'
import {Embassy} from './../TravelingList'

class DrawerContent extends React.Component{
    render(){
        return (
        <View style={{backgroundColor: "darkblue", height: Dimensions.get('window').height, width: "100%"}}>
            <View style={{padding: 0, margin:0, alignItems: "center", justifyContent:"center", backgroundColor:"#222", height: "25%", width:"100%"}}>
                <Text style={{ fontSize:20, color:"white"}}> Unallocated Tasks </Text>
            </View>
            <View style={{padding:10, width:"100%", height:"100%"}}>
                <TaskList
                    data = {this.props.task_data}
                />
            </View>
        </View>
        )
    }
}

DrawerContent.propTypes = {
    task_data : PropTypes.array.isRequired
}

export default class TaskDrawer extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.drawer = React.createRef()

        Embassy.addOnStartHandler(this.closeDrawer)

    }

    componentDidMount(){
        console.log("mounted");
    }

    componentWillUnmount(){
        console.log("unmounted");
    }
    closeDrawer = (coordinates, cb=()=>{})=>{
        this.toggleDrawer(false, (err)=>{
            if(err)
                cb(err)
            else
                cb()
        })
    }

    toggleDrawer = (toggleState, cb)=>{
        const next_state = (toggleState !== null ? toggleState : !this.state.visible)
        this.setState({
            visible: next_state
        }, cb)
    }

    _renderListItem = ({item,index})=>{
        return (
            <TaskCard task_id={item.id} allocated_date={item.allocated_date} title={item.title} details={item.details} isCompleted={item.completed}/>
        )  
    }


    render(){
        return (
            <SideMenu 
                onClose={this.closeDrawer}
                ref={this.drawer}
                isOpen={this.state.visible}
                disableGestures = {true}
                onChange = {(isOpen)=>{
                    this.setState({
                        visible: isOpen
                    })
                }}
                menu = {<DrawerContent task_data = {this.props.task_data}/>}>

                {this.props.children}
            </SideMenu>
        )
    }
}