import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { View, Text, FlatList, Alert } from "react-native";
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId)=>dispatch(deleteFavorite(dishId))
})



class Favorite extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };
    invokeDelete (dishId){
        console.log("hi")
        this.props.deleteFavorite(dishId);
    }
    
    render() {
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({item, index}) => {
            var swipeoutBtns = [
                {
                  text: 'Delete',
                  type: 'delete',
                  onPress: ()=> {
                      Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ',
                          [
                              {
                                  text: 'Cancel',
                                  onPress: ()=> console.log('Not deleted'),
                                  style: 'cancel'
                              },
                              {
                                text: 'OK',
                                onPress: ()=>this.invokeDelete(item.id),
                            }
                              
                          ],
                          { cancelable: false }
                      )
                  }
                }
              ]
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>  
                <Swipeout right={swipeoutBtns} autoClose={true}>
                <ListItem
                    key={index}
                    title={item.name}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    hideChevron={true}
                    subtitle={item.description}
                    onPress = {() =>{navigate('Dishdetail', {dishId:item.id})}}

                />
                </Swipeout>
                </Animatable.View>
            );
        }
        if (this.props.dishes.isLoading) {
            return <Loading />
        }
        else if (this.props.errMess) {
            return(
            <View>
                <Text>{this.props.dishes.errMess}</Text>
            </View>
            );
        }
        return (
            <FlatList
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                renderItem = {renderMenuItem}
                keyExtractor = {item => item.id.toString()}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);