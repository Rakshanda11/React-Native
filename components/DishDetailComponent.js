import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet,TextInput, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}


const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})
function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>    
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id ? item.id.toString() : item.name}
            />
        </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })

    const dish = props.dish;
    if (dish != null)
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
            
            {...panResponder.panHandlers}
            >
                
            <Card
                title={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text>{dish.description}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon
                        raised
                        reverse
                        color='#f50'
                        name={props.isFavorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        onPress={() => { props.isFavorite ? console.log('Already Favourite') : props.onFav() }}
                    />
                    <Icon
                        raised
                        reverse
                        color='blue'
                        name='pencil'
                        type='font-awesome'
                        onPress={() => { props.commentForm() }}
                    />
                </View>
            </Card>
            </Animatable.View>
        );
    else {
        return (
            <View></View>
        );

    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            author: "",
            rating: 5,
            comment: ""
        }
    }
    onSubmit = (dishId) => {
        console.log(dishId + this.state.rating, this.state.author, this.state.comment)
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }
    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        this.setState({ rating: rating })
    }
    markFavourite = (dishId) => {
        // console.log("mark")
        // console.log(dishId)
        this.props.postFavorite(dishId);
    }
    toggleModal = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showModal: !prevState.showModal
            }
        })
        // console.log("Toggled")
        // console.log(this.state.showModal)
    }
    render() {
        // console.log(this.props)
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    isFavorite={this.props.favorites.some(el => el === dishId)}
                    onFav={() => { this.markFavourite(dishId) }}
                    commentForm={() => { this.toggleModal() }}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={{ marginBottom: 20 }}>
                        <Rating
                            showRating
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}
                        />
                        <View style={{ height: 60, borderColor: 'gray', borderWidth: 2, borderRadius: 10, flexDirection: 'row', marginBottom: 20 }}>
                            <Icon
                                raised
                                reverse
                                color='black'
                                name='address-card'
                                type='font-awesome'
                                size={20}
                            />
                            <TextInput
                                style={{ borderWidth: 0 }}
                                placeholder="Author"
                                onChangeText={text => this.setState({ author: text })}
                                value={this.state.author}
                            />
                        </View>
                        <View style={{ height: 60, borderColor: 'gray', borderWidth: 2, borderRadius: 10, flexDirection: 'row', marginBottom: 20 }}>
                            <Icon
                                raised
                                reverse
                                color='black'
                                name='comment'
                                type='font-awesome'
                                size={20}
                            />
                            <TextInput
                                placeholder="Comment"
                                onChangeText={text => this.setState({ comment: text })}
                                value={this.state.comment}
                            />

                        </View>
                        <View style={{ paddingTop: 20, justifyContent: 'space-between' }}>
                            <Button
                                // onPress={()=> this.props.postComment(dishId, this.state.rating,this.state.author,this.state.comment)}
                                onPress={() => this.onSubmit(dishId)}
                                color="#512DA8"
                                title="Submit"
                            />
                            <Button
                                onPress={() => { this.toggleModal(); }}
                                color="#D3D3D3"
                                title="Cancel"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail); 