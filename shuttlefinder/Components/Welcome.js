import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    AppRegistry,
    Button
} from 'react-native';
import Dropdown from './searchableDropdown';
import * as Green from '../Shuttle_Data/Green_Line.json';
import * as North from '../Shuttle_Data/North_Shuttle.json';
import * as Blue from '../Shuttle_Data/Blue_Line.json';
import * as Northweekend from '../Shuttle_Data/North_Shuttle_Weekend.json';


exports.realTime = () => {
    var d = new Date();
    var retTime = ((d.getHours()) * 100) + d.getMinutes();
    return retTime;
}

exports.getTime = (time, selectedLocation,selectedLine) => {
    var foundTime = '';
    var jsonfile='';
    var dayHelper = new Date().getDay;

    console.log(selectedLine);
   // Chooses jsonfile according to selectedline 
    if(selectedLine=='Blue'){
            jsonfile=Blue;
    }
    else if(selectedLine=='Green'){
    jsonfile=Green;
    }
    else if(dayHelper == 0 || dayHelper == 6 && selectedLine == 'North'){
        jsonfile = North;
    }
    else if(dayHelper != 0 || dayHelper != 6 && selectedLine == 'North'){
        jsonfile = Northweekend;
    }
    
    for (var key in jsonfile) {

        var t2 = parseInt((jsonfile[key][selectedLocation]));

        console.log(t2);
        if (time < t2) {
            console.log("Found next time " + t2);
            foundTime = t2;
            console.log(t2);
            break;
        }        
    }

    return foundTime;
}

// Welcome screen for App
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomemessage: 'Welcome to Shuttle Finder',
            location: '',
            currentLocation: '',
            selectedItem: {},
            currentLine: '',
        }
    }

    getLocation = l => {
        //console.log(l + 'aaa');
        this.setState({
            currentLocation: l
        });
    }
    getLine = line => {
        console.log(line + 'abc');
        this.setState({
            currentLine: line
        });
    } 

    static defaultprops = {
        welcomemessage: 'Welcome to Shuttle Finder',
        location: "Enter Location"
    }

    _onPressButton() {
        console.log(this.state.currentLocation + 'a');

        var t = exports.realTime();
        var times = exports.getTime(t, this.state.currentLocation,this.state.currentLine);

        if (this.state.currentLocation != ''){
            alert('Shuttle is arriving soon at ' + times);
        }
        else{
            alert('Enter a location first please!')
        }
        this.state.currentLocation = '';
        
    }
    render(){
        let props ={
            getCurrentLine: this.getLine.bind(this),
            getCurrentLocation: this.getLocation.bind(this),
            
        }
        return( 
            <View style = {styles.container} >
            <Image style = {
                styles.image
            }
            source = {
                require('./ublogo.png')
            }
            /> 
            <Text style = {{
                    padding: 50,
                    fontSize: 25
                }
            }> 
                {
                this.state.welcomemessage
                } </Text>   
                <Dropdown {...props}/> 
            <View style = {styles.buttonContainer} >
            <Button style = {
                styles.buttonContainer
            }
            onPress = {
                this._onPressButton.bind(this)
            }
            title = "Find Nearest Shuttle"
            color = "#000000" />
            </View> 
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#4966C4',
        borderColor: '#4966C4'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
AppRegistry.registerComponent('Welcome', () => Welcome);