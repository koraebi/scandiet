import * as React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import PageIndicator from "./PageIndicator";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import Data from '../../database/data';

class ActivityLevelPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activityLevel: '',
            sedentaryColor: 'black',
            lowActiveColor: 'black',
            activeColor: 'black',
            sportiveColor: 'black',
        }
    }

    levels = ['sedentary', 'lowActive', 'active', 'sportive'];

    selectActivityLevel = (level) => {
        this.setState({
            activityLevel: level,
            sedentaryColor: 'black',
            lowActiveColor: 'black',
            activeColor: 'black',
            sportiveColor: 'black',
        });

        switch(level) {
            case 'sedentary': 
                this.setState({
                    sedentaryColor: 'green',
                });
                break;
            case 'lowActive': 
                this.setState({
                    lowActiveColor: 'green',
                });
                break;
            case 'active': 
                this.setState({
                    activeColor: 'green',
                });
                break;
            case 'sportive': 
                this.setState({
                    sportiveColor: 'green',
                });
        }
    }

    render()  {
        return (
            <View
                style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <PageIndicator numPage="5"/>
                <Text
                    style={{
                        textAlign: 'center',
                        margin: 20,
                        fontSize: 25
                    }}>
                    Quel est votre niveau d'activité? </Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    underlayColor="grey"
                    style={[styles.button, {borderColor: this.state.sedentaryColor}]}
                    onPress={()=> this.selectActivityLevel(this.levels[0])}>
                    <View>
                        <Text style={[styles.titleBtn, {color: this.state.sedentaryColor}]}>Sédentaire</Text>
                        <Text style={{color: this.state.sedentaryColor}}>
                            Pas d'activité physique en dehors des activités quotidiennes qui nécessitent un effort minimal comme le travail de bureau ou la conduite.
                        </Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                underlayColor="grey"
                    style={[styles.button, {borderColor: this.state.lowActiveColor}]}
                    onPress={()=> this.selectActivityLevel(this.levels[1])}>
                    <View>
                        <Text style={[styles.titleBtn, {color: this.state.lowActiveColor}]}>Faiblement actif</Text>
                        <Text style={{color: this.state.lowActiveColor}}>
                            Activité de faible intensité 1 à 3 fois par semaine ou des efforts tels que des périodes de station debout, des travaux ménagers ou des exercices légers.
                        </Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                <TouchableHighlight
                    underlayColor="grey"
                    style={[styles.button, {borderColor: this.state.activeColor}]}
                    onPress={()=> this.selectActivityLevel(this.levels[2])}>
                    <View>
                        <Text style={[styles.titleBtn, {color: this.state.activeColor}]}>Actif</Text>
                        <Text style={{color: this.state.activeColor}}>
                            Exercices d'intensité modérée 3 à 5 fois par semaine / Marche 2 à 5 km par jour / Fait entre 9400 pas et 23 500 pas.
                        </Text>
                    </View>
                </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <TouchableHighlight
                        underlayColor="grey"
                        style={[styles.button, {borderColor: this.state.sportiveColor}]}
                        onPress={()=> this.selectActivityLevel(this.levels[3])}>
                        <View>
                            <Text style={[styles.titleBtn, {color: this.state.sportiveColor}]}>Sportif</Text>
                            <Text style={{color: this.state.sportiveColor}}>
                                Exercices de forte intensité 6 fois par semaine / Marche plus de 5 km par jour / Fait plus de 23 500 pas.
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    style={{
                        backgroundColor: "green",
                        marginTop: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 40,
                        borderRadius: 20
                    }}
                    onPress={() => {
                        if (this.state.activityLevel === '') {
                            Alert.alert('Oups !', "Veuillez entrer votre niveau d'activité");
                            return;
                        }

                        Data.getInstance().updateUser({ activityLevel: this.state.activityLevel });

                        this.props.navigation.navigate('AgePage');
                    }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20
                        }}>
                        Suivant <FontAwesomeIcon
                        style={{color: "white",}}
                        icon={faArrowRight}/>
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default ActivityLevelPage;

var styles = StyleSheet.create({
    titleBtn:{
        fontWeight: "bold",
        fontSize: 20
    },
    button: {
       flex: 1,
        marginRight: 10,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    }
});
