import React from 'react'
import {TouchableHighlight, Animated, PanResponder} from 'react-native'
import {Badge, Item, Card, CardItem,Text, View} from 'native-base'
import Modal from 'react-native-modal'


export default class TravelingCard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            pan: new Animated.ValueXY(),
            isFocus: false    //Used for zIndexing purposes. When true, we make the card on top
        }
        
    }

    _onStartMove = this.props.onStartMove ? this.props.onStartMove : ()=>{}
    _onMove = this.props.onMove ? this.props.onMove : ()=>{}
    _onStopMove = this.props.onStopMove ? this.props.onStopMove : ()=>{}

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetResponder: (evt, gesture) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,

            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
        
            onPanResponderGrant: (e, gestureState) => {
                this.setState({
                    isFocus : true
                })
                this.forceUpdate();

                //Set offset to x,y and set x,y to 0. (Make start position the origin)
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
                this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove : ({nativeEvent}, gestureState) => {
                this.state.pan.setValue({x: gestureState.dx, y : gestureState.dy})
                this._onMove()
            },
        

            onPanResponderEnd: (e, gestureState) => {
                this.setState({
                    isFocus : false
                })
                this.state.pan.flattenOffset();
                Animated.spring(
                    // Animate value over time
                    this.state.pan, // The value to drive
                    {
                      toValue: {x:0, y:0}, bounciness: 12, speed: 20 // Animate to final value of 1
                    }
                  ).start(); // Start the animation
            },

            onPanResponderRelease: (e, gestureState) => {
                this.setState({
                    isFocus : false
                })
                this.state.pan.flattenOffset();
                Animated.spring(
                    // Animate value over time
                    this.state.pan, // The value to drive
                    {
                      toValue: {x:0, y:0}, bounciness: 12, speed: 20 // Animate to final value of 1
                    }
                  ).start(); // Start the animation
            } 
        });
    }

    render(){
        let imageStyle = { transform: this.state.pan.getTranslateTransform()};
        let focusStyle = {zIndex : this.state.isFocus ? 200 : 0, backgroundColor:"red"}

        return <Animated.View style={[imageStyle, focusStyle ]} {...this._panResponder.panHandlers}>
            <Card >
                <CardItem header bordered>
                    <Text> {this.props.title} </Text>
                </CardItem>
            </Card>
        </Animated.View>
    }
}